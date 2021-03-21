<template>
  <div class="dashboard">
    <h1>This is an creating stream page</h1>
    <div class="stream-create">
       <h1>Настройки</h1>
       <div class="stream-create__top">
           <div>
               <input type="text" v-model="title" >
               <div>
                <button @click="show()">Добавить</button>
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
