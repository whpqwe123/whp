<template>
    <textarea id="default-editor">
      {{ value }} 
    </textarea>
    <el-button @click="handleSubmit">click</el-button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        value: '',
      }
    },
    methods: {
      handleSubmit() {
        // 获取内容的方式
        console.log(tinymce.activeEditor.getContent())
      },
    },
    mounted() {
        tinymce.init({
            selector: 'textarea#default-editor',
            branding: false, // 取消右下角默认提示
            height: 900,
            plugins: 'advlist link image lists paste', // 使用插件
            paste_data_images: true, // 支持图片粘贴
        })
    },
  }
  </script>
  
  <style lang="scss" scoped></style>
  