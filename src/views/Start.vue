<template>
  <div class="start">
    <h1>User Story</h1>
    <h2>Новый взгляд на старые вещи</h2>
    <p>Повышение объема продаж за<br>счет живых рекламных<br>трансляций</p>
    <!-- <a href="" class="button">Button</a> -->
    <span><router-link style="text-decoration: none; color: inherit;" to="/authorize">Начать</router-link></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Start extends Vue {}
</script>

<style lang="scss">
.start{
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
  background-image: url('../assets/start_bg.png');
  margin: 0;
  
  h1{
  font-family: "CeraPro-Black";
  -webkit-font-smoothing: "CeraPro-Black";
  -moz-osx-font-smoothing: "CeraPro-Black";
  position: relative;
  text-align: right;
  left: -90px;
  top: -40px;
  font-size: 130px;
  }

  h2{
  font-family: "CeraPro-ThinItalic";
  -webkit-font-smoothing: "CeraPro-ThinItalic";
  -moz-osx-font-smoothing: "CeraPro-ThinItalic";
  position: relative;
  text-align: right;
  left: -180px;
  top: -165px;
  font-size: 35px;
  }

  p{
  font-family: "CeraPro-Regular";
  -webkit-font-smoothing: "CeraPro-Regular";
  -moz-osx-font-smoothing: "CeraPro-Regular";
  position: relative;
  text-align: left;
  left: 130px;
  top: -55px;
  font-size: 35px;
  }

  span {
  display: inline-block;
  width: 140px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  position: relative;
  top: 90px;
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