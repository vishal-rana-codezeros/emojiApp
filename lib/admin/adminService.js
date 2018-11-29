var adminSchema = require('../schema/mailSchema')
var emoji_schema = require('../schema/emojiapp')
// var code = require("../responseHandler.js").http_codes
// var msg = require("../responseHandler.js").message
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'this_is-a-secret';

function createAdminTemplate(req,res)
{

    console.log("Into admin service")
    var user = new adminSchema(req.body)
    user.editedBy = req.params.id

    
			user.save((err,body)=>
			{
				if(err)
					{
                        console.log(err)
                        return res.json({ code: code.badRequest, message: msg.errorIntoTemplateCreatation })
			        }
				else
					{
                    console.log("template added sucessfully ")
                    return res.json({ code: 200, message: "success",body });
                    }
                })

}

async function login(req, res) {
    console.log("into admin Service")
	emoji_schema.findOne({ "Email": req.body.email }, async (err, data) => {
		if (err) {
			console.log(err)
			return res.json("Error in Login")
		}
		else {
			const match = await bcrypt.compare(req.body.password, data.Password);
			console.log(req.body.password)
			if (match) {

				console.log(data)

				const token = await jwt.sign({ Phonenumber: data.Phonenumber, id: data._id }, secret, { expiresIn: 60 * 60 });

				console.log("data in node", data._id)
				return res.json({ code: 200, msg: "login successfully", data: data, token: token })
			}
			else {
				return res.json({ code: 500, msg: "Unauthorized user" })
			}

		}
	})
}
module.exports=
{
    createAdminTemplate,
    login
}