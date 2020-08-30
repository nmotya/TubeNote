
document.querySelector('#sign-out').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'logout' }, function (response) {
        if (response === 'success'){
            window.close();
        } 
    });
});

document.querySelector('button').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'isUserSignedIn' }, function (response) {
        (response);
    });
});

//chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  //  alert("jerk off out in public");
 //   chrome.tabs.executeScript(tabs[0].id, {file: "click-script.js"})
//});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {

    }
})