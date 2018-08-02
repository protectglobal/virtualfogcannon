const request = require('request-promise-native');
// const isEmpty = require('lodash/isEmpty');
// const { Author } = require('../../../../models');
const { PWA_URL } = process.env;

if (!PWA_URL || PWA_URL.trim().length === 0) {
  throw new Error(404, 'missing PWA_URL');
}

// TODO pass:
// cannonId,
// eventType in {'faultCode', 'input'}
// eventValue = 'r' if faultCode or [input1, input3, ...]
const postEvent = async (root, args) => {
  // const { cannonId, eventType, eventValue } = args;
  const { event } = args;
  console.log('event', event);
  /* console.log(
    '\n\npostEvent',
    'cannonId', cannonId,
    'eventType', eventType,
    'eventValue', eventValue,
  ); */

  const options = {
    method: 'POST',
    uri: PWA_URL,
    body: event,
    /* body: {
      cannonId,
      eventType,
      eventValue,
    }, */
    json: true, // Automatically stringifies the body to JSON
  };

  try {
    const res = await request(options); // parsedBody
    console.log('res', res);
    return { status: 200 };
  } catch (exc) {
    console.log(exc);
    return { status: 500 };
  }
};

module.exports = postEvent;
