<template>
  <div class="toys">
    <el-row class="row" :gutter="20" v-for="(item, index) in toys" :key="index">
      <el-col class="col" :span="8" v-for="(item1, index1) in item" :key="index1">
        <router-link :to="item1.toyUrl">
          <el-card class="card" :style="{ background: index % 2 === 0 ? (index1 === 1 ? '#fff' : randColorElem()) : (index1 !== 1 ? '#fff' : randColorElem()) }">
            <div class="img"><img :src="item1.toyImg" alt=""></div>
            <div class="title" :style="{ color: index % 2 === 0 ? (index1 !== 1 ? '#fff' : null) : (index1 === 1 ? '#fff' : null) }">{{ item1.toyName }}</div>
            <div class="desc" :style="{ color: index % 2 === 0 ? (index1 !== 1 ? '#fff' : null) : (index1 === 1 ? '#fff' : null) }">{{ item1.toyDescription }}</div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      toysList: [
        { toyName: '聊天室', toyUrl: '/toys/hichat', toyImg: require('@/static/images/toys/wallhaven.jpg'), toyDescription: '客户端使用vue-socket.io，服务端使用socket.io搭建的简易聊天室应用客户端使用vue-socket.io，服务端使用socket.io搭建的简易聊天室应用客户端使用vue-socket.io，服务端使用socket.io搭建的简易聊天室应用客户端使用vue-socket.io，服务端使用socket.io搭建的简易聊天室应用客户端使用vue-socket.io，服务端使用socket.io搭建的简易聊天室应用客户端使用vue-socket.io，服务端使用socket.io搭建的简易聊天室应用' }
      ]
    }
  },
  methods: {
    // 获取随机颜色
    randColor () { return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6) },
    // 随机获取element-ui主题色
    randColorElem () {
      let arr = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
      return arr[Math.floor(Math.random() * 5)]
    }
  },
  computed: {
    // 将列表拆分为每三个一组的数据块
    toys () { return _.chunk(this.toysList, 3) }
  }
}
</script>
<style lang="less" scoped>
.toys {
  .row {
    margin-bottom: 20px;
    .col {
      .card {
        .img {
          margin-bottom: 8px;
          img {
            width: 100%;
            height: 124px;
            border-radius: 4px;
          }
        }
        .title {
          font-size: 16px;
          color: #303133;
        }
        .desc {
          position: relative;
          height: 72px;
          margin-top: 8px;
          font-size: 14px;
          color: #909399;
          line-height: 24px;
          overflow: hidden;
        }
        .desc::after {
          content: '';
          font-weight: bold;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 0 20px 1px 45px;
        }
      }
    }
  }
  .row:last-child {
    margin-bottom: 0;
  }
}
</style>
