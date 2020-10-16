const Menu = require("../../models/menu");

function homeController() {
    return {

        // async index(req, res) {      OR
        index: async (req, res) => {

            const pizzas = await Menu.find();
            // console.log(pizzas);
            res.render('home', { pizzas: pizzas });

            // Menu.find().then((pizzas) => {
            //     console.log(pizzas);
            //     res.render('home', { pizzas: pizzas });
            // })

        }

    }
}

module.exports = homeController;