const touristM = require("../models/tourist.m")

exports.allTourist = async (req, res, next) => {
    var isLoggedIn = false
    const tourist = await touristM.getAllTourist()

    if (req.session.user != null) {
        isLoggedIn = true
        res.render("tourist/tourist", {
            tourist,
            isLoggedIn,
            account: req.session.user
        });
    }
    else {
        res.redirect("/login/signin");
    }
    
}

exports.addTourist = async (req, res, next) => {
    var isLoggedIn = false
    const customer = await touristM.getAllCusTomer()

    res.render("tourist/addtourist", {
        customer,
        isLoggedIn,
        account: req.session.user
    }
    )
}

exports.addTouristDB = async (req, res, next) => {
    var isLoggedIn = false
    const str = req.body.MaKH
    const td = req.body.touristname
    const tndk = req.body.registrantname
    const number = req.body.number
    madoan = await touristM.getMax()
    madoan2 = madoan[0]['MAX(MaDoan)']
    madoan2+=1;
    id = str.split(",");
    for(i = 0; i < id.length; i++)
    {
       await touristM.addTourist(madoan2, td, tndk, number, id[i])
    }
    res.redirect('/tourist')
}

exports.TouristCustomer = async (req, res, next) => {
    var isLoggedIn = false

    const customer = await touristM.getCusTomerTourist(req.query.id)
    const DoanList = await touristM.getOneTourist(req.query.id)
    Doan=DoanList[0]

    res.render("tourist/DetailTourist", {
        Doan,
        customer,
        isLoggedIn,
        account: req.session.user
    }
    )
}
