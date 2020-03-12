//Global Variables
var APIKey = "";

function addNewKey(){
    APIKey = $("#newAPIKey").val();
    $("#keyModal").modal('toggle');
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
    }).then(function(response) {
        console.log(response);
        for(let i=0; i<response.docs.length; i++){
            // $("#sectionname").text(section.name);
            console.log(response.docs[i].section_name);
            // $("#title").text(title);
            console.log(response.docs[i].headline.main);
            // $("#author").text(author);
            console.log(response.docs[i].byline.original); //"by name"
            // $("#synopsis").text(synopsis);
            console.log(response.docs[i].snippet);
            // $("#date").text(date);
            console.log(response.docs[i].pub_date); //"yyyy-mm-ddThh:mm:ss+xxxx"
        }
    });
}

function clearSearch(){
    $("#searchAlert").text("");
    $("#searchTerm").val("");
    $("#startYear").val("");
    $("#endYear").val("");
    $("#inputGroupSelect").val("1");
}