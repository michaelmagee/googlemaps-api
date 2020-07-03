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


    // use a promise to  get the data for the user name provided.

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)

    ).then(   // This processes most errors but is succcess calls userInformationHTML to put data in DOM
        function (response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));  // json to html
        }, function (errorResponse) {                // this is the error handler 
            if (errorResponse.status === 404) {     // not found
                $("#gh-user-data").html(
                    `<h2>No info found got user: ${username}</h2}`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2}`);
            }
        })
}