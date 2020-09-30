const Menu = require('../../models/menu')

function homeController() {
    return {
        index(req,res,next) {
            Menu.find().then(function(pizzas) {
                console.log(pizzas);
                return   res.render('home',{ pizzas: pizzas })
            })
          
        }
    }
}

module.exports = homeController