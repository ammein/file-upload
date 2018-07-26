/// <reference path="../js/dropzone.js" />
// DOM Ready
$(function(){

    console.log("I started");
    var myDropzone = new Dropzone("form");

    Dropzone.options.myDropzone = {
        paramName : 'fileName',
        maxFileSize : 200 , // MB
        accept : (file,done)=> {
            if(file.name == "Honeywell.png"){
                done("You got honey, dear ?");
            }
            done();
        }
    }
});