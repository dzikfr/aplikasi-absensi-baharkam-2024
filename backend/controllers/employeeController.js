const Employee = require('../models/employeeModel');


//required
//nip(number), name(string), pangkat(enum), jabatan(enum), satuan(enum)


//POST 
//port/api/employee/
const createEmployee = async (req, res) => {
    try {
        if(
            !req.body.nip ||
            !req.body.name ||
            !req.body.pangkat ||
            !req.body.jabatan ||
            !req.body.satuan
        ){
            return res.status(400).send({
                message: 'required fields are missing'
            })
        }

        const newEmployee = {
            nip: req.body.nip,
            name: req.body.name,
            pangkat: req.body.pangkat,
            jabatan: req.body.jabatan,
            satuan: req.body.satuan
        }

        const employee = await Employee.create(newEmployee);

        return res.status(201).send(employee);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
};


//GET
//port/api/employee/
const getAllEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).send(employees);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//GET
//port/api/emplpoyee/:id
const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        return res.status(200).send({message: 'Employee found', data: employee});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//PUT
//port/api/employee/:id
const updateEmployee = async (req, res) => {
    try {
        if(
            !req.body.nip ||
            !req.body.name ||
            !req.body.pangkat ||
            !req.body.jabatan ||
            !req.body.satuan
        ){
            return res.status(400).send({
                message: 'required fields are missing'
            })
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,   
            req.body,       
            { new: true }
        );
    
        if (!updatedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
    
        return res.status(200).send({message: 'Employee updated', data: updatedEmployee});
    
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//DELETE
//port/api/employee/:id
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee deleted', data: deletedEmployee });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createEmployee,
    getAllEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
}