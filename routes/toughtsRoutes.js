const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', ToughtController.createTought)
router.get('/dashboard', ToughtController.dashboard)
router.get('/', ToughtController.showThoughts)

module.exports = router