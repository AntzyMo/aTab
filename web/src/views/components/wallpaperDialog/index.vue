<script setup lang="ts">
  import { ref } from 'vue'

  import { getWallpaper } from '@/api'
  import CheckIcon from '@/components/icon/CheckIcon.vue'
  import RightColDialog from '@/components/RightColDialog/index.vue'

  import type { iTabBindWallpaperResType } from '../../../../../server/src/api/modules/wallpaper'

  export interface wallpaperType extends iTabBindWallpaperResType {
    loading?: boolean
  }

  const emit = defineEmits(['transformWallpaper'])
  const dialogVisiable = ref(false)
  const wallpaperTypeActive = ref(0) // 左侧壁纸库
  const wallpaperTypeList = ['必应壁纸']
  const wallpaperList = ref<wallpaperType[]>([])
  const pageNum = ref(1)
  const listLoading = ref(false)

  const getList = async (page = 1) => {
    const data: wallpaperType[] = await getWallpaper(page)
    data.forEach(item => (item.loading = false))
    wallpaperList.value = [...wallpaperList.value, ...data]
  }

  const transformWallpaper = (item: wallpaperType) => {
    item.loading = true
    emit('transformWallpaper', item)
  }

  const openDialog = async () => {
    dialogVisiable.value = true
    listLoading.value = true

    try {
      await getList()
    } finally {
      listLoading.value = false
    }
  }

  const getMoreList = async () => {
    pageNum.value++
    try {
      await getList(pageNum.value)
    } finally {
      listLoading.value = false
    }
  }

  defineExpose({
    openDialog
  })
</script>

<template>
  <RightColDialog v-model="dialogVisiable">
    <template #left>
      <div class="leftBox">
        <h2>壁纸库</h2>
        <div class="wallpaperTypeBox">
          <div
            v-for="(item, index) in wallpaperTypeList"
            :key="index"
            class="item"
            :class="{ itemActive: wallpaperTypeActive === index }"
            @click="wallpaperTypeActive = index"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </template>
    <el-scrollbar :height="600">
      <div
        v-if="listLoading"
        class="skeleton"
      >
        <el-skeleton
          :rows="5"
          animated
        />
      </div>
      <template v-else>
        <div
          class="imageBox"
          height="100%"
        >
          <div
            v-for="item in wallpaperList"
            :key="item.fullSrc"
            class="item"
            @click="transformWallpaper(item)"
          >
            <el-button
              class="status"
              :loading="item.loading"
            >
              <CheckIcon
                v-show="!item.loading"
                class="checkIcon"
              />
            </el-button>
            <el-image
              loading="lazy"
              lazy
              class="img"
              :src="item.thumb"
            >
              <template #placeholder>
                <div class="dot">加载中...</div>
              </template>
            </el-image>
          </div>
        </div>
        <div
          v-if="wallpaperList.length"
          class="btns"
        >
          <el-button @click="getMoreList">加载更多</el-button>
        </div>
      </template>
    </el-scrollbar>
  </RightColDialog>
</template>

<style lang="scss" scoped>
  .leftBox {
    background: #f0f1f4;
    width: 163px;
    height: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-top: 20px;
    box-sizing: border-box;

    h2 {
      display: inline-block;
      padding-left: 30px;
      color: #000;
      font-size: 24px;
    }

    .wallpaperTypeBox {
      .item {
        color: #000;
        cursor: pointer;
        padding: 10px 0 10px 30px;
        user-select: none;

        &:hover {
          color: #409eff;
        }
      }
      .itemActive {
        background: #1890ff;
        color: #fff;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .el-scrollbar {
    padding: 10px 0;
    position: relative;
  }

  .skeleton {
    padding: 10px;
  }
  .imageBox {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding: 0 10px;
    column-gap: 12px;
    row-gap: 10px;
    user-select: none;

    .item {
      border-radius: 5px;
      width: 195px;
      height: 120px;
      cursor: pointer;
      overflow: hidden;
      position: relative;

      &:hover .status {
        display: flex;
      }

      .status {
        position: absolute;
        width: 40px;
        height: 40px;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background: #0006 !important;
        border: none;
        border-color: transparent;
        transition: background 0.2s;
        border-radius: 50%;
        color: #fff;
        display: none;

        &::before {
          content: none;
        }

        &:deep(.is-loading) {
          margin-left: 6px;
          font-size: 20px;
        }

        &:hover {
          background: #1890ff;
        }

        .checkIcon {
          color: #fff;
          width: 18px;
          height: 18px;
        }
      }

      &:hover .img {
        transform: scale(1.1);
        opacity: 0.8;
      }

      .img {
        height: 100%;
        width: 100%;
        transition: transform 0.3s;
      }

      .dot {
        font-size: 14px;
        background: #f5f7fa;
        color: #a8abb2;
        width: 195px;
        height: 120px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .btns {
    display: flex;
    padding: 20px 10px;
    justify-content: center;
  }
</style>
