const internModel = require('../models/internModel');

const createIntern = async function(req, res) {
    try {
        const { name, email, mobile, collegeId } = req.body;
        const details = { name, email, mobile, collegeId };
        const createdData = await internModel.create(details)
        return res.status(201).send({ status: true, data: details });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.createIntern = createIntern;