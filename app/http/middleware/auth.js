function auth (req,res) {
    if(req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/login')
}

module.exports = auth