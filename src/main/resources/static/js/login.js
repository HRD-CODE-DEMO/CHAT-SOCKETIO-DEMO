/**
 * Date: 17/06/2017
 * Author: Soeng Saravit
 */

$("#btn-join").on('click',function(user){
	var user_name = $("#userName").val();
	var password = $("#userPassword").val();

	//Remove old localStorage Data
	localStorage.removeItem("user_name");
	localStorage.removeItem("password");

	//Set New LocalStorage data
	localStorage.setItem("user_name", user_name);
	localStorage.setItem("password", password);
});