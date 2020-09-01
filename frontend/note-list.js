
chrome.storage.local.get("id", function(data) {
    fetch(`http://localhost:5000/api/users/${data.id}`,{
        method: "GET"
    }).then(response => response.json())
    .then(json => {
        var array = json[0].notes;
        for(var i = 1; i < array.length; i++){
            i++;
            var textnode = document.createTextNode(array[i]);
            i++;
            var textnode2 = document.createTextNode(array[i]);  
            var paragraph = document.createElement("p");
            var paragraph2 = document.createElement("p");                 
            var div = document.createElement("div");  
            var line = document.createElement("hr");  
            var img = document.createElement("img");
            img.setAttribute("src", `https://i.ytimg.com/vi/${array[i]}/maxresdefault.jpg`);
            div.classList.add("note-container");  
            paragraph.appendChild(textnode);  
            paragraph2.appendChild(textnode2);        
            div.appendChild(paragraph);
            div.appendChild(paragraph2); 
            div.appendChild(img);           
            document.querySelector("body").appendChild(div); 
            document.querySelector("body").appendChild(line);    
        }
        var credits = document.createTextNode("Made by Nassim");
        var creditspara = document.createElement("p");
        creditspara.appendChild(credits);
        document.querySelector("body").appendChild(creditspara);  
    });
});