const db = require("../config/db");
const DAT = "DAT";
const KHACHHANG = "KHACHHANG";
const PHONG = "PHONG";
const PHIEUDATPHONG = "PHIEUDATPHONG";
const SUDUNG = "SUDUNG";
const DICHVU = "DICHVU";
const SUDUNG_TOUR = "SUDUNG_TOUR";
const TOUR = "TOUR";
const LOAIPHONG = "LOAIPHONG";
const VATDUNG = "VATDUNG";
const SUDUNG_VD = "SUDUNG_VATDUNG";
const DEPOSIT = "DEPOSIT";
const DOAN = "THEODOAN";
module.exports = {
  getAllTicket: async () => {
    const listTicket = db.load(`select * from ${PHIEUDATPHONG}`);
    return listTicket;
  },
  getDatById: async (id) => {
    const listDat = db.load(
      `select * from ${DAT} where ${DAT}.\`MaDat\`=${id}`
    );
    return listDat;
  },
  getDoanById: async (id) => {
    const getDoanById = db.load(
      `select* from ${DOAN} where ${DOAN}.\`MaDoan\`=${id}`
    );
    return getDoanById;
  },
  getKHById: async (id) => {
    const getKHById = db.load(
      `select * from ${KHACHHANG} where ${KHACHHANG}.\`MaKH\`=${id}`
    );
    return getKHById;
  },
  getOneTicket: async (ticketid) => {
    const ticket = db.load(
      `select * from ${PHIEUDATPHONG} where ${PHIEUDATPHONG}.\`MaPhieuDP\`=${ticketid}`
    );
    return ticket;
  },
  getServiceInTicket: async (ticketid) => {
    const listService = db.load(
      `select * from ${SUDUNG}, ${DICHVU} where ${SUDUNG}.\`PhieuDatPhong_MaPhieuDP\`=${ticketid} and ${DICHVU}.\`MaDV\`=${SUDUNG}.\`DichVu_MaDV\``
    );
    return listService;
  },
  getMiniBarInTicket: async (ticketid) => {
    const listService = db.load(
      `select * from ${SUDUNG_VD}, ${VATDUNG} where ${SUDUNG_VD}.\`PhieuDatPhong_MaPhieuDP\`=${ticketid} and ${SUDUNG_VD}.\`VatDung_MaVD\`=${VATDUNG}.\`MaVD\``
    );
    return listService;
  },
  getTourForTicket: async (ticketid) => {
    const listTour = db.load(
      `select * from ${SUDUNG_TOUR}, ${TOUR} where ${SUDUNG_TOUR}.\`PhieuDatPhong_MaPhieuDP\`=${ticketid} and ${SUDUNG_TOUR}.\`Tour_MaTour\`=${TOUR}.\`MaTour\``
    );
    return listTour;
  },
  getRoomById: async (roomId) => {
    const room = db.load(
      `select * from ${PHONG}, ${LOAIPHONG} where ${PHONG}.\`MaPhong\`= ${roomId} and ${PHONG}.\`LoaiPhong_MaLoaiPhong\`=${LOAIPHONG}.\`MaLoaiPhong\``
    );
    return room;
  },
  getAllService: async () => {
    const listService = db.load(`select * from ${DICHVU}`);
    return listService;
  },
  getAllMiniBar: async () => {
    const listMiniBar = db.load(`select * from ${VATDUNG}`);
    return listMiniBar;
  },
  getAllTour: async () => {
    const list_tour = db.load(`select * from ${TOUR}`);
    return list_tour;
  },
  getIDMiniBarByName: async (name) => {
    const idMiniBar = db.load(
      `select ${VATDUNG}.\`MaVD\` from ${VATDUNG} where ${VATDUNG}.\`TenVD\`= "${name}"`
    );
    return idMiniBar;
  },
  addMiniBarToTicket: async (idTicket, idMiniBar, quantity) => {
    const res = db.load(
      `REPLACE into ${SUDUNG_VD} values (${idTicket}, ${idMiniBar}, ${quantity})`
    );
    return res;
  },
  getIDServiceByName: async (name) => {
    const service = db.load(
      `select ${DICHVU}.\`MaDV\` from ${DICHVU} where ${DICHVU}.\`TenDV\`= "${name}"`
    );
    return service;
  },
  getIDTourByName: async (name) => {
    const tour = db.load(
      `select ${TOUR}.\`MaTour\` from ${TOUR} where ${TOUR}.\`TenTour\`= "${name}"`
    );
    return tour;
  },

  addServiceToTicket: async (idTicket, idService, quantity) => {
    const res = db.load(
      `REPLACE into ${SUDUNG} values (${idTicket}, ${idService}, ${quantity})`
    );
    return res;
  },
  addTourToTicket: async (idTicket, idTour, quantity) => {
    const res = db.load(
      `REPLACE into ${SUDUNG_TOUR} values (${idTicket}, ${idTour}, ${quantity})`
    );
    return res;
  },
  addDepositToTicket: async (idTicket, deposit) => {
    const res = db.load(
      `insert into ${DEPOSIT}(\`PhieuDatPhong_MaPhieuDP\`, \`Date\`,\`Volume\`) values(${idTicket}, NOW(), ${deposit})`
    );
    return res;
  },
  getDepositInTicket: async (idTicket) => {
    const res = db.load(
      `select * from ${DEPOSIT} where ${DEPOSIT}.\`PhieuDatPhong_MaPhieuDP\` = ${idTicket}`
    );
    return res;
  },
  payTicket: async (idTicket, total) => {
    const res = db.load(
      `update ${PHIEUDATPHONG} set \`GiaTong\`=${total}, \`NgayThanhToan\`=NOW() where \`MaPhieuDP\`=${idTicket}`
    );
    return res;
  },
  confirmTicket: async (maDat) => {
    const res = db.load(
      `update ${DAT} set \`XetDuyet\`="Duyet" where \`MaDat\`=${maDat}`
    );
    return res;
  },
};
