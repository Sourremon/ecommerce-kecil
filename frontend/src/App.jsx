import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProdukList from './components/ProdukList';

function App() {
  return (
    <div>
      <h1>Selamat Datang di Aplikasi E-Commerce Sederhana</h1>
      <ProdukList />
    </div>
  );
 }
export default App;
