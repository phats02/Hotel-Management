const ticketM = require("../models/ticket.m");

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

exports.allTicket = async (req, res, next) => {
  var isLoggedIn = false;

  if (req.session.user != null) {
    isLoggedIn = true;
    res.render("ticket/ticket", {
      isLoggedIn,
      account: req.session.user,
    });
  } else {
    res.redirect("/login/signin");
  }
};
exports.getAllTicket = async (req, res, next) => {
  const allTicket = await ticketM.getAllTicket();
  const response = allTicket.map((ticket) => {
    return {
      id: ticket.PhieuDatPhong_MaPhieuDP,
      user: ticket.HoTen,
      room: ticket.Phong_MaPhong,
      checkin: ticket.NgayDen,
      checkout: new Date(ticket.NgayDen).addDays(ticket.SoDemLuuTru),
    };
  });
  res.json(response);
};
exports.getOneTicket = async (req, res, next) => {
  const ticket = await ticketM.getOneTicket(req.query.ticket);
  const response = {
    idTicket: req.query.ticket,
    idEmployee: ticket[0].LeTan_NhanVien_MaNV,
    idCustomer: ticket[0].KhachHang_MaKH,
    time: ticket[0].NgayThanhToan,
    roomNumber: ticket[0].Phong_MaPhong,
    checkin: ticket[0].NgayDen,
    checkout: new Date(ticket[0].NgayDen).addDays(ticket[0].SoDemLuuTru),
  };
  res.json(response);
};
exports.getServiceInTicket = async (req, res, next) => {
  const list_service = await ticketM.getServiceInTicket(req.query.ticket);
  const response = list_service.map((service) => {
    return {
      name: service.TenDV,
      price: service.Gia,
      size: service.SoLuong,
    };
  });
  res.json(response);
};
exports.getTourInService = async (req, res, next) => {
  const listTour = await ticketM.getTourForTicket(req.query.ticket);
  const response = listTour.map((tour) => {
    return {
      name: tour.TenTour,
      price: tour.GiaTour,
      size: 1,
    };
  });
  res.json(response);
};
exports.getRoomRate = async (req, res, next) => {
  const listRoomRate = await ticketM.getRoomRateForTicket(req.query.ticket);
  const response = listRoomRate.map((room) => {
    return {
      type: room.TenLoaiPhong,
      quantity: 1,
      cash: room.Gia * room.SoDemLuuTru,
    };
  });
  res.json(response);
};
exports.getAllService = async (req, res, next) => {
  const listService = await ticketM.getAllService();
  res.json(listService);
};
exports.getAllMiniBar = async (req, res, next) => {
  const listMiniBar = await ticketM.getAllMiniBar();
  res.json(listMiniBar);
};

exports.addServiceToTicket = async (req, res, next) => {
  const services = req.body;
  var services_array = [];

  for (var i in services) services_array.push([i, services[i]]);

  for (let i = 0; i < services_array.length; i++) {
    if (services_array[i][1] > 0) {
      var id = await ticketM.getIDDichVu(services_array[i][0]);
      var result = {
        PHIEUDATPHONG_MAPHIEUDP: 21,
        DICHVU_MADV: id[0].MADV,
        SOLUONG: services_array[i][1],
      };
      //await ticketM.addDichVuSuDung(result)
    }
  }
  res.redirect("/ticket");
};
exports.addMinibarToTicket = async (req, res, next) => {
  const minibars = req.body;
  var minibars_array = [];

  for (var i in minibars) minibars_array.push([i, minibars[i]]);
  for (let i = 0; i < minibars_array.length; i++) {
    if (minibars_array[i][1] > 0) {
      var id = await ticketM.getIDMinibar(minibars_array[i][0]);

      var result = {
        PHONG_MAPHONG: 101,
        VATDUNG_MAVD: id[0].MAVD,
        SOLUONG: minibars_array[i][1],
      };
      //await ticketM.addMinibarSuDung(result)
    }
  }
  res.redirect("/ticket");
};
exports.getAllTicket = async (req, res, next) => {
  const allTicket = await ticketM.getAllTicket();
  const response = allTicket.map((ticket) => {
    return {
      id: ticket.PhieuDatPhong_MaPhieuDP,
      user: ticket.HoTen,
      room: ticket.Phong_MaPhong,
      checkin: ticket.NgayDen,
      checkout: new Date(ticket.NgayDen).addDays(ticket.SoDemLuuTru),
    };
  });
  res.json(response);
};
exports.getOneTicket = async (req, res, next) => {
  const ticket = await ticketM.getOneTicket(req.query.ticket);
  const response = {
    idTicket: req.query.ticket,
    idEmployee: ticket[0].LeTan_NhanVien_MaNV,
    idCustomer: ticket[0].KhachHang_MaKH,
    time: ticket[0].NgayThanhToan,
    roomNumber: ticket[0].Phong_MaPhong,
    checkin: ticket[0].NgayDen,
    checkout: new Date(ticket[0].NgayDen).addDays(ticket[0].SoDemLuuTru),
  };
  res.json(response);
};
exports.getServiceInTicket = async (req, res, next) => {
  const list_service = await ticketM.getServiceInTicket(req.query.ticket);
  const response = list_service.map((service) => {
    return {
      name: service.TenDV,
      price: service.Gia,
      size: service.SoLuong,
    };
  });
  res.json(response);
};
exports.getTourInService = async (req, res, next) => {
  const listTour = await ticketM.getTourForTicket(req.query.ticket);
  const response = listTour.map((tour) => {
    return {
      name: tour.TenTour,
      price: tour.GiaTour,
      size: 1,
    };
  });
  res.json(response);
};
exports.getRoomRate = async (req, res, next) => {
  const listRoomRate = await ticketM.getRoomRateForTicket(req.query.ticket);
  const response = listRoomRate.map((room) => {
    return {
      type: room.TenLoaiPhong,
      quantity: 1,
      cash: room.Gia * room.SoDemLuuTru,
    };
  });
  res.json(response);
};
exports.getAllService = async (req, res, next) => {
  const listService = await ticketM.getAllService();
  res.json(listService);
};
exports.getAllMiniBar = async (req, res, next) => {
  const listMiniBar = await ticketM.getAllMiniBar();
  res.json(listMiniBar);
};
