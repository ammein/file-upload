const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var root = {
    root : './src/views'
};

var staticLocation = path.join(__dirname, 'src');

app.use(express.static(staticLocation));

app.set('view engine' , 'html');

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

// 404 Handle
app.use((req,res)=>{
    res.status(400);
    res.sendFile('notFound.html' , root);
});

app.listen(port , '0.0.0.0' , function () {
    console.log(`Server started at ${port}`);
    console.log("Static file on ",staticLocation);
})