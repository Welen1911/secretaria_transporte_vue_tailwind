<script setup lang="ts">
import DriverCard from '@/components/cards/DriverCard.vue';
import MotoristasTable from '@/components/Tables/MotoristasTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';

const state = reactive({
    driver: {
        category: '',
        status: '',
    },
    automobiles: [],
    drivers: [],
    users: []
});

const fetchUsers = async () => {
    try {
        const { data } = await services.auth.getAll();

        state.users = data.data;

        console.log(state.users)

    } catch (e) {
        console.error(e);
    }
}

const handleSubmit = async () => {
    try {
        const { data } = await services.motoristas.create(state.driver);

        clearInputs();

        fetchDrivers();

        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

const clearInputs = () => {
    state.driver = {
        category: '',
        status: '',
    }
}

const handleDelete = async (id: String) => {
    try {
        const { data } = await services.motoristas.deleteById(id);

        console.log(data);

        fetchDrivers();

    } catch (e) {
        console.error(e);
    }
}

const fetchDrivers = async () => {
    try {
        const { data } = await services.motoristas.getAll();

        state.drivers = data.data.drivers;

        console.log(state.drivers);

    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(async () => {
    await fetchDrivers();
    await fetchUsers();
});
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <DriverCard :users="state.users" :driver="state.driver" title="Cadastrar motorista"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <MotoristasTable :data="state.drivers" @on-click:delete="handleDelete" />
        </div>
    </DefaultLayout>
</template>
