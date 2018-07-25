const express = require('express');
const app = express();
const port = 3000;

var root = {
    root : './src/views'
};

app.get('/' , (req,res)=>{
    res.sendFile('index.html' , root);
});

app.get('/about' , (req,res)=>{
    res.sendFile('index.html' , root);
});

app.post('/fileupload', (req, res) => {
    var file = req.body;
    console.log(`File Upload :\n ${JSON.stringify(file,undefined,2)}`);
});

app.get('*' , (req,res)=>{
    res.sendFile('notFound.html' , root);
});

app.listen(port , '0.0.0.0' , function () {
    console.log(`Server started at ${port}`);
})