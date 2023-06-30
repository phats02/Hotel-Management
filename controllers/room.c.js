const roomM = require("../models/room.m")
const roomA = require ("../views/room/room")
const Handlebars = require('handlebars');

exports.allRoom = async (req, res, next) => {
    var isLoggedIn = false


    if (req.session.user != null) {
        isLoggedIn = true
        res.render("room/room", {

        });
    }
    else {
        res.redirect("/login/signin");
    }

}

exports.bookRoom = async (req, res, next) => {
    const Doan = await roomM.getAllDoan()
    const id = req.query.RoomID
   
    const customer = await roomM.getCusByID()
    const NgayDen_Input = req.query.NgayDen_Input
    const NgayDi_Input = req.query.NgayDi_Input

    res.render("room/bookroom", {
       customer,
       Doan,
       id,
       NgayDen_Input,
       NgayDi_Input
    })
}

exports.bookCusforRoom = async (req, res, next) => {

    const id = req.body.MaKH
    console.log(id)

    const customer = await roomM.getCusByID(id)

    res.render("room/bookroom", {
       customer,
       id,
    })
}

exports.Search = async (req, res, next) => {
    const NgayDen_Input = req.body.NgayDen_Input
    const NgayDi_Input = req.body.NgayDi_Input
    const isSearch= req.body.isSearch ;
    console.log(isSearch)
    Handlebars.registerHelper('calculateEndDate', function(NgayDen, SoDemLuuTru) {
        // Thực hiện phép tính để lấy ngày kết thúc
        var endDate = new Date(NgayDen);
        endDate.setDate(endDate.getDate() + SoDemLuuTru);
      
        // Trả về ngày kết thúc

        return endDate.toISOString().split('T')[0];
      });
      Handlebars.registerHelper('ChangeStartDateFormat', function(NgayDen) {
        // Thực hiện phép tính để lấy ngày kết thúc
        var startDate = new Date(NgayDen);
      
        // Trả về ngày kết thúc

        return startDate.toISOString().split('T')[0];
      });
    const BookedRoom = await roomM.getBookedRoom(NgayDen_Input, NgayDi_Input)
    const EmptyRoom = await roomM.getEmptyRoom(NgayDen_Input, NgayDi_Input)


    console.log(BookedRoom)
    res.render("room/room", {
       BookedRoom,
       isSearch,
       EmptyRoom,
       NgayDen_Input,
       NgayDi_Input
    })
}
