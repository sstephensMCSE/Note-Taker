// App Dependencies.
const express = require('express');
const fs = require('fs');

// Express App init.
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Accesses public folder for CSS and JS render files.
app.use(express.static(__dirname + '/public'));
app.use(express.static('./'));

// Links to files I will use for calling HTML and API routes.
//require("./routes/apiRoutes")(app);
//require("./reoutes/htmlRoutes")(app);

// Starts the server to begin listening.
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});