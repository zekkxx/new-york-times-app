//Global Variables
var APIKey = "";

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
        $("#searchAlert").text("Please provide a search term for this application!");
    } else {
        $("#searchAlert").text("");
        defineSearchElements(searchTerm);
    }
}

function defineSearchElements(query){
    if($("#startYear").val() != ""){
        query+="&begin_date="+$("#startYear").val()+"0101";
    }
    if($("#endYear").val() != ""){
        query+="&end_date="+$("#endYear").val()+"1231";
    }
    runSearch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
        +query+"&api-key=" + APIKey);
}

function runSearch(queryURL){
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(res) {
        //console.log(res);
        renderResults(res.response.docs);
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

        var headline = $("<h3>").text(dataArr[i].headline.main);
        articleDiv.append(headline);

        var byString = $("<h5>").text(dataArr[i].byline.original);//"by name"
        articleDiv.append(byString);

        var snippet = $("<p>").text(dataArr[i].snippet);
        articleDiv.append(snippet);
        
        var date = $("<p>").text(dataArr[i].pub_date); //"yyyy-mm-ddThh:mm:ss+xxxx"
        articleDiv.append(date);

        containerDiv.append(articleDiv);
    }
    $("#resultsContainer").html(containerDiv);
}

function clearSearch(){
    $("#searchAlert").text("");
    $("#searchTerm").val("");
    $("#startYear").val("");
    $("#endYear").val("");
    $("#inputGroupSelect").val("1");
    $("#resultsContainer").html("");
}

$(document).ready(function(){
    loadAPIKeyFromMemory();
});