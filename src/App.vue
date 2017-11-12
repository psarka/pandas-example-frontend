<template>
  <div id="app">
    <app-header></app-header>
    <div class="app-body">
      <div class="sidebar-container">
        <sidebar></sidebar>
      </div>
      <div class="router-view-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from './components/Sidebar.vue'

export default {
  components: {Sidebar},
  name: 'app'
}
</script>

<style>
  #app {
    font-family: 'Inconsolata', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
  }

  .app-body {
    display: flex;
    justify-content: flex-start;
  }

  .sidebar-container {
    border: solid 1px olivedrab;
    flex: initial;
    width: 300px;
  }

  .router-view-container {
    border: solid 1px olivedrab;
    flex: 1;
  }

</style>
