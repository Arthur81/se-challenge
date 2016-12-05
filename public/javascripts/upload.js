// Data upload logic and calculations!

// jQuery entries
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
    var arrayData = [];

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      // uploads[] is the name for our HTML upload-input object
      formData.append('uploads[]', file, file.name);
    }
      // arrayDaya = CSVtoArray(formdata, "."); // using comma as my delimiter
      
      // var otherData = this.serializeArray();
      /*
      $.each(other_data,function(key,input){
          formData.append(input.name,input.value);
      });
      */
 
      // Using Asynchronous Javascript and XML call to dynamically change the page in the browser endpoint
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
          // processData(data);
          // CSVToArray(data, ',');
          alert("YOU GOT TO ME!!!!");
      },
      // Added logic to animate the progress bar on the page
      // Return type will be an XML based http request
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
      },
      error: function(){ alert('An error occurred');}
    });// end of ajax 1

/*
    $.ajax({
        url: '/test',
        type: 'POST',
        data: formData,
        // processData: false,
        // contentType: false,
        dataType: 'text',
        success: function(data) {
            var finalData = CSVToArray(this.data, ","); // using comma as delimiter for now
            // convertData(data);
            // alert(data);
            alert("WE ARE HERE!");
        },
        error: function(){ alert('An error occurred chewwwii');}
    });// end of ajax 2
      */
  }// end of if file is not empty
});// end of on change input file

/*
function convertData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    
    //Take all the column headers from first line at indext zero of the allTextLines array
    var headers = allTextLines[0].split(',');
    var lines = [];
    var linesStringified = "";

    for (var i=1; i<allTextLines.length; i++) {
        // Variable data will contain the data for one entry and will be comma delimited
        var data = allTextLines[i].split(',');
        // Hopfully no empty data
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
        
    }
    // var linesStringified = JASON.stringify(lines[headers.length]);
    // convert JSON Data to string?
    // alert(linesStringified);
    // alert(linesStringified);
    // linesStringified = JASON.stringify(lines[headers.length]);
    // linesStringified = '{'+lines.toString()+'}'
    // alert(lines.toString());
    // alert('FILE(S) UPLOADED!');
    alert('CHEWBACAAAAAAAAA');
    // linesStringified = lines.toString;
    // alert(linesStringified);
}
*/


/*
/////////////////SUGGESTIONS/////////////////////////////////////////////////////
$(document).ready(function(){
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] === undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                alert(this.name);
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $('#myform').submit(function() {
        $('#result').text(JSON.stringify($('#myform').serializeObject()));
        return false;
    });
});
*/

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}