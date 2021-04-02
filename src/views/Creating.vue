<template>
  <div class="dashboard">
    <div class="stream-create">
       <div class="stream-create__top">
           <div>
               <input type="text" placeholder="введите название трансляции" v-model="title" >
               <div>
                <button @click="show()" >Добавить</button>
                <h4>Нажмите + чтобы добавить товар</h4>
               </div>
           </div>
           <div>
               <button @click="start()">ЗАПУСКАЙ ПОТОК</button>
           </div>
       </div>
       <div class="stream-create__bot">
           <button>left</button>
            <template v-for="(item, index) in products">
                <Product :name="item.name" :price="item.price" :description="item.description" isOnStream="false" :key="index" />
            </template>
           <button>right</button>
       </div>
       <modal name="append">

            <div>Перетащите изображение сюда</div>
                <div>
                    <input type="text" placeholder="Название товара" v-model="name">
                    <input type="text" placeholder="Артикул" v-model="articul">
                    <div>
                        <input type="text" placeholder="Цена" v-model="price">
                        <input type="text" placeholde="а тут што">
                    </div>
            </div>
            <input type="text" placeholder="Описание" v-model="description">
           <button @click="close()">Добавить</button>
       </modal>
       <modal name="infoStream">
           <h1>Stream started!</h1>
           <h2>http://localhost:8080/#/stream?stream-id={{streamId}}</h2>
           <h2>{{obsKey}}</h2>
           <button @click="hideInfo()">close</button>
       </modal>
    </div>

    <div id="ellipse"></div>
    <div id="polygon"></div>
    <div id="zag1"></div>
    <div id="zag2"></div>
    <div id="sett">НАСТРОЙКИ</div>
    <div id="strt">СТАРТ</div>

  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import StreamCard from '@/components/StreamCard.vue';
import Product from '@/components/Product.vue';

console.log(window.location.href);

@Component({
    components:{
        StreamCard: StreamCard,
        Product: Product
    }
    

})
export default class Creating extends Vue {

    

    public products: Array<{}> = [];
    public title = '';
    public name = '';
    public articul = '';
    public price = '';
    public description = '';
    public streamId = '';
    public obsKey = '';

    protected show(){
        console.log("что нибудь")
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
                "shop" : 1
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
.stream-create{
    &__bot{
        display: flex;
        justify-content: space-around;
    }
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
// background-image: url('../assets/shablon.png');
}

input[type="text"] {
display: inline-block;
width: 480px;
height: 45px;
position: relative;
line-height: 45px;
border: 1px solid rgb(156, 71, 152);
border-radius: 30px;
background: white;
padding: 10px 25px;
color: rgb(82, 82, 82);
font-size: 15px;
top: 175px;
left: -345px;
outline:none;

  font-family: "CeraPro-Regular";
  -webkit-font-smoothing: "CeraPro-Regular";
  -moz-osx-font-smoothing: "CeraPro-Regular";
  font-size: 20px;
}

#zag1{
position: absolute;
width: 450px;
height: 85px;
left: 70px;
top: 30px;
background: rgba(255, 237, 156, 0.884);
backdrop-filter: blur(40px);
border-radius: 71px;
transform: rotate(-5deg);
}

#zag2{
position: absolute;
width: 430px;
height: 90px;
left: 130px;
top: 30px;
background: rgba(139, 74, 243, 0.3);
backdrop-filter: blur(15px);
border-radius: 71px;
}

#polygon {
position: relative;
left: 1000px;
top: -100px;
width: 0;
height: 0;
border-style: solid;
border-width: 100px 0 100px 180px;
border-color: transparent transparent transparent rgba(126, 54, 242, 0.37);
backdrop-filter: blur(10px);
// border-radius: 14px;
transform: rotate(-20deg);
// box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

#ellipse {
position: relative;
width: 190px;
height: 190px;
left: 940px;
top: 160px;
border-radius: 1000px;
background: rgba(255, 237, 156, 0.884);
backdrop-filter: blur(30px);
box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

#sett{
  font-family: "CeraPro-Black";
  -webkit-font-smoothing: "CeraPro-Black";
  -moz-osx-font-smoothing: "CeraPro-Black";
  position: relative;
  left: -450px;
  top: -345px;
  font-size: 50px;
  color: #7E36F2;
  text-shadow: -1px -1px #444;
}

#strt{
  font-family: "CeraPro-Black";
  -webkit-font-smoothing: "CeraPro-Black";
  -moz-osx-font-smoothing: "CeraPro-Black";
  position: relative;
  left: 350px;
  top: -275px;
  font-size: 40px;
  transform: rotate(-20deg);
  color: #7E36F2;
  text-shadow: -1px -1px #444;
//   box-shadow: inset 0px -5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>
