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
const ProfileCollection = client.db('post').collection('profile')

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
                likes: user.likes,
            }
        }
        const result = await PostCollection.updateOne(filter, updateReview, option);
        res.send(result);
    } catch (error) {

    }
})

app.post('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const user = req.body;
        const option = { upsert: true };
        const updateReview = {
            $set: {
                comment: user.comment
            }
        }
        const result = await PostCollection.updateOne(filter, updateReview, option);
        res.send(result);
    } catch (error) {

    }
})



app.get('/post', async (req, res) => {
    try {
        const query = {}
        const sort = { likes: -1 };
        const cursor = await PostCollection.find(query).sort(sort).toArray()
        res.send(cursor)
    } catch (error) {

    }
})


app.get('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        const result = await PostCollection.findOne(filter)
        res.send(result)
    } catch (error) {

    }
})

app.post('/profile', async (req, res )=>{
    try {
        const post = req.body;
        const result = await ProfileCollection.insertOne(post).toArray()
        res.send(result)
    } catch (error) {

    }
})
