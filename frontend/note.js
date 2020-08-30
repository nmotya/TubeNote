chrome.storage.local.get("note", function(data) {
    if(typeof data.note == "undefined") {
        document.querySelector("#h2-signed-in").innerHTML = "Whoops, we couldn't get your note";
    } else {
        document.querySelector("#h2-signed-in").innerHTML = data.note;
    }
});