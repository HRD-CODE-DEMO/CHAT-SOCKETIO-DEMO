package com.saravit.model;

public class Message {
	private int clientSourceID;
	private int clientTargetID;
	private String msg;
	
	public int getClientSourceID() {
		return clientSourceID;
	}
	public void setClientSourceID(int clientSourceID) {
		this.clientSourceID = clientSourceID;
	}
	public int getClientTargetID() {
		return clientTargetID;
	}
	public void setClientTargetID(int clientTargetID) {
		this.clientTargetID = clientTargetID;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
