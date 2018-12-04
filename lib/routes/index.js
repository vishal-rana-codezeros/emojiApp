var userRouter = require('../user/userRoute')
var adminRouter = require('../admin/adminRoute')

module.exports = function (app) {
	app.use('/emojiApp/v2/api/user', userRouter);
	app.use('/emojiApp/v2/api/admin', adminRouter);
}

