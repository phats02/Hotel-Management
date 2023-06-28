
exports.allCustomer = async (req, res, next) => {
    var isLoggedIn = false
    if (req.session.user != null) {
        isLoggedIn = true
        res.render("customer/customer", {
            isLoggedIn,
            account: req.session.user
        });
    }
    else {
        res.redirect("/login/signin");
    }

}