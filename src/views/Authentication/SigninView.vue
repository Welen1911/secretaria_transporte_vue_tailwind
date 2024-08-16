<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

const route = useRoute();
const router = useRouter();

const state = reactive({
  hasError: false
});

onMounted(async () => {
  const token = await getUrlQueryParams();

  if (!token) {
    state.hasError = true;
  }
});

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
