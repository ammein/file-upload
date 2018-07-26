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
    var isAnimating = false;
    var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
        url: "/fileupload", // Set the url
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#previews", // Define the container to display the previews
        clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    });

    myDropzone.on("addedfile", function (file) {
        $(div).insertBefore($('div.preview-outer'));
        $('div.preview-outer').css('display' , 'initial');
        // Hookup the start button
        // file.previewElement.querySelector(".start").onclick = function () {
        //     myDropzone.enqueueFile(file);
        //     console.log("File type \n %s" , file);
        // };

        file.previewElement.querySelector('button.delete').onclick = function(file){
            console.log("Clicked on previewElement");
            myDropzone.removeFile(file);
        }
    });

    // Update the total progress bar
    myDropzone.on("uploadprogress", function (progress) {
        isAnimating = true;
        document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
        console.log("Trigger the action");
        setTimeout(() => {
            $('div.preview-outer').removeAttr('style');
            $('div.preview-outer').css({
                display: 'none !important'
            });
            document.querySelectorAll('.overlay').forEach((item) => {
                $(item).remove();
            });
            isAnimating = false;
        }, 2000);
    });
    setInterval(()=>{
        console.log("Animate = %s", isAnimating);
    },1000);
    myDropzone.on("sending", function (file) {
        // Show the total progress bar when upload starts
        document.querySelector("#total-progress").style.opacity = "1";
        // To override inline style
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
        $('div.preview-outer').removeAttr('style');
        $('div.preview-outer').css({
            display: 'none !important'
        });
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
    })

});