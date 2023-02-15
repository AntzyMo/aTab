<script setup lang="ts">
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { storeToRefs } from 'pinia'
  import { reactive, ref } from 'vue'

  import { searchIconApi } from '@/api'
  import Dialog from '@/components/Dialog/index.vue'
  import BlueCheckIcon from '@/components/icon/BlueCheckIcon.vue'
  import CheckIcon from '@/components/icon/CheckIcon.vue'
  import type { tabMapType } from '@/stores'
  import { useTabStore } from '@/stores'

  interface iconFormType {
    url: string
    name: string
    iconList: string[]
    iconActive: number
    id: number
    colorPicker: string
    colorItemActive: number
  }

  const { pushChromeStorageTab, setChromeStorageTab } = useTabStore()
  const { tabMap } = storeToRefs(useTabStore())
  const formRef = ref<FormInstance>()

  const dialogVisiable = ref(false)
  const dialogTitle = ref('')

  const loading = ref(false)

  const iconForm = reactive<iconFormType>({
    url: '',
    name: '',
    iconList: [],
    iconActive: 0,
    id: 0,
    colorPicker: 'rgb(22, 129, 255)',
    colorItemActive: 0
  })

  const colorList = [
    'rgb(22, 129, 255)',
    'rgb(251, 190, 35)',
    'rgb(252, 69, 72)',
    'rgb(75, 60, 54)',
    'rgb(125, 172, 104)',
    'rgb(2, 51, 115)',
    'rgb(200, 172, 112)',
    'rgb(55, 33, 40)',
    'rgb(200, 44, 52)',
    'rgb(5, 64, 146)',
    'rgb(163, 221, 185)'
  ]
  let oldColor = '' // 缓存打开 colorPicker 前的值

  // 查询图标
  const getIcon = async () => {
    loading.value = true
    const { iconArr, name } = await searchIconApi(iconForm.url)
    loading.value = false
    iconForm.iconList = iconArr
    if (name) iconForm.name = name
  }

  // 打开弹窗
  const openDialog = async (data?: tabMapType) => {
    dialogVisiable.value = true

    if (data) {
      dialogTitle.value = '修改图标'
      const { name, url, iconUrl, id, bgColor } = data
      iconForm.url = url
      iconForm.id = id
      if (iconUrl) await getIcon()
      iconForm.name = name
      iconForm.colorPicker = bgColor
      iconForm.colorItemActive = colorList.indexOf(bgColor)
      iconForm.iconActive = iconForm.iconList.findIndex(item => item === iconUrl)
    } else {
      dialogTitle.value = '添加图标'
      formRef.value?.resetFields()
    }
  }

  // 保存图标并继续
  const saveIcon = () => {
    const { name, url, iconList, iconActive, id, colorPicker } = iconForm
    const params = {
      name,
      url,
      iconUrl: iconList[iconActive],
      id,
      bgColor: colorPicker,
      isDel: false
    }

    if (dialogTitle.value === '修改图标') {
      setChromeStorageTab(id, params)
      ElMessage({
        message: `修改成功`,
        type: 'success'
      })
    } else {
      params.id = tabMap.value.length + 1
      pushChromeStorageTab(params)
      ElMessage({
        message: `添加【${name}】成功`,
        type: 'success'
      })
    }
    closeDialog()
  }

  // 保存并退出
  const saveIconAndClose = () => {
    saveIcon()
    dialogVisiable.value = false
  }

  // 关闭弹窗清空数据
  const closeDialog = () => {
    formRef.value?.resetFields()
    iconForm.iconList = []
  }

  // 选择颜色
  const selectTabColor = (idx: number) => {
    iconForm.colorPicker = colorList[idx]
    iconForm.colorItemActive = idx
  }

  // 改变颜色
  const colorChange = (color: string) => {
    iconForm.colorItemActive = -1
    if (!oldColor) oldColor = iconForm.colorPicker
    if (!color) {
      iconForm.colorItemActive = 0
      iconForm.colorPicker = 'rgb(22, 129, 255)'
      return
    }
    iconForm.colorPicker = color
  }

  defineExpose({
    openDialog
  })
</script>

<template>
  <Dialog
    v-model="dialogVisiable"
    @close="closeDialog"
  >
    <template #header>
      <div class="title">{{ dialogTitle }}</div>
    </template>

    <el-form
      ref="formRef"
      label-width="68px"
      label-position="left"
      class="form"
      :model="iconForm"
    >
      <el-form-item
        label="地址"
        prop="url"
      >
        <el-input v-model.trim="iconForm.url">
          <template #append>
            <span
              class="cursor"
              @click="getIcon"
              >获取图标</span
            >
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input v-model.trim="iconForm.name" />
      </el-form-item>
      <el-form-item
        v-if="iconForm.name && !iconForm.iconList.length"
        label="图标颜色"
        prop="colorItemActive"
      >
        <div class="colorList">
          <div
            v-for="(item, index) in colorList"
            :key="item"
            class="colorItem cursor"
            :style="{
              background: item
            }"
            @click="selectTabColor(index)"
          >
            <CheckIcon
              v-show="index === iconForm.colorItemActive"
              class="checkIcon"
            />
          </div>
          <el-color-picker
            v-model="iconForm.colorPicker"
            show-alpha
            @active-change="colorChange"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <div
          v-loading="loading"
          class="seachIconBox"
        >
          <!-- 文字图标 -->
          <div
            v-if="iconForm.name && !iconForm.iconList.length"
            class="tabbox"
          >
            <div
              class="imgbox"
              :style="{ background: iconForm.colorPicker }"
            >
              <div class="text">{{ iconForm.name.slice(0, 2) }}</div>
            </div>
            <span>文字图标</span>
          </div>

          <!-- icon图标 -->
          <div
            v-for="(item, index) in iconForm.iconList"
            :key="index"
            class="tabbox"
            @click="() => (iconForm.iconActive = index)"
          >
            <div class="imgbox">
              <img
                :src="item"
                :alt="item"
              />
              <BlueCheckIcon
                v-if="iconForm.iconActive === index"
                class="bluecheckicon"
              />
            </div>
            <span>图标{{ index + 1 }}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button
            type="primary"
            @click="saveIconAndClose"
            >保存</el-button
          >
          <el-button
            v-if="dialogTitle != '修改图标'"
            type="primary"
            @click="saveIcon"
            >保存并继续添加</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<style lang="scss" scoped>
  .form {
    margin-left: 20px;

    &:deep(.el-input) {
      width: 420px;

      .el-input__wrapper {
        background: #f0f1f4;
        box-shadow: none;
      }
    }

    .seachIconBox {
      column-gap: 28px;
      row-gap: 15px;
      display: flex;
      align-items: center;
      width: 420px;
      flex-wrap: wrap;
      margin: 24px 0;
    }

    .tabbox {
      display: flex;
      flex-direction: column;
      align-items: center;

      .imgbox {
        width: 60px;
        height: 60px;
        overflow: hidden;
        background: #fff;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
        position: relative;
        cursor: pointer;

        img {
          width: 100%;
          user-select: none;
          object-fit: scale-down;
        }

        .bluecheckicon {
          position: absolute;
          bottom: 4px;
          right: 2px;
          z-index: 1;
        }
        .text {
          color: #fff;
          font-size: 15px;
        }
      }
    }

    .colorList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 420px;
      .colorItem {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .checkIcon {
        color: #fff;
        width: 14px;
        height: 14px;
      }

      &:deep(.el-color-picker__trigger) {
        border: none;
        border-radius: 50%;
        padding: 0;
        overflow: hidden;
        width: 18px;
        height: 18px;
        .el-color-picker__color {
          border: none;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          padding: 0;
        }
        .el-color-picker__color-inner {
          background: url('@/assets/color.jpg');
          background-size: cover;
        }
      }
    }
  }

  .cursor {
    cursor: pointer;
  }
</style>
