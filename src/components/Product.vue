<template>
  <div class="stream-card">
      <img src="" alt="">
      <hr>
      <span>{{name}}</span>
      <span>{{description}}</span>
      <div>{{price}}</div>
      <button v-if="isOnStream" @click="$emit('dobs', articul)" >Добавить в корзину</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Product extends Vue {
  @Prop() private name!: string;
  @Prop() private description!: string;
  @Prop() private price!: number;
  @Prop() private isOnStream!: boolean;
  @Prop() private articul!: string;

}
</script>