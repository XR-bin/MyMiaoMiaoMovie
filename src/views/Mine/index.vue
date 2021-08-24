<template>
  <div id="main">
    <Header title="我的喵喵"/>
    <div id="content">
      <Login />
    </div>
    <TabBar/>
  </div>
</template>

<script>
import Header from '../../components/Header/header.vue'
import TabBar from '../../components/TabBar/tabBar.vue'
import Login from '../../components/Login/Login.vue'

export default {
  name: 'Mine',
  components: {
    Header,
    TabBar,
    Login
  }
}
</script>

<style>
</style>
