import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editHarga, setEditHarga] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditNama(item.nama);
    setEditHarga(item.harga);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/produk/${editId}`, {
      nama: editNama,
      harga: parseInt(editHarga),
    })
      .then(() => {
        setProduk(produk.map((p) => 
          p.id === editId ? { ...p, nama: editNama, harga: parseInt(editHarga) } : p
        ));
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
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editId && (
        <div>
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
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProdukList;
