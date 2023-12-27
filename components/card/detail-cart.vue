<template>

  <el-drawer
      title="Danh sách tin đã lưu"
      :append-to-body="true"
      :before-close="handleClose">
    <div>
      <h1>Item1</h1>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
const handleClose = (done: () => void) => {
 done()
}
</script>