function runSearch(){
    var searchTerm = document.getElementById("searchTerm").value;
    if(searchTerm){
        document.getElementById("searchAlert").innerHTML = "";
        defineSearchElements(searchTerm);
    } else {
        document.getElementById("searchAlert").innerHTML = "Please provide a search term for this application!";
    }
    
}

function defineSearchElements(searchTerm){
    console.log(searchTerm);
}

function clearSearch(){
    document.getElementById("searchAlert").innerHTML = "";
    document.getElementById("searchTerm").value = "";
    document.getElementById("startYear").value = "";
    document.getElementById("endYear").value = "";
    document.getElementById("inputGroupSelect").value = "1";
}