const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModel');

const createCollege = async function(req, res) {
    try {
        const data = req.body;
        const createdData = await CollegeModel.create(data);
        const { name, fullName, logoLink } = createdData;
        let collegeData = { name, fullName, logoLink }
        return res.status(201).send({ status: true, data: collegeData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getInternDetails = async(req, res) => {
    try {
        const { name, _id } = req.query;
        if (!name && !_id) {
            return res.status(400).send({ status: false, message: "please provide college name or college id" });
        } else if (name) {

            const college = await CollegeModel.findOne({ name: name });
            if (!college) {
                return res.status(404).send({ status: false, message: "no such college present" });
            }
            const interns = await InternModel.find({ collegeId: college._id, isDeleted: false }).select({ collegeId: 0, isDeleted: 0, __v: 0 });

            const responseData = {
                name: college.name,
                fullName: college.fullName,
                logoLink: college.logoLink,
                interns: interns
            };
            return res.status(200).send({ status: true, data: responseData });
        } else {

            const college = await CollegeModel.findById(_id);
            if (!college) {
                return res.status(404).send({ status: false, message: "no such college present" });
            }
            const interns = await InternModel.find({ collegeId: _id });

            const responseData = {
                name: college.name,
                fullName: college.fullName,
                logoLink: college.logoLink,
                interns: interns
            };
            return res.status(200).send({ status: true, data: responseData });

        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
module.exports = { createCollege, getInternDetails };