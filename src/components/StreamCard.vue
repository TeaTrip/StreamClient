<template>
  <div class="stream-card">
      <span>#{{num}} стрим</span>
      <span>{{date}}</span>
      <img src="" alt="">
      <hr>
      <div>{{title}}</div>
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