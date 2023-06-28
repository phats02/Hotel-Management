const db = require("../config/db")
const KhachHang = "KHACHHANG"

module.exports = {
    getAllCustomers: async () => {
        const customers = await db.load(`SELECT * FROM ${KhachHang}`)
        return customers
    },
    getOneCustomer: async (email) => {
        const customer = await db.load(`select * from ${KhachHang} where EMAIL='${email}'`)
        return customer
    },
    checkCustomerExist: async (email) => {
        const exists = await db.load(`select count(*) as exist from ${KhachHang} where EMAIL ='${email}'`)
        return exists;
    },
}