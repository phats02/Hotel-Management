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

  for (let i = 0; i < allTicket.length; i++) {
    const ticket = allTicket[i];
    const MaDat = ticket.MaDat.split(",");
    const list_MaDat = await ticketM.getDatById(MaDat[0]);
    allTicket[i] = {
      ...allTicket[i],
      checkin: list_MaDat[0].NgayDen,
      checkout: new Date(list_MaDat[0].NgayDen).addDays(
        list_MaDat[0].SoDemLuuTru
      ),
    };
    if (list_MaDat[0].MaKH) {
      const list_KH = await ticketM.getKHById(list_MaDat[0].MaKH);
      allTicket[i] = {
        ...allTicket[i],
        ...list_KH[0],
      };
    } else if (list_MaDat[0].MaDoan) {
      const listDoan = await ticketM.getDoanById(list_MaDat[0].MaDoan);
      allTicket[i] = {
        ...allTicket[i],
        ...listDoan[0],
      };
    }

    const listPhong = [];
    for (let j = 0; j < MaDat.length; j++) {
      const list_MaDat = await ticketM.getDatById(MaDat[j]);
      for (let k = 0; k < list_MaDat.length; k++) {
        listPhong.push(list_MaDat[k].MaPhong);
      }
    }
    allTicket[i] = {
      ...allTicket[i],
      room: listPhong.join(","),
    };
  }

  const response = allTicket.map((item) => {
    return {
      id: item.MaPhieuDP,
      user: item.MaKH ? item.MaKH : item.MaDoan,
      room: item.room,
      checkin: new Date(item.checkin).toLocaleDateString(),
      checkout: new Date(item.checkout).toLocaleDateString(),
    };
  });
  res.json(response);
};
exports.getOneTicket = async (req, res, next) => {
  const ticketId = req.query.ticket;

  const ticket = await ticketM.getOneTicket(ticketId);
  const MaDat = ticket[0].MaDat.split(",");
  const list_MaDat = await ticketM.getDatById(MaDat[0]);
  ticket[0] = {
    ...ticket[0],
    checkin: list_MaDat[0].NgayDen,
    checkout: new Date(list_MaDat[0].NgayDen).addDays(
      list_MaDat[0].SoDemLuuTru
    ),
    XetDuyet: list_MaDat[0].XetDuyet,
  };
  if (list_MaDat[0].MaKH) {
    const list_KH = await ticketM.getKHById(list_MaDat[0].MaKH);
    ticket[0] = {
      ...ticket[0],
      ...list_KH[0],
    };
  } else if (list_MaDat[0].MaDoan) {
    const listDoan = await ticketM.getDoanById(list_MaDat[0].MaDoan);
    ticket[0] = {
      ...ticket[0],
      ...listDoan[0],
    };
  }
  const listPhong = [];
  for (let j = 0; j < MaDat.length; j++) {
    const list_MaDat = await ticketM.getDatById(MaDat[j]);
    for (let k = 0; k < list_MaDat.length; k++) {
      listPhong.push(list_MaDat[k].MaPhong);
    }
  }
  ticket[0] = {
    ...ticket[0],
    room: listPhong.join(","),
  };

  console.log(
    "🚀 ~ file: ticket.c.js:107 ~ exports.getOneTicket= ~ ticket:",
    ticket
  );

  const response = {
    idTicket: ticket[0].MaPhieuDP,
    idCustomer: ticket[0].KhachHang_MaKH
      ? ticket[0].KhachHang_MaKH
      : ticket[0].MaDoan,
    time: ticket[0].NgayThanhToan
      ? new Date(ticket[0].NgayThanhToan).toLocaleDateString()
      : null,
    roomNumber: ticket[0].room,
    checkin: new Date(ticket[0].checkin).toLocaleDateString(),
    checkout: new Date(ticket[0].checkout).toLocaleDateString(),
    xetDuyet: ticket[0].XetDuyet,
  };
  res.json(response);
};
exports.getServiceInTicket = async (req, res, next) => {
  const list_service = await ticketM.getServiceInTicket(req.query.ticket);
  console.log(list_service);
  const response = list_service.map((service) => {
    return {
      name: service.TenDV,
      price: service.Gia,
      size: service.SoLuong,
    };
  });
  res.json(response);
};
exports.getMiniBarInTicket = async (req, res, next) => {
  const list_service = await ticketM.getMiniBarInTicket(req.query.ticket);
  console.log(list_service);
  const response = list_service.map((service) => {
    return {
      name: service.TenVD,
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
  const ticketId = req.query.ticket;
  const ticket = await ticketM.getOneTicket(ticketId);
  console.log(ticket);
  const MaDat = ticket[0].MaDat.split(",");
  let listRoomRate = [];
  for (let i = 0; i < MaDat.length; i++) {
    const dat = await ticketM.getDatById(MaDat[i]);
    const phong = await ticketM.getRoomById(dat[0].MaPhong);
    listRoomRate.push({
      type: phong[0].TenLoaiPhong,
      quantity: 1,
      cash: dat[0].SoDemLuuTru * phong[0].Gia,
    });
  }

  res.json(listRoomRate);
};

exports.getAllService = async (req, res, next) => {
  const listService = await ticketM.getAllService();
  res.json(listService);
};
exports.getAllMiniBar = async (req, res, next) => {
  const listMiniBar = await ticketM.getAllMiniBar();
  res.json(listMiniBar);
};
exports.getAllTour = async (req, res, next) => {
  const listTour = await ticketM.getAllTour();
  res.json(listTour);
};
exports.addServiceToTicket = async (req, res, next) => {
  const services = req.body.service;
  for (var i = 0; i < services.length; i++) {
    const idService = await ticketM.getIDServiceByName(services[i].name);
    await ticketM.addServiceToTicket(
      req.body.ticketId,
      idService[0].MaDV,
      services[i].quantity
    );
  }
  res.status(200).send("Success");
};
exports.addMinibarToTicket = async (req, res, next) => {
  const minibars = req.body.miniBar;
  for (var i = 0; i < minibars.length; i++) {
    const idMiniBar = await ticketM.getIDMiniBarByName(minibars[i].name);
    console.log(idMiniBar);
    await ticketM.addMiniBarToTicket(
      req.body.ticketId,
      idMiniBar[0].MaVD,
      minibars[i].quantity
    );
  }
  res.status(200).send("Success");
};
exports.addTourToTicket = async (req, res, next) => {
  const tour = req.body.tour;
  for (var i = 0; i < tour.length; i++) {
    const idTour = await ticketM.getIDTourByName(tour[i].name);
    await ticketM.addTourToTicket(
      req.body.ticketId,
      idTour[0].MaTour,
      tour[i].quantity
    );
  }
  res.status(200).send("Success");
};

exports.getTourInService = async (req, res, next) => {
  const listTour = await ticketM.getTourForTicket(req.query.ticket);
  const response = listTour.map((tour) => {
    return {
      name: tour.TenTour,
      price: tour.GiaTour,
      size: tour.SoLuong,
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
exports.addDepositToTicket = async (req, res, next) => {
  const idTicket = req.body.ticketId;
  const deposit = req.body.deposit;
  await ticketM.addDepositToTicket(idTicket, deposit);
  res.status(200).send("Success");
};
exports.getDepositInTicket = async (req, res, next) => {
  const idTicket = req.query.ticket;
  const allDeposit = await ticketM.getDepositInTicket(idTicket);
  const response = allDeposit.map((item) => {
    return {
      date: new Date(item.Date).toLocaleDateString(),
      volume: item.Volume,
    };
  });
  res.json(response);
};
exports.payTicket = async (req, res, next) => {
  const total = req.body.total;
  const idTicket = req.body.ticketId;
  await ticketM.payTicket(idTicket, total);
  res.status(200).send("Success");
};
exports.confirmTicket = async (req, res, next) => {
  const idTicket = req.body.ticketId;
  const ticket = await ticketM.getOneTicket(idTicket);
  const MaDat = ticket[0].MaDat.split(",");
  for (let i = 0; i < MaDat.length; i++) {
    await ticketM.confirmTicket(MaDat[i]);
  }
  res.status(200).send("SUCCESS");
};
