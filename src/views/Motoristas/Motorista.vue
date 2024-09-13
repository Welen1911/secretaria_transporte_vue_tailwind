<script setup lang="ts">
import DriverCard from '@/components/cards/DriverCard.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ViagemTable from '@/components/tables/ViagemTable.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';
import ViagemTable_motorista from '@/components/Tables/ViagemTable_motorista.vue';

const router = useRouter();

const state = reactive({
    driver: {},
    travels: [],
    users: []
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

const fetchAutomobileId = async (id: String) => {
    try {
        let { data } = await services.automoveis.getById(id);

        console.log('AutoMobile:', data);
        return data.data.automobile;
    } catch (e) {
        console.error(e);
    }
}
const fetchUsers = async () => {
    try {
        const { data } = await services.auth.getAll();

        state.users = data.data;

        state.users.push(state.driver.user);

        console.log(state.users);

    } catch (e) {
        console.error(e);
    }
}

const fetchTravels = async () => {
    try {
        const { data } = await services.viagens.getByDriverId(state.driver.id);

        console.log('Rotas: ', data);

        state.travels = data.data.routes;

        console.log(state);

        state.travels.forEach(async travel => {
            travel.automobile = await fetchAutomobileId(travel.automobile_id);
            travel.driver = state.driver;
        });

    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(async () => {
    await fetchDriver();
    await fetchTravels();
    await fetchUsers();
});
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <DriverCard :users="state.users" :driver="state.driver" title="Editar motorista" button="Editar"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <ViagemTable_motorista :data="state.travels" @on-click:delete="handleDelete" />
        </div>
    </DefaultLayout>
</template>
