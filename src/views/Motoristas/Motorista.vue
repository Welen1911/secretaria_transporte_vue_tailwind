<script setup lang="ts">
import DriverCard from '@/components/cards/DriverCard.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    driver: {}
});

const handleSubmit = async () => {
    try {
        const id = state.driver.id;

        delete state.driver.id;

        const { data } = await services.motoristas.updateById(id, state.driver);

        console.log(data);
    } catch (e) {
        console.error(e);
    }

}

const fetchDriver = async () => {
    try {
        const id = await router.currentRoute.value.params.id;

        const { data } = await services.motoristas.getById(id);

        // console.log(data);

        state.driver = data.data.driver;

        console.log(state.driver);


    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(fetchDriver);
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <DriverCard :driver="state.driver" title="Editar motorista" button="Editar"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <!-- <AutomoveisTable :data="state.automobiles" @on-click:delete="handleDelete" /> -->
        </div>
    </DefaultLayout>
</template>
