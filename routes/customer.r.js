const app = require('express')
const router = app.Router()
const customerC = require('../controllers/customer.c')
router.get('/customer', customerC.allCustomer);
router.get('/customer/addcustomer',customerC.GetaddCustomer)
router.post('/customer/addcustomer',customerC.PostAddCustomer)
router.get('/CustomerDetail',customerC.DetailCustomer)
module.exports = router;