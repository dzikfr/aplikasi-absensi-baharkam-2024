const User = require('../models/userModel');


//required
//username(string), password(string), role(enum:{default:admin})


//POST 
//port/api/user/
const createUser = async (req, res) => {

};


//GET
//port/api/user/
const getAllUser = async (req, res) => {

};


//GET
//port/api/user/:id
const getUser = async (req, res) => {

};


//PUT
//port/api/user/:id
const updateUser = async (req, res) => {

};


//DELETE
//port/api/user/:id
const deleteUser = async (req, res) => {

};

module.exports = {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
}