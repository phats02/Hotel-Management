
const ticketM = require("../models/ticket.m")
exports.allTicket = async (req, res, next) => {
    var isLoggedIn = false

    if (req.session.user != null) {
        isLoggedIn = true
        const services = await ticketM.getAllService();
        const minibars = await ticketM.getAllMinibars()
        // for (let i = 0; i < services.length; i++) {
        //     services[i].TENDV = services[i].TENDV.replace(/\s+/g, '');
        // }
        // for (let i = 0; i < minibars.length; i++) {
        //     minibars[i].TENVD = minibars[i].TENVD.replace(/\s+/g, '');
        // }

        res.render("ticket/ticket", {
            isLoggedIn,
            account: req.session.user,
            services,
            minibars
        });
    }
    else {
        res.redirect("/login/signin");
    }

}

exports.addServiceToTicket = async (req, res, next) => {
    const services = req.body
    var services_array = [];

    for (var i in services)
        services_array.push([i, services[i]]);


    for (let i = 0; i < services_array.length; i++) {

        if (services_array[i][1] > 0) {
            var id = await ticketM.getIDDichVu(services_array[i][0])
            var result = {
                PHIEUDATPHONG_MAPHIEUDP: 21,
                DICHVU_MADV: id[0].MADV,
                SOLUONG: services_array[i][1]
            }
            //await ticketM.addDichVuSuDung(result)
        }
    }
    res.redirect("/ticket")


}
exports.addMinibarToTicket = async (req, res, next) => {
    const minibars = req.body
    var minibars_array = [];

    for (var i in minibars)
        minibars_array.push([i, minibars[i]]);
    for (let i = 0; i < minibars_array.length; i++) {

        if (minibars_array[i][1] > 0) {
            var id = await ticketM.getIDMinibar(minibars_array[i][0])

            var result = {
                PHONG_MAPHONG: 101,
                VATDUNG_MAVD: id[0].MAVD,
                SOLUONG: minibars_array[i][1]
            }
            //await ticketM.addMinibarSuDung(result)
        }
    }
    res.redirect("/ticket")

}