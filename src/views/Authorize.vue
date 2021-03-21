<template>
  <div class="authorize">
    <h1>This is an authorize page</h1>
    <div>
        <img src="" alt="">
        <button @click="isSign = !isSign">sign/in</button>
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



    <button @click="go()">login</button>
    <router-link to="/dashboard">dashboard</router-link>
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
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        let formData = new FormData();
        formData.append("email", this.login);
        formData.append("password", this.password);
        formData.set("email", this.login);
        formData.set("password", this.password);
        axios.post('http://192.168.186.19:8855/user/login', formData);
        

    }
}
</script>