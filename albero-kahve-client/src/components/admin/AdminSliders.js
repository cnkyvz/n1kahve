// src/components/admin/AdminSliders.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';

const AdminSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Yeni/düzenlenecek slider için form durumu
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    image: null
  });
  
  // Düzenleme modu
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Slider verilerini çek
  useEffect(() => {
    fetchSliders();
  }, []);
  
  const fetchSliders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.get('/api/slider', {
        headers: { 'x-auth-token': token }
      });
      setSliders(response.data);
      setError(null);
    } catch (err) {
      setError('Slider verilerini çekerken bir hata oluştu.');
      console.error('Slider verilerini çekme hatası:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Form değişikliklerini işle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Dosya yükleme işle
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };
  
  // Slider düzenleme modunu aç
  const handleEdit = (slider) => {
    setFormData({
      title: slider.title,
      description: slider.description,
      buttonText: slider.buttonText,
      buttonLink: slider.buttonLink,
      image: null
    });
    setEditingId(slider._id);
    setIsModalOpen(true);
  };
  
  // Yeni slider ekleme modunu aç
  const handleAddNew = () => {
    setFormData({
      title: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      image: null
    });
    setEditingId(null);
    setIsModalOpen(true);
  };
  
  // Slider sil
  const handleDelete = async (id) => {
    if (!window.confirm('Bu slider\'ı silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('auth-token');
      await axios.delete(`/api/slider/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setSliders(sliders.filter(slider => slider._id !== id));
    } catch (err) {
      setError('Slider silinirken bir hata oluştu.');
      console.error('Slider silme hatası:', err);
    }
  };
  
  // Form gönder (ekle/güncelle)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form verilerini ayarla
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('buttonText', formData.buttonText);
    formDataToSend.append('buttonLink', formData.buttonLink);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data'
      }
    };
    
    try {
      let response;
      
      if (editingId) {
        // Güncelleme isteği
        response = await axios.patch(`/api/slider/${editingId}`, formDataToSend, config);
        
        // Slider listesini güncelle
        setSliders(sliders.map(slider => 
          slider._id === editingId ? response.data : slider
        ));
      } else {
        // Yeni ekleme isteği
        response = await axios.post('/api/slider', formDataToSend, config);
        
        // Yeni slider'ı listeye ekle
        setSliders([...sliders, response.data]);
      }
      
      // Modalı kapat ve formu sıfırla
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        image: null
      });
      
    } catch (err) {
      setError('Slider kaydedilirken bir hata oluştu.');
      console.error('Slider kaydetme hatası:', err);
    }
  };
  
  // Modal kapat
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };
  
  if (loading) {
    return <LoadingMessage>Yükleniyor...</LoadingMessage>;
  }
  
  return (
    <SliderAdminContainer>
      <AdminHeader>
        <h1>Slider Yönetimi</h1>
        <AddButton onClick={handleAddNew}>
          <FaPlus /> Yeni Slider Ekle
        </AddButton>
      </AdminHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <SliderTable>
        <thead>
          <tr>
            <th>Görsel</th>
            <th>Başlık</th>
            <th>Açıklama</th>
            <th>Buton</th>
            <th>Link</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {sliders.length === 0 ? (
            <tr>
              <td colSpan="6">Henüz slider bulunmamaktadır.</td>
            </tr>
          ) : (
            sliders.map(slider => (
              <tr key={slider._id}>
                <td>
                  <SliderImage src={slider.image} alt={slider.title} />
                </td>
                <td>{slider.title}</td>
                <td>
                  <DescriptionCell>{slider.description}</DescriptionCell>
                </td>
                <td>{slider.buttonText}</td>
                <td>{slider.buttonLink}</td>
                <td>
                  <ActionButtons>
                    <ActionButton onClick={() => handleEdit(slider)}>
                      <FaEdit />
                    </ActionButton>
                    <ActionButton danger onClick={() => handleDelete(slider._id)}>
                      <FaTrash />
                    </ActionButton>
                  </ActionButtons>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </SliderTable>
      
      {/* Slider Ekleme/Düzenleme Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>{editingId ? 'Slider Düzenle' : 'Yeni Slider Ekle'}</h2>
              <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            </ModalHeader>
            
            <SliderForm onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="title">Başlık</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="buttonText">Buton Metni</label>
                  <input
                    type="text"
                    id="buttonText"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="buttonLink">Buton Linki</label>
                  <input
                    type="text"
                    id="buttonLink"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <label htmlFor="image">
                  {editingId ? 'Görsel (Değiştirmek için seçin)' : 'Görsel'}
                </label>
                <FileInputLabel>
                  <FileInput
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    required={!editingId}
                  />
                  <FaImage /> Görsel Seç
                </FileInputLabel>
                {formData.image && (
                  <SelectedFileName>
                    {formData.image.name}
                  </SelectedFileName>
                )}
              </FormGroup>
              
              <ButtonGroup>
                <CancelButton type="button" onClick={handleCloseModal}>
                  İptal
                </CancelButton>
                <SubmitButton type="submit">
                  {editingId ? 'Güncelle' : 'Ekle'}
                </SubmitButton>
              </ButtonGroup>
            </SliderForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </SliderAdminContainer>
  );
};

// Styled Components
const SliderAdminContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h1 {
    margin: 0;
    color: ${props => props.theme.colors.secondary};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  
  svg {
    margin-right: 8px;
  }
`;

const SliderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  
  th, td {
    border: 1px solid #eee;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f9f9f9;
    font-weight: 600;
  }
  
  tr:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

const SliderImage = styled.img`
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const DescriptionCell = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.danger ? '#ff6b6b' : '#4dabf7'};
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.danger ? '#ff5252' : '#339af0'};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  color: #e53e3e;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-left: 4px solid #e53e3e;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const SliderForm = styled.form`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: ${props => props.theme.colors.textLight};
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
  
  textarea {
    resize: vertical;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f1f3f5;
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    margin-right: 8px;
    color: ${props => props.theme.colors.primary};
  }
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const SelectedFileName = styled.div`
  margin-top: 8px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f1f3f5;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

export default AdminSliders;