const app = require('express')
const router = app.Router()
const touristC = require('../controllers/tourist.c')
router.get('/tourist', touristC.allTourist);
router.get('/tourist/addtourist', touristC.addTourist);
router.post('/tourist/addtourist', touristC.addTouristDB);
router.get('/tourist/DetailTourist', touristC.TouristCustomer);

module.exports = router;