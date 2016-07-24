//Ahmad Shahwaiz
//Script to inject endorsement on LinkedIn profile page.
//https://angel.co/ahmad-shahwaiz
//Created 23/7/2016

/*
Sequence of method calling
 1 - window.onLoad
 2 - readJsonFile()
 3 - redirectLogic()
 4 - endorseBot() or redirectNextProfile()
 5 - redirectNextProfile()
*/

var count = 1;
var linkedinProfileUrls = [];

//After the DOM is loaded.
window.onload = function () {  
    
    setInterval(function(){
        if(count == 2)
        {
            console.log("--Initiating Bot v5.0--");
            readJsonFile(); 
        }
        count++;
   }, 15000);  //Wait for all the libraries to load and check again after 15 seconds. (To be sure that you don't miss endorsing)
} 

//Redirect Logic on first load.
function redirectLogic(){
        var indexNumber = getParameterByName("index"); 
        if (indexNumber == null){
            //If URL has no index variable, then it will set the index to 0 and redirect to the profile link stored in the 0 index of array 'linkedinProfileUrls'
            indexNumber = 0;  
            redirectNextProfile(linkedinProfileUrls[indexNumber], indexNumber); 

        }
        else{
            //If URL has index variable present then it means the profile page is already loaded and it will endrose all the skills and redirect to the next profile present in the next array index.
            endorseBot();  
            indexNumber++; 
            redirectNextProfile(linkedinProfileUrls[indexNumber], indexNumber); 
        }
            
}

//Endorses all the skills, works only if the profile page is open.
function endorseBot(){
        var listItems = $(".skills-section [class*='endorse-item has-endorsements endorsable'] .endorse-button, .skills-section [class*='endorse-item no-endorsements endorsable'] .endorse-button,.skills-section [class*='endorse-item no-endorsements extra-skill endorsable'] .endorse-button,.skills-section [class*='endorse-item has-endorsements extra-skill endorsable'] .endorse-button");
       // console.log("Total Skills: "+listItems.length);
        listItems.each(function(idx, li) {
            var product = $(li);  
            $(li)[0].click();                
        });
        console.log("--Endrosed All Skills!--");
}

//Redirecting to another Linkedin Profile
function redirectNextProfile(url,  indexNumber){ 
    window.location= url+"&index="+indexNumber;
}

//Get Parameter by Name from Url
function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//Reads Json Response from Url
function readJsonFile(){
   
        //Manually change the values of start. Set start to 240, 480, 720 and so on each day.
        //Count is constant. As you wanted 240 connections per day.
        //You must be login on linkedin to access the results in the below link
    
        var url = "https://www.linkedin.com/connected/api/v2/contacts?start=00&count=240&fields=profileUrl";
        console.log("--Fetching JSON from Linkedin Profile--");
    
        //Fetching the Profile Urls from json response and storing it in array.
        var requestingJson = $.getJSON(url, function(json) { 
            for(var i = 0; i < json.values.length; i++) { 
                linkedinProfileUrls[i] = json.values[i].profileUrl; 
            }
        });
        
        // Callback function on request completion
        requestingJson.complete(function() { 
            console.log("--Information Stored in Array--");
            redirectLogic(); 
        }); 
}
