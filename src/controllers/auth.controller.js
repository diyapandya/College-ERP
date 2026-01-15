const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
  const {name,email,password,role,linkedStudentId} = req.body
  const hash = await bcrypt.hash(password,10)

  const user = await User.create({name,email,password:hash,role,linkedStudentId})
  res.json(user)
}

exports.login = async(req,res)=>{
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(401).json("User not found")

  const ok = await bcrypt.compare(password,user.password)
  if(!ok) return res.status(401).json("Wrong password")

  const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
  res.json({token,role:user.role,user})
}
