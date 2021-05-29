const { strict } = require("assert");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    const city = req.body.city;
    const unit = "metric";
    const apiKey = "c407b8daa25d4e58ac21d66920ead281";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units="+unit+"&appid="+apiKey;

    https.get(url,function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            var imgLink = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        


            res.write('<h1>The temperature of '+ city +' is '+temperature+" degree celsuis</h1>");
            res.write("Weather is currently "+description);
            res.write('<br>')
            res.write("<img src = " + imgLink+ ">");
            res.send();
        });
    });

});

app.listen(3000,function(){
    console.log("Server started at port number 3000");
});
