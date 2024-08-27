<script setup lang="ts">
import AutomobileCard from '@/components/cards/AutomobileCard.vue';
import AutomoveisTable from '@/components/Tables/AutomoveisTable.vue';
import ViagemTable from '@/components/Tables/ViagemTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    automobile: {},
    travels: []
});

const handleSubmit = async () => {
    try {
        const id = state.automobile.id;

        delete state.automobile.id;

        const { data } = await services.automoveis.updateById(id, state.automobile);

        console.log(data);
    } catch (e) {
        console.error(e);
    }

}

const fetchAutomobile = async () => {
    try {
        const id = await router.currentRoute.value.params.id;

        const { data } = await services.automoveis.getById(id);

        // console.log(data);

        state.automobile = data.data.automobile;
    } catch (e) {
        console.error(e);
    }
}

const fetchDriverId = async (id: String) => {
    try {
        let { data } = await services.motoristas.getById(id);
        console.log('Driver:', data);

        return data.data.driver;
    } catch (e) {
        console.error(e);
    }
}

const fetchTravels = async () => {
    try {
        const { data } = await services.viagens.getByAutomobileId(state.automobile.id);

        console.log(data);

        state.travels = data.data.routes;

        state.travels.forEach(async travel => {
            travel.automobile = state.automobile;
            travel.driver = await fetchDriverId(travel.driver_id);
        });

    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(async () => {
    await fetchAutomobile();
    await fetchTravels();
});
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <AutomobileCard :automobile="state.automobile" title="Editar automovel" button="Editar"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <ViagemTable :data="state.travels" @on-click:delete="handleDelete" />
        </div>
    </DefaultLayout>
</template>
