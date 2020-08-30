//NOTE: REMEMBER TO SET AS CONTENT SCRIPT IF YOU WILL USE THIS AGAIN

//var script = document.createElement('script');
//script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
//script.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(script);

//function dompath( element )
//{
    //var path = '';
    //for ( ; element && element.nodeType == 1; element = element.parentNode )
    //{
       // var inner = $(element).children().length == 0 ? $(element).text() : '';
       // var eleSelector = element.tagName.toLowerCase() + 
      //     ((inner.length > 0) ? ':contains(\'' + inner + '\')' : '');
    //    path = ' ' + eleSelector + path;
   // }
   // alert(path);
//}

/*
(function(){
    var likeButton = document.querySelector('[aria-label~="like"]');
    $(document).ready(function(){
        $(document).on("click", 'a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer', function() {
            alert($('[aria-label~="like"]').attr("aria-pressed"));
            if ($('[aria-label~="like"]').attr("aria-pressed") === "true"){
                chrome.runtime.sendMessage({ message: 'input'});
            }
        });
        $(document).on("click", 'paper-checkbox#checkbox.style-scope.ytd-playlist-add-to-option-renderer', function() {
            var clickedBtnID = $(this).attr('aria-checked');
            alert(clickedBtnID);
        });
        $(document).on("click", 'yt-formatted-string#text.style-scope.ytd-button-renderer.style-blue-text.size-default', function() {
            alert("blahblah");
        });
    });

})();

*/

