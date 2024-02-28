const { validationResult } = require("express-validator");
const studentModel = require("../models/student.model");
const marksModel = require("../models/marks.model");

class Marks {
    async CreateMarks (req, res) {
        const errors = validationResult(req)
        if(errors.isEmpty()) {
            const {reg_no, examType, session, clas, studentId, marks} = req.body;
            const studentMarks = JSON.parse(marks)
            if(studentMarks.length === 0) {
                return res.status(400).json({error:`Please add marks at least for one subject`, type: "single"})
            }
            if(studentMarks.length === 1) {
                let error = false;
                studentMarks.forEach((item) => {
                if(item.subject === "") {
                    error = true;
                } 
                if(item.marks === "") {
                    error = true;
                }
                if(item.totalMarks === "") {
                    error = true;
                }
                } 
                )
                if(error) {
                    return res.status(400).json({error:`Please add marks at least for one subject`, type: "single"}) 
                }
            }
            try {
               const checkExam = await marksModel.findOne({$and:[{reg_no},{examType},{session},{clas}]}) 
                if(checkExam) {
                    return res.status(400).json({error:`marks has already added for ${examType}`, type: "single"})
                }
               await marksModel.create({...req.body, marks:JSON.parse(req.body.marks), student: studentId})
                return res.status(200).json({msg: 'marks added successfully'})
            } catch (error) {
                console.log(error.message)
                return res.status(500).json({error:"create marks failed"})
            }
        }
        else {
            return res.status(400).json({errors: errors.array(), type: "array"})
        }
        
    }

    async getAllStudentForMarks (req, res)  {
        let conditions = {}
    const { session, selectclass } = req.query;
    if (session !== undefined && session !== '' && selectclass !== undefined && selectclass !== '') {
        conditions = {$and:[{session: Number(session)}, {clas: selectclass} ]};
      } else if (selectclass !== undefined && selectclass !== '') {
        conditions = { clas: selectclass };
      } else if (session !== undefined && session !== '') {
        conditions = { session:Number(session) };
      } else if (session === undefined || session === '' && selectclass === undefined || selectclass === '') {
        conditions = null;
      }
   
    
    console.log(conditions)
    try {
        if(conditions === null) {
            return res.status(200).json([])
        } else {
            const gotStudents = await studentModel.find(conditions)
        return res.status(200).json(gotStudents)
        }
        

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
 async getStudentByExamType (req, res) {
const errors = validationResult(req)
const { session, reg_no, examType, clas} = req.query
if(errors.isEmpty()) {
const checkExam = await marksModel.findOne({$and:[{session}, {reg_no}, {examType}, {clas}]}) 
if(checkExam) {
   return res.status(200).json({name:"update", exam: checkExam})
} else {
    return res.status(200).json({name: "create_exam"})
}
} else {
    return res.status(400).json({error: errors.array()})
}
 }

 async updateMarks  (req, res)  {
        
   
    const errors = validationResult(req)
    if(errors.isEmpty()) {
        const {reg_no, examType, session, clas, studentId, marks, _id} = req.body;
        const studentMarks = JSON.parse(marks)
        console.log(studentMarks)
        console.log(_id)
        if(studentMarks.length === 0) {
            return res.status(400).json({error:`Please add marks at least for one subject`, type: "single"})
        }
        if(studentMarks.length === 1) {
            let error = false;
            studentMarks.forEach((item) => {
            if(item.subject === "") {
                error = true;
            } 
            if(item.marks === "") {
                error = true;
            }
            if(item.totalMarks === "") {
                error = true;
            }
            } 
            )
            if(error) {
                return res.status(400).json({error:`Please add marks at least for one subject`, type: "single"}) 
            }
        }
        try {
          
           await marksModel.updateOne({_id}, {...req.body, marks: studentMarks})
            return res.status(201).json({msg: 'marks updated successfully'})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({error:"update marks failed"})
        }
    }
    else {
        return res.status(400).json({errors: errors.array(), type: "array"})
    }
}

}
module.exports = new Marks()