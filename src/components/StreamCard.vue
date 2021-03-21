<template>
  <div class="stream-card">
      <span>#{{num}}</span>
      <br>
      <span>{{date}}</span>
      <img src="" alt="">
      <hr>
      <div>{{title}}</div>
      <a :href="'http://localhost:8080/#/stream?stream-id=' + num">go to stream</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StreamCard extends Vue {
  @Prop() private num!: number;
  @Prop() private date!: string;
  @Prop() private title!: string;

}
</script>