
chrome.storage.local.get("id", function(data) {
    fetch(`http://localhost:5000/api/users/${data.id}`,{
        method: "GET"
    }).then(response => response.json())
    .then(json => {
        var array = json[0].notes;
        for(var i = array.length - 1; i > 0; i--){
            var textnode2 = document.createTextNode(array[i]); 
            i--;
            var img = document.createElement("img");
            img.setAttribute("src", `https://i.ytimg.com/vi/${array[i]}/hqdefault.jpg`);
            
            i--;
            var textnode = document.createTextNode(array[i]);
            i--;
            var paragraph = document.createElement("p");
            var body = document.createElement("p");                 
            var div = document.createElement("div");
            var bodydiv = document.createElement("div");
            var line = document.createElement("hr");  
            div.classList.add("note-container");  
            paragraph.classList.add("p-note-list");
            body.classList.add("note-list-body");
            bodydiv.classList.add("body-container");
            paragraph.appendChild(textnode);  
            body.appendChild(textnode2);        
            div.appendChild(paragraph);
            bodydiv.appendChild(img); 
            bodydiv.appendChild(body);
            div.appendChild(bodydiv);  
            document.querySelector("body").appendChild(div); 
            document.querySelector("body").appendChild(line);    
        }
        var text = document.createTextNode("Sign Out");
        var button = document.createElement("button");
        button.classList.add("sign-out");
        button.appendChild(text);
        document.querySelector("body").appendChild(button);
    });
});