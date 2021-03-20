<template>
  <div class="dashboard">
    <h1>This is an dashboard page</h1>
    <div>
        <div>
            <img src="" alt="">
        </div>
        <div>
            <input type="text" :value="company" placeholder="enter company name">
            <div>
                <button>sign out</button>  
                <a :href="website"></a>
            </div>
        </div>
        <span>История стримов</span>
        <div class="streams">
            <div class="streams__left-button">
                <button></button>
            </div>
            <template v-for="(item, index) in cards">
                <StreamCard :num="item.id" :date="item.date" :title="item.title" :key="index"/>
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
        axios.get('http://192.168.206.19:8855/streams/?token=123')
        .then((data) => {
            console.log(data);
        });
        console.log('this is')
    }
}
</script>

<style lang="scss">
.streams{
    display: flex;
    justify-content: space-around;
}
</style>
