var http = require("http");
var https = require("https");

// print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

//print out error messages
function printError(error) {
	console.error(error.message);
}

function get(username){
  var reqeust = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
  var body = '';

    response.on('data', function(chunk){
      body += chunk;
    });

    response.on('end', function(){
      if (response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length , profile.points.JavaScript);
        } catch(error) {
          // parse error
          printError(error);
        }
      } else {
        // status code error
        printError({message: "There was an error getting profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
      
    })
  });

  // Connection Error
  reqeust.on('error', printError);
}


module.exports.get = get;
