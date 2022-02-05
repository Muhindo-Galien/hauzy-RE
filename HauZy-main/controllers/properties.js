const Property = require('../models/Property');
const {
  CREATED,OK, UNAUTHORIZED
} = require('../constants/statusCodes');
const logger = require('../util/logger');
// create property
exports.createProperty = async(req,res) => {
  const {
    status,
    price,
    state,
    city,
    address,
    type,
    image_url,
  } = req.body
  const newProperty = new Property({
    owner: req.user.id,
    status,
    price,
    state,
    city,
    address,
    type,
    image_url, });
  try{
    const saveProperty = await newProperty.save();
    res.status(CREATED).json({
      status: 'success',
      data: saveProperty });
  }catch(error){
    logger.error(error.message);
  }
}
//updated property
exports.updateProperty = async(req, res) => {
  try{
    if(req.params.propertyid === req.body.propertyId){
      const updatedProperty = await Property.findOneAndUpdate(
        req.params.propertyid,
        { $set: req.body },
        { new: true });
      res.status(OK).json({
        status: 'success',
        data: updatedProperty
      });
    }
    else{
      res.status(UNAUTHORIZED).json({
        status: 'error',
        message: 'You can only update your property'
      })
    }
  }catch(err){
    logger.error(err.message);
  }
}
// deleted property
exports.deleteProperty = async(req, res) => {
  try{
    await Property.findByIdAndDelete(req.params.id);
    res.status(OK).json({
      status: 'success',
      message: 'Property successfully deleted!'
    });
  }catch(err){
    logger.error(err.message);
  }
}
// get all properties & a signle property by type
exports.getAllProperties = async(req, res) => {
  try{
    const property =  await Property.find();
    res.status(OK).json({
      status: 'success',
      data: property
    });
  }catch(err){
    logger.error(err.message);
  }
}
// get property byt type
exports.getPropertyByType = async(req, res) => {
  const type = req.query.type;
  try{
    const property =  await Property.find({ type });
    res.status(OK).json({
      status: 'success',
      data: property
    });
  }catch(err){
    logger.error(err.message);
  }
}
// get Property By Id
exports.getPropertyById = async(req, res) => {
  try{
    const signleProperty = await Property.findById(req.params.propertyId);
    res.status(OK).json({
      status: 'success',
      data: signleProperty
    });
  }catch(err){
    logger.error(err.message);
  }
}