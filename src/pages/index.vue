<template>
    <div class="page">
        <h2>分支提交了</h2>
        <router-link to="/home">主页</router-link>
    </div>
</template>

<script>
  import {GetList} from '../api/common'

  export default {
    data () {
      return {}
    },
    methods: {
      getServeIp () {
        GetList().then(res => {
          console.log(res)
        })
      }

    },
    created () {
      // console.log(process.env)
    },
    components: {}
  }
</script>

<style scoped>
</style>
