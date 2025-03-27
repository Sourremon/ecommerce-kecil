import React, { useState } from 'react';
import axios from 'axios';

function ProdukList({ produk, updateProduk, deleteProduk }) {
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editHarga, setEditHarga] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        deleteProduk(id);
        setDeleteConfirm(null);
      })
      .catch(err => console.error(err));
  };

  const promptDelete = (id) => {
    setDeleteConfirm(id);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditNama(item.nama);
    setEditHarga(item.harga);
  };

  const handleUpdate = () => {
    const updatedProduk = {
      id: editId,
      nama: editNama,
      harga: parseInt(editHarga)
    };
    
    axios.put(`http://localhost:3001/produk/${editId}`, {
      nama: editNama,
      harga: parseInt(editHarga),
    })
      .then(() => {
        updateProduk(updatedProduk);
        setEditId(null);
        setEditNama('');
        setEditHarga('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Daftar Produk</h2>
      <ul>
        {produk.map((item) => (
          <li key={item.id}>
            {item.nama} - Rp{item.harga}
            <div className="button-group">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => promptDelete(item.id)}>Delete</button>
            </div>
            
            {deleteConfirm === item.id && (
              <div className="delete-confirm">
                <p>Yakin ingin menghapus produk ini?</p>
                <div className="button-group">
                  <button onClick={() => handleDelete(item.id)}>Ya</button>
                  <button onClick={cancelDelete}>Tidak</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {editId && (
        <div className="edit-form">
          <h3>Edit Produk</h3>
          <input
            type="text"
            placeholder="Nama Produk"
            value={editNama}
            onChange={(e) => setEditNama(e.target.value)}
          />
          <input
            type="number"
            placeholder="Harga Produk"
            value={editHarga}
            onChange={(e) => setEditHarga(e.target.value)}
          />
          <div className="button-group">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProdukList;
