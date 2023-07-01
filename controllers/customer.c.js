const customerM= require("../models/customer.m")

exports.allCustomer = async (req, res, next) => {
    var isLoggedIn = false
    const allCustomer= await customerM.getAllCustomers()
    if (req.session.user != null) {
        isLoggedIn = true
        res.render("customer/customer", {
            isLoggedIn,
            account: req.session.user,
            allCustomer
        });
    }
    else {
        res.redirect("/login/signin");
    }

}

exports.GetaddCustomer = async (req,res, next) =>{
    var isLoggedIn = false

    if (req.session.user != null) {
        isLoggedIn = true
        res.render("customer/addCustomer", {
            isLoggedIn,
            account: req.session.user,
        });
    }
    else {
        res.redirect("/login/signin");
    }
}

exports.PostAddCustomer= async(req, res,next) =>{
    var isLoggedIn = false
    const Kh={
        HoTen: req.body.HoTen,
        DiaChi: req.body.DiaChi,
        SDT: req.body.SDT,
        SoFax: req.body.SoFax,
        Email: req.body.Email
    }
    customerM.insertOneCustomer(Kh)
    if (req.session.user != null) {
        isLoggedIn = true
        res.redirect('/customer')
    }
}

exports.DetailCustomer  = async (req, res, next) => {
    var isLoggedIn = false

    const Customer= await customerM.getOneCustomer(req.query.id)
  
    cus=Customer[0]
    if (req.session.user != null) {
        isLoggedIn = true
        res.render("customer/detailCustomer", {
            isLoggedIn,
            account: req.session.user,
            cus
        });
    }
    else {
        res.redirect("/login/signin");
    }

}