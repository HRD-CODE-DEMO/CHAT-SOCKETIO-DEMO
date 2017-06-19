package com.saravit.controller.socketIO;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.saravit.model.Message;
import com.saravit.model.User;

@Component
public class ChatController {
	private SocketIONamespace nsp;
	private Map<SocketIOClient, User> chatUsers=new HashMap<>();
	
	@Autowired
	public ChatController(SocketIOServer server){
		this.nsp = server.addNamespace("/chat");
		this.nsp.addConnectListener(onConnectEvent);
		this.nsp.addDisconnectListener(onDisconnectEvent);
		this.nsp.addEventListener("message", Message.class, onChatEvent);
		this.nsp.addEventListener("join", User.class, onJoinEvent);
	}
	
	private ConnectListener onConnectEvent = new ConnectListener() {
		
		@Override
		public void onConnect(SocketIOClient client) {
			System.out.println("Connected to /chat namespace: "+client.getSessionId());
		}
	};
	
	private DisconnectListener onDisconnectEvent = new DisconnectListener() {
		
		@Override
		public void onDisconnect(SocketIOClient client) {
			// TODO Auto-generated method stub
			System.out.println("Disconnected from /chat namespace:"+client.getSessionId());
			chatUsers.remove(client);
			nsp.getBroadcastOperations().sendEvent("online-users", chatUsers);
		}
	};
	
	private DataListener<Message> onChatEvent = new DataListener<Message>() {
		
		@Override
		public void onData(SocketIOClient client, Message msg, AckRequest ack) throws Exception {
			// TODO Auto-generated method stub
			nsp.getBroadcastOperations().sendEvent("message", client, msg);
			User u=chatUsers.get(client);		
			System.out.println("Send Message From /User:"+u.getUser_id()+" ,"+u.getUser_name());
			System.out.println("Chat /chat namspace:"+msg);
			ack.sendAckData("Message sent!");
		}
	};
	
	private DataListener<User> onJoinEvent = new DataListener<User>() {
		@Override
		public void onData(SocketIOClient client, User user, AckRequest ack) throws Exception {
			// TODO Auto-generated method stub
			chatUsers.put(client, user);
			System.out.println("/User joined:"+user.getUser_name());
			nsp.getBroadcastOperations().sendEvent("join", client, user);
			nsp.getBroadcastOperations().sendEvent("online-users", chatUsers);
		}
	};
	
}
