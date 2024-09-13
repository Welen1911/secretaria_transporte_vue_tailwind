<script setup lang="ts">
import { watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
import { userStore } from './stores/user';
import services from './services';

const router = useRouter();
const route = useRoute();

const store = userStore();

watch(
  () => route.path, async () => {

    try {
      const { data } = await services.auth.getMe();
      console.log(data);

      store.setUser(data.data);

      console.log(store.email);
    } catch (e) {
      console.error(e);
      // window.localStorage.clear();
      // window.location.href = 'https://web-gerenciador-publico.netlify.app';
    }
  }
);

</script>

<template>
  <RouterView />
</template>
