//Global Variables
var APIKey = "uTcqzVBtVKkANJqiUqXC2MdKZAcezB1A";

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
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // $("#sectionname").text(section.name);
        // //response.docs[x].section_name
        // $("#title").text(title);
        // //response.docs[x].headline.main
        // $("#author").text(author);
        // //response.docs[x].byline.original"by name"
        // $("#synopsis").text(synopsis);
        // //response.docs[x].snippet
        // $("#date").text(date);
        // //response.docs[x].pub_date "yyyy-mm-ddThh:mm:ss+xxxx"
      });
}

function clearSearch(){
    $("#searchAlert").text("");
    $("#searchTerm").val("");
    $("#startYear").val("");
    $("#endYear").val("");
    $("#inputGroupSelect").val("1");
}