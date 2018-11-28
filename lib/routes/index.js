var userRouter = require('../user/userRoute')
var adminRouter = require('../admin/adminRoute')

module.exports = function (app) {
	app.use('/user', userRouter);
	app.use('/admin', adminRouter);
}

