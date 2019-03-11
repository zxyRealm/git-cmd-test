<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
// const DataLit = () => import('@/pages/list')
export default {
  name: 'app',
  created () {
    this.$router.addRoutes([
      {
        path: '/data/list',
        name: 'DataList',
        component: () => import('@/pages/list')
      },
      {
        path: '*',
        name: 'error',
        component: () => import('@/pages/error404')
      }
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
