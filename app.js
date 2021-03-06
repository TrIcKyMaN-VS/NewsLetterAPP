const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const request = require('request')
// const { options } = require('nodemon/lib/config')
var app = express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html")
})

app.post("/", function(req,res){
    var fname = req.body.Fname
    var lname = req.body.Lname
    var email = req.body.email
    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)
    const url = 'https://us14.api.mailchimp.com/3.0/lists/ffe093a871'
    const options ={
        method:'POST',
        auth: "vasanth:c8ca2a984dd3e9daf9bf195fb19b6b1e-us14"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname +"/succes.html")
        }else{
            res.sendFile(__dirname +"/failure.html")
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        
    })
    request.write(jsonData)
    request.end()
});


//API key  774738fd6d681ecfa188807676ff71f3-us14
//unique id  4cab1ec8f6

app.post("/failure" ,function(req,res){
    res.redirect("/")
})



app.listen(process.env.PORT || 3000,function(){
    console.log("running in port 3000");
})