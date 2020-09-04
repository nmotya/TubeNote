document.querySelector('.google-btn').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login' });});
