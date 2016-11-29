// Data upload logic and calculations!
$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

// Data upload file(s) are received as FormData
$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // Create a FormData object which contains a set of key/value pairs. Can
    // send along our AJAX request to the server
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      // uploads[] is the name for our HTML upload-input object
      formData.append('uploads[]', file, file.name);
    }

    // Used AJAX object here to pass on the formData to /upload endpoint
    $.ajax({
      url: '/upload', 
      type: 'POST',
      data: formData,
      processData: false,
      // Setting processData to false stops jQuery from attempting to convert the formData object to a string
      contentType: false,
      // false tells jQuery not to add a Content-Type header for us    
      success: function(data){
          console.log('upload successful!\n' + data);
      },
        
      // Added logic to animate the progress bar on the page
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            // this updates the .progress-bar element (in CSS file)
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }

          }

        }, false);

        return xhr;
      }
    });

  }
});