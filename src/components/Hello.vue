<template>

  <div class="topContainer">
    <div class="sidebarContainer">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
    <div class="centerContainer">
      <df></df>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        wom: 'bat'
      }
    }
  }
</script>

<style scoped>

.topContainer {
  display: flex;
  justify-content: flex-start;
}

.sidebarContainer {
  border: solid 1px olivedrab;
  flex: initial;
  width: 300px;
}

.centerContainer {
  border: solid 1px olivedrab;
  flex: 1;
}

</style>
