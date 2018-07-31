const request = require('request-promise-native');
// const isEmpty = require('lodash/isEmpty');
// const { Author } = require('../../../../models');

const postFaultCode = async (root, args) => {
  const { faultCode } = args;
  console.log('faultCode', faultCode);

  const options = {
    method: 'POST',
    uri: 'http://api.posttestserver.com/post',
    body: {
      some: 'payload',
    },
    json: true, // Automatically stringifies the body to JSON
  };

  try {
    await request(options); // parsedBody
    return { status: 200 };
  } catch (exc) {
    console.log(exc);
    return { status: 500 };
  }
};

module.exports = postFaultCode;
