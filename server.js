const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const routes = require('./routes');
const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

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
