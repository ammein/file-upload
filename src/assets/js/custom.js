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
    $(div).addClass('overlay');
    var myDropzone = new Dropzone('form', { // Make the whole body a dropzone
        // url: "/fileupload", // Set the url
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 20,
        maxFiles : 5,
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#previews", // Define the container to display the previews
        clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    });

    myDropzone.on("addedfile", function (file) {
        var getButton = $('button.add-more').removeClass('inactive');
        console.log("Next element", file.previewElement);
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

        file.previewElement.querySelector('button.delete').onclick = function(file){
            console.log("Clicked on previewElement");
            myDropzone.removeFile(file);
        }
    });

    // Update the total progress bar
    myDropzone.on("uploadprogress", function (progress) {
        document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
        console.log("Trigger the action");
        setTimeout(() => {
            $('div.preview-outer').addClass('inactive');
            document.querySelectorAll('.overlay').forEach((item) => {
                $(item).remove();
            });
        }, 2000);
    });
    myDropzone.on("sending", function (file) {
        // Show the total progress bar when upload starts
        document.querySelector("#total-progress").style.opacity = "1";
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function (progress) {
        document.querySelector("#total-progress").style.opacity = "0";
    });

    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.
    $("button.start").on("click" , ()=>{
        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    });
    $("button.cancel").on("click" , ()=>{
        // To override inline style
        $('div.preview-outer').addClass('inactive');
        document.querySelectorAll('.overlay').forEach((item) => {
            $(item).remove();
        });
        myDropzone.removeAllFiles(true);
    });
    myDropzone.on("dragenter" , (event)=>{
        $(anotherDiv).css('background-color', dragEnterColor);
        $(anotherDiv).insertBefore($('div.preview-outer'));
        $('.fileinput-button').css({
            zIndex : 9999,
            width: $(window).width(),
            height: $(window).height(),
            backgroundColor: 'white !important',
            display : "block",
            position: 'relative',
            margin : '0 auto',
            border: '3px black dashed'
        });
    });
    // When user drop the file
    myDropzone.on("drop" , (event)=>{
        $(anotherDiv).remove();
        $(".fileinput-button").css({
            width : getWidth,
            height : getHeight,
            zIndex : 1,
            margin : 'auto'
        });
    });

    var addDropzone;

    $('button#addMore').on('click',()=>{
        // var getFormAction = $('form').attr('action');
        // console.log("What are the action ?",getFormAction);
        var getForm = $('form#formAdded');
        document.querySelectorAll('div.file-row').forEach((item)=>{
            $(getForm).removeClass('inactive').insertAfter($(item).last());
        });
    });


});