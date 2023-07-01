const tourM = require("../models/tour.m")
const customerM = require("../models/customer.m");
const Handlebars = require('handlebars');

exports.allTour = async (req, res, next) => {
    var isLoggedIn = false
    const tours = await tourM.getAllTour()
    Handlebars.registerHelper('ChangeStartDateFormat', function(NgayDen) {
        // Thực hiện phép tính để lấy ngày kết thúc
        var startDate = new Date(NgayDen);
      
        // Trả về ngày kết thúc

        return startDate.toISOString().split('T')[0];
      });
    if (req.session.user != null) {
        isLoggedIn = true
        res.render("tour/tour", {
            isLoggedIn,
            account: req.session.user,
            tours
        });
    }
    else {
        res.redirect("/login/signin");
    }

}
exports.addTour = async (req, res, next) => {
    const id = +req.query.id || -1;
    const tour = await tourM.getTourByID(id)

    if (req.method === "GET") {
        res.render("tour/addtour", {

            account: req.session.user,
            timestart: tour[0].GIOKHOIHANH
        });
    }
    else {
        var isTourRegister = true
        var error = "";

        if (req.body.firstname == '' || req.body.email == '' || req.body.phone == '' || req.body.no_ofparticipants == '') {
            error = "Please fill in all the information"
            isTourRegister = false

        } else {
            const customerDatabase = await customerM.getOneCustomer(req.body.email);
            const exists = await customerM.checkCustomerExist(req.body.email)
            if (exists[0].exist === 1) {
                if (customerDatabase[0].HOTEN !== req.body.firstname) {
                    error = "Wrong customer name"
                    isTourRegister = false
                }
                if (customerDatabase[0].SDT !== req.body.phone) {
                    error = "Wrong customer phone"
                    isTourRegister = false
                }
                if (isNaN(req.body.no_ofparticipants)) {
                    error = "Number of participant must a number"
                    isTourRegister = false
                }
                else {
                    const exist = await tourM.checkThamGia(id, customerDatabase[0].MAKH)

                    if (exist[0].exist === 1) {
                        error = "Already add";
                        isTourRegister = false

                    }
                    else {
                        const thamgia = {
                            TOUR_MATOUR: id,
                            KHACHHANG_MAKH: customerDatabase[0].MAKH,
                            PHUONGTIENDICHUYEN: req.body.vehicle,
                            YEUCAU: req.body.speacialneed

                        }
                        await tourM.addToThamGia(thamgia)
                    }

                }
            }
            else {
                error = "Customer doesn't exist"
                isTourRegister = false

            }

        }

        res.render("tour/addtour", {
            isTourRegister,
            error, timestart: tour[0].GIOKHOIHANH,
            account: req.session.user,


        })
    }
}

