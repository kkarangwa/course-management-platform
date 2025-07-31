const express = require('express');
const { body } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const courseAllocationController = require('../controllers/courseAllocationController');

const router = express.Router();

// Validation middleware
const createAllocationValidation = [
  body('moduleId').isInt().withMessage('Module ID must be an integer'),
  body('facilitatorId').isInt().withMessage('Facilitator ID must be an integer'),
  body('cohortId').isInt().withMessage('Cohort ID must be an integer'),
  body('trimester').isIn(['1', '2', '3']).withMessage('Invalid trimester'),
  body('intake').isIn(['HT1', 'HT2', 'FT']).withMessage('Invalid intake'),
  body('mode').isIn(['online', 'in-person', 'hybrid']).withMessage('Invalid mode')
];

// Routes
router.post('/', 
  authenticate, 
  authorize('manager'), 
  createAllocationValidation, 
  courseAllocationController.create
);

router.get('/', 
  authenticate, 
  courseAllocationController.getAll
);

router.get('/facilitator/:facilitatorId?', 
  authenticate, 
  courseAllocationController.getFacilitatorCourses
);

router.put('/:id', 
  authenticate, 
  authorize('manager'), 
  courseAllocationController.update
);

router.delete('/:id', 
  authenticate, 
  authorize('manager'), 
  courseAllocationController.delete
);

module.exports = router;