const express = require('express');
const router = express.Router();
const rsvpCtrl = require('../../controllers/rsvps')

router.post('/posts/:id/rsvps', rsvpCtrl.create)
router.delete('/rsvps/:id', rsvpCtrl.deleteRsvp)

module.exports = router;