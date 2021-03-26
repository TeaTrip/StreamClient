<template>
  <div class="authorize">
    <div id="windww">
      <div id="windw">
        <h1 class="h1s">User Story</h1>
        <div>
            <img src="" alt="">
            <button class="in" @click="isSign = !isSign">sign/in</button>
            <button class="up" @click="isSign = !isSign">sign/up</button>
        </div>
    
        <div v-if="isSign">
          <form ref='form1' class="form">
          <input type="text" placeholder="e-mail" v-model="login">
          <input type="password" placeholder="password" v-model="password">
          </form>
        </div>
    
        <div v-else>
          <form ref='form2' class="form">
          <input type="text" placeholder="e-mail" v-model="login">
          <input type="password" placeholder="6+characters" v-model="password">
          </form>
        </div>

      </div>
    </div>
    <router-link class="rout" tag="ssil" to="/dashboard">войти</router-link>
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
  background-image: url('../assets/auth_rec.png');

  .form {
    display: grid;
    }

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
  top: 120px;
  left: 80px;
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
  top: 160px;
  left: 80px;
  outline: none;
    }
}

.rout {
  display: inline-block;
  width: 140px;
  height: 50px;
  line-height: 50px;
  border-radius: 45px;
  position: relative;
  bottom: 100px;
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
.rout:hover {
  text-decoration: none;
  background: #ffffff;
  box-shadow: 0 15px 20px rgba(87, 87, 87, 0.479);
  color: rgb(0, 0, 0);
  transform: translateY(-7px);
}

.in {
  position: relative;
  top: -60px;
  left: 340px;
  color: white;
  font-size: 20px;

  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}

.up{
  position: relative;
  top: -60px;
  left: 370px;
  color: white;
  font-size: 20px;

  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}

#windw{
margin-left: auto;
margin-right: auto;
width: 1100px;
height: 100px;
background: linear-gradient(179.62deg, rgba(255, 255, 255, 0.217) -15.06%, rgba(253, 242, 78, 0.7) 14.82%, rgba(255, 232, 52, 0.7) 47.68%, rgba(255, 210, 0, 0.7) 81.74%);
backdrop-filter: blur(10px);
border-radius: 70px 70px 0px 0px;
}

#windww{
margin-left: auto;
margin-right: auto;
margin-top: 5%;
width: 1100px;
height: 620px;
background: rgba(0, 0, 0, 0.03);
backdrop-filter: blur(5px);
border-radius: 70px;
}

.h1s{
  font-family: "CeraPro-Black";
  -webkit-font-smoothing: "CeraPro-Black";
  -moz-osx-font-smoothing: "CeraPro-Black";
  position: relative;
  color: white;
  text-transform: uppercase;
  left: -300px;
  top: 20px;
  font-size: 50px;
}

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