// models/Slider.js
const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  buttonLink: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Slider', sliderSchema);

// routes/sliderRoutes.js
const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/sliders';
    // Klasör yoksa oluştur
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'slider-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Dosya türlerini kontrol et
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Tüm slider'ları getir (herkes erişebilir)
router.get('/', async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({ order: 1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin için tüm slider'ları getir (aktif/pasif tümü)
router.get('/admin', auth, async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ order: 1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni slider ekle
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Lütfen bir resim yükleyin.' });
    }
    
    // Max sıra numarasını bul
    const maxOrderSlider = await Slider.findOne().sort('-order');
    const nextOrder = maxOrderSlider ? maxOrderSlider.order + 1 : 1;
    
    const slider = new Slider({
      title: req.body.title,
      description: req.body.description,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
      image: `/uploads/sliders/${req.file.filename}`,
      order: nextOrder
    });
    
    const newSlider = await slider.save();
    res.status(201).json(newSlider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Slider güncelle
router.patch('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink
    };
    
    // Eğer yeni bir resim yüklendiyse
    if (req.file) {
      // Eski resmi bul ve sil
      const oldSlider = await Slider.findById(req.params.id);
      if (oldSlider && oldSlider.image) {
        const oldImagePath = path.join(__dirname, '..', oldSlider.image);
        // Dosya varsa sil
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Yeni resim yolunu ayarla
      updateData.image = `/uploads/sliders/${req.file.filename}`;
    }
    
    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    res.json(updatedSlider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Slider sıralamasını güncelle
router.patch('/reorder', auth, async (req, res) => {
  try {
    const { sliderIds } = req.body;
    
    // Her bir ID için yeni sıra numarasını ayarla
    const updatePromises = sliderIds.map((id, index) => 
      Slider.findByIdAndUpdate(id, { order: index + 1 })
    );
    
    await Promise.all(updatePromises);
    
    // Güncellenmiş listeyi döndür
    const updatedSliders = await Slider.find().sort({ order: 1 });
    res.json(updatedSliders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Slider'ı aktif/pasif yap
router.patch('/toggle/:id', auth, async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    slider.isActive = !slider.isActive;
    
    const updatedSlider = await slider.save();
    res.json(updatedSlider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Slider sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    
    if (!slider) {
      return res.status(404).json({ message: 'Slider bulunamadı' });
    }
    
    // Resmi dosya sisteminden sil
    if (slider.image) {
      const imagePath = path.join(__dirname, '..', slider.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Veritabanından sil
    await Slider.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Slider başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;