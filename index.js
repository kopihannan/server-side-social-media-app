const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.risshmy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected Mongodb");
    }
    catch (error) {

    }
}

run().catch(console.dir);


const PostCollection = client.db('post').collection('userpost')

app.get('/', (res, req) => {
    req.send(`${port} social media Server is runnig`)
})

app.listen(port, () => {
    console.log(`social media server is now runnig ${port}`);
})





app.post('/post', async (req, res) => {
    try {
        const post = req.body;
        const result = await PostCollection.insertOne(post).toArray()
        res.send(result)
    } catch (error) {

    }
})

app.put('/post/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updateReview = {
        $set: {
          likes: user.likes
        }
      }
      const result = await PostCollection.updateOne(filter, updateReview, option);
      res.send(result);
    } catch (error) {
  
    }
  })


app.get('/post', async (req, res) => {
    try {
        const query = req.body;
        const result = await PostCollection.find(query).toArray()
        res.send(result)
    } catch (error) {

    }
})


