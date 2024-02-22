const router = require('express').Router();
const contactController = require('../controllers/contacts');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), async (req, res, next) => {
    try {
        const contacts = await contactController.getContacts();
        res.json(contacts);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const contact = await contactController.getContact(req.params.id);
        res.json(contact);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (Array.isArray(req.body)) {
            const contacts = await contactController.makeContacts(req.body);
            res.json(contacts);
        } else {
            const contact = await contactController.makeContact(req.body);
            res.json(contact);
        }
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const contact = await contactController.updateContact(req.params.id, req.body);
        res.json(contact);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const contact = await contactController.deleteContact(req.params.id);
        res.json(contact);
    } catch (err) {
        next(err);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const contact = await contactController.deleteAllContacts();
        res.json(contact);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
