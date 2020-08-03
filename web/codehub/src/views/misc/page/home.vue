<template>
  <div class="home">
    <img alt="Vue logo" src="@assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
// import utils from "@utils/load";
const HelloWorld = () =>
  import(
    /* webpackPrefetch: true,webpackChunkName: "helloworld",webpackPreload: true */ "@components/HelloWorld"
  );
export default {
  name: "Home",
  components: {
    // components: { HelloWorld: () => utils.loader("./components/HelloWorld") }
    HelloWorld
  }
};
</script>
