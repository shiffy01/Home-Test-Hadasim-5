const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT'],
}));

// PostgreSQL Client Setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '5qZ3uV5g',
  port: 5432,
});

async function createTables() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        price NUMERIC,
        minimum INT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        company VARCHAR(100),
        phone_number VARCHAR(20),
        representative VARCHAR(100)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS supplier_products (
        supplier_id INT REFERENCES suppliers(id),
        product_id INT REFERENCES products(id),
        PRIMARY KEY (supplier_id, product_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        quantity INT,
        supplier_id INT REFERENCES suppliers(id),
        total NUMERIC,
        status VARCHAR(50)
      );
    `);

    console.log("✅ Tables ensured.");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
}

// Connect to the PostgreSQL client
client.connect()
  .then(() => {
    console.log("Database connected successfully");
    // Ensure tables are created if they don't exist
    createTables();
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });

app.use(express.json());

// Routes (your POST, GET, PUT, etc.)
app.post('/product', (req, res) => {
  const { name, price, minimum } = req.body;
  const query = 'INSERT INTO products (name, price, minimum) VALUES ($1, $2, $3) RETURNING *';
  client.query(query, [name, price, minimum], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(201).json(result.rows[0]);
    }
  });
});

// Your other routes like '/supplier', '/order' continue here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
