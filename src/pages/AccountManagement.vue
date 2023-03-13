<template>
	<div class="box">
		<div class="change">
			<p>账号:{{returndata.username}}</p>
			<input type="password" placeholder="旧密码" maxlength="12" v-model="oldPassword">
			<input type="password" placeholder="新密码(6~12位)" maxlength="12" v-model="newPassword">
			<span id="pointout">{{PointOut}}</span>
			<input type="button" value="更改密码" @click="submit">
		</div>
		
	</div>
</template>

<script lang="ts" setup>
import {ref,reactive} from 'vue'
import axios from 'axios'
const returndata=reactive({
	username:''
})
axios.post('https://443409hb31.imdo.co/index.php/verifyToken', {
	token:localStorage.getItem("token")
}).then(res => {
	console.log(res.data[0][0][0].username);
	returndata.username=ref(res.data[0][0][0].username);
}).catch(err => {
	//添加错误，这里也会显示
	console.log("获取数据失败" + err);
})
const oldPassword=ref('')
const newPassword=ref('')
const PointOut=ref('')
const submit=()=>{
	const pointout=document.getElementById("pointout");
	if((oldPassword.value==newPassword.value)&&(oldPassword.value!=''||newPassword.value!='')){
		//有时候会有bug，使用reactive就不会出现不需要的双引号
		PointOut.value=reactive("两次密码不能一样");
		pointout.style.color="red";
	}else if(oldPassword.value==''||newPassword.value==''){
		PointOut.value=reactive("请填写密码");
		pointout.style.color="red";
	}else if(newPassword.value.length<6||oldPassword.value.length>12||oldPassword.value.length<6||oldPassword.value.length>12){
		PointOut.value=reactive("密码长度(6~12位)");
		pointout.style.color="red";
	}else{
		
		axios.post('https://443409hb31.imdo.co/index.php/verifyToken', {
			token:localStorage.getItem("token")
		}).then(res => {
			// console.log(res.data);
			// console.log(returndata.username);
			//开始
			axios.post('https://443409hb31.imdo.co/index.php/changepassword', {
				username:returndata.username,
				oldpassword:oldPassword.value,
				password:newPassword.value
			}).then(res => {
				console.log(res.data);
				//刷新token
				if(res.data==1){
					PointOut.value=reactive("修改成功");
					pointout.style.color="green";
				}else if(res.data==0){
					PointOut.value=reactive("密码错误");
					pointout.style.color="red";
				}else if(res.data==2){
					PointOut.value=reactive("用户不存在");
					pointout.style.color="red";
				}else if(res.data==3){
					PointOut.value=reactive("发生了错误");
					pointout.style.color="red";
				}
				
				//延迟500毫秒执行  
				setTimeout( () => {
					PointOut.value=reactive("");
				},1000);
				
			}).catch(err => {
				//添加错误，这里也会显示
				console.log("获取数据失败" + err);
				
			})
			//结束
			

		}).catch(err => {
			//添加错误，这里也会显示
			console.log("获取数据失败" + err);
			
		})
	}
}
</script>

<style lang="less">

.box> {

	width: 100%;
    overflow: auto;
	display: flex;
	justify-content: center;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	.change> {
		width: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		p> {

		}
		input> {
			width: 100%;
			height: 30px;
			border: 1px solid gainsboro;
			border-radius: 4px;
			margin: 3px;
			outline: none;
		}
		span> {
			font-size: 10px;
		}
	}
}
</style>