<template>
  <div class="stream-card">
      <div class="number">#{{num}} стрим</div>
      <br>
      <div class="date">{{date}}</div>
      <img src="../assets/lines.png" alt="">
      <hr>
      <div class="title">{{title}}</div>
      <div class="ssilkaa"><a class="ssilka" :href="'http://localhost:8080/#/stream?stream-id=' + num">перейти к трансляции</a></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StreamCard extends Vue {
  @Prop() private num!: number;
  @Prop() private date!: string;
  @Prop() private title!: string;

}
</script>

<style lang="scss">

.stream-card{
  width: 290px;
  height: 325px;
  background: rgba(255, 227, 78, 0.23);
  backdrop-filter: blur(15px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 70px;
}

.number{
  padding-top: 20px;
  padding-bottom: 0;
  font-family: "CeraPro-Black";
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 45px;
  margin-bottom: -20px;
  color: #000000;
}

.ssilkaa{
   padding-top:20px;
}

.ssilka{
 
  font-family: "CeraPro-Black";
  text-decoration: none;
  cursor: pointer;
  border:none;
  background: transparent;
  outline: none;
  font-weight: 900;
  font-size: 18px;
  line-height: 63px;
  color: #7E36F2;
  opacity: 0.8;
}

.date{
  font-family: "CeraPro-Black";
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 33px;
  margin-bottom: 20px;
  color: #000000;
}

.title{
  font-family: "CeraPro-Black";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 33px;

  color: #000000;
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