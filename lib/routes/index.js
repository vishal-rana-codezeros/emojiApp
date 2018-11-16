var userRouter = require('../user/userRoute') 
module.exports = function(app)
{

	// console.log("Into Router-Index")
	app.use('/user',userRouter);
}

