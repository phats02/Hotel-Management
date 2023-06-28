const app = require('express')
const router = app.Router()
const customerC = require('../controllers/customer.c')
router.get('/customer', customerC.allCustomer);
module.exports = router;