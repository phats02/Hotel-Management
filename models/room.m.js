const db = require("../config/db")
const DAT = "dat"
const TheoDoan = "theodoan"
const KH = "khachhang"
const Phong ="phong"
const LoaiPhong ="loaiphong"

module.exports = {
    getAllRoom: async () => {
        const room = db.load(`select * from ${DAT}`)
        return room;
    },
    getAllDoan: async () => {
        const Doan = db.load(`SELECT distinct MaDoan, TenDoan, TenNguoiDangKy, SoNguoi FROM ${TheoDoan};`)
        return Doan;
    },

    getCusByID: async (id) => {
        const customer = db.load(`select * from ${KH}`)
        return customer;
    },

    getEmptyRoom: async (NgayDen_Input,NgayDi_Input) => {
        const EmptyRoom = db.load(`    SELECT MaPhong, TenLoaiPhong, Gia
        FROM ${Phong} join ${LoaiPhong} on LoaiPhong_MaLoaiPhong = MaLoaiPhong
        WHERE MaPhong NOT IN (SELECT MaPhong FROM ${DAT} where (DATEDIFF('${NgayDen_Input}', NgayDen) <= SoDemLuuTru) and (DATEDIFF('${NgayDen_Input}', NgayDen) >= 0) 
        or (DATEDIFF('${NgayDi_Input}', NgayDen) <= SoDemLuuTru and DATEDIFF('${NgayDi_Input}', NgayDen) >= 0) 
        or ('${NgayDen_Input}' <= NgayDen and '${NgayDi_Input}' >= DATE_ADD(NgayDen, INTERVAL SoDemLuuTru day)));`)
        return EmptyRoom;
    },
    getBookedRoom: async (NgayDen_Input,NgayDi_Input) => {
        const BookedRoom = db.load(`select ${DAT}.MaPhong, TenLoaiPhong, Gia, NgayDen, SoDemLuuTru from ${DAT} join ${Phong} on ${DAT}.MaPhong = ${Phong}.MaPhong join ${LoaiPhong} on MaLoaiPhong = LoaiPhong_MaLoaiPhong  
        where (DATEDIFF('${NgayDen_Input}', NgayDen) <= SoDemLuuTru) and (DATEDIFF('${NgayDen_Input}', NgayDen) >= 0) 
        or (DATEDIFF('${NgayDi_Input}', NgayDen) <= SoDemLuuTru and DATEDIFF('${NgayDi_Input}', NgayDen) >= 0) 
        or ('${NgayDen_Input}' <= NgayDen and '${NgayDi_Input}' >= DATE_ADD(NgayDen, INTERVAL SoDemLuuTru day)) ORDER BY MaPhong ASC;
        `)
        return BookedRoom;
    },

}