const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtCotroller {
    static async showThoughts(req, res) {
        res.render('toughts/home')
    }
    static async dashboard(req, res) {
        res.render('toughts/dashboard')
    }
}
