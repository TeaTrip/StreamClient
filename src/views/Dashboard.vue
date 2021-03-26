<template>
  <div class="dashboard">
    <!-- s -->
    <div>
        <div>
            <img src="" alt="">
        </div>
        <div class="topbar">
            <div class="krug"></div>
            <div class="right">
                <input class="company" type="text" :value="company" placeholder="enter company name">
                <div class="signout">
                    <router-link class="sout" to="/authorize">sign out</router-link>
                    <div>
                    <input class="site" type="text" :value="company" placeholder="enter site">
                    <hr class="tophr">
                    </div>
                </div>
            </div>
        </div>
        <div class="streams">
            <div class="streams__left-button">
                <button></button>
            </div>
            <template v-for="(item, index) in cards">
                <StreamCard :num="item.num" :date="item.date" :title="item.title" :key="index"/>
            </template>
            <div class="streams__right-button">
                <button></button>
            </div>
        </div>
        <div>   
            <router-link to="/creating">create-new-stream</router-link>
        </div>
        
    </div>
   
    
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import StreamCard from '@/components/StreamCard.vue';

console.log(document.cookie);

@Component({
    components:{
        StreamCard: StreamCard
    }
    

})
export default class Authorize extends Vue {

    
    public website = ''
    public company = ''

    public cards: Array<{}> = [
        {
            num: 13,
            date: 'hello',
            title: 'jopa'
        },
        {
            num: 14,
            date: 'vau',
            title: 'qq'
        }
    ]
    
    protected created(){
        axios.defaults.xsrfCookieName = document.cookie;
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.get('http://192.168.193.19:8855/streams/?token='+this.$store.state.token)
        .then((data) => {
            for(let item of data.data){
                this.cards.push({
                    num: item.id,
                    date: item.date,
                    title: item.title
                })
            }
            console.log(data);
        });
        console.log('this is')
    }
}
</script>

<style lang="scss">

.topbar{
    align-items: center;
    margin-top: 100px;
    display: flex;
    align-items: center;
    
}

.right{
    margin-left: 5%;
}

.sout{
    font-family: "CeraPro-Black";
    text-decoration: none;
    cursor: pointer;
    border:none;
    background: transparent;
    outline: none;
    font-weight: 900;
    font-size: 50px;
    line-height: 63px;
    color: #7E36F2;
    opacity: 0.8;
}

.company{
    -webkit-appearance: none;
    border: none;
    outline: none;
    font-weight: 900;
    font-size: 70px;
    line-height: 126px;
    color: #7E36F2;
    opacity: 0.9;
}

.signout{
    display: flex;
    justify-content: space-between;
}

.tophr{
    width: 50%;
    margin-right: 50%;
}

.site{
    text-decoration: none;
    cursor: pointer;
    border:none;
    background: transparent;
    outline: none;
    font-weight: 900;
    font-size: 50px;
    line-height: 63px;
    color: #7E36F2;
    opacity: 0.8;
}

.krug{
    margin-left: 250px;
    border-radius: 50%;
    width: 239px;
    height: 239px;
    left: 235px;
    top: 87px;
    background: #FFE34E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.dashboard{
    background-image: url("../assets/lk.png");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 1200px;
}

.streams{
    display: flex;
    justify-content: space-around;
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
