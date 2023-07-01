const app = require("express");
const router = app.Router();
const ticketC = require("../controllers/ticket.c");

router.get("/ticket", ticketC.allTicket);
router.post("/ticket/service", ticketC.addServiceToTicket);
router.post("/ticket/minibar", ticketC.addMinibarToTicket);
router.post("/ticket/tour", ticketC.addTourToTicket);
router.post("/ticket/deposit", ticketC.addDepositToTicket);
router.get("/getAllTicket", ticketC.getAllTicket);
router.get("/getOneTicket", ticketC.getOneTicket);
router.get("/getService", ticketC.getServiceInTicket);
router.get("/getMinibar", ticketC.getMiniBarInTicket);
router.get("/getTour", ticketC.getTourInService);
router.get("/getRoomRate", ticketC.getRoomRate);
router.get("/getAllService", ticketC.getAllService);
router.get("/getAllMiniBar", ticketC.getAllMiniBar);
router.get("/getAllTour", ticketC.getAllTour);
router.get("/getDeposit", ticketC.getDepositInTicket);
router.post("/ticket/confirm", ticketC.confirmTicket);
router.post("/ticket/pay", ticketC.payTicket);

module.exports = router;
