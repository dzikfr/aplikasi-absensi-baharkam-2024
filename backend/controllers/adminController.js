const Admin = require('../models/adminModel');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

//required
//username(string), password(string), role(enum), satuan(enum(admin))


//POST 
//port/api/admin/
const createAdmin = async (req, res) => {
    try {
        //checking data required
        if (!req.body.username || !req.body.password || !req.body.role) {
            return res.status(400).send({
                message: 'Required fields are missing'
            });
        }

        //create new user
        const newAdmin = {
            username: req.body.username,
            password: req.body.password,
            satuan: req.body.division,
        };

        //encrypt password
        newAdmin.password = await hashPassword(newAdmin.password);

        //create user
        const user = await Admin.create(newAdmin);

        //START WRITEFILE ON ASSETS
        const { username, password } = req.body;
        const filePath = path.join(__dirname, '../assets/data/user.json');
        let usersData = [];

        //check if file exists
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            usersData = JSON.parse(data);
        }

        //push new user
        usersData.push(newAdmin);

        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2), 'utf8');
        //END WRITEFILE ON ASSETS

        //send response
        return res.status(201).send({
            message: "Admin created",
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
//port/api/admin/
const getAllAdmin = async (req, res) => {
    try {
        const admin = await Admin.find();
        return res.status(200).send({message: 'Admins found', status: 200, data: admin});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//GET
//port/api/admin/:id
const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).send({ message: 'Admin not found' });
        }
        return res.status(200).send({message: 'Admin found', status:200, data: admin});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//PUT
//port/api/admin/:id
const updateAdmin = async (req, res) => {
    try {
        //update admin
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
    
        //send response if admin not found
        if (!updatedAdmin) {
            return res.status(404).send({ message: 'admin not found' });
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
        const userIndex = usersData.findIndex(user => user.username === updatedAdmin.username);
       
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
        return res.status(200).send({ message: 'Admin updated', status: 200, data: updatedAdmin });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
};


//DELETE
//port/api/admin/:id
const deleteAdmin = async (req, res) => {
    try {
        //delete user
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

        //send response if user not found
        if (!deletedAdmin) {
            return res.status(404).send({ message: 'Admin not found' });
        }

        //START DELETE DATA ON ASSETS.JSON
        const filePath = path.join(__dirname, '../assets/data/user.json');
        let usersData = [];
          
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            usersData = JSON.parse(data);
        }
         
        usersData = usersData.filter(user => user.username !== deletedAdmin.username);
         
        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2), 'utf8');
        //END DELETE DATA ON ASSETS.JSON

        //send response
        res.status(200).send({ message: 'Admin deleted', status: 200, data: deletedAdmin });
        
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
    createAdmin,
    getAllAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
}