// const isEmpty = require('lodash/isEmpty');
// const { Author } = require('../../../../models');

const postFaultCode = async (root, args) => {
  const { faultCode } = args;
  console.log('faultCode', faultCode && faultCode.key);

  // try {
  // return await Author.findOne(query);
  return { status: 200 };
  /* } catch (exc) {
    console.log(exc);
    return { status: 500 };
  } */
};

module.exports = postFaultCode;
