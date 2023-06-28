const app = require('express')
const router = app.Router()
const ticketC = require('../controllers/ticket.c')
router.get('/ticket', ticketC.allTicket);
router.post('/ticket/service', ticketC.addServiceToTicket)
router.post('/ticket/minibar', ticketC.addMinibarToTicket)

module.exports = router;