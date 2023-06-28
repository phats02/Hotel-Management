const db = require("../config/db")
const DichVu = "DICHVU"
const VatDung = "VATDUNG"
const DichVuSuDung = "SUDUNG"
const VatDungSuDung = "THUOC_PHONG_VATDUNG"
module.exports = {
    getAllService: async () => {
        const services = await db.load(`SELECT * FROM ${DichVu}`)
        return services;
    },
    getAllMinibars: async () => {
        const minibars = await db.load(`SELECT * FROM ${VatDung}`)
        return minibars
    },
    getIDDichVu: async (tendichvu) => {
        const id = await db.load(`SELECT MADV FROM ${DichVu} WHERE TENDV ='${tendichvu}'`)

        return id
    },
    getIDMinibar: async (tenvatdung) => {
        const id = await db.load(`SELECT MAVD FROM ${VatDung} WHERE TENVD ='${tenvatdung}'`)

        return id
    },
    addDichVuSuDung: async (result) => {
        const res = await db.add(`${DichVuSuDung}`, result)
        return res
    },
    addMinibarSuDung: async (result) => {
        const res = await db.add(`${VatDungSuDung}`, result);
        return res;
    }
}