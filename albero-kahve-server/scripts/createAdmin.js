// albero-kahve-server/scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/albero-kahve', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB bağlantısı başarılı');
  
  try {
    // Önce User modeli var mı kontrol et
    if (!User) {
      console.error('User modeli bulunamadı!');
      process.exit(1);
    }
    
    // Admin kullanıcısı zaten var mı kontrol et
    const existingAdmin = await User.findOne({ email: 'admin@alberokahve.com' });
    
    if (existingAdmin) {
      console.log('Admin kullanıcısı zaten mevcut!');
      process.exit(0);
    }
    
    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Yeni admin kullanıcısı oluştur
    const newAdmin = new User({
      name: 'Admin',
      email: 'admin@alberokahve.com',
      password: hashedPassword,
      isAdmin: true
    });
    
    // Veritabanına kaydet
    await newAdmin.save();
    console.log('Admin kullanıcısı başarıyla oluşturuldu!');
    process.exit(0);
  } catch (err) {
    console.error('Admin kullanıcısı oluşturulurken hata:', err);
    process.exit(1);
  }
})
.catch(err => {
  console.error('MongoDB bağlantı hatası:', err);
  process.exit(1);
});