/// <reference path="../js/dropzone.js" />
// DOM Ready


$(function(){
    // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
    console.log("I started");
    var previewNode = document.querySelector("#between");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);
    var div = document.createElement('div');
    var getWidth = $(".fileinput-button").css('width');
    var getHeight = $(".fileinput-button").css('height');
    var anotherDiv = div.cloneNode();
    var dragEnterColor = 'rgba(158, 146, 255, 0.9)';
    var countObject = [];
    $(div).addClass('overlay');
    var maxImageWidth = 3000;
    var maxImageHeight = 1940;
    var myDropzone = new Dropzone('form[action=\"/fileupload\"]', { 
        paramName : "image",
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 20,
        maxFiles : 5,
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#previews", // Define the container to display the previews
        clickable: ".fileinput-button", // Define the element that should be used as click trigger to select files.
        init : function(){
            this.on("addedfile" , function(file){
                countObject.push(file);
                var getButton = $('button.add-more').removeClass('inactive');
                getButton.insertAfter(file.previewElement);
                $(div).insertBefore($('div.preview-outer'));
                $('div.preview-outer').removeClass('inactive');
                // Hookup the start button
                // file.previewElement.querySelector(".start").onclick = function () {
                //     myDropzone.enqueueFile(file);
                //     console.log("File type \n %s" , file);
                // };
                if (file.previewElement.previousElementSibling) {
                    $('form#formAdded').addClass('inactive');
                }

                file.previewElement.querySelector('button.delete').onclick = function (file) {
                    console.log("Clicked on previewElement");
                    myDropzone.removeFile(file);
                }
            });

            this.on("maxfilesreached", (file) => {
                console.log("What is the file ? \n%s", file);
                $('button.add-more').addClass('inactive');
            });

            this.on("removedfile", (file) => {
                if (countObject.length >= 4) {
                    console.log("Execute remove file");
                    $('button.add-more').removeClass('inactive');
                }
            });

            this.on("uploadprogress", function (progress) {
                document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
                console.log("Trigger the action");
                setTimeout(() => {
                    $('div.preview-outer').addClass('inactive');
                    document.querySelectorAll('.overlay').forEach((item) => {
                        $(item).remove();
                    });
                }, 2000);
            });

            this.on("sending", function (file) {
                // Show the total progress bar when upload starts
                document.querySelector("#total-progress").style.opacity = "1";
            });

            // Hide the total progress bar when nothing's uploading anymore
            this.on("queuecomplete", function (progress) {
                countObject = [];
                document.querySelector("#total-progress").style.opacity = "0";
            });

            this.on("dragenter", (event) => {
                console.log("Drag Enters");
                $(anotherDiv).css('background-color', dragEnterColor);
                $(anotherDiv).insertBefore($('div.preview-outer'));
                $('.fileinput-button').addClass('drag-enter');
                $('form#formAdded').addClass('inactive');
            });

            this.on("drop", (event) => {
                $(anotherDiv).remove();
                $(".fileinput-button").removeClass('drag-enter');
            });

            // For image dimension validation
            this.on("thumbnail",function(file){
                if(file.width > maxImageWidth || file.height > maxImageHeight){
                    file.rejectDimensions();
                }
                file.acceptDimensions();
            });
        },
        accept : function(file , done){
            file.acceptDimensions = done;
            file.rejectDimensions = function(){
                done(`Your file cannot be more than ${maxImageWidth}px & ${maxImageHeight}px`);
            }
        }
    });

    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.
    $("button.start").on("click" , ()=>{
        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    });
    $("button.cancel").on("click" , ()=>{
        // To override inline style
        countObject = [];
        $('div.preview-outer').addClass('inactive');
        document.querySelectorAll('.overlay').forEach((item) => {
            $(item).remove();
        });
        myDropzone.removeAllFiles(true);
    });

    $('button#addMore').on('click',()=>{
        // var getFormAction = $('form').attr('action');
        // console.log("What are the action ?",getFormAction);
        var getForm = $('form#formAdded');
        document.querySelectorAll('div.file-row').forEach((item)=>{
            $(getForm).removeClass('inactive').insertAfter($(item).last());
        });
    });


});