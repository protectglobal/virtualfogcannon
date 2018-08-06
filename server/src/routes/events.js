const express = require('express');
const castArray = require('lodash/castArray');
const { FogCannon, Event } = require('../models');

const router = express.Router();

// Handle events comming from Virtual Fog Cannon app
router.post('/', async (req, res) => {
  const data = req.body;
  const { cannonId, eventType, eventValue } = data;

  // Store event into events collection
  try {
    const event = new Event({
      cannonId,
      eventType,
      eventValue: eventValue && castArray(eventValue), // make sure eventValue is an array
    });
    console.log('event', event);
    await event.save();
    res.sendStatus(200);
  } catch (exc) {
    console.log(exc);
    res.sendStatus(500);
  }

  // In case event type is 'panicBtn', set fogCannon state to 'on'. Reset state after 5 secs.
  if (eventType === 'panicBtn') {
    const cannon = await FogCannon.findOne({ cannonId });

    if (!cannon) {
      throw new Error(404, 'The requested cannonId does not exist!');
    }

    // In case the cannon is already 'on', do nothing.
    if (cannon.state === 'on') {
      return;
    }

    await FogCannon.update({ cannonId }, { $set: { state: 'on' } });
    console.log('set state to ON');

    const timer = setTimeout(async () => {
      await FogCannon.update({ cannonId }, { $set: { state: 'off' } });
      console.log('set state to OFF');
      clearTimeout(timer);
    }, 5000);
  }
});

module.exports = router;
