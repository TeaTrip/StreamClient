<template>
  <div class="products">
      <span class="products__header">{{name}}</span>
      <div class="products__image-cont">
        <img class="products__image" src="../assets/notimage.png">
      </div>
      <textarea class="products__description" v-model="description" readonly></textarea>
      <button class="products__button" v-if="isOnStream" @click="$emit('dobs', articul)" >Добавить в корзину {{price}}₽</button>
      <div v-else class="products__price">{{price}}₽</div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Product extends Vue {
  @Prop() private name!: string;
  @Prop() private description!: string;
  @Prop() private price!: number;
  @Prop({default: false}) private isOnStream!: boolean;
  @Prop() private articul!: string;

}
</script>

<style lang="scss">
.products{
  text-align: center !important;
  width: 290px;
  height: 325px;
  background: rgba(255, 227, 78, 0.23);
  backdrop-filter: blur(15px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 70px;

  &__image-cont{
    display: flex;
    justify-content: center;
    margin: 0;
  }

  &__image{
    
    width: 200px;
    height: 150px;
    object-fit: contain;
  }

  &__price{
    font-family: "CeraPro-Black";
    text-decoration: none;
    border:none;
    background: transparent;
    outline: none;
    font-weight: 900;
    font-size: 18px;
    line-height: 63px;
    color: #7E36F2;
    opacity: 0.8;
  }

  &__button{
    font-family: "CeraPro-Black";
    text-decoration: none;
    cursor: pointer;
    border:none;
    background: transparent;
    outline: none;
    font-weight: 900;
    font-size: 18px;
    line-height: 63px;
    color: #7E36F2;
    opacity: 0.8;
  }
  &__header{
    display: block;
    margin-top: 20px;
    padding-bottom: 0;
    font-family: "CeraPro-Black";
    font-style: normal;
    font-weight: 900;
    font-size: 36px;
    line-height: 45px;
    margin-bottom: -20px;
    color: #000000;
  }

  &__description{
    resize: none;
    text-align: center;
    background: transparent;
    border: none;
    font-family: "CeraPro-Regular";
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    line-height: 33px;
    color: #000000;
  }



}
</style>