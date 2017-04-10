  
    	window.onload=function(){
    		var vm=new Vue({
    			el:'#box',
    			data:{
    				  userinfo:{
                      username:'',
                      flag:'',
                      state:'',
                      createTime:'',
                      userPassword:'',
                      userId:''
    				},
    				rg:{
                    rgUser:'',
                    rgPassword:'',
                    rgnickName:'',
                    rgImgeURL:'',
                    userImage:''
    				},
    				/*记录当前需要删除的id*/
    			   seriNum:-1,
    			   //总共多少页
    			   totalNum:-1,
    			   //初始时当前的页数
       			   row:1,
       			   //每页显示多少行
    			   size:3,
    			   //判断是不是第一次初始化
    			   flag:1,
    			},
    			methods:{
                     getInfo:function(){
		                       this.$http.jsonp(
		                               	  	      userSta,
		                               	  	      {//参数配置
		                               	  	      params:{
		                               	  	      	//每页显示多少行
		                               	  	         size:this.size,
		                               	  	         //当前是第几列
		                               	  	         row:this.row
		                               	  	      },
		                               	  	        jsonp:'callback',
		                               	  	      }
		                               			 ).then(function(res){
		                               			 	//数据设置
		                               			   this.totalNum=res.data.totalNum;
		                                           this.userinfo=res.data.userinfo;
		                                           if(this.flag==1){
		                                           	 initPage(this.totalNum,this.size);//总页数
		                                           	 this.flag++;
		                                           }
		                                          
		                              			 }, function(res){
		                              			 	//跳转到最外层的页面
		           	 	                            top.location.href=i+"/Admin/idx/index.html";
		           	 	                          //  self.location='./login.html'; 
		                                           //  alert("获取信息出错,请联系波哥");
		                             			 })
		                              },
		                               deleteUser:function(index){
		                              	//获取当前删除的Id
		                                   var msg = "您真的确定要删除吗？\n\n请确认！";
											if (confirm(msg)==true){
											alert("123");
										    this.seriNum=this.userinfo[index].userId
											this.doDelete(index); 
											return true;
											}else{
											return false;
											}
                                          
		                              },
		                              doDelete:function(index){
		                              	 this.$http.jsonp(
		                               	  	      deleteUserSta,
		                               	  	      {//参数配置
		                               	  	      params:{
		                               	  	      userId:this.seriNum
		                               	  	      },
		                               	  	        jsonp:'callback',
		                               	  	      }
		                               	 	  //   emulateJSON: true,
		                               			 ).then(function(res){
		                               			 	//数据设置
		                               			 	//alert(res.data.state());
		                                             // alert("波哥提示您,删除成功");
		                                              //删除成功后
		                                              alert(index);
		                                              this.userinfo.splice(index,1);
		                              			 }, function(res){	 
		                                             alert("波哥提示您,删除失败");
		                                             $("#box").text(res.data);
		                             			 })
		                              },
		                              alter:function(index){
		                              	alterUser(this.userinfo[index]);
		                              }
    			            }
    			})
               
    		 function alterUser(user){
    		           $("#userId").val(user.userId);
                       $("#userNameAl").val(user.username);
		               $("#userPasswrodAl").val(user.userPassword);
		               $("#nickNameAl").val(user.nickName);
		               if(user.userImage!=null){
                            //有无图片的问题
                            alert(user.userImage);
		               }else{
                           
		               }
    		 }

            //提交的点击事件,上传form表单
             $("#submit").click(function(){
             	alert("1231");
                     //获取前端数据
                      var formData = new FormData();
				       for(var i=0;i<$("#imgURL")[0].files.length;i++){
				       	//将文件添加到数据
				       	formData.append('file',$("#imgURL")[0].files[i]); 
				       }
				       formData.append("username",$("#userName").val());
		               formData.append("password",$("#userPasswrod").val());
		               formData.append('nickName',$("#nickName").val());
		               $.ajax({
		               	 	type:"post",
				            url:addUserSta,
				            async:true,
				            contentType: false,    //这个一定要写
				            processData: false, //这个也一定要写，不然会报错
				            data:formData,
				            dataType:'json',    //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
				            success:function(data){
				              alert(data.statu);
				            },
				            error:function(XMLHttpRequest, textStatus, errorThrown, data){
				                alert(errorThrown);
				            }            
		               })

             })

             
          //修改提交的点击事件,上传form表单
             $("#submitAl").click(function(){
                     //获取前端数据
                     alert(13412);
                      var formData = new FormData();
				       for(var i=0;i<$("#imgURLAl")[0].files.length;i++){
				       	//将文件添加到数据
				       	formData.append('file',$("#imgURLAl")[0].files[i]); 
				       }
				        formData.append('userId',$('#userId').val());
				       formData.append("username",$("#userNameAl").val());
		               formData.append("password",$("#userPasswrodAl").val());
		               formData.append('nickName',$("#nickNameAl").val());
		               $.ajax({
		               	 	type:"post",
				            url:alterUserSta,
				            async:true,
				            contentType: false,    //这个一定要写
				            processData: false, //这个也一定要写，不然会报错
				            data:formData,
				            dataType:'json',    //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
				            success:function(data){
				              alert(data.statu);
				            },
				            error:function(XMLHttpRequest, textStatus, errorThrown, data){
				                alert(errorThrown);
				            }            
		               })

             })
   
             function initPage(totalNum,size){
				               layui.config({
								base: 'plugins/layui/modules/'
							});

							layui.use(['icheck', 'laypage','layer'], function() {
								var $ = layui.jquery,
									laypage = layui.laypage,
									layer = parent.layer === undefined ? layui.layer : parent.layer;
								$('input').iCheck({
									checkboxClass: 'icheckbox_flat-green'
								});

								//page
								laypage({
									cont: 'page',
									pages: totalNum //总页数
										,
									groups: size//连续显示分页数
										,
									jump: function(obj, first) {
										//得到了当前页，用于向服务端请求对应数据
										var curr = obj.curr;
										if(!first) {
											//layer.msg('第 '+ obj.curr +' 页');
											vm.row=obj.curr;
											vm.getInfo();
										}
									}
								});

								$('#search').on('click', function() {
									parent.layer.alert('你点击了搜索按钮')
								});

							/*	$('#add').on('click', function() {
									$.get('temp/edit-form.html', null, function(form) {
										layer.open({
											type: 1,
											title: '添加表单',
											content: form,
											btn: ['保存', '取消'],
											area: ['600px', '400px'],
											maxmin: true,
											yes: function(index) {
												console.log(index);
											},
											full: function(elem) {
												var win = window.top === window.self ? window : parent.window;
												$(win).on('resize', function() {
													var $this = $(this);
													elem.width($this.width()).height($this.height()).css({
														top: 0,
														left: 0
													});
													elem.children('div.layui-layer-content').height($this.height() - 95);
												});
											}
										});
									});
								});*/

								$('#import').on('click', function() {
									var that = this;
									var index = layer.tips('只想提示地精准些', that,{tips: [1, 'white']});
									$('#layui-layer'+index).children('div.layui-layer-content').css('color','#000000');
								});

								$('.site-table tbody tr').on('click', function(event) {
									var $this = $(this);
									var $input = $this.children('td').eq(0).find('input');
									$input.on('ifChecked', function(e) {
										$this.css('background-color', '#EEEEEE');
									});
									$input.on('ifUnchecked', function(e) {
										$this.removeAttr('style');
									});
									$input.iCheck('toggle');
								}).find('input').each(function() {
									var $this = $(this);
									$this.on('ifChecked', function(e) {
										$this.parents('tr').css('background-color', '#EEEEEE');
									});
									$this.on('ifUnchecked', function(e) {
										$this.parents('tr').removeAttr('style');
									});
								});
								$('#selected-all').on('ifChanged', function(event) {
									var $input = $('.site-table tbody tr td').find('input');
									$input.iCheck(event.currentTarget.checked ? 'check' : 'uncheck');
								});
							});
				           }

        //初始化调用
    		vm.getInfo();


    		
    	}
        


  