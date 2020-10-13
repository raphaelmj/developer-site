const Contact = require("../models/index").Contact
const {
    map
} = require('p-iteration');
const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

class ContactRepository {

    async updateField(value, field, id) {
        var c = await Contact.findOne({ where: { id } })
        c[field] = value
        await c.save()
        return c
    }

    async updateContactOrder(contacts) {
        await map(contacts, async (c, i) => {
            await Contact.update({
                ordering: i + 1
            },
                { where: { id: c.id } })
        })
        return await Contact.findAll({
            order: [
                ['ordering', 'ASC']
            ]
        })
    }

    async addContact(contact) {


        var max = await this.findMaxOrdering()
        // console.log(slide)
        contact.ordering = max + 1
        try {
            var c = await Contact.create(contact)
        } catch (error) {
            console.log(error)
        }

        return c

    }

    async findMaxOrdering() {
        var c = await Contact.findOne({
            order: [
                ['ordering', 'DESC']
            ]
        })

        return c.ordering
    }


}

module.exports = new ContactRepository()