<script setup lang="ts">
  import AddIcon from '@/components/icon/AddIcon.vue'
  import RightMemu from '@/components/RightMemu/index.vue'

  import useTab from './components/SearchInput/hooks/useTab'
  import SearchInput from './components/SearchInput/index.vue'
  import useRightMemu from './hooks/useRightMemu'

  const { tabMap, save, getchreom } = useTab()
  const { showRightMenu, rightClick, mouseXY } = useRightMemu()
  console.log('mouseXY', mouseXY)
</script>

<template>
  <div
    class="container"
    @click.right.prevent="rightClick"
    @click="showRightMenu = false"
  >
    <header>
      <SearchInput class="searchInput-box" />
    </header>

    <main>
      <div class="main-box">
        <a
          v-for="item in tabMap"
          :key="item.name"
          :href="item.url"
          class="tabBox"
        >
          <div class="imgBox">
            <img :src="item.iconUrl" />
          </div>
          <span class="tab-text">{{ item.name }}</span>
        </a>
      </div>
      <div @click="save">储存</div>
      <div @click="getchreom">虎丘</div>
    </main>

    <!-- 右键菜单 -->
    <RightMemu
      :open="showRightMenu"
      :x="mouseXY.x"
      :y="mouseXY.y"
      :data="[
        {
          name: '添加图标',
          icon: AddIcon
        }
      ]"
    />
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
      margin-bottom: 20px;
      .searchInput-box {
        margin-top: 60px;
      }
    }

    main {
      width: 100%;
      display: flex;
      justify-content: center;

      .main-box {
        max-width: 1350px;
        display: flex;
        flex-wrap: wrap;
        flex: 1;

        .tabBox {
          width: 90px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          column-gap: 20px;
          user-select: none;
          cursor: pointer;
          text-decoration: none;

          .imgBox {
            width: 60px;
            height: 60px;
            background: #fff;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 4px;

            img {
              width: 50px;
              height: 50px;
            }
          }
          .tab-text {
            color: #fff;
          }
        }
      }
    }
  }
</style>
