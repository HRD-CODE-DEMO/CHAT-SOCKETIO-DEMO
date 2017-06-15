package com.saravit.model;

import java.util.UUID;

public class Message {
	private UUID clientSourceID;
	private UUID clientTargetID;
	private String msg;
	public Message(UUID clientSourceID, UUID clientTargetID, String msg) {
		super();
		this.clientSourceID = clientSourceID;
		this.clientTargetID = clientTargetID;
		this.msg = msg;
	}
	public UUID getClientSourceID() {
		return clientSourceID;
	}
	public void setClientSourceID(UUID clientSourceID) {
		this.clientSourceID = clientSourceID;
	}
	public UUID getClientTargetID() {
		return clientTargetID;
	}
	public void setClientTargetID(UUID clientTargetID) {
		this.clientTargetID = clientTargetID;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
