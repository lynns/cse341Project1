const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const routes = require('./routes');
const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     baseURL: `http://localhost:${port}`,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: `https://${process.env.ISSUER_BASE_URL}`,
//     secret: process.env.SECRET
// };



app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        return;
    }
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});
