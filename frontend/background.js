
const CLIENT_ID = encodeURIComponent('448793002559-gcai9vbq2tfq60bfains56cugl5dge9d.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://odmdklnahihglmjpafakencppfpefmnk.chromiumapp.org')
const SCOPE = encodeURIComponent('openid');
const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
const PROMPT = encodeURIComponent('consent');

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

const createUser = (wap) =>{
    fetch("http://localhost:5000/api/users",{
        method: "POST",
        mode:"no-cors",
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `google_id=${wap}&notes=${[]}`
    });
}

chrome.tabs.onUpdated.addListener(function(tab){
	chrome.tabs.executeScript(tab.ib, {
		file: 'click-script.js'
	},() => chrome.runtime.lastError);
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

                    if ((user_info.iss === 'https://accounts.google.com' || user_info.iss === 'accounts.google.com')
                        && user_info.aud === CLIENT_ID) {  
                            console.log(user_info.sub);
                              
                            chrome.identity.getProfileUserInfo(function(userInfo) {
                                createUser(user_info.sub);
                                console.log(userInfo.id);
                               console.log(userInfo.email);
                               console.log("afsaf");
                               });
                        user_signed_in = true;
                        sendResponse("success");
                        chrome.browserAction.setPopup({ popup: './frontend/signed-in.html' });
                        chrome.tabs.reload();
                    
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

