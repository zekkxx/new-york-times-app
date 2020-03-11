var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
+"politics"+"&api-key=" + APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    response.json();
    console.log("Hey, I WORKED! OMG I WORKED!!!");
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