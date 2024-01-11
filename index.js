const express = require('express');
const app = express();

const routes = require("./routes");

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

