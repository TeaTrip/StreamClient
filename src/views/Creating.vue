<template>
  <div class="dashboard">
    <h1>This is an creating stream page</h1>
    <div class="stream-create">
       <h1>Настройки</h1>
       <div class="stream-create__top">
           <div>
               <input type="text" >
               <div>
                <button @click="show()">Добавить</button>
                <h4>Нажмите + чтобы добавить товар</h4>
               </div>
           </div>
           <div>
               <button></button>
           </div>
       </div>
       <div class="stream-create__bot">
           <button></button>
            <template>
            </template>
           <button></button>
       </div>
       <modal name="append">
           <h2>priveeeet</h2>
           <button @click="close()">закрыть</button>
       </modal>
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
export default class Creating extends Vue {

    protected show(){
        this.$modal.show('append')
    }

    protected close(){
        this.$modal.hide('append')
    }
    
}
</script>

<style lang="scss">
.streams{
    display: flex;
    justify-content: space-around;
}
</style>
