
document.querySelector('button').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'logout' }, function (response) {
        if (response === 'success'){
            window.close();
        } 
    });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {

    }
})