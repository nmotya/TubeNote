

document.querySelector('.google-btn').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login' });});


//document.querySelector('button').addEventListener('click', function () {
   // chrome.runtime.sendMessage({ message: 'isUserSignedIn' }, function (response) {
    //    alert(response);
  //  });
//});