//Global Variables
var APIKey;

function verifySearch(){
    var searchTerm = $("#searchTerm").val();
    if(searchTerm){
        $("#searchAlert").text("");
        defineSearchElements(searchTerm);
    } else {
        $("#searchAlert").text("Please provide a search term for this application!");
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
}

function clearSearch(){
    $("#searchAlert").text("");
    $("#searchTerm").val("");
    $("#startYear").val("");
    $("#endYear").val("");
    $("#inputGroupSelect").val("1");
}