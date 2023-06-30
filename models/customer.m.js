const db = require("../config/db")
const KhachHang = "KHACHHANG"
const MaKH= "MaKH"

module.exports = {
    getAllCustomers: async () => {
        const customers = await db.load(`SELECT * FROM ${KhachHang}`)
        return customers
    },
    getOneCustomer: async (id) => {
        const customer = await db.load(`select * from ${KhachHang} where ${MaKH}='${id}'`)
        return customer
    },
    insertOneCustomer: async (KH)=> {
        const rs= await db.load(`INSERT INTO khachhang (HoTen,DiaChi,SDT,SoFAX,EMAIL) VALUES ('${KH.HoTen}','${KH.DiaChi}','${KH.SDT}','${KH.SoFax}','${KH.Email}')`)
        return rs
        
    },
    checkCustomerExist: async (email) => {
        const exists = await db.load(`select count(*) as exist from ${KhachHang} where EMAIL ='${email}'`)
        return exists;
    },

}