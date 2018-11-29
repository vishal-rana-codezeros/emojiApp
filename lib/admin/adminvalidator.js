// var code=require("../responseHandler.js").http_codes
// var msg=require("../responseHandler.js").message
var jwt = require('jsonwebtoken');
var secret  ='this_is-a-secret'
// var code=require("../responseHandler.js").http_codes
// var msg=require("../responseHandler.js").message


async function verifyToken(req,res,next){
	//
	if(!req.headers.authorization){
		return res.json({message:"Please provide Tokken "})
	}else{
		let status = await jwt.verify(req.headers.authorization,secret);
		console.log(status)
		if(status){
			console.log('authorized user');
			next();
		}else{
			 return res.json({message:"Token invalid"})
		}
	}

}

function ValidateLogin(req, res, next) 
{ 
	console.log("into adminvalidator")
	if (req.body.email&& req.body.password) { 
	req.body.email = req.body.email.trim(), 
	req.body.password = req.body.password.trim(); 
	if (req.body.email && req.body.password )
	{ 
		next(); 
	} 
	else
	{ 
		return res.json({ code: code.badRequest, message: msg.invalidBody }) 
	} 
	} 
} 

function validateAdminTemplate(req, res, next)
 { 
	console.log("into admin validator")

if (req.body.name&& req.body.subject&&req.body.text&&req.body.content) { 
	req.body.name = req.body.name.trim(), 
	req.body.subject = req.body.subject.trim(), 
	req.body.text = req.body.text.trim(), 
	req.body.content = req.body.content.trim();

	if (req.body.name && req.body.subject && req.body.text && req.body.content)
	{ 
		next(); 
	} 
	else
	{ 
		return res.json({ code: code.badRequest, message: msg.errorIntoTemplateCreatation }) 
	} 
	} 

    } 
    
    module.exports=
    {
        validateAdminTemplate,
        ValidateLogin,
        verifyToken

    }