function cartController() {
    return {
        index(req,res,next) {
            res.render('customers/cart')
        }
    }
}

module.exports = cartController