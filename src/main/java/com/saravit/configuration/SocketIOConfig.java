package com.saravit.configuration;

import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.SpringAnnotationScanner;

@Configuration
public class SocketIOConfig {

	@Value("${socket.io.host}")
	private String WS_HOST;
	@Value("${socket.io.port}")
	private int WS_PORT;
	
	@Bean
	public SocketIOServer socketIOServer(){
		com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
		config.setHostname(WS_HOST);
		config.setPort(WS_PORT);
		
		//TODO: get supported transports
		config.getTransports().forEach(transport -> {
			System.out.println("Supported Transport:"+ transport.name());
		});
		//TODO: set Maximum payload data
		config.setMaxFramePayloadLength(1*1024*1024); // Megabytes * Kilobytes * bytes 
		SocketIOServer server = new SocketIOServer(config);
		//Start Server
		server.start();
		return server;
	}
	
	// Enable Socket.IO annotation (@onConnect, onEvent, ...)
	@Bean
	public SpringAnnotationScanner springAnnotationScanner(SocketIOServer server){
		return new SpringAnnotationScanner(server);
	}
	
	@PreDestroy
	public void stopSocketIOServer(){
		socketIOServer().stop();
	}
}
