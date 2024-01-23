const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        return;
    }
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});
