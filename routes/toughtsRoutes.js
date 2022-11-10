const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");

// HELPERS
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.get("/", ToughtController.showThoughts);

module.exports = router;
