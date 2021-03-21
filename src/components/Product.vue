<template>
  <div class="stream-card">
      <img src="" alt="">
      <hr>
      <span>{{name}}</span>
      <span>{{description}}</span>
      <div>{{price}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Product extends Vue {
  @Prop() private name!: string;
  @Prop() private description!: string;
  @Prop() private price!: number;

}
</script>