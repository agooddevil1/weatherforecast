const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
    console.log(res.body);
    const place=res.body.cityName;

    const appid="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid=41d4c856aa090d319da34ac0fcc1520f&units=metric";
    https.get(appid,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherdata=JSON.parse(data);
            console.log(weatherdata);
            const tempra= weatherdata.main.temp;
            const descrip =weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const weatherurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>Description "+descrip+"</p>");
            res.write(`<h1>Temperature of {place} is {tempra} °c</h1>`);
            res.write("<img src="+weatherurl+">");
            res.send();
        });
    });
});



app.listen(3000, function(){
      console.log("server is running on port 3000.......");
});