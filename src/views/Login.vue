<template>
  <div class="login-container w100 h100 f_c_c_c">
    <div class="system-title">{{ title }}</div>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="70px"
      class="ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="form.passWord" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import router from "../router";
import axios from "axios"
import type { FormInstance, FormRules } from "element-plus";
import { setToken, removeToken } from "@/util/auth";

const title = ref(import.meta.env.VITE_APP_TITLE);
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  userName: "",
  passWord: "",
});

const rules = reactive<FormRules>({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      
      axios.post('https://443409hb31.imdo.co/index.php/token', {
        username: form.userName, //可以获取输入框数据
        password:form.passWord
      }).then(res => {
        console.log(res.data);
        if(res.data==2){
          
          alert("不存在");
        }else if(res.data==0){
          alert("账号或者密码出错",res.data);
        }else{
          setToken(res.data);
          alert("正确");
          localStorage.setItem('token',res.data);
          localStorage.setItem('userNum',1);
          
          router.push("/");
          //不刷新，会不跳转
          this.$router.go(0);

        }
        
        // window.location.href="/";
        
      }).catch(err => {
        //添加错误，这里也会显示
        console.log("获取数据失败" + err);
      })
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  removeToken();
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url(@/assets/images/login-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .system-title {
    font-size: 30px;
    color: #ffffff;
    margin-top: -30px;
    margin-bottom: 20px;
  }

  .ruleForm {
    border-radius: 10px;
    padding: 40px 50px 20px 20px;
    background-color: rgba($color: #ffffff, $alpha: 1);
    color: #ffffff;
  }
}
</style>
