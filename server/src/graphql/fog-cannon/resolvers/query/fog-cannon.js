const { FogCannon } = require('../../../../models');

const fogCannon = async (root, args) => {
  const { cannonId } = args;

  try {
    return await FogCannon.findOne({ cannonId }).exec();
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = fogCannon;
