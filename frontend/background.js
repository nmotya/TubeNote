
const CLIENT_ID = encodeURIComponent('448793002559-gcai9vbq2tfq60bfains56cugl5dge9d.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://odmdklnahihglmjpafakencppfpefmnk.chromiumapp.org')
const SCOPE = encodeURIComponent('openid');
const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
const PROMPT = encodeURIComponent('consent');
var userGoogleId;

let user_signed_in = false;

function is_user_signed_in() {
    return user_signed_in;
}

function create_auth_endpoint() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let openId_endpoint_url =
        `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&scope=${SCOPE}
&state=${STATE}
&nonce=${nonce}
&prompt=${PROMPT}`;
    return openId_endpoint_url;
}

const createUser = (idnumber) =>{
    fetch("http://localhost:5000/api/users",{
        method: "POST",
        mode:"no-cors",
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `google_id=${idnumber}&notes=${[]}`
    });
}

const determinePopup = (tab) =>{
    fetch(`http://localhost:5000/api/users/${userGoogleId}`,{
        method: "GET"
    }).then(response => response.json())
    .then(json => {  
        if(tab.includes("https://www.youtube.com/watch")){
            if(json[0].notes.includes(tab.split("=")[1].split("&")[0])){
                var array = json[0].notes;
                var index = array.indexOf(tab.split("=")[1].split("&")[0]);
                chrome.storage.local.set({note: json[0].notes[index + 1]});
                chrome.browserAction.setPopup({ popup: './frontend/note.html' });
            } else{
                chrome.browserAction.setPopup({ popup: './frontend/input.html' });
            }
        } else if (json[0].notes.length === 1){
            chrome.browserAction.setPopup({ popup: './frontend/signed-in.html' });
        } else{
            chrome.browserAction.setPopup({ popup: './frontend/note-list.html' });
        }
        
    });
}



const doesUserExist = (id) =>{
    fetch(`http://localhost:5000/api/users/${userGoogleId}`,{
        method: "GET"
    }).then(response => response.json())
    .then(json => {
        if(!json[0]){
            createUser(id);
        }
    });
}

const scraper = () =>{
    chrome.tabs.executeScript({
        file: 'title-scraper.js'
    });
}

//lisenter for tab change
chrome.tabs.onActivated.addListener(function(activeInfo) {
        if (is_user_signed_in()){
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                determinePopup(tabs[0].url);
            });
        }
}); 

//listener for url change within tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete" && is_user_signed_in()){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            determinePopup(tabs[0].url);
        });
    }
});

chrome.windows.onFocusChanged.addListener(function(window) {
    if(window != chrome.windows.WINDOW_ID_NONE){
        if (is_user_signed_in()){
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                determinePopup(tabs[0].url);
            });
        }
    }
});
/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "input" && is_user_signed_in()){
        chrome.browserAction.setPopup({ popup: './frontend/input.html' });
    }
});*/



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.from === 'submit-note'){
        sendResponse(this.userGoogleId);
    }
    return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "note-popup"){
        chrome.browserAction.setPopup({ popup: './frontend/note.html' });
        chrome.storage.local.set({note: request.note});
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        if (user_signed_in) {
            alert("naw");
        } else {
            chrome.identity.launchWebAuthFlow({
                'url': create_auth_endpoint(),
                'interactive': true
            }, function (redirect_url) {
                if (chrome.runtime.lastError) {
                    alert("STOOPID");
                } else {
                    let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
                    id_token = id_token.substring(0, id_token.indexOf('&'));
                    const user_info = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(id_token.split(".")[1]));
                    userGoogleId = user_info.sub;


                    if ((user_info.iss === 'https://accounts.google.com' || user_info.iss === 'accounts.google.com')
                        && user_info.aud === CLIENT_ID) {  
                            console.log(user_info.sub);
                            chrome.storage.local.set({id: user_info.sub});
                              
                            chrome.identity.getProfileUserInfo(function(userInfo) {
                               doesUserExist(user_info.sub)
                               console.log(userInfo.id);
                               console.log(userInfo.email);
                               console.log("afsaf");
                            });
                        user_signed_in = true;
                        chrome.tabs.reload();
                        sendResponse("success");
                        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                            var tab = tabs[0].url
                            determinePopup(tab);
                        });
                    } else {
                        // invalid credentials
                        console.log("Invalid credentials.");
                    }
                }
            });

            return true;
        }
    } else if (request.message === 'logout') {
        user_signed_in = false;
        chrome.browserAction.setPopup({ popup: './frontend/index.html' }, () => {
            sendResponse('success');
        });

        return true;
    } else if (request.message === 'isUserSignedIn') {
        sendResponse(is_user_signed_in());
    }
});

