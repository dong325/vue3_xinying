<template>
    {{returndata.username}}
</template>
<script lang="ts" setup>
import {ref,reactive} from 'vue'
import axios from 'axios'
const returndata=reactive({
	username:'未登录'
})
axios.post('https://443409hb31.imdo.co/index.php/verifyToken', {
	token:localStorage.getItem("token")
}).then(res => {
	console.log("账号"+res.data[0][0][0].username);
    // console.log(res.data[1]);
	returndata.username=ref(res.data[0][0][0].username);
}).catch(err => {
	//添加错误，这里也会显示
	console.log("获取数据失败" + err);
})
</script>