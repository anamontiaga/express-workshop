var express = require("express");

var formidable = require("express-formidable");

var fs = require("fs");

// INICIALIZAR SIEMPRE EXPRESS ANTES
var app = express();

app.use(express.static("public"));

app.use(formidable());

app.get("/get-posts", function(req, res) {
  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    var posts = JSON.parse(file);
    res.send(JSON.stringify(posts));
  });
});

app.post("/create-post", function(req, res) {
  // INCLUIR CONDICION: SI ESTO YA ESTÁ EN ESTE OBJETO, NO ME LO PILLES
  var blogpost = req.fields.blogpost;
  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    var fileParse = JSON.parse(file);
    fileParse[Date.now()] = blogpost;
    var writepost = JSON.stringify(fileParse);
    console.log(writepost);
    fs.writeFile(__dirname + "/data/posts.json", writepost, function(error) {
      if (error) {
        console.warn("Nooo");
      }
    });
  });
  console.log(req.fields);
});

// app.get("/", function(req, res) {
//   res.send("<h1>Hola CHICAS!!</h1>");
// });

// app.get("/chocolate", function(req, res) {
//   res.send("<h1>Chocolateeee, ñammm</h1>");
// });

app.listen(3000, function() {
  console.log("Servidor a tope!");
});
