/**
 * Date : 17/06/2017
 * Author : Soeng Saravit
 */

var socketServerUrl = location.protocol+"//"+location.hostname+":9000";
var nspChat = socketServerUrl + "/chat";
var socketOptions= {
		upgrade:false,
		transports:['websocket','flashsocket','htmlfile','xhr-polling','jsonp-polling']
};
var socket = io.connect(nspChat, socketOptions);
var id = 0;
var target_id;
var users_joined;

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
	users_joined=users;
	console.log(users);
	$("#my-table").empty();
	var table = "<thead><tr><td>#</td><td>User Name</td><td>Status</td><td>Action</td></tr>";
	var data = "";
	for(var u in users){
		if(id!=users[u]["user_id"]){
			data += "<tbody><tr><td class='id'>"+users[u]["user_id"]+"</td><td class='user_name'>"+users[u]["user_name"]+"</td>";
			data += "<td class='online'>Online</td><td><button class='btn btn-success' id='addClass'>Chat <span class='glyphicon glyphicon-comment'></span></button></td></tr></tbody>";
		}
	}
	$("#my-table").append(table,data);
});

socket.on('message', function(message){
	if(message["clientTargetID"]==id){
		getMessage(message["msg"]);
		target_id = message["clientSourceID"];	
		for(var u in users_joined){
			if(users_joined[u]["user_id"]==message["clientSourceID"]){
				var un = users_joined[u]["user_name"];
				$("#target-user").text(un);
			}
		}
	}
});

$('#my-table').on('click','#addClass', function() {
	target_id = $(this).parent().siblings('.id').text();
	var user_name = $(this).parent().siblings('.user_name').text();
	$("#target-user").text(user_name);
	$('#qnimate').addClass('popup-box-on');
});
	
$("#removeClass").click(function () {
    $('#qnimate').removeClass('popup-box-on');
});
 
$("#txt-message").keyup(function(event){
	 if(event.keyCode == 13){
		 var m = $("#txt-message").val();
		 sourceMessage(m);
		 $("#txt-message").val("");
		 
		 var message = {
				 clientSourceID: id,
				 clientTargetID: target_id,
				 msg: m
		 };
		 socket.emit('message', message, function(mes){
				console.log(mes);
			});
	 }
 });
 
 function sourceMessage(msg){
	 var element = "<div class='source-message'>"+msg+"</div>";
	 $("#message-box").append(element);
	 autoScrollToBottom();
 }
 
 function getMessage(message){
	 var element = "<div class='sender-message'>"+message+"</div>";
	 $("#message-box").append(element);
	 $('#qnimate').addClass('popup-box-on');
	 autoScrollToBottom();
 }  

 function autoScrollToBottom(){
	 var wtf    = $('.direct-chat-messages');
	 var height = wtf[0].scrollHeight;
	 wtf.scrollTop(height);
 }

//--------------Generate UUID-----------------------
 
//function createGuid()  
//{  
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
//      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
//      return v.toString(16);  
//   });  
//}  
