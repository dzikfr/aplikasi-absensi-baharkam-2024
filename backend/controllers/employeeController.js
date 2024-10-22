const Employee = require('../models/employeeModel');
const fs = require('fs');
const path = require('path');

//required
//nip(number), name(string), pangkat(enum), jabatan(enum), satuan(enum)


//POST 
//port/api/employee/
const createEmployee = async (req, res) => {
    try {
        //checking data required
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

        //create new employee
        const newEmployee = {
            nip: req.body.nip,
            name: req.body.name,
            pangkat: req.body.pangkat,
            jabatan: req.body.jabatan,
            satuan: req.body.satuan
        }

        //create employee
        const employee = await Employee.create(newEmployee);


        //START WRITEFILE ON ASSETS
        const {nip, name, pangkat, jabatan, satuan} = req.body;
        const filePath = path.join(__dirname, '../assets/data/employee.json');

        let employeesData = [];
        if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        employeesData = JSON.parse(data);
        }
        employeesData.push({ nip, name, pangkat, jabatan, satuan });
        fs.writeFileSync(filePath, JSON.stringify(employeesData, null, 2), 'utf8');
        //END WRITEFILE ON ASSETS


        //send response
        return res.status(201).send({message: "Employee created", status: 200, data: employee});

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
        return res.status(200).send({message: 'Employees found', status: 200, data: employees});

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
        return res.status(200).send({message: 'Employee found', status:200, data: employee});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};


//PUT
//port/api/employee/:id
const updateEmployee = async (req, res) => {
    try {
        //update employee
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
    
        //send response if employee not found
        if (!updatedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
    
        //START UPDATE DATA ON ASSETS
        const filePath = path.join(__dirname, '../assets/data/employee.json');
        let employeesData = [];
       
        //check if file exists
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            employeesData = JSON.parse(data);
        }   
       
        //find index
        const employeeIndex = employeesData.findIndex(employee => employee.nip === updatedEmployee.nip);
       
        //update data
        if (employeeIndex !== -1) {
            employeesData[employeeIndex] = {
                ...employeesData[employeeIndex],
                ...req.body,
            };
        }
       
        fs.writeFileSync(filePath, JSON.stringify(employeesData, null, 2), 'utf8');
        //END UPDATE DATA ON ASSETS

        //send response
        return res.status(200).send({ message: 'Employee updated', status: 200, data: updatedEmployee });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
};


//DELETE
//port/api/employee/:id
const deleteEmployee = async (req, res) => {
    try {
        //delete employee
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

        //send response if employee not found
        if (!deletedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        //START DELETE DATA ON ASSETS.JSON
        const filePath = path.join(__dirname, '../assets/data/employee.json');
        let employeesData = [];
         
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            employeesData = JSON.parse(data);
        }
        
        employeesData = employeesData.filter(employee => employee.nip !== deletedEmployee.nip);
        
        fs.writeFileSync(filePath, JSON.stringify(employeesData, null, 2), 'utf8');
        //END DELETE DATA ON ASSETS.JSON

        //send response
        res.status(200).send({ message: 'Employee deleted', status: 200, data: deletedEmployee });
        
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