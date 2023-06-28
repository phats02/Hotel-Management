const db = require("../config/db")
const NhanVien = "NhanVien"
module.exports = {
    getUserByEmail: async (username) => {
        const user = await db.load(`select * from ${NhanVien} where EMAIL= '${username}' `);
        return user;
    },
    checkUserExist: async (username) => {
        const exists = await db.load(`select count(*) as exist from ${NhanVien} where EMAIL ='${username}'`)
        return exists;
    },
    addPassword: async (username, password) => {
        const addpassword = await db.load(`UPDATE ${NhanVien} SET MatKhau='${password}' where EMAIL ='${username}'`)
        return addpassword;
    }
}