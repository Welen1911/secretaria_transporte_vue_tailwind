<script setup lang="ts">
import services from '@/services';
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

const route = useRoute();
const router = useRouter();

const state = reactive({
  hasError: false
});

onMounted(async () => {
  const accessToken = await getUrlQueryParams();

  if (!accessToken) {
    state.hasError = true;
    return;
  }

  window.localStorage.setItem('AccessToken', accessToken);

  login();

});

const login = async () => {
  try {
    const { data } = await services.auth.login();

    console.log(data);
  } catch (e) {
    console.erro(e);
  }
}

const getUrlQueryParams = async () => {
  await router.isReady()

  console.log(route.query.token)

  return route.query.token;
};
</script>

<template>
  <DefaultAuthCard subtitle="Aguarde um momento" title="Fazendo login">
    <img v-if="!state.hasError" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="">
    <div v-else>
      <h1>Ocorreu um erro! Tente novamente mais tarde!</h1>
    </div>
  </DefaultAuthCard>
</template>
