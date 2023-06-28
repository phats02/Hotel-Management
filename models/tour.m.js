const db = require("../config/db")
const Tour = "TOUR"
const ThamGia = "THAMGIA"
module.exports = {
    getAllTour: async () => {
        const tour = db.load(`select * from ${Tour}`)
        return tour;
    },
    getTourByID: async (id) => {
        const tour = db.load(`select * from ${Tour} where MATOUR=${id}`)
        return tour;
    },
    addToThamGia: async (thamgia) => {
        const result = db.add(`${ThamGia}`, thamgia)
        return result;
    },
    checkThamGia: async (tour, customer) => {
        const exists = await db.load(`select count(*) as exist from ${ThamGia} where TOUR_MATOUR ='${tour}' and KHACHHANG_MAKH='${customer}'`)
        return exists;
    }
}