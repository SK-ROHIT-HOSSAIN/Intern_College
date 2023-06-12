const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');
const internController = require('../controllers/internController');
const mid = require('../middlewares/middleware');



router.post('/functionup/colleges', mid.validReqBodyCollege, collegeController.createCollege);
router.post('/functionup/interns', mid.validReqBodyIntern, internController.createIntern);
router.get('/functionup/collegeDetails', collegeController.getInternDetails);



module.exports = router;