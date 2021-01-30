<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <div id="app">
    <h1 style="font-family: 'Baskerville Old Face'; font-weight: bold; font-size: 5em; margin-top: 0.3em;color: #5c6161;text-align: center;">Poly'Movies</h1>
      <div class = "links" style="margin-left: 10%">
        <i class="gg-chevron-right"></i>
          <router-link to="/films">Films</router-link>
          <router-link to="/acteurs">Acteurs</router-link>
          <router-link to="/roles">Rôles</router-link>
        <i class="gg-chevron-left" style="margin-left: 15px"></i>
      </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>