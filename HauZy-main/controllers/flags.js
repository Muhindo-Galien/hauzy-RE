const Flag = require('../models/Flag');
const {
  CREATED,OK
} = require('../constants/statusCodes');
const logger = require('../util/logger');

exports.createFlag = async(req,res) => {
  const {
    reason,
    description } = req.body;

  const flag = new Flag({
    property_id: req.params.propertyId,
    reason,
    description })
  try{
    const saveFlag = await flag.save();
    res.status(CREATED).json({
      status: 'success',
      data: saveFlag });
  }catch(error){
    logger.error(error.message);
  }
}
exports.deleteFlag = async(req, res) => {
  try{
    await Flag.findByIdAndDelete(req.params.flagId);
    res.status(OK).json({
      status: 'success',
      message: 'Flag successfully deleted!'
    });
  }catch(err){
    logger.error(err.message);
  }
}


