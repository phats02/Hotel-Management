const app = require('express')
const router = app.Router()
const tourC = require('../controllers/tour.c')
router.get('/tour', tourC.allTour);
router.get('/tour/addtour', tourC.addTour);
router.post('/tour/addtour', tourC.addTour);






module.exports = router;