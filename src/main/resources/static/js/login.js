/**
 * 
 */

var socketServerUrl = location.protocol+"//"+location.hostname+":9000";
var nspChat = socketServerUrl + "/chat";
var socketOptions= {
		upgrade:false,
		transports:['websocket','flashsocket','htmlfile','xhr-polling','jsonp-polling']
};
var socket = io.connect(nspChat, socketOptions);

socket.on('connect',function(){
	console.log('connected!');
});

$("#btn-join").on('click',function(user){
	var id = Math.floor(Math.random()*10000);
	var u = {
		user_id:id,
		user_name:$("#userName").val(),
		online:true,
		password:$("#userPassword").val()
	};
	socket.emit('join', u, function(){
		console.log("joied");
	});
});

socket.on('online-users', function(users){
	console.log(users);
});

//-------Generate UUID-----------------------
//function createGuid()  
//{  
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
//      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
//      return v.toString(16);  
//   });  
//}  
  
