 
window.onload=function(){
/*               $('#summernote').summernote();
               $('#summernote1').summernote();*/
    		  var vm=new Vue({
    			 el:'#box',
    			 data:{
    				  fileDownLoadInfo:{
                      fileName:'',
                      fileOwner:'',
                      counts:'',
                      fileDec:'',
                      time:'',
                      user:{
                      	userId:'',
                      	username:''
                      }
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
    			   //类型
    			   type:''
    			},
    			methods:{
                     getInfo:function(){
		                       this.$http.jsonp(getfileDownLoadInfoSta
		                               	  	      ,
		                               	  	      {//参数配置
		                               	  	      params:{
		                               	  	      	//每页显示多少行
		                               	  	         size:this.size,
		                               	  	         //当前是第几列
		                               	  	         row:this.row,
		                               	  	         //类型
		                               	  	         type:this.type
		                               	  	      },
		                               	  	        jsonp:'callback',
		                               	  	      }
		                               			 ).then(function(res){
		                               			 	//数据设置
		                               			   this.totalNum=res.data.totalNum;
		                                           this.fileDownLoadInfo=res.data.fileDownLoadInfo;
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
		                               deletefileDownLoad:function(index){
		                              	//获取当前删除的Id
		                                   var msg = "您真的确定要删除吗？\n\n请确认！";
											if (confirm(msg)==true){
											alert("123");
										    this.seriNum=this.fileDownLoadInfo[index].fileId
											this.doDelete(index); 
											return true;
											}else{
											return false;
											}
                                          
		                              },
		                              doDelete:function(index){
		                              	 this.$http.jsonp(
		                               	  	      deletedownLoadInfoSta,
		                               	  	      {//参数配置
		                               	  	      params:{
		                               	  	      fileId:this.seriNum
		                               	  	      },
		                               	  	        jsonp:'callback',
		                               	  	      }
		                               	 	  //   emulateJSON: true,
		                               			 ).then(function(res){
		                               			 	//数据设置
		                               			 	//alert(res.data.state());
		                                             // alert("波哥提示您,删除成功");
		                                              //删除成功后
		                                              this.fileDownLoadInfo.splice(index,1);
		                              			 }, function(res){	 
		                                             alert("波哥提示您,删除失败");
		                                             $("#box").text(res.data);
		                             			 })
		                              },
		                              alter:function(index){
		                              	alterfileDownLoad(this.fileDownLoadInfo[index]);
		                              }
		                          }
    			})
               
    		 function alterfileDownLoad(fileDownLoad){
    		 	//alert(1231);
    		 	var fileDownLoad1=JSON.stringify(fileDownLoad);
    		 	/*把对象值赋值给页面中的iframevalue*/
    		 	$("#iframevalue").val(fileDownLoad1);
    		 	 $('#textIframe1').contents().find("#clickbtn1").trigger('click');
    		       /*    $("#teamId1").val(team.teamId);
                       $("#teamName1").val(team.teamName);
		               $("#stateEnter1").val(team.stateEnter);
		               $("#stateSchool1").val(team.stateSchool);
		               $("#roomNumber1").val(team.roomNumber);
		               $("#stateEnter1").val(team.stateEnter);
		               $("#decKeyWord1").val(team.decKeyWord);
		               $("#sort1").val(team.sort);
		               $("#decContent1").val(team.decContent);
		               $("#teamType1").val(team.teamType);*/
		              // $("#deptId1").val(team.dept.deptId);
		              /* if(team.logoURL!=null){
                            
		               }else{
                           
		               }*/
    		 }
    




            //提交的点击事件,上传form表单
             $("#submit").click(function(){
                     //获取前端数据
                     if(isDebug)
                     alert(1231);
                  $('#textIframe').contents().find("#clickbtn").trigger('click');
             })

          
             
          //修改提交的点击事件,上传form表单
             $("#submitAl").click(function(){
             	 $('#textIframe1').contents().find("#ssbt").trigger('click');
                     //获取前端数据
                     /* alert($("#departmentId1").val());
				        var formData = new FormData($('#inform1')[0]);
		                $.ajax({
		               	 	type:"post",
				            url:alterTeamSta,
				            async:true,
				            contentType: false,    
				            processData: false, 
				            data:formData,
				            dataType:'json',   
				            success:function(data){
				              alert(data.statu);
				            },
				            error:function(XMLHttpRequest, textStatus, errorThrown, data){
				                alert(errorThrown);
				            }            
		               })*/

             })



   
             function initPage(totalNum,size){
				               layui.config({
								base: 'plugins/layui/modules/'
							});0

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
											vm.getInfo(vm.type);
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
            vm.type=$("#type").val();
    		vm.getInfo(vm.type);


    		
    	}
        


  