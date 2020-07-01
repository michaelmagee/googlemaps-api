function fetchGitHubInformation(event) {
  
    var username = $("#gh-username").val();  // grab ID from box. 
    
    // If usernanme is empty, request some input
    if (!username) { 
        $("#gh-user-data").html(`<h2>Please enter a GitHub username. </h2>`);
        return;
    }

    // note back Quote usage here.  Not sure why
    // BUT, this adds a gif that displays loading progress 
    $("#gh-user-data").html(
        `<div id="loader">
        <img src="assets/css/loader.gif" alt="loading..."  /> 
        </div>`);


}