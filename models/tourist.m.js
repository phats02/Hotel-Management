const db = require("../config/db")
const TheoDoan = "theodoan"
const KhachHang = "khachhang"


module.exports = {
    getAllTourist: async () => {
        const room = db.load(`select distinct MaDoan, TenDoan, TenNguoiDangKy, SoNguoi from ${TheoDoan}`)
        return room;
    },
    getAllCusTomer: async () => {
        const room = db.load(`select * from ${KhachHang}`)
        return room;
    },
    getMax: async () => {
        const madoan = db.load(`SELECT MAX(MaDoan) FROM ${TheoDoan};`)
        return madoan;
    },
    addTourist: async (MaDoan, TenDoan, TenNguoiDangKy, SoNguoi, KhachHang_MaKH) => {
        const room = db.load(`INSERT INTO ${TheoDoan} (MaDoan, TenDoan, TenNguoiDangKy, SoNguoi, khachhang_MaKH)
        VALUES ('${MaDoan}', '${TenDoan}', '${TenNguoiDangKy}','${SoNguoi}','${KhachHang_MaKH}');`)
        return room;
    },
    getOneTourist: async (MaDoan) => {
        const tourist = db.load(`select distinct TenDoan, TenNguoiDangKy, SoNguoi from ${TheoDoan} where MaDoan = ${MaDoan}`)
        return tourist;
    },
    getCusTomerTourist: async (MaDoan) => {
        const customer = db.load(`select MaKH, HoTen, DiaChi, SDT, SoFax from ${KhachHang} join ${TheoDoan} on MaKH = KhachHang_MaKH where  MaDoan = ${MaDoan}`)
        return customer;
    },
}