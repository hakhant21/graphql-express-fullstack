const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


// Init Express
const app = express();

// Cors
app.use(cors());

// Schema 
const schema = require('./schema/schema');

// DB Connection 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true })
            .then(res => console.log('Mongodb Connected...'))
            .catch(err => console.log('Connection Failed', err))

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})