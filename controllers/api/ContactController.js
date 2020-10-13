const Contact = require("../../models/index").Contact
const {
    map
} = require('p-iteration');
const sequelize = require('../../config/sequelize')
const Sequelize = require('sequelize')
const ContactRepository = require('../../repositories/ContactRepository')

class ContactController {

    getContacts(req, res) {
        Contact.findAll({
            order: [
                ['ordering', 'ASC']
            ]
        }).then(cs => {
            return res.json(cs)
        })
    }

    getContact(req, res) {
        Contact.findOne({
            where: {
                id: req.params.id
            }
        }).then(c => {
            return res.json(c)
        })
    }

    updateContact(req, res) {
        Contact.update(req.body, { where: { id: req.body.id } }).then(r => {
            return res.json(r)
        })
    }

    updateContactField(req, res) {
        ContactRepository.updateField(req.body.value, req.body.field, req.body.id).then(r => {
            return res.json(r)
        })
    }

    updateOrder(req, res) {
        ContactRepository.updateContactOrder(req.body.contacts).then(r => {
            return res.json(r)
        })
    }

    createContact(req, res) {
        Contact.create(req.body).then(r => {
            return res.json(r)
        })
    }

    removeContact(req, res) {
        Contact.destroy({ where: { id: req.params.id } }).then(r => {
            return res.json(r)
        })
    }

}

module.exports = new ContactController()