// routes/courseOfferingRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseOfferingController');

router.get('/', controller.getAllCourseOfferings);
router.post('/', controller.createCourseOffering);

module.exports = router;