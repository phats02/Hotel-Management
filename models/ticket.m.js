const db = require("../config/db")
const DAT = "DAT"
const KHACHHANG= "KHACHHANG"
const PHONG = "PHONG"
const PHIEUDATPHONG ="PHIEUDATPHONG"
const SUDUNG = "SUDUNG"
const DICHVU = "DICHVU"
const THAMGIA= "THAMGIA"
const TOUR = "TOUR"
const LOAIPHONG = "LOAIPHONG"
const VATDUNG = "VATDUNG"
module.exports = {
    getAllTicket: async () => {
        const listTicket = db.load(`select * from ${DAT}, ${KHACHHANG} where ${DAT}.\`KhachHang_MaKH\`=${KHACHHANG}.\`MaKH\``)
        return listTicket;
    },
    getOneTicket: async (ticketid)=>{
        const ticket= db.load(`select * from ${DAT}, ${PHIEUDATPHONG} where ${DAT}.\`PhieuDatPhong_MaPhieuDP\`=${ticketid} and ${PHIEUDATPHONG}.\`MaPhieuDP\`=${ticketid}`)
        return ticket
    },
    getServiceInTicket: async (ticketid) =>{
        const listService= db.load(`select * from ${SUDUNG}, ${DICHVU} where ${SUDUNG}.\`PhieuDatPhong_MaPhieuDP\`=${ticketid} and ${DICHVU}.\`MaDV\`=${SUDUNG}.\`DichVu_MaDV\``)
        return listService
    },
    getTourForTicket: async(ticketid)=>{
        const listTour = db.load(`select * from ${DAT}, ${THAMGIA}, ${TOUR} where ${DAT}.\`PhieuDatPhong_MaPhieuDP\`=${ticketid} and ${DAT}.\`KhachHang_MaKH\`= ${THAMGIA}.\`KhachHang_MaKH\` and ${THAMGIA}.\`Tour_MaTour\`=${TOUR}.\`MaTour\``)
        return listTour
    },
    getRoomRateForTicket: async(ticketid)=>{
        const listRoomRate = db.load(`select * from ${DAT}, ${PHONG}, ${LOAIPHONG} where ${DAT}.\`PhieuDatPhong_MaPhieuDP\`=${ticketid} and ${DAT}.\`Phong_MaPhong\`= ${PHONG}.\`MaPhong\` and ${PHONG}.\`LoaiPhong_MaLoaiPhong\`=${LOAIPHONG}.\`MaLoaiPhong\``)
        return listRoomRate
    },
    getAllService: async()=>{
        const listService= db.load(`select * from ${DICHVU}`);
        return listService;
    },
    getAllMiniBar: async()=>{
        const listMiniBar= db.load(`select * from ${VATDUNG}`)
        return listMiniBar;
    }
}