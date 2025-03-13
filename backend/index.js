// index.js (gabungan)
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
 res.send('Hello World from Express.js!');
});
app.post('/data', (req, res) => {
 const { nama } = req.body;
 res.send(`Data diterima: ${nama}`);
});
// CREATE
app.post('/produk', async (req, res) => {
 const { nama, harga } = req.body;
 try {
   const newProduk = await pool.query(
     'INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *',
     [nama, harga]
   );
   res.json(newProduk.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Server error' });
 }
});
// READ
app.get('/produk', async (req, res) => {
 try {
   const allProduk = await pool.query('SELECT * FROM produk');
   res.json(allProduk.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Server error' });
 }
});
// UPDATE
app.put('/produk/:id', async (req, res) => {
 const { id } = req.params;
 const { nama, harga } = req.body;
 try {
   const updatedProduk = await pool.query(
     'UPDATE produk SET nama = $1, harga = $2 WHERE id = $3 RETURNING *',
     [nama, harga, id]
   );
   if (updatedProduk.rows.length === 0) {
     return res.status(404).json({ error: 'Product not found' });
   }
   res.json(updatedProduk.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Server error' });
 }
});
// DELETE
app.delete('/produk/:id', async (req, res) => {
 const { id } = req.params;
 try {
   const deletedProduk = await pool.query(
     'DELETE FROM produk WHERE id = $1 RETURNING *',
     [id]
   );
   if (deletedProduk.rows.length === 0) {
     return res.status(404).json({ error: 'Product not found' });
   }
   res.json({ message: 'Product deleted successfully' });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Server error' });
 }
});
app.listen(PORT, () => {
 console.log(`Server berjalan di http://localhost:${PORT}`);
});

 