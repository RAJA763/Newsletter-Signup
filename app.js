const express = require("express");
const bodyPraser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyPraser.urlencoded({extended :true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.firstName;
    const email = req.body.email;
    const lastName = req.body.lastName;
    
    const data = {
        member : [
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

    const url = "https://us11.api.mailchimp.com/3.0/lists/b07436f6d1";

    
    const option = {
        method: "POST",
        auth: "Raja1:d15f9f3d7ce11c40213b3c957d2956a5-us11"
    }

    const request = https.request(url, option, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

//API key
//d15f9f3d7ce11c40213b3c957d2956a5-us11

//list id
//b07436f6d1

