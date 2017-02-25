$('#registerForm').ajaxForm(function(data) {
	if(data == true){
		alert("注册成功！");
		window.location.href="/tccp/signIn.html";
	}
	else{
		alert("邮箱已被占用，请使用其他邮箱重新注册！");
		
	}
}); 

$Register = {
	is_same : function(){
		var password1 = document.getElementById('password1');
		var password2 = document.getElementById('password2');
		var text_same = document.getElementById('text_same');
		if(password1.value == password2.value) {
			text_same.style.display = "none";
		}
		else {
			text_same.style.display = "block";
		}
	},
	is_username : function(){
		var username = document.getElementById('username').value;
		var textname = document.getElementById("wrong_name");
		var val = /^[\w-]{6,12}/;
		if(val.test(username)){
			textname.style.display = "none";
		}
		else{
			textname.style.display = "block";
		}
	},
	is_pwd : function(){
		var pwd = document.getElementById("password1").value;
		var text_pwd = document.getElementById("text_pwd");
		if(pwd.length >= 6 && pwd.length <= 16)
		{
			text_pwd.style.display = "none";
		}
		else{	
			text_pwd.style.display = "block";
		}
	},
	is_phone : function(){
		var phone = document.getElementById("private_phone").value;
		var text_phone = document.getElementById("text_phone");
		var val =  /^(13[0-9]{9})|(15[89][0-9]{8})$/;
		if(val.test(phone)){
			text_phone.style.display = "none";
		}
		else{
			text_phone.style.display = "block";
		}
	},
	checkRegister : function(){
		var name_format = /^[\w-]{6,12}/;
		var user_name = document.getElementById("username").value;
		if(!name_format.test(user_name)){
			return false;
		}
		var user_pass1 = document.getElementById("password1").value;
		var user_pass2 = document.getElementById("password2").value;
		if(user_pass1.length < 6 || user_pass1.length > 16){
			return false;
		}
		if(user_pass1 != user_pass2){
			return false;
		}
		return true;
	}
}
/*
function checkRegister(){
	var name_format = /^[\w-]{6,12}/;
	var user_name = document.getElementById("username").value;
	if(!name_format.test(user_name)){
		return false;
	}
	var user_pass1 = document.getElementById("password1").value;
	var user_pass2 = document.getElementById("password2").value;
	alert(user_pass1 + user_pass2);
	if(user_pass1.length < 6 || user_pass1.length > 16){
		return false;
	}
	if(user_pass1 != user_pass2){
		return false;
	}
	return true;
}*/



 


