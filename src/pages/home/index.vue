<script setup lang="ts" name="home">
  import Counter from "./Counter.vue"
</script>

<template>
  <div class="home card">
    <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
    <div>
      <Counter />
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "./index.scss";
</style>
