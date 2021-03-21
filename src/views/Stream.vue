<template>
  <div class="dashboard" >
    <h1>Stream is here!!!</h1>
    <iframe :src="streamTread"  width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>
    <div class="stream-create__bot">
        <button>left</button>
        <template v-for="(item, index) in products">
            <Product @dobs="dobavit($event)" :name="item.name" :price="item.price" :articul="item.articul" isOnStream="true" :description="item.description" :key="index" />
        </template>
        <button>right</button>
    </div>
    <button @click="redirect()">КУПИТЬ! {{count}}</button>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import StreamCard from '@/components/StreamCard.vue';
import Product from '@/components/Product.vue';

let href =  window.location.href;

@Component({
    components:{
        StreamCard: StreamCard,
        Product: Product
    }
    

})
export default class Stream extends Vue {

    public streamTread = '';
    public count = 0;
    public articules: Array<string> = ['24-WB02', 'MH12'];

    protected created(){

        let streamid =  href.slice(href.indexOf("=")+1);
        axios.get("http://192.168.193.19:8855/streams/get?stream="+streamid).then((data) => {
            this.streamTread = data.data.stream.url;
            this.products = data.data.goods;
            console.log(data.data);
        });
        console.log(streamid);
    }

    protected dobavit(articul: string){
        this.count++;
        this.articules.push(articul);
    }
    
    protected redirect(){
        let strToRedir = 'https://hackathon.oggettoweb.com/checkout/cart/addmultiple/products/'
        for(let artic of this.articules){
            strToRedir = strToRedir + artic + ','
        }
        strToRedir = strToRedir.slice(0, -1)
        strToRedir = strToRedir + '/flush_cart/1'
        window.location.href = strToRedir;
    }

    public products: Array<{}> = [];
    public title = '';
    public name = '';
    public articul = '';
    public price = '';
    public description = '';
    public streamId = '';
    public obsKey = '';

    protected show(){
        this.$modal.show('append')
    }

    protected close(){
        this.$modal.hide('append')
        this.products.push(
            {
                name: this.name,
                articul: this.articul,
                price: parseInt(this.price),
                description: this.description
            }
        )
        this.name = '';
        this.articul = '';
        this.price = '';
        this.description = '';
        console.log(this.products);
    }

    protected hideInfo(){
        this.$modal.hide('infoStream')
    }

    protected start(){

        let tokenType = '';
        let accessToken = '';

        axios.post("https://sandbox.api.video/auth/api-key", {"apiKey":"uii7m68YfExv4o08ampTQNooM8zfPCXWhtl1D8aFHNs"})
        .then((data) => {
            tokenType = data.data.token_type;
            accessToken = data.data.access_token;
            let hi = tokenType + ' ' + accessToken;
        axios.post("https://sandbox.api.video/live-streams", {'name': 'stream'}, {headers:{
            'Content-Type': 'application/json',
            'Authorization': hi
        }})
          .then((jata) =>{
            
            this.obsKey = jata.data.streamKey;
            let str = jata.data.assets.iframe;
            str = str.slice(str.indexOf('src') + 5, str.indexOf(' ', 10)-1);
            console.log(str);
            
            let obj = {
                data: {
                "url": str,
                "streamKey" : jata.data.streamKey,
                "title" : this.title,
                "shop" : 9
                },
                "token" : 123,
                "goods": this.products
            }
            console.log(obj)
            console.log(JSON.stringify(obj))
            axios.post("http://192.168.193.19:8855/streams/create", JSON.stringify(obj))
                .then((data) => {
                    this.streamId = data.data.stream_id
                    console.log(data);
                    this.$modal.show('infoStream')
                });
            //this.rawHtml = jata.assets.iframe;
          });
      });
    }
    
}
</script>

<style lang="scss">
.stream-create{
    &__bot{
        display: flex;
        justify-content: space-around;
    }
    
}
</style>
