///<reference path="./node_modules/body-parser/*"/>
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
var root = {
    root : './src/views'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

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
    var file = req.params;
    console.log(`File Upload :\n ${JSON.stringify(file , undefined , 2)}`);
});

// 404 Handle
app.use((req,res)=>{
    res.status(400);
    res.sendFile('notFound.html' , root);
});

var myErrorHandler = ((err , req , res , next)=>{
    if(err){
        fs.appendFile('log.txt' , err , (err)=>{
            if(err){
                throw err;
            }
        })
    }

    next();
})

// app.configure(() => {
//     app.use(myErrorHandler);
// });

app.listen(port , '0.0.0.0' , function () {
    var serverUp = `\n\n------\t${new Date().toISOString()}\n------\thttp://localhost:${port}\n`;
    console.log(serverUp);
    var staticUp = `Static file on : \n\t${staticLocation}`;
    console.log(staticUp);
    fs.appendFile('log.txt' , `${serverUp} \n ${staticUp}` , (err)=>{
        if(err){
            throw err;
        }
        console.log("File is saved !");
    })
});

if(process.argv[2] === 'delete'){
    fs.writeFile('log.txt' , 'Log deleted' , (err)=>{
        console.log("Log Deleted");
    });
}