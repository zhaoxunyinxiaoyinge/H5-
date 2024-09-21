<template>
  <div>
    <!-- keep-alive缓存的是组件name -->
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </router-view>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { getBaiseAccessToken, getJsapiSticket } from "@/serve/api";
export default {
  name: 'App',
  setup() {
    onMounted(() => {
      getAccessToken();
    })

    const getAccessToken = async function () {
      try {
        let data = await getBaiseAccessToken();
        await getJsapiSticket({ access_token: data.data.access_token, type: "jsapi", sticket: true })
      } catch (e) {
        console.log(e);
      }
    };

    return {

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
