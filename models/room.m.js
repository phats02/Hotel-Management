const db = require("../config/db")
const DAT = "dat"
const TheoDoan = "theodoan"
const KH = "khachhang"
const Phong = "phong"
const LoaiPhong = "loaiphong"
const PDP = "phieudatphong"

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

    addCustomer: async (id, makh, ngayden, sodemluutru, sr, length1) => {
        const insertQuery = `INSERT INTO hotel.${DAT}(MaKH, MaDoan, YeuCau, SoDemLuuTru, NgayDen, XetDuyet, GopY, MaPhong, MaNV) 
                       VALUES (${makh}, 0, '${sr}', ${sodemluutru}, '${ngayden}', '', NULL, '${id}', '1')`;
        const selectQuery = 'SELECT LAST_INSERT_ID()';
        await db.load(insertQuery);
        const result = await db.load(selectQuery);
        const ID = result[0]['LAST_INSERT_ID()'];
        return ID;
    },

    addTourist: async (id, mad, ngayden, sodemluutru, sr) => {
        const insertQuery = `insert into hotel.${DAT}(MaKH, MaDoan, YeuCau, SoDemLuuTru, NgayDen, XetDuyet, GopY, MaPhong, MaNV) values(0,${mad},'${sr}', ${sodemluutru},'${ngayden}','',NULL,'${id}','1')`;
        const selectQuery = 'SELECT LAST_INSERT_ID()';
        await db.load(insertQuery);
        const result = await db.load(selectQuery);
        const ID = result[0]['LAST_INSERT_ID()'];
        return ID;
    },

    addPDP: async (madat) => {
        db.load(`insert into hotel.${PDP} (MaDat) values('${madat}');`)
    },

    getEmptyRoom: async (NgayDen_Input, NgayDi_Input) => {
        const EmptyRoom = db.load(`    SELECT MaPhong, TenLoaiPhong, Gia
        FROM ${Phong} join ${LoaiPhong} on LoaiPhong_MaLoaiPhong = MaLoaiPhong
        WHERE MaPhong NOT IN (SELECT MaPhong FROM ${DAT} where (DATEDIFF('${NgayDen_Input}', NgayDen) <= SoDemLuuTru) and (DATEDIFF('${NgayDen_Input}', NgayDen) >= 0) 
        or (DATEDIFF('${NgayDi_Input}', NgayDen) <= SoDemLuuTru and DATEDIFF('${NgayDi_Input}', NgayDen) >= 0) 
        or ('${NgayDen_Input}' <= NgayDen and '${NgayDi_Input}' >= DATE_ADD(NgayDen, INTERVAL SoDemLuuTru day)));`)
        return EmptyRoom;
    },

    getBookedRoom: async (NgayDen_Input, NgayDi_Input) => {
        const BookedRoom = db.load(`select ${DAT}.MaPhong, TenLoaiPhong, Gia, NgayDen, SoDemLuuTru from ${DAT} join ${Phong} on ${DAT}.MaPhong = ${Phong}.MaPhong join ${LoaiPhong} on MaLoaiPhong = LoaiPhong_MaLoaiPhong  
        where (DATEDIFF('${NgayDen_Input}', NgayDen) <= SoDemLuuTru) and (DATEDIFF('${NgayDen_Input}', NgayDen) >= 0) 
        or (DATEDIFF('${NgayDi_Input}', NgayDen) <= SoDemLuuTru and DATEDIFF('${NgayDi_Input}', NgayDen) >= 0) 
        or ('${NgayDen_Input}' <= NgayDen and '${NgayDi_Input}' >= DATE_ADD(NgayDen, INTERVAL SoDemLuuTru day)) ORDER BY MaPhong ASC;
        `)
        return BookedRoom;
    },
}