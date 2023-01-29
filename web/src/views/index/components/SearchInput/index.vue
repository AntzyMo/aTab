<script setup lang="ts">
  import { ref } from 'vue'

  import ArrowDownIcon from '@/components/icon/ArrowDownIcon.vue'
  import CloseIcon from '@/components/icon/CloseIcon.vue'
  import SearchIcon from '@/components/icon/SearchIcon.vue'

  import useSearchSelect from './hooks/useSearchSelect'

  const serachValue = ref('')
  const { searchSelectValue, showSearchselect, searchUrlMap, selectUrl } =
    useSearchSelect()

  // 回车搜索
  const confrim = () => {
    const url = searchUrlMap.value[searchSelectValue.value].url
    window.open(url + serachValue.value)
  }
</script>

<template>
  <div class="search-box">
    <div class="full">
      <div
        class="inputPrefix"
        @click="showSearchselect = !showSearchselect"
      >
        <img :src="searchUrlMap[searchSelectValue].iconUrl" />
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

    <div
      class="select-box"
      :class="{ 'search-box-active': showSearchselect }"
    >
      <div
        v-for="(item, index) in searchUrlMap"
        :key="item.url"
        class="url-box"
        :class="{ 'url-box-active': searchSelectValue === index }"
        @click="selectUrl(index)"
      >
        <div class="urlIcon">
          <img :src="item.iconUrl" />
        </div>
        <span class="url-text">{{ item.name }}</span>
      </div>
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
    position: relative;

    .full {
      display: flex;
      align-items: center;
      flex: 1;
      position: relative;
      overflow: hidden;
      .inputPrefix {
        margin-right: 4px;
        display: flex;
        align-items: center;
        width: 50px;
        height: 50px;
        justify-content: center;
        padding-left: 8px;
        cursor: pointer;

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
    .select-box {
      position: absolute;
      top: 54px;
      left: 0;
      right: 0;
      z-index: 1;
      box-shadow: 0 0 10px 3px #0000001a;
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 23px;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      transform: scaleY(0);

      .url-box {
        width: 64px;
        padding: 6px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        position: relative;
        transition: background 0.2s;
        border-radius: 8px;

        &:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        .urlIcon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;

          img {
            width: 20px;
            height: 20px;
          }
        }

        .url-text {
          font-size: 12px;
          color: #222;
        }
      }
      .url-box-active {
        background: rgba(255, 255, 255, 0.7);
      }
    }
    .search-box-active {
      transform: scaleY(1);
    }
  }
</style>
