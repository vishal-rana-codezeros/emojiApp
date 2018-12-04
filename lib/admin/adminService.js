var emoji_schema = require('../schema/emojiapp')
var adminConst = require('./adminconstants')


function viewAllUserData(req,res)
{   
	emoji_schema.find({"role":"USER"},'_id userName fullName emailId contactNumber status loginType image',(err,data)=>{
		if(err)
		{
			return res.json({code:adminConstant.CODE.BADREQUEST,message:adminConstant.MESSAGE.internalServerError})
		}
		else{
			return res.json({code:adminConstant.CODE.SUCCESS,message:adminConstant.MESSAGE.getUserData,data:data})
		}
	})
}

function editUserData(req,res)
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

function deleteUserData(req,res)
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

	viewAllUserData,
	editUserData,
	deleteUserData
}