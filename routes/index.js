const router = require('express').Router();
const nameController = require('../controllers/names');

router.get('/', (req, res) => {
    res.send(nameController.getBob());
});
router.get('/sue', (req, res) => {
    res.send(nameController.getSue());
});

router.use('/contacts', require('./contacts'));


// Global Error Handling
router.use((err, req, res, next) => {
    console.log("Error", err);
    res.status(500).json({ "error": err.message || "Error" });
});

module.exports = router;