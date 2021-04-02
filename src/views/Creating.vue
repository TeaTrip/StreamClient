<template>
  <div class="dashboard">
    <div class="stream-create">    
        <div class="stream-create__top">
           <div class="stream-create__left-side">
               <span class="sett">НАСТРОЙКИ</span>
               <input class="stream-create__input" type="text" placeholder="введите название трансляции" v-model="title" >
               <div class="stream-create__add">
                <button @click="show()" class="stream-create__plus">+</button>
                <span class="stream-create__add-text">Нажмите + чтобы добавить товар</span>
               </div>
           </div>
           <div>
               <button @click="start()" id="strt" >СТАРТ</button>
           </div>
        </div>
        <div class="stream-create__bot">
            <template v-for="(item, index) in products">
                <Product :name="item.name" :price="item.price" :description="item.description" :key="index" />
            </template>
        </div>
        <modal classes="mod" :width="758" :height="716" name="append">
            <div class="modal-append">
                <div class="modal-append__img">Перетащите сюда <br> изображение <br> или нажмите для <br> выбора файла</div>
                
                <div class="modal-append__right-bar">
                    <input type="text" placeholder="Название товара" v-model="name">
                    <input type="text" placeholder="Артикул" v-model="articul">
                    <input type="text" placeholder="Цена" v-model="price">
                </div>
                <input class="modal-append__description" type="text" placeholder="Описание" v-model="description">
                <button class="modal-append__add" @click="close()">Добавить</button>
            </div>
        </modal>
        <modal classes="mod" :width="536" :height="432" name="infoStream">
            <div class="modal-after-info">
                <span class="modal-after-info__header">Ссылка на стрим</span>
                <h2 class="modal-after-info__links">http://localhost:8080/#/stream?stream-id={{streamId}}</h2>
                <span class="modal-after-info__header">Токен</span>
                <h2 class="modal-after-info__links">{{obsKey}}</h2>
                <button class="modal-after-info__ok" @click="hideInfo()">Ок</button>
            </div>   
        </modal>
    </div>

    <!-- <div id="ellipse"></div>
    <div id="polygon"></div>
    <div id="strt">СТАРТ</div>
    <div id="zag1">1</div>
    <div id="zag2">1</div> -->

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
                "token" : this.$store.state.token,
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
    display: flex;
    align-content: center;
    flex-direction: column;
    padding: 0 10%;
    text-align: justify;
    &__bot{
        display: grid;
        grid-template-columns: min-content min-content min-content;
        gap: 20px;
        padding-top: 30px;
        justify-content: center;
    }
    &__top{
        padding-top: 5%;
        display:grid;
        grid-template-columns: 5fr 2fr;
        align-items: center;
        gap: 20px;
    }
    &__input{
        line-height: 45px;
        max-width: 480px;
        border: 1px solid rgb(156, 71, 152);
        border-radius: 30px;
        background: white;
        padding: 10px 25px;
        color: rgb(82, 82, 82);
        font-size: 15px;
        outline:none;
        font-family: "CeraPro-Regular";
        -webkit-font-smoothing: "CeraPro-Regular";
        -moz-osx-font-smoothing: "CeraPro-Regular";
        font-size: 20px;
    }
    &__left-side{
        display: grid;
        gap: 25px;
    }
    &__add{
        display:flex;
        gap: 20px;
        
        
    }
    &__plus{
        width: 268px;
        height: 178px;
        background: #FFFFFF;
        border: 1px solid #7E36F2;
        box-sizing: border-box;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2);
        border-radius: 40px;
    }
    &__add-text{
        max-width: 281px;;
        font-family: "CeraPro-Black";
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 45px;
        color: #000000;
        opacity: 0.5;
    }

}

.mod{
    width: 758px;
    height: 716px;
    background: linear-gradient(180deg, rgba(255, 227, 78, 0.105) -14.73%, rgba(255, 227, 78, 0.21) 48.85%, rgba(255, 227, 78, 0.1113) 108.59%);
    backdrop-filter: blur(30px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 70px;
}

.modal-append{
    display: grid;
    background-color: transparent;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-top: 50px;
    padding-left: 20px;
    padding-right: 20px;
    
    input{
        text-align:center;
        background: #FFFFFF;
        height: 50px;
        outline: none;
        border: none;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2);
        border-radius: 40px;
        font-family: "CeraPro-Black";
        font-style: normal;
        font-weight: 300;
        font-size: 26px;
        line-height: 33px;
        color: #000000;
    }

    &__description{
        grid-column: 1/3;
        height: 200px !important;
    }
    &__add{
        grid-column: 1/3;
        display: grid;
        height: 180px;
        align-content: center;
        justify-content: center;
        background: linear-gradient(101.19deg, rgba(60, 96, 223, 0.558) 15.76%, rgba(126, 54, 242, 0.432) 56.07%, rgba(248, 111, 144, 0.819) 98.46%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        font-family: "CeraPro-Regular";
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 33px;
        color: #000000;
        border: none;
    }
    &__img{
        display: grid;
        align-content: center;
        justify-content: center;
        background: linear-gradient(101.19deg, rgba(60, 96, 223, 0.558) 15.76%, rgba(126, 54, 242, 0.432) 56.07%, rgba(248, 111, 144, 0.819) 98.46%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        font-family: "CeraPro-Regular";
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 33px;
        color: #000000;
    }
    &__right-bar{
        display: grid;
        gap: 20px;
    }
}

.modal-after-info{
    display:grid;
    gap: 10px;
    padding: 30px 20px;
    &__header{
        font-family: "CeraPro-Black";
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 45px;
    }

    &__links{
        padding: 10px;
        background: #FFFFFF;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2);
        border-radius: 40px;
        font-family: "CeraPro-Regular";
        font-style: normal;
        font-weight: 300;
        font-size: 24px;
        line-height: 30px;
        color: #000000;
    }

    &__ok{
        justify-self: center;
        width: 100px;
        height: 40px;
        background: #FFFFFF;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2);
        border-radius: 40px;
        font-family: "CeraPro-Regular";
        font-style: normal;
        font-weight: 300;
        font-size: 24px;
        line-height: 30px;
        border: none;
        color: #000000;
    }
}

.sett{
    font-family: "CeraPro-Black";
    -webkit-font-smoothing: "CeraPro-Black";
    -moz-osx-font-smoothing: "CeraPro-Black";
    font-size: 50px;
    color: #7E36F2;
    text-shadow: -1px -1px #444;
}

#zag1{
    position: relative;
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
    position: relative;
    width: 430px;
    height: 90px;
    left: 130px;
    top: -40px;
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

#strt{
  font-family: "CeraPro-Black";
  -webkit-font-smoothing: "CeraPro-Black";
  -moz-osx-font-smoothing: "CeraPro-Black";
  font-size: 40px;
  color: #7E36F2;
  text-shadow: -1px -1px #444;
//   box-shadow: inset 0px -5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>
