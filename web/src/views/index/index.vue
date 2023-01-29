<script setup lang="ts">
  import SearchInput from './components/SearchInput/index.vue'
</script>

<template>
  <div class="container">
    <header>
      <SearchInput class="searchInput-box" />
    </header>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: relative;
    height: 100vh;
    background: url('https://files.codelife.cc/itab/defaultWallpaper/defaultWallpaper.webp');
    display: flex;
    flex-direction: column;

    header {
      width: 100%;
      display: flex;
      justify-content: center;

      .searchInput-box {
        margin-top: 60px;
      }
    }
  }
</style>
