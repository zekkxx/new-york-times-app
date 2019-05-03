# NewYorkTimes
A class mini-project designed to create a readable NewYork times browser using jQuery, ajax, and the NYTimes API

Written by: Kieran Anthony, Mike Snyder, Ivan Wijetunge, Brian Lynn, Jeff Samuels

Variables needed from Front End Group: keywords, numArticles, yearStart, yearEnd
--API team will pull from index.html input ids and values upon click of searchButton

Variables passed to Front End Group: (from response.docs[x])
newsArray [
    {
        "title" : .headline.main
        "author" : .byline.original
        "publishDate" : .pub_date
        "section" : .section_name
        "articleURL" : .web_url
    }
]