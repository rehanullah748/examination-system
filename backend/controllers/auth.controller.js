const userModel = require("../models/auth.model");
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schoolModel = require("../models/school.model");
class Auth {
async register(req, res) {
const errors = validationResult(req)
try {
    if(errors.isEmpty()) {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.findOne({email})
    if (!user) {
        await userModel.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(200).json({msg: "user created"})
    } else {
        console.log("already exist")
        return res.status(404).json({error: "user already exist"})
    }
    } else {
        console.log("error exist")
        return res.status(400).json({errors: errors.array()})
    }
    
} catch (error) {
    console.log(error)
    return res.status(500).json({msg: "server internal error"})
}
}
async login (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
              res.cookie("examUser",token,{maxAge: 1000 * 60 * 60 * 24 * 7, domain:"localhost", httpOnly: true, sameSite:true})
        return res.status(200).json({ logdIn: "logdIn successfully", token });
        } else {
          return res.status(400).json({ error: "wrong credintials" });
        }
      } else {
        return res.status(404).json({ error: "wrong credintials" });
      }
    }
    return res.status(400).json({ errors: errors.array() });
}



logOut (req, res) {
  try {
    res.clearCookie("examUser", {domain: "localhost", httpOnly: true})
    return res.status(200).json({msg: "you are logged out"})
  } catch (error) {
    res.status(500).json({error: "server internal error"})
  }
}

async getProfile (req, res) {
  const {email} = req.query;
  try {
    const user = await userModel.findOne({email}).select("-password").populate("school")
    console.log(user)
    if(!user) {
      return res.status(404).json({error: "user not found"})
    } else {
      return res.status(200).json(user)
    }
  } catch (error) {
    res.status(500).json({error: "server internal error"})
  }
  }
  async updateImage  (req, res)  {
    const {userId, imageURL} = req.body;
    console.log(userId,imageURL)
    try {
   await userModel.findByIdAndUpdate(userId, {image: imageURL})
   return res.status(200).json({msg: "image has been updated"})
    } catch (error) {
      res.status(500).json({error: "server internal error"})
    }
  }

  async createSchool (req, res) {
    const errors = validationResult(req)
    try {
        if(errors.isEmpty()) {
          const { name, address, district, userId } = req.body;
        
        const check_user = await schoolModel.findOne({user: userId})
        if(check_user) {
          return res.status(400).json({error: "sorry you have already a school"})
        }
        
           const createdSchool = await schoolModel.create({
                user: userId,
                name,
                address,
                district,
            })
            
            await userModel.findByIdAndUpdate({school: createdSchool._id})
            return res.status(200).json({msg: "school created"})
        
        } else {
            
            return res.status(400).json({errors: errors.array()})
        }
        
    } catch (error) {
        
        return res.status(500).json({msg: "server internal error"})
    }
    }

    async updateSchool (req, res) {
    
      const { _id, user } = req.body;
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          if (_id === "" || !_id) {
              return res.status(400).json({ msg: "id is required" })
          }
          else {
              try {
                  const result = await schoolModel.findOneAndUpdate({$and:[{_id},{user}]}, req.body)
                  return res.status(200).json({ msg: "school updated" })
              }
              catch (error) {
                  return res.status(500).json({ error: error.message })
              }
          }
      } else {
          return res.status(400).json({ errors: errors.array() })
      }
  
  }
  
}


module.exports = new Auth()
