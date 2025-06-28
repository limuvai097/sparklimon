const express = require('express');
const path = require('path');

const app = express();
const port = 8080;
app.use(express.json());

app.get('/', (req,res)=>{
    console.log('Received a GET request');
    res.sendFile(path.join(__dirname, 'mysite', 'index.html'));
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
