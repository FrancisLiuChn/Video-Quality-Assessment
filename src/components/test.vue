<template>
<div>
  <div>
    <el-checkbox v-model="checked1" label="备选项1" true-label='1' border></el-checkbox>
    <!-- <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox> -->
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked1: '',
      checked2: false,
      checked3: false,
      checked4: true,
      checkboxGroup1: [],
      checkboxGroup2: []
    }
  }
}
</script>
