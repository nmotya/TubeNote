
const putNote = (link, input, google_id) =>{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var tab = tabs[0].url
        fetch(`http://localhost:5000/api/users/${google_id}`,{
            method: "PATCH",
            body: JSON.stringify({ 
                url: tab, 
                note: input 
            }), 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json())
        .then((responseJson) => {
         window.close();
        })
    });
}

const getGoogleId = (input) => {
    chrome.runtime.sendMessage({ from: 'submit-note'}, function(response){
        if (input != ""){
            putNote("youtube", input, response);
        }
    });
    chrome.runtime.sendMessage({message : "note-popup", note: input});
    chrome.storage.local.set({note: input});
}

function submitNote(){
    const userInput = document.getElementById("note-input").value;
    getGoogleId(userInput);
}

function additionalBs(event){
    event.preventDefault();
    submitNote();
}

document.getElementById("submit-button").addEventListener("click", additionalBs);




