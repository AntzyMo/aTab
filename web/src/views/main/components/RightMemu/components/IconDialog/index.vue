<script setup lang="ts">
  import 'element-plus/theme-chalk/el-message.css'

  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { storeToRefs } from 'pinia'
  import { reactive, ref } from 'vue'

  import { searchIconApi } from '@/api'
  import Dialog from '@/components/Dialog/index.vue'
  import BlueCheckIcon from '@/components/icon/BlueCheckIcon.vue'
  import { useTabStore } from '@/stores'

  import type { tabMapType } from '../../../../../../stores/index'

  interface iconFormType {
    url: string
    name: string
    iconList: string[]
    iconActive: number
    id: number
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
    id: 0
  })

  // 查询图标
  const getIcon = async () => {
    loading.value = true
    const { iconArr, name } = await searchIconApi(iconForm.url)
    loading.value = false
    iconForm.iconList = iconArr
    iconForm.name = name
  }

  // 打开弹窗
  const openDialog = async (data?: tabMapType) => {
    dialogVisiable.value = true

    if (data) {
      dialogTitle.value = '修改图标'
      const { name, url, iconUrl, id } = data
      iconForm.url = url
      iconForm.id = id
      await getIcon()
      iconForm.name = name
      iconForm.iconActive = iconForm.iconList.findIndex(item => item === iconUrl)
    } else {
      dialogTitle.value = '添加图标'
      formRef.value?.resetFields()
    }
  }

  // 保存图标并继续
  const saveIcon = () => {
    const { name, url, iconList, iconActive, id } = iconForm
    const params = {
      name,
      url,
      iconUrl: iconList[iconActive],
      id
    }
    console.log(params, 'params')

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
      <el-form-item>
        <div
          v-loading="loading"
          class="seachIconBox"
        >
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
            v-if="dialogTitle === '修改图标'"
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
      }
    }
  }

  .cursor {
    cursor: pointer;
  }
</style>
