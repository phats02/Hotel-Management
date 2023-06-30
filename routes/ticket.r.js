const app = require('express')
const router = app.Router()
const ticketC = require('../controllers/ticket.c')
router.get('/ticket', ticketC.allTicket);
router.post('/ticket/service', ticketC.addServiceToTicket)
router.post('/ticket/minibar', ticketC.addMinibarToTicket)
router.get('/getAllTicket',ticketC.getAllTicket);
router.get('/getOneTicket',ticketC.getOneTicket);
router.get('/getService',ticketC.getServiceInTicket);
router.get('/getTour',ticketC.getTourInService);
router.get('/getRoomRate',ticketC.getRoomRate);
router.get('/getAllService',ticketC.getAllService);
router.get('/getAllMiniBar',ticketC.getAllMiniBar);


module.exports = router;