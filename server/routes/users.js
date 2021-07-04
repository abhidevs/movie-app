const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {
    // console.log("Someone sent register info");

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    // console.log("someone sent login info");

    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

                // console.log(req.body, err, isMatch);
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("movie_app_authExp", user.tokenExp, { maxAge: 60 * 60 * 1000 * 8760, httpOnly: true });
                res
                    .cookie("movie_app_auth", user.token, { maxAge: 60 * 60 * 1000 * 8760, httpOnly: true })
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
                // console.log(req.body, user);
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        res.clearCookie("movie_app_auth");
        res.clearCookie("movie_app_authExp");
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
