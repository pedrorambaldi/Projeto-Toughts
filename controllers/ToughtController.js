const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtCotroller {
    static async showThoughts(req, res) {
        res.render('toughts/home')
    }
}
