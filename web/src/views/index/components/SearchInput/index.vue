<script setup lang="ts">
  import { ref } from 'vue'

  import ArrowDownIcon from '@/components/icon/ArrowDownIcon.vue'
  import CloseIcon from '@/components/icon/CloseIcon.vue'
  import SearchIcon from '@/components/icon/SearchIcon.vue'

  const serachValue = ref('')
  const confrim = () => {
    window.open(`https://www.baidu.com/s?wd=${serachValue.value}`)
  }
</script>

<template>
  <div class="search-box">
    <div class="inputPrefix">
      <img src="https://files.codelife.cc/itab/search/baidu.svg" />
      <ArrowDownIcon />
    </div>
    <div class="input-box">
      <input
        v-model.trim="serachValue"
        placeholder="请输入您要搜索的内容"
        @keyup.enter="confrim"
      />
      <CloseIcon
        v-show="serachValue.length"
        class="closeIcon"
        @click="serachValue = ''"
      />
    </div>
    <div
      class="searchIcon"
      @click="confrim"
    >
      <SearchIcon />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-box {
    max-width: 600px;
    height: 46px;
    box-shadow: 0 0 10px 3px #0000001a;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 23px;
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;

    .inputPrefix {
      margin-right: 4px;
      display: flex;
      align-items: center;
      width: 50px;
      height: 50px;
      justify-content: center;
      padding-left: 8px;

      &:hover {
        background: rgba(255, 255, 255, 0.4);
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .input-box {
      display: flex;
      align-items: center;
      flex: 1;
      margin-right: 4px;

      input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        color: #222;
        font-size: 14px;
        background: transparent;
        margin-right: 4px;
      }
      .closeIcon {
        cursor: pointer;
      }
    }

    .searchIcon {
      // width: 32px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0 15px;

      &:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }
</style>
