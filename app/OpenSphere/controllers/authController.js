const User = require("../models/User");
const bcrypt = require("bcrypt");

function showLogin(req, res){
    res.render("auth/login.ejs");
}

function showRegister(req, res){
    res.render("auth/register.ejs");
}

async function register(req, res){
    let {username, password} = req.body;
    username = username.trim();
    password = password.trim();

    if(!username){
        return res.status(400).render("auth/register.ejs", { error: "Username is required." });

    }
    if(!password){
        return res.status(400).render("auth/register.ejs", { error: "Password is required." });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).render("auth/register.ejs", { error: "Username is already taken." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });

        res.render("auth/registerSuccess.ejs");
    } catch (error) {
        console.error(error);
        res.status(500).render("auth/register.ejs", { error: "An error occurred during registration." });
    }
}

async function login(req, res){
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).render("auth/login.ejs", { error: "Invalid username or password." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).render("auth/login.ejs", { error: "Invalid username or password." });
        }

        req.session.userId = user.id;
        req.session.username = user.username;

        res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).render("auth/login.ejs", { error: "An error occurred. Please try again." });
    }
}

function logout(req, res){
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect("/");
    });
}

module.exports = {showLogin, showRegister, register, login, logout};