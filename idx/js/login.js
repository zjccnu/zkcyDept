window.onload=function(){
   new Vue({
      el:"#box",
      data:{
      	userInfo:{
      		username:'',
      		password:''
      	}
      },
      methods:{
      	login:function(){
      		this.dologin();
      	},
      	dologin:function(){
      	  	   var formData = new FormData(); 
               formData.append('username', this.userInfo.username);
               formData.append('password', this.userInfo.password);
               this.$http.post(loginSta,
               	        formData,
				               	{
				               	  emulateJSON:true
				               	}).then(function(res){
                                      if(res.data.state==1){
                                      	top.location.href=i+"/Admin/idx/index.html";
                                      }else{
                                      	alert("波哥提示您,用户名或密码错误");
                                      }
				               	}, function(res){
                                    alert("faile");
				               	})
      			}


    		  }

   			})

}