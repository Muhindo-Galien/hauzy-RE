const { createProperty,updateProperty,deleteProperty,getAllProperties,getPropertyByType,getPropertyById
} = require('../controllers/properties');
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.route('/').post(isAuthenticated,createProperty);
router.route('/:propertyid/sold').patch(isAuthenticated,updateProperty);
router.route('/:id').delete(isAuthenticated,deleteProperty);
router.route('/').get(getAllProperties);
router.route('/').get(getPropertyByType);
router.route('/:propertyId').get(getPropertyById);

module.exports = router
