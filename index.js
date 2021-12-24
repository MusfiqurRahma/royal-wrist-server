const { MongoClient } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const ObjectId = require("mongodb").ObjectId;


const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k4g9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("royal_wrist");
      const productsCollection = database.collection("products");

      // GET products
      app.get('/AddProducts', async (req, res) => {
        const result = await productsCollection.find({}).toArray();
        res.json(result);
      })

      // POST products
      app.post('/AddProducts', async (req, res) => {
        const products = req.body;
        const result = await productsCollection.insertOne(products)
        res.send(result);
      })

        // GET singleProducts
        app.get('/AddProducts/:id', async (req, res) => {
          const id = req.params.id;
          console.log('run',id);
          const user = { _id: ObjectId(id) }
          const cursor = await productsCollection.find(user).toArray();
          res.json(cursor)
        })
  
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!This is my Royal World')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})