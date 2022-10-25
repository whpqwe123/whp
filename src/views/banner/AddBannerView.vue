<script>
import { Plus } from "@element-plus/icons-vue";
import { addBanner } from "@/api/banner";
export default {
    data() {
        return {
            imageUrl: '',
            formData: {
                alt: '',
                link: '',
                img: ''
            }
        }
    },
    components: {
        Plus
    },
    methods: {
        httpRequest(data){
            // data.file 是我们选中的文件
            // console.log(URL.createObjectURL(data.file));


            // 根据文件生成一个图片的 url ,用于展示预览
            // this.imageUrl = URL.createObjectURL(data.file)

            // 创建一个文件加载器
            let reader = new FileReader()
            // 指定加载器开始加载文件
            reader.readAsDataURL(data.file)
            // 加载完成后的回调函数
            reader.onload = () =>{
                // reader.result 成功之后的结果
                console.log(reader.result);
                this.imageUrl = reader.result
                this.formData.img = reader.result
            }
        },
        // 点击提交轮播图
        addBanner(){
            console.log(this.formData);
            addBanner(this.formData).then(res => {
                this.$router.push('/banner/bannerlist')
            })
        }
    }
}
</script>
<template>
     <el-form>
        <el-form-item label="alt">
            <el-input v-model="formData.alt" placeholder="请输入 alt" />
        </el-form-item>

        <el-form-item label="link">
            <el-input v-model="formData.link" placeholder="请输入 link" />
        </el-form-item>

        <el-form-item label="选择图片">
            <el-upload
                class="avatar-uploader"
                :http-request="httpRequest"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>

        <el-button @click="addBanner"> 添加 </el-button>

     </el-form>
</template>
<style lang="scss" scoped>
.avatar-uploader {
    width: 170px;
    height: 170px;
    background-color: aliceblue;
    .el-icon {
        width: 50px;
        height: 50px;
        margin: 60px;
    }
}
.avatar {
    width: 170px;
    height: 170px;
}
</style>