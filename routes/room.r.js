const app = require('express')
const router = app.Router()
const roomC = require('../controllers/room.c')

router.get('/room/bookroom', roomC.bookRoom);
router.get('/room', roomC.allRoom)
router.post('/room', roomC.Search)
router.post('/room2', roomC.bookCusTou)


module.exports = router;