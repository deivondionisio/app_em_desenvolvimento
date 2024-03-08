const express = require('express');
const router = express.Router();
const passport = require("passport")


router.get('/', function(req, res) {
    res.render('login');
});

router.post("/", ((req, res, next) => {
    passport.authenticate("local", {
        successRedirect:"/action-panel",
        failureRedirect:"/falhaLogin",
        failureFlash:true
    })(req, res, next)
}))




module.exports = router;
