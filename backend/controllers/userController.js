const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

//required
//username(string), password(string), role(enum), satuan(enum(admin))


//POST 
//port/api/user/
const createUser = async (req, res) => {
    try {
        //checking data required
        if (!req.body.username || !req.body.password || !req.body.role) {
            return res.status(400).send({
                message: 'Required fields are missing'
            });
        }

        //create new user
        const satuan = req.body.role === 'admin' ? req.body.satuan : undefined;
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            satuan: satuan,
        };

        //encrypt password
        newUser.password = await hashPassword(newUser.password);

        //create user
        const user = await User.create(newUser);

        //START WRITEFILE ON ASSETS
        const { username, password, role } = req.body;
        const filePath = path.join(__dirname, '../assets/data/user.json');
        let usersData = [];

        //check if file exists
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            usersData = JSON.parse(data);
        }

        //add satuan if role is admin
        if (role === 'admin' && req.body.satuan) {
            newUser.satuan = req.body.satuan;
        }

        //push new user
        usersData.push(newUser);

        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2), 'utf8');
        //END WRITEFILE ON ASSETS

        //send response
        return res.status(201).send({
            message: "User created",
            status: 201,
            data: user
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message
        });
    }
};


//GET
//port/api/user/
const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).send({message: 'Users found', status: 200, data: user});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//GET
//port/api/user/:id
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({message: 'User found', status:200, data: user});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//PUT
//port/api/user/:id
const updateUser = async (req, res) => {
    try {
        //update user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
    
        //send response if user not found
        if (!updatedUser) {
            return res.status(404).send({ message: 'user not found' });
        }
    
        //START UPDATE DATA ON ASSETS
        const filePath = path.join(__dirname, '../assets/data/user.json');
        let usersData = [];
       
        //check if file exists
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            usersData = JSON.parse(data);
        }   
       
        //find index
        const userIndex = usersData.findIndex(user => user.username === updateUser.username);
       
        //update data
        if (userIndex !== -1) {
            usersData[userIndex] = {
                ...usersData[userIndex],
                ...req.body,
            };
        }
       
        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2), 'utf8');
        //END UPDATE DATA ON ASSETS

        //send response
        return res.status(200).send({ message: 'User updated', status: 200, data: updatedUser });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
};


//DELETE
//port/api/user/:id
const deleteUser = async (req, res) => {
    try {
        //delete user
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        //send response if user not found
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        //START DELETE DATA ON ASSETS.JSON
        const filePath = path.join(__dirname, '../assets/data/user.json');
        let usersData = [];
          
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            usersData = JSON.parse(data);
        }
         
        usersData = usersData.filter(user => user.username !== deletedUser.username);
         
        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2), 'utf8');
        //END DELETE DATA ON ASSETS.JSON

        //send response
        res.status(200).send({ message: 'User deleted', status: 200, data: deletedUser });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Hashing password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};


module.exports = {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
}