

document.querySelector('.google-btn').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response === 'success') {
          let url = "http://localhost:5000/api/users";

          console.log("u give her money, to laugh at ur dick");
      
          window.close();
        }
    });
});


//document.querySelector('button').addEventListener('click', function () {
   // chrome.runtime.sendMessage({ message: 'isUserSignedIn' }, function (response) {
    //    alert(response);
  //  });
//});