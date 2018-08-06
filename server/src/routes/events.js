const express = require('express');
const castArray = require('lodash/castArray');
const { Event } = require('../models');

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
});

module.exports = router;
