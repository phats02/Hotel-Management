const app = require('express')
const router = app.Router()
const touristC = require('../controllers/tourist.c')
router.get('/tourist', touristC.allTourist);
module.exports = router;