const roomM = require("../models/room.m")
const roomA = require("../views/room/room")
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

exports.bookCusTou = async (req, res, next) => {
    var fromDate = new Date(req.body.from);
    var toDate = new Date(req.body.to);
    var differenceMs = toDate.getTime() - fromDate.getTime();
    var differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const str = req.body.RoomID
    const makh = req.body.MaKH
    const mad = req.body.MaD
    id = str.split(",");
    var madat = []
    if (makh != "") {
        for (i = 0; i < id.length; i++) {
            madat[i] = await roomM.addCustomer(id[i], makh, req.body.from, differenceDays, req.body.specialrequirement)
        }
    }
    if (mad != "") {
        for (i = 0; i < id.length; i++) {
            madat[i] = await roomM.addTourist(id[i], mad, req.body.from, differenceDays, req.body.specialrequirement)
        }
    }
    idstr = '';
    for (i = 0; i < madat.length; i++) {
        idstr += madat[i] + ','
    }
    idstr = idstr.slice(0, -1)
    await roomM.addPDP(idstr)
    res.render("room/room", {
    })

}

exports.Search = async (req, res, next) => {
    const NgayDen_Input = req.body.NgayDen_Input
    const NgayDi_Input = req.body.NgayDi_Input
    const isSearch= req.body.isSearch ;
    Handlebars.registerHelper('calculateEndDate', function(NgayDen, SoDemLuuTru) {
        // Thực hiện phép tính để lấy ngày kết thúc
        var endDate = new Date(NgayDen);
        endDate.setDate(endDate.getDate() + SoDemLuuTru);

        // Trả về ngày kết thúc

        return endDate.toISOString().split('T')[0];
    });
    Handlebars.registerHelper('ChangeStartDateFormat', function (NgayDen) {
        // Thực hiện phép tính để lấy ngày kết thúc
        var startDate = new Date(NgayDen);

        // Trả về ngày kết thúc

        return startDate.toISOString().split('T')[0];
    });
    const BookedRoom = await roomM.getBookedRoom(NgayDen_Input, NgayDi_Input)
    const EmptyRoom = await roomM.getEmptyRoom(NgayDen_Input, NgayDi_Input)


    res.render("room/room", {
        BookedRoom,
        isSearch,
        EmptyRoom,
        NgayDen_Input,
        NgayDi_Input
    })
}
