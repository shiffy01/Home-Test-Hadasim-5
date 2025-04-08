const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT'],
  }));
  
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '5qZ3uV5g',
  port: 5432,
});

client.connect();
client.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connected successfully:', result.rows);
    }
});
app.use(express.json());
createTables()

  app.post('/product', (req, res) => {
  const { name, price, minimum, supplier_id } = req.body;
  const query = 'INSERT INTO products (name, price, minimum, supplier_id) VALUES ($1, $2, $3, $4) RETURNING *';
  client.query(query, [name, price, minimum, supplier_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(201).json(result.rows[0]);
    }
  });
});
  app.post('/supplier', async (req, res) => {
    const { company, phone_number, representative, password} = req.body; 
    const query=`
    INSERT INTO suppliers (company, phone_number, representative, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `
    client.query(query, [company, phone_number, representative, password], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.status(201).json(result.rows[0]);
      }
    });
    
     
  });
  app.post('/order', (req, res) => {
    const { name, quantity, supplier_id, total, status } = req.body;
    const query = 'INSERT INTO orders (name, quantity, supplier_id, total, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    client.query(query, [name, quantity, supplier_id, total, status], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.status(201).json(result.rows[0]);
      }
    });
  }); 
  app.put('/order', (req, res) => {
    const { id, name, quantity, supplier_id, total, status } = req.body;
    const query = `
      UPDATE orders 
      SET name = $1, quantity = $2, supplier_id = $3, total = $4, status = $5
      WHERE id = $6
      RETURNING *`;
  
    client.query(query, [name, quantity, supplier_id, total, status, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        if (result.rows.length === 0) {
          res.status(404).send('Order not found');
        } else {
          res.status(200).json(result.rows[0]);
        }
      }
    });
  }); 
  app.get('/product', (req, res) => {
    const query = 'SELECT * FROM products';
    client.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.status(200).json(result.rows); 
      }
    });
  });
  app.get('/product/:id', (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM products WHERE id = $1'; 
    
    client.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        if (result.rows.length === 0) {
          res.status(404).send('Product not found'); 
        } else {
          res.status(200).json(result.rows[0]); 
        }
      }
    });
  });
  app.get('/order', (req, res) => {
    const query = 'SELECT * FROM orders';
    client.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.status(200).json(result.rows);
      }
    });
  });
  app.get('/order/:id', (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM orders WHERE id = $1'; 
    
    client.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        if (result.rows.length === 0) {
          res.status(404).send('Product not found'); 
        } else {
          res.status(200).json(result.rows[0]); 
        }
      }
    });
  });  
  app.get('/supplier', (req, res) => {
    const query = 'SELECT * FROM suppliers';
    client.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.status(200).json(result.rows);
      }
    });
  });
  app.get('/supplier/:id', (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM suppliers WHERE id = $1'; 
    
    client.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        if (result.rows.length === 0) {
          res.status(404).send('Supplier not found'); 
        } else {
          res.status(200).json(result.rows[0]); 
        }
      }
    });
  });
  app.get('/products/:id', (req, res) => {
    const { id } = req.params;
  //get all products of a certain supplier id
    const query = `
      SELECT *
      FROM products
      WHERE supplier_id = $1;
    `;
      client.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        if (result.rows.length === 0) {
          res.status(404).send('No products found for this supplier');
        } else {
          res.status(200).json(result.rows); 
        }
      }
    });
  });
  app.get('/supplier/:representative/:password', (req, res) => {
    const { representative, password } = req.params;
    const query = `
      SELECT *
      FROM suppliers 
      WHERE representative = $1 AND password = $2;
    `;
      client.query(query, [representative, password], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        if (result.rows.length === 0) {
          res.status(404).send('No supplier found');
        } else {
          res.status(200).json(result.rows[0]); 
        }
      }
    });
  });
  app.get('/orders/:id', (req, res) => {
    const { id } = req.params;
  //get all orders of a certain supplier id
    const query = `
     SELECT * FROM orders WHERE supplier_id = $1
    `;
      client.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        if (result.rows.length === 0) {
          res.status(404).send('No products found for this supplier');
        } else {
          res.status(200).json(result.rows); 
        }
      }
    });
  });
  
  
  async function createTables() {
    try {
      
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS suppliers (
          id SERIAL PRIMARY KEY,
          company VARCHAR(100),
          phone_number VARCHAR(20),
          representative VARCHAR(100),
          password VARCHAR(100)
        );
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          price NUMERIC,
          minimum INT,
          supplier_id INT REFERENCES suppliers(id)
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
  
      console.log("Tables ensured.");
    } catch (err) {
      console.error("Error creating tables:", err);
    }
  }
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
