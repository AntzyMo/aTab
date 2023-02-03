<script setup lang="ts">
  import { ref } from 'vue'

  import CloseIcon from '@/components/icon/CloseIcon.vue'
  import SearchIcon from '@/components/icon/SearchIcon.vue'

  import useSearchKeyWord from './hooks/useSearchKeyWord'
  import useSearchSelect from './hooks/useSearchSelect'

  const serachValue = ref('')
  const searchInputRef = ref<HTMLInputElement | null>(null)
  const { searchSelectValue, showSearchselect, searchUrlMap, selectUrl } = useSearchSelect()
  const { keyWordList, searchKeyWord } = useSearchKeyWord()

  // 回车搜索
  const confrim = () => {
    const url = searchUrlMap.value[searchSelectValue.value].url
    window.open(url + serachValue.value)
    clearSearchValue()
  }

  // 清空输入框
  const clearSearchValue = () => {
    serachValue.value = ''
    searchInputRef.value?.focus()
    keyWordList.value = []
  }

  const fun = (e: CompositionEvent) => {
    const { data } = e
    // 获取光标位置
    const selectionStartIdx = searchInputRef.value?.selectionStart || 0

    if (selectionStartIdx > 0 && selectionStartIdx < serachValue.value.length - 1) {
      const valStart = serachValue.value.slice(0, selectionStartIdx)
      const valEnd = serachValue.value.slice(selectionStartIdx)
      serachValue.value = valStart + data + valEnd
      return
    }

    serachValue.value = data
  }
</script>

<template>
  <div class="search-box">
    <div class="full">
      <div class="inputPrefix">
        <img :src="searchUrlMap[searchSelectValue].iconUrl" />
      </div>
      <div class="input-box">
        <input
          ref="searchInputRef"
          v-model.trim="serachValue"
          placeholder="请输入您要搜索的内容"
          @keyup.enter="confrim"
          @input="searchKeyWord(serachValue)"
          @compositionupdate="fun"
        />
        <CloseIcon
          v-show="serachValue.length"
          class="closeIcon"
          @click="clearSearchValue"
        />
      </div>
      <div
        class="searchIcon"
        @click="confrim"
      >
        <SearchIcon />
      </div>
    </div>

    <!-- 搜索引擎下拉框 -->
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

    <div class="searchKeyword-box">
      <div
        v-for="item in keyWordList"
        :key="item.value"
        class="item"
      >
        <div class="full">
          <SearchIcon class="keywordSearchIcon" />
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-box {
    max-width: 600px;
    height: 46px;
    box-shadow: 0 0 10px 3px #0000001a;
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
      height: 100%;

      .inputPrefix {
        display: flex;
        align-items: center;
        width: 36px;
        height: 100%;
        justify-content: center;
        padding-left: 8px;
        cursor: pointer;
        border-top-left-radius: 23px;
        border-bottom-left-radius: 23px;
        user-select: none;

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
        border-top-right-radius: 23px;
        border-bottom-right-radius: 23px;
        user-select: none;

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

    .searchKeyword-box {
      position: absolute;
      top: 54px;
      left: 0;
      right: 0;
      z-index: 1;
      box-shadow: 0 0 10px 3px #0000001a;
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 23px;
      overflow: hidden;
      .item {
        font-size: 14px;
        color: #222;
        display: flex;
        align-items: center;
        cursor: pointer;
        flex: 1;
        padding: 10px 20px;
        transition: all 0.4s;

        &:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        &:hover .full {
          transform: translate3d(5px, 0, 0);
        }

        .full {
          transition: all 0.4s;
          .keywordSearchIcon {
            transform: scale(0.8);
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>
