var emoji_schema = require('../schema/emojiapp')
var adminConst = require('./adminconstants')


function getAllUser(req,res)
{ 
	console.log("into admin apis>>>>>>>>>>>>>>>>>>>>>>>>>>")  
	emoji_schema.find({"role":"USER"},'_id userName fullName emailId contactNumber status loginType image',(err,data)=>{
		if(err)
		{
			return res.json({code:adminConst.CODE.BADREQUEST,message:adminConst.MESSAGE.internalServerError})
		}
		else{
			return res.json({code:adminConst.CODE.SUCCESS,message:adminConst.MESSAGE.getUserData,data:data})
		}
	})
}

function getOneUser(req,res)
{

	emoji_schema.findById({"_id":req.params.id},'_id userName fullName emailId contactNumber status loginType image',(err,data)=>{
		if(err)
		{
			return res.json({code:adminConst.CODE.BADREQUEST,message:adminConst.MESSAGE.internalServerError})
		}
		else
		{
			console.log(data)
			return res.json({code:adminConst.CODE.SUCCESS,message:adminConst.MESSAGE.getUserData,data:data})
		}
	})
}
function updateUser(req,res)
{
	let update = {};
	update['$set'] = req.body;
	
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, update, { new: true }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.INTRNLSRVRERR, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess })
		}

	})
}

function deleteUser(req,res)
{
	emoji_schema.findOneAndUpdate({"_id":req.params.id},{$set:{status:"INACTIVE"}},(err,data)=>
	{
		if (err) {

			return res.json({ code: adminConst.CODE.INTRNLSRVRERR, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.deleteUser })
		}
	})
}
module.exports=
{

	getAllUser,
	getOneUser,
	updateUser,
	deleteUser
}