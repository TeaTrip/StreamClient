<template>
  <div class="authorize">
    <div>
        <img src="" alt="">
        <button style="border:none; outline: none;" @click="isSign = !isSign">sign/in</button>
        <button @click="isSign = !isSign">sign/up</button>
    </div>
    
    <div v-if="isSign">
    <form ref='form1'>
    <input type="text" placeholder="e-mail" v-model="login">
    <input type="password" placeholder="password" v-model="password">
    </form>
    </div>
    
    <div v-else>
    <form ref='form2'>
    <input type="text" placeholder="e-mail" v-model="login">
    <input type="password" placeholder="6+characters" v-model="password">
    </form>
    </div>
    <!-- <button @click="go()">login</button> -->
    <span><router-link tag="ssil" to="/dashboard">войти</router-link></span>
  </div>
</template>


<script lang="ts">
import router from '@/router';
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

console.log('hi', document.cookie);

@Component
export default class Authorize extends Vue {
    
    public isSign: boolean = true;
    public login = '';
    public password = '';
    protected go(){
        this.$store.dispatch('setLogin', this.login);
        this.$store.dispatch('setPassword', this.password);
        if (this.isSign){
          axios.post('http://192.168.193.19:8855/auth/users', {email: this.login, password: this.password})
          .then((data) => {
            this.$store.dispatch('setToken', data.data.auth_token)
            this.$router.push('/dashboard')
          });
        }
        else{
          axios.post('http://192.168.193.19:8855/auth/users/login', {email: this.login, password: this.password})
          .then((data) => {
            this.$store.dispatch('setToken', data.data.auth_token)
            this.$router.push('/dashboard')
          });
        }
        

    }
}
</script>

<style lang="scss">
.authorize{
  position: absolute;
  width:100vw;
  height:100vh;
  object-fit:cover;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('../assets/auth_bg.png');

input[type="text"] {
  display: inline-block;
  width: 450px;
  height: 45px;
  position: relative;
  line-height: 45px;
  border-radius: 45px;
  border: 1px solid #ffffff;
  background: white;
  padding: 10px 25px;
  color: rgb(82, 82, 82);
  font-size: 15px;
  top: 280px;
  left: 50px;
  outline:none;
  }

  input[type="password"] {
  display: inline-block;
  width: 450px;
  height: 45px;
  position: relative;
  line-height: 45px;
  border-radius: 45px;
  border: 1px solid #ffffff;
  background: white;
  padding: 10px 25px;
  color: rgb(82, 82, 82);
  font-size: 15px;
  top: 400px;
  left: -450px;
  outline:none;
  }
  // display: inline-block;
  // width: 140px;
  // height: 45px;
  // line-height: 45px;
  // border-radius: 45px;
  // color: #524f4e;
  // background: white;
  // box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
}

span {
  display: inline-block;
  width: 140px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  position: relative;
  top: 560px;
  bottom: -10px;
  font-family: "CeraPro-Black";
  -webkit-font-smoothing: "CeraPro-Black";
  -moz-osx-font-smoothing: "CeraPro-Black";
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
  color: #524f4e;
  background: white;
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
  transition: .3s;
}
  span:hover {
  text-decoration: none;
  background: #ffffff;
  box-shadow: 0 15px 20px rgba(87, 87, 87, 0.479);
  color: rgb(0, 0, 0);
  transform: translateY(-7px);
}

// h1{
//   font-family: "CeraPro-Black";
//   -webkit-font-smoothing: "CeraPro-Black";
//   -moz-osx-font-smoothing: "CeraPro-Black";
//   position: relative;
//   text-align: right;
//   left: -800px;
//   top: -5px;
//   font-size: 80px;
//   color: #ffffff;
// }

@font-face {
// black
font-family: "CeraPro-Black"; 
src: url("../fonts/CeraPro-Black.ttf") format("truetype"); 
font-style: normal; 
font-weight: normal; 
} 
@font-face {
// regular
font-family: "CeraPro-Regular"; 
src: url("../fonts/CeraPro-Regular.ttf") format("truetype"); 
font-style: normal; 
font-weight: normal; 
} 
@font-face {
// thinItalic
font-family: "CeraPro-ThinItalic"; 
src: url("../fonts/CeraPro-ThinItalic.ttf") format("truetype"); 
font-style: normal; 
font-weight: normal; 
} 
@font-face {
// medium
font-family: "CeraPro-Medium"; 
src: url("../fonts/CeraPro-Medium.ttf") format("truetype"); 
font-style: normal; 
font-weight: normal; 
} 
</style>