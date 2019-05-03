var APIKey = "uTcqzVBtVKkANJqiUqXC2MdKZAcezB1A";
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+query+"&api-key=" + APIKey;
var query = "politics";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#sectionname").text(section.name);
    //response.docs[x].section_name
    $("#title").text(title);
    //response.docs[x].headline.main
    $("#author").text(author);
    //response.docs[x].byline.original"by name"
    $("#synopsis").text(synopsis);
    //response.docs[x].snippet
    $("#date").text(date);
    //response.docs[x].pub_date "yyyy-mm-ddThh:mm:ss+xxxx"
  });