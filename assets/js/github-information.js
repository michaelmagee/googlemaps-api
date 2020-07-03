// Process userdata json -> html in DOM 
function userInformationHTML(user) {

    return `
            <h2>${user.login} 
                <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login})</a>
                </span>
                </h2>
                <div class="gh-content">
                    <div class="gh-avatar">
                        <a href="${user.html_url}" target="_blank"> 
                        <img src="${user.avatar_url}"  width="80" height="80" alt="${user.login}" />
                        </a>
                    </div>
                    <p>Followed: ${user.followers} - Following ${user.following}  <br> Repos: ${user.public_repos} </p>
                </div>`;
}



// Process Repository json -> html in DOM 
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class = "clearfix repo-list">No Repos! </div>`;
    }

    var listItemsHTML = repos.map(function (repo) {
        return `<li> 
        <a href="${repo.html_url}" target = "_blank">${repo.name}</a>
        </li>
        `
    });  // end of the iteration

        // NOTE: Join adds this text to the end of each array element
    return `<div class="clearfix repo-list">
            <p> 
                <strong>Repo List:</strong>
            </p>
            <ul>
                ${listItemsHTML.join("\n")}  
            </ul>
        </div>`;

}
function fetchGitHubInformation(event) {
    // Clear out an old data
    $("#gh-user-data").html("");
    $("#gh-repo-data").html(""); 

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


    // use a promise to  get the data for the user name provided.
    // Look at the rirst response, second response.
    // When multiple calls are made, the when() mthod packs a response up into arrays
    // Each one is the forst element of the arra, so get the first one

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)

    ).then(   // This processes most errors but is succcess calls userInformationHTML to put data in DOM
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));  // json to html
            $("#gh-repo-data").html(repoInformationHTML(repoData));  // json to html
        }, function (errorResponse) {                // this is the error handler 
            if (errorResponse.status === 404) {     // not found
                $("#gh-user-data").html(
                    `<h2>No info found for user: ${username}</h2}`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2}`);
            }
        })
}


// As soon as the doc is loaded, fire it with the default user (michaelmagee) 
$(document).ready(fetchGitHubInformation);