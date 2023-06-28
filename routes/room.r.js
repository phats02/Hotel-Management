const app = require('express')
const router = app.Router()
const roomC = require('../controllers/room.c')
router.get('/room', roomC.allRoom);
module.exports = router;