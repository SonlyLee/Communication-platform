$('#loginForm').ajaxForm(function(data) {
	if(data == true){
		window.location.href="/designProject/index.html";
	}
	else{
		alert("用户名或密码错误！");
		$('#user_mail').val(null);
		$('#user_pass').val(null);
		
	}
}); 


function check(){
	if(document.getElementById("user_mail").value == ""){
		$("#null_mail").css("display", "block");
		return false;
	}
	if(document.getElementById("user_mail").value == ""){
		$("#null_password").css("display", "block");
		return false;
	}
	
	if($('#rememberMe').is(':checked')) {
		$("#rememberTag").val(1);
		return true;
	}
	else{
		$("#rememberTag").val(0);
		return true;
	}
	return true;
}

