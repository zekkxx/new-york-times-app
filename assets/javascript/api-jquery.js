//Global Variables
var APIKey;

function addNewKey(){
    localStorage.setItem("nytAPIKey", $("#newAPIKey").val())
    loadAPIKeyFromMemory();
    $("#keyModal").modal('toggle');
}

function loadAPIKeyFromMemory(){
    APIKey = localStorage.getItem("nytAPIKey");
    $("#newAPIKey").val(APIKey);
}

function verifySearch(){
    var searchTerm = $("#searchTerm").val();
    if(!APIKey){
        $("#keyModal").modal('toggle');
    } else if(!searchTerm){
        $("#searchAlert").text("Please provide a search term for this application.");
    } else if (searchTerm.search(/&/) != -1){
        $("#searchAlert").text("Search Term contains one or more of the following restricted characters: &")
    } else {
        $("#searchAlert").text("");
        defineSearchElements(searchTerm);
    }
}

function defineSearchElements(query){
    yearStartVal = $("#startYear").val();
    yearEndVal = $("#endYear").val();
    if(yearStartVal && yearStartVal <= new Date().getFullYear()){
        query+="&begin_date="+yearStartVal+"0101";
    } else if(yearStartVal > new Date().getFullYear()){
        $("#yearStartAlert").text("Please choose a year that has alreay occured.");
    }
    if(yearEndVal && yearEndVal<yearStartVal){
        $("#yearEndAlert").text("Please choose a year that takes place after the starting year.");
    } else if(yearEndVal){
        query+="&end_date="+yearEndVal+"1231";
    }
    runSearch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
        +query+"&api-key=" + APIKey);
}

function runSearch(queryURL){
    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(res) {
        // console.log(res);
        renderResults(res.response.docs);
        $("#resultsContainer")[0].scrollIntoView({
            "behavior": "smooth",
            "block": "start"
        });
    });
}

function renderResults(dataArr){
    var containerDiv = $("<div>");
    containerDiv.attr("class", "container border bg-gray mb-5");
    //Section Heading
    var searchHeading = $("<h2>").attr("class", "mt-2").text("Search Results:");
    containerDiv.append(searchHeading);
    //Section Results
    for(let i=0; i<$("#inputGroupSelect").val() && i<dataArr.length; i++){
        var articleDiv = $("<div>");
        articleDiv.attr("class", "p-3");
        //headline construction
        var headline = $("<h3>");
        var titleLink = $("<a>").attr({
            "href": dataArr[i].web_url,
            "class": "text-info",
            "target": "_blank"
        }).text(dataArr[i].headline.main);
        headline.append(titleLink);
        var byString = $("<h5>").attr({"class": "text-secondary"}).text(dataArr[i].byline.original);//"by name"
        //date construction
        var date = $("<span>").attr({"class": "font-italic"}).text("Published on "
            + new Date(dataArr[i].pub_date).toLocaleDateString('en-US', {  
                day : 'numeric',
                month : 'short',
                year : 'numeric'
            })
        ); //"yyyy-mm-ddThh:mm:ss+xxxx"
        //text snippet construction
        var snippet = $("<p>").text(dataArr[i].snippet);
        //paste components together
        articleDiv.append(headline, byString, date, snippet);
        containerDiv.append(articleDiv);
    }
    $("#resultsContainer").html(containerDiv);
}

function clearSearch(){
    $("#searchTerm").val("");
    $("#startYear").val("");
    $("#endYear").val("");
    $("#inputGroupSelect").val("1");
    $("#searchAlert").text("");
    $("#yearStartAlert").text("");
    $("#yearEndAlert").text("");
    $("#resultsContainer").html("");
}

$(document).ready(function(){
    loadAPIKeyFromMemory();
});