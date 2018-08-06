const { FogCannon, Event } = require('./models');

// Clear DB
const clearAll = async () => {
  await FogCannon.remove({});
  await Event.remove({});
};

// Populate DB.
const fixtures = async () => {
  const cannon = await FogCannon.findOne({}).exec();

  // Insert a cannon in case fogCannons collection is empty
  if (cannon) {
    console.log('\nTest cannon already exists!');
    return;
  }

  // Insert test cannon
  const firstCannon = new FogCannon({ cannonId: '1', state: 'off' });

  try {
    await firstCannon.save();
    console.log('\nFirst cannon inserted!');
  } catch (exc) {
    console.log(exc);
  }
};

const initDB = async () => {
  // Clear collections
  // await clearAll();
  // Set some initial data
  await fixtures();
};

module.exports = initDB;
