var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);



//function inject () {

	// just place a div at top right
	//var div = document.createElement('div');
	//div.style.position = 'fixed';
	//div.style.top = 0;
	//div.style.right = 0;`
	//div.textContent = 'Injected!';
	//document.body.appendChild(div);

	//alert('inserted self... giggity');

//};


(function(){
    var likeButton = document.querySelector('[aria-label~="like"]');
    document.addEventListener("click", function(event){
        $(document).ready(function(){
            $('#label.checkbox-height').on("click", function() {
                chrome.browserAction.setPopup({ popup: './frontend/input.html' });
            });
        });
    });
        $(document).ready(function(){
            $("[aria-label~='like']").on("click", function() {
                chrome.browserAction.setPopup({ popup: './frontend/input.html' });
            });

        });
    	
})();





