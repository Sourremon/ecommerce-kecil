import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import axios from 'axios';
import './App.css'
import ProdukList from './components/ProdukList';
import TambahProduk from './components/TambahProduk';

function App() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = () => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  };

  const addProduk = (newProduk) => {
    setProduk([...produk, newProduk]);
  };

  const updateProduk = (updatedProduk) => {
    setProduk(produk.map((p) => 
      p.id === updatedProduk.id ? updatedProduk : p
    ));
  };

  const deleteProduk = (id) => {
    setProduk(produk.filter((p) => p.id !== id));
  };

  return (
  <div>
    <h1>Aplikasi E-Commerce Sederhana</h1>
    <TambahProduk addProduk={addProduk} />
    <ProdukList 
      produk={produk} 
      updateProduk={updateProduk} 
      deleteProduk={deleteProduk} 
    />
  </div>
  );
}

export default App;
