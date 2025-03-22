import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css'
import ProdukList from './components/ProdukList';
import TambahProduk from './components/TambahProduk';

function App() {
  return (
  <div>
  <h1>Aplikasi E-Commerce Sederhana</h1>
  <TambahProduk />
  <ProdukList />
  </div>
  );
  }
  export default App;
