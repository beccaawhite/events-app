const express = require('express');
const router = express.Router();
const rsvpCtrl = require('../../controllers/rsvps')

router.post('/posts/:id/rsvp', rsvpCtrl.create)
router.delete('/rsvp/:id', rsvpCtrl.deleteRsvp)

module.exports = router;