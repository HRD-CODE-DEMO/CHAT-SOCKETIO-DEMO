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
var id = 0;

socket.on('connect',function(){
	console.log('connected!');
});
window.onload = function(){
	id = Math.floor(Math.random()*10000);
	var un = localStorage["user_name"];
	var pass = localStorage["password"];
	var u = {
		user_id:id,
		user_name:un,
		online:true,
		password:pass
	};
	socket.emit('join', u, function(){
		console.log("joied");
	});
}

socket.on('online-users', function(users){
	console.log(users);
	$("#my-table").empty();
	var table = "<thead><tr><td>#</td><td>User Name</td><td>Status</td><td>Action</td></tr>";
	var data = "";
	for(var u in users){
		if(id!=users[u]["user_id"]){
			data += "<tbody><tr><td>"+users[u]["user_id"]+"</td><td>"+users[u]["user_name"]+"</td>";
			data += "<td class='online'>Online</td><td><button class='btn btn-success' id='addClass'><span class='glyphicon glyphicon-comment'></span> Chat</button></td></tr></tbody>";
		}
	}
	$("#my-table").append(table,data);
});

$('#my-table').on('click','#addClass', function() {
	$('#qnimate').addClass('popup-box-on');
});
	
 $("#removeClass").click(function () {
    $('#qnimate').removeClass('popup-box-on');
 });

//-------Generate UUID-----------------------
//function createGuid()  
//{  
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
//      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
//      return v.toString(16);  
//   });  
//}  
  
