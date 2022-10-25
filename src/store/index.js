import { createStore } from 'vuex'
// 导入数据持久化操作的库
import createPersistedState from "vuex-persistedstate";

// 创建一个新的 store 实例
const store = createStore({
    // 配置严格模式，严格要求使用方式，开启之后无法在 mutations 中使用异步，当前不开启也不建议使用
    strict: true,
    // 全局状态
    state () {
      return {
        count: 100,
        // 放用户信息用的
        userInfo: {},
        // 记录当前的路由
        currentPath: '/'
      }
    },
    // 唯一修改数据的方法
    mutations: {
      increment (state) {
        // setTimeout(()=>{
            state.count++
        // },5000)
      },
      //   设置用户信息
      updateUserInfo(state, value){
        state.userInfo = value
      },
      updateCurrentPath(state, value){
        state.currentPath = value
      }
    },
    // 异步修改数据的方法
    actions: {
        incrementAct (context) {
            console.log(context);
            setTimeout(()=>{
                context.commit('increment')
            },100)
            
        }
    },
    // vuex 的配置，配置数据持久化 
    plugins: [
        createPersistedState({
            // 设置要持久化的数据
            reducer: state => {
                return {
                    userInfo: state.userInfo
                }
            }
        })
    ]
  })

export default store
