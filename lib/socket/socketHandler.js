
var express = require('express')
var app = express();
var http = require('http').Server(app);
// var roomSchema = require('./roomSchema')
// var messageSchema = require('./messageSchema')


module.exports = function (io) {
	users = [];
	var connectedUser = []
	io.on('connection', function (socket) {
		console.log('User connected', socket.id);
		var id = socket.id;

		socket.on('roomCreate', function (obj) {
			var data = [];
			data.push(obj.myId);
			data.push(obj.userId);
			roomSchema.findOne({ participants: { $all: data } }, (err, roomData) => {
				if (err) {
					console.log(err)
				}
				else if (!roomData) {
					var newRoom = new roomSchema({ participants: data })
					newRoom.save(function (error, data) {
						if (error) {
							console.log("error", error)
						}
						else {
							socket.emit('roomResponse', data)
						}
					})
				} else {
					socket.emit('roomResponse', roomData)
				}
			})

		})

		socket.on('createGroup', function (data1) {
			console.log(data1)
			var user = new roomSchema(data1)
			user.save((err, data) => {
				if (err) {
					console.log(err)
				} else {
					console.log(data)
					socket.emit('groupResponce', data)
				}
			})
		})

		socket.on('chatData', function (data) {
			roomSchema.findOne({ _id: data.roomId }).then((result) => {
				let receiverId = result.participants.filter(function (data2) {
					if (data2 != data.senderId) {
						return data2
					}
				})
				console.log("in receriver id", receiverId)
				var user = new messageSchema(data)
				user.receiverId = receiverId
				user.save(function (error, chatData) {
					if (error) {
						console.log("error", error)
					}
					else {
						messageSchema.findOne({ _id: chatData._id }).populate('senderId').then((result1) => {
							io.emit("chatResponse", result1)
						})
					}
				})
			})
		})
	})
}
















	