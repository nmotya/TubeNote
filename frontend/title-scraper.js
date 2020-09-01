
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);



chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.message === "get_title"){
        $(document).ready(function(){
            var x= $("h1.title.style-scope.ytd-video-primary-info-renderer").text();
            chrome.storage.local.set({vidTitle: x});
            alert(x);
        });
    }
});








