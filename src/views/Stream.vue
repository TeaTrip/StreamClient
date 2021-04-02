<template>
  <div class="stream" >
    <div class="top-panel">
        <span class="head">{{title}}</span>
        <button class="head2" @click="redirect()">Купить {{count}}</button>
        <iframe :src="streamTread"  width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>
        <div id="chatbro"></div>
    </div>
    <div class="stream-products">
        <template v-for="(item, index) in productss">
            <Product @dobs="dobavit($event)" :name="item.name" :price="item.price" :articul="item.articul" isOnStream="true" :description="item.description" :key="index" />
        </template>
    </div> 
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
    public products: Array<{}> = [];
    public productss: Array<{}> = [
        {
            name: 'tovar1',
            price: '999',
            articul: 'MH12',
            description: 'opisanije товара'
        },
        {
            name: 'tovar1',
            price: '999',
            articul: 'MH12',
            description: 'opisanije товара'
        },
        {
            name: 'tovar1',
            price: '999',
            articul: 'MH12',
            description: 'opisanije товара'
        },
        {
            name: 'tovar1',
            price: '999',
            articul: 'MH12',
            description: 'opisanije товара'
        },
        {
            name: 'tovar1',
            price: '999',
            articul: 'MH12',
            description: 'opisanije товара'
        },
        {
            name: 'tovar1',
            price: '999',
            articul: 'MH12',
            description: 'opisanije товара'
        },
    ]
    public title = '';
    public name = '';
    public articul = '';
    public price = '';
    public description = '';
    public streamId = '';
    public obsKey = '';

    protected created(){

        let streamid =  href.slice(href.indexOf("=")+1);
        axios.get("http://127.0.0.1:8000/streams/get?stream="+streamid).then((data) => {
            this.streamTread = data.data.stream.url;
            this.title = data.data.stream.title;
            this.products = data.data.goods;
        });
        this.ChatbroLoader({encodedChatId: '97kNp'}, 0);
    }

    protected ChatbroLoader(chats: any, async: any) {
        async = !1 !== async;
        var params = {
            embedChatsParameters: chats instanceof Array ? chats : [chats],
            lang: navigator.language,
            needLoadCode: true,
            embedParamsVersion: localStorage.embedParamsVersion,
            chatbroScriptVersion: localStorage.chatbroScriptVersion,
            isStatic: false,
            containerDivId: "stream-chat"
        },
        xhr = new XMLHttpRequest;
        xhr.withCredentials = !0;
        xhr.onload = function() {
            eval(xhr.responseText);
        };
        xhr.onerror = function() {
            console.error('Chatbro loading error')
        };
        xhr.open('GET', '//www.chatbro.com/embed.js?' +
            btoa(unescape(encodeURIComponent(JSON.stringify(params)))), async);
        xhr.send();
    }
    

    protected dobavit(articul: string){
        this.count++;
        this.articules.push(articul);
    }
    
    // protected redirect(){
    //     let strToRedir = 'https://hackathon.oggettoweb.com/checkout/cart/addmultiple/products/'
    //     for(let artic of this.articules){
    //         strToRedir = strToRedir + artic + ','
    //     }
    //     strToRedir = strToRedir.slice(0, -1)
    //     strToRedir = strToRedir + '/flush_cart/1'
    //     window.location.href = strToRedir;
    // }



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
            axios.post("http://127.0.0.1:8000/streams/create", JSON.stringify(obj))
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
.stream{
    height: 100%;
    background-image: url("../assets/stream-bg.png");
    background-size: 100%;
    display: flex;
    flex-direction: column;
}

.top-panel{
    display: grid;
    grid-template-columns: 5fr 2fr;
    gap: 2%;
    padding: 0 7%;
    
}

.stream-products{
    display: grid;
    grid-template-columns: min-content min-content min-content;
    gap: 20px;
    padding-top: 30px;
    justify-content: center;
}

.head{
    font-size: 24px;
    display: flex;
    font-family: "CeraPro-Black";
    font-style: normal;
    font-weight: 900;
    font-size: 48px;
    line-height: 60px;
    color: #FFFFFF;
    -webkit-text-stroke: 1px black;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

}

.head2{
    font-size: 24px;
    display: flex;
    font-family: "CeraPro-Black";
    font-style: normal;
    font-weight: 900;
    font-size: 48px;
    line-height: 60px;
    color: #FFFFFF;
    background: transparent;
    border: none;
    outline: none;
    -webkit-text-stroke: 1px black;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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
