<!-- scoped 当前样式只能在当前组件中起作用 -->
<!-- lang="scss" 设置样式语言为 sass -->
<style lang="scss" scoped>
    .login-container {
        height: 100%;
        background-color: #dcedc8;
        .form-wrap {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 360px;
            background-color: white;
            transform: translate(-50%, -50%);
            padding: 32px 32px 20px;
            border-radius: 15px;
            .header {
                text-align: center;
                margin-bottom: 32px;
            }
            .el-button {
                width: 100%;
                margin-top: 24px;
            }
            .psw {
                margin-top: 10px;
            }
        }
    }
</style>

<template>
    <div class="login-container">

        {{ $store.state.userInfo }}
        <div class="form-wrap">
            <h2 class="header" @click="add"> 嗨购后台管理系统 {{ $store.state.count }} </h2>
            <el-input clearable  v-model="adminname" placeholder="请输入管理员账号" />
            <el-input class="psw" type="password" show-password v-model="password" placeholder="请输入密码" />

            <el-button type="primary" @click="submitForm">登录</el-button>
            
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import md5 from "md5";
// import axios from "axios";
// f. 导入我们封装的 API 接口
import { loginFn } from "../api/user";

import { mapState, mapMutations,mapActions } from "vuex";
/*
    使用全局状态的方法：
    1. this.$store.state.count
    2. 在模板中 {{ $store.state.count }}
    3. 映射 computed: {   ...mapState(['count']) },
*/ 


export default {
    data() {
        return {
            msg: '你好：',
            adminname: 'admin',
            password: '123456'
        }
    },
    computed: {
        ...mapState(['count'])
    },
    methods: {
        ...mapMutations(['increment', 'updateUserInfo']),
        add(){
            // 调用 Mutations 中修改的方法
            // this.increment()
            // 通过 commit 触发 Mutations 中的方法
            // this.$store.commit('increment')

            this.$store.dispatch('incrementAct')
            // console.log(this.$store);
        },
        submitForm(){
            // if(this.adminname.length < 5){
            //     // alert('账号长度要大于 5 ')
            //     ElMessage.error('账号长度要大于 5')
            // }

            // console.log((/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/.test(this.password)));
            // // 请包含大写字母小写字母数字和特殊字符中三项即可
            // if(!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/.test(this.password)){
            //     ElMessage.error('请包含大写字母小写字母数字和特殊字符中三项即可')
            // }

            // 千峰 123 教育 456 前端
            // 注册的时候要是加密了，那么登录的时候也要相同方式加密
            // console.log(md5('千峰' + this.password + '教育'));


            // 发送数据请求进行登录
            // axios.post('/admin/login', {
            //     adminname: 'admin',
            //     password: '123456'
            // })
            // .then(function (response) {
            //     console.log(response);
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });

            // g. 发送数据请求
            loginFn({
                adminname: this.adminname,
                password: this.password
            })
            .then(res => {
                // 请求成功的回调
                console.log(res);
                // h. 请求之后的处理
                if(res.code == "200"){
                    // 登录成功
                    ElMessage({
                        message: res.message,
                        type: 'success',
                    })
                    // 父子传值可以使用 props
                    // 子传父自定义事件
                    // 祖先传值可以用 依赖注入
                    // 非父子，两个或者多个不相干的组件如何传值呢？
                    // vuex
                    // 登录成功后保存用户数据，然后跳转到首页
                    // console.log(res.data);
                    // 将数据存储到 vuex 中
                    this.updateUserInfo(res.data)
                    localStorage.setItem('token', res.data.token)

                    // 通过路由跳转到首页面
                    // console.log(this.$router);
                    // 跳转到首页
                    this.$router.push('/')
                }else {
                    ElMessage.error(res.message)
                }
                
            })
            .catch(err => {
                // 请求失败的回调
                // ElMessage.error(err.message)
            })

        }
    },
    mounted(){
        // console.log(this.$store.state.count);
        console.log('映射出的值：', this.count);
    }
}
</script>
