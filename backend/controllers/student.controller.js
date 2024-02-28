const studentModel = require("../models/student.model");
const {validationResult} = require("express-validator")
class Student {
    async CreateStudent(req, res) {
        const errors = validationResult(req)
        console.log(errors)
        try {
            if(errors.isEmpty()) {
            const { reg_no, name, f_name, address, dob, previous_school, clas, image, domicile, phone_no } = req.body;
            const student = await studentModel.findOne({reg_no})
            console.log(student)
            if (!student) {
                await studentModel.create({
                    reg_no, name, f_name, address, dob, previous_school, clas, domicile,image,phone_no, session: new Date().getFullYear()
                })
                return res.status(200).json({msg: "student created"})
            } else {
                console.log("already exist")
                return res.status(404).json({error: "student already exist"})
            }
            } else {
                return res.status(400).json({errors: errors.array()})
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "server internal error"})
        }
        }
     
       async getAllStudents (req, res)  {
            let conditions = {}
        const { session, selectclass } = req.query;
        if (session !== undefined && session !== '' && selectclass !== undefined && selectclass !== '') {
            conditions = {$and:[{session: Number(session)}, {clas: selectclass} ]};
          } else if (selectclass !== undefined && selectclass !== '') {
            conditions = { clas: selectclass };
          } else if (session !== undefined && session !== '') {
            conditions = { session:Number(session) };
          }
       
        
        console.log(conditions)
        try {
            const gotStudents = await studentModel.find(conditions)
            return res.status(200).json(gotStudents)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    
    async getStudentDetails (req, res)  {
        const { id } = req.params;
        try {
            const details = await studentModel.findById({_id: id})
            if (details) {
                return res.status(200).json(details)
            } else {
                return res.status(404).json({ msg: "details not found" })
            }
        } catch (error) {
            return res.status(400).json({ msg: error.message })
        }
    }
    
    async updateStudent  (req, res)  {
        
        const { id } = req.params;
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            if (id === "" || !id) {
                return res.status(400).json({ msg: "id is required" })
            }
            else {
                try {
                    const result = await studentModel.findByIdAndUpdate(id, req.body)
                    return res.status(200).json({ msg: "product updated" })
                }
                catch (error) {
                    return res.status(500).json({ error: error.message })
                }
            }
        } else {
            return res.status(400).json({ errors: errors.array() })
        }
    
    }
    
    async deleteStudent (req, res)  {
        const { id } = req.params;
        try {
            const result = await studentModel.findByIdAndDelete({ _id: id })
            if (!result) {
                return res.status(404).json({ msg: "product not found" })
            } else {
                return res.status(200).json({ msg: "product Deleted" })
            }
    
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
    
}
module.exports = new Student()



