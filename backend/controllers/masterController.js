const Master = require("../models/masterModel");

const registerMaster = async (req, res) => {
    try{
        const { username, password } = req.body;
        const newMaster = new Master({ username, password });
        const master = await Master.create(newMaster);
        res.status(201).json(master);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginMaster = async (req, res) => {
    try{
        const { username, password } = req.body;
        const master = await Master.findOne({ username });
        if (!master) {
            return res.status(404).json({ message: "Master not found" });
        }
        if (password !== master.password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful", data: master });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerMaster,
    loginMaster
}