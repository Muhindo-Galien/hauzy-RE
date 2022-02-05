const { createFlag,deleteFlag } = require('../controllers/flags');
const { isAuthenticated } = require('../middlewares/isAuthenticated');


const express = require('express');
const router = express.Router();
router.route('/flag/:propertyId').post(isAuthenticated,createFlag);
router.route('/flag/:propertyId').delete(isAuthenticated,deleteFlag);

module.exports = router
