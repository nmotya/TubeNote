
var user_google_id;

//chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
   // if (request.from === "background"){
  //      user_google_id = request.info;
  //      alert("gangnam style");
 //       console.log("gangnam style");
  //  }
//    return true;
//})


const getGoogleId = () => {
    chrome.runtime.sendMessage({ from: 'background', info: user_info.sub});
}


const putNote = (link, input) =>{
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch("http://localhost:5000/api/users/100713083412008910651",{
        method: "PATCH",
        body: JSON.stringify({ 
            url: "foo", 
            note: input 
        }), 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

function submitNote(){
    const userInput = document.getElementById("note-input").value;
    putNote("youtube", userInput.trim());
}

function additionalBs(event){
    event.preventDefault();
    submitNote();
}

document.getElementById("submit-button").addEventListener("click", additionalBs);



