const router = require('express').Router();
const nameController = require('../controllers/names');

router.get('/', (req, res) => {
    res.send(nameController.getBob());
});
router.get('/sue', (req, res) => {
    res.send(nameController.getSue());
});

module.exports = router;