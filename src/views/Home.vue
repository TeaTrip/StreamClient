<template>
  <div class="home">
    <span v-html="rawHtml"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  public rawHtml = '';

  protected created(){
    this.init();
  }

  protected async postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
    return await response.json();
  }

  protected async startStream(url = '', data = {}, hi='') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': hi
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
    return await response.json();
  }

  protected init(){

    let tokenType = undefined;
    let accessToken = undefined;
    let rawHtml = '';

    this.postData("https://sandbox.api.video/auth/api-key", {"apiKey":"uii7m68YfExv4o08ampTQNooM8zfPCXWhtl1D8aFHNs"})
    .then((data) => {
        tokenType = data.token_type;
        accessToken = data.access_token;
        let hi = tokenType + ' ' + accessToken;
        this.startStream("https://sandbox.api.video/live-streams", {'name': 'stream'}, hi)
          .then((jata) =>{
            console.log(jata);
            this.rawHtml = jata.assets.iframe;
          });
      });

    
    
    console.log("this is called");
    
  }

}
</script>

<style lang="scss">
.home{
  height: 500px;
}
</style>
