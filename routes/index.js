const router = require('express').Router();
const nameController = require('../controllers/names');
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: 'http://localhost:3000',
    issuerBaseURL: `https://${process.env.ISSUER_BASE_URL}`
});

router.get('/', (req, res) => {
    res.send(nameController.getBob());
});
router.get('/sue', (req, res) => {
    res.send(nameController.getSue());
});

router.use('/contacts', checkJwt, require('./contacts'));

// // Global Error Handling
// router.use((err, req, res) => {
//     console.log('Error', err);
//     res.status(500).json({ error: err.message || 'Error' });
// });

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ msg: 'Invalid token' });
    }

    next(err, req, res);
});

module.exports = router;
