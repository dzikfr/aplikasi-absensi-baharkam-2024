const User = require('../models/userModel');


//required
//username(string), password(string), role(enum:{default:admin})


//POST 
//port/api/user/
const createUser = async (req, res) => {
    try {
        if(
            !req.body.username ||
            !req.body.password ||
            !req.body.role
        ){
            return res.status(400).send({
                message: 'required fields are missing'
            })
        }

        const newUser = {
            username: req.body.nip,
            password: req.body.password,
            role: req.body.role
        }

        const user = await User.create(newUser);

        return res.status(201).send({message: "User created", status: 200, data: user});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
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
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
    
        if (!updatedEmployee) {
            return res.status(404).send({ message: 'user not found' });
        }
    
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
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted', status: 200, data: deletedUser });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
}