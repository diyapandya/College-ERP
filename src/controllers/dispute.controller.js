const Dispute = require("../models/dispute.model")

exports.raiseDispute = async(req,res)=>{
  const d = await Dispute.create(req.body)
  res.json(d)
}

exports.getDisputesByStudent = async(req,res)=>{
  res.json(await Dispute.find({studentId:req.params.studentId}))
}

exports.resolveDispute = async(req,res)=>{
  res.json(await Dispute.findByIdAndUpdate(req.params.disputeId,req.body,{new:true}))
}
