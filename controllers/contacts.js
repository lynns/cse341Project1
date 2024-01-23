const db = require('../db/connect');
const mongodb = require('mongodb');

function getContactsDB() {
    return db.getDb().db('cse').collection('contacts');
}

const getContacts = async () => {
    const results = await getContactsDB().find({}).toArray();
    return results;
};

const getContact = async (id) => {
    const results = await getContactsDB()
        .find({ _id: new mongodb.ObjectId(id) })
        .toArray();
    return results[0];
};

const makeContact = async (contact) => {
    const results = await getContactsDB().insertOne(contact);
    if (results.acknowledged) {
        return contact;
    } else {
        throw results.error;
    }
};

const makeContacts = async (contacts) => {
    const results = await getContactsDB().insertMany(contacts);
    if (results.acknowledged) {
        return contacts;
    } else {
        throw results.error;
    }
};

const updateContact = async (id, contact) => {
    const results = await getContactsDB().updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: contact }
    );
    return results;
};

const deleteContact = async (id) => {
    const results = await getContactsDB().deleteOne({ _id: new mongodb.ObjectId(id) });
    return results;
};

const deleteAllContacts = async () => {
    const results = await getContactsDB().deleteMany({});
    return results;
};

module.exports = {
    getContacts,
    getContact,
    makeContact,
    makeContacts,
    updateContact,
    deleteContact,
    deleteAllContacts
};
