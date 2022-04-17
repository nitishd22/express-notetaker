const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, function(){
    console.log(`Now listening on PORT: ${PORT}`);
});