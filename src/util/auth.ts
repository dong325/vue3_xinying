import Cookies from 'js-cookie'
const TokenKey = "Token";
import axios from 'axios';
import {ref,reactive} from 'vue';
export function getToken() {
  // return Cookies.get(TokenKey);
  return localStorage.getItem('token');
}
export function getToken1() {
  // return Cookies.get(TokenKey);
  return 1;
}
export function setToken(token: string) {
  // Cookies.set(TokenKey, token);
  localStorage.setItem("token",token);
}

//每次数据获取都去后台验证token是否正确
export function resultToken(){
  axios.post('https://443409hb31.imdo.co/index.php/verifyToken', {
	  token:localStorage.getItem("token")
  }).then(res => {
    console.log("跳转都会产生:"+res.data[0][0][0].username);
    // console.log(res.data[0][0][1]);
    localStorage.setItem("userNum",res.data[1]);
    
  }).catch(err => {
    //添加错误，这里也会显示
    console.log("获取数据失败" + err);
    localStorage.setItem("userNum","0");
  })
}
export function removeToken() {
  window.localStorage.clear()
  window.sessionStorage.clear()
  Cookies.remove(TokenKey);
}
