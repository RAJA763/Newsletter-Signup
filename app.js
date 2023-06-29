//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/b3ef8cadf0";

    const options = {
        method: "POST",
        auth: "Raja1:3e799803b501631254c2a02af8d7c514-us10"
    }

    const request = https.request(url, options, function(response) {
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);

    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is started in port 3000.");
});

// //old
// //API key
// //d15f9f3d7ce11c40213b3c957d2956a5-us11
// //a6d5dedc01e9cde4d3d9cc96eee93706-us11
//195a09440b3cca7804e8927100cf3ef7-us11

// //list id
// //b07436f6d1

// //new
// //API key
// //3e799803b501631254c2a02af8d7c514-us10

// //listid
// //b3ef8cadf0

