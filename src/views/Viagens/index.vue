<script setup lang="ts">
import TravelCard from '@/components/cards/TravelCard.vue';
import TurnosTable from '@/components/Tables/TurnosTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';

const state = reactive({ 
    turns: [],
    travel: {
        passengersNumber: null,
        turn_id: null,
        driver_id: null,
        automobile_id: null
    },
    automobiles: [],
    drivers: []
});

const handleSubmit = async () => {
    try {
        const { data } = await services.viagens.create(state.travel);

        clearInputs();

        fetchTurns();

        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

const clearInputs = () => {
    state.turn = {
        period: '',
        start_begin: '',
        start_return: ''
    }
}

const handleDelete = async (id: String) => {
    try {
        const { data } = await services.turnos.deleteById(id);

        console.log(data);

        fetchTurns();

    } catch (e) {
        console.error(e);
    }
}

const fetchTurns = async () => {
    try {
        const { data } = await services.turnos.getAll();

        state.turns = data.data.turns;

        console.log(state.turns);

    } catch (e) {
        console.error(e);
    }
}

const fetchSecoundPart = async () => {
    fetchAutomobiles();
    fetchDrivers();
}

const fetchAutomobiles = async () => {
    try {
        const { data } = await services.automoveis.getByTurnCapacity(state.travel.turn_id, state.travel.passengersNumber);

        state.automobiles = data.data.auto_mobiles;

        console.log(state.automobiles);


    } catch (e) {
        console.error(e);
    }
}

const fetchDrivers = async () => {
    try {
        const { data } = await services.motoristas.getByTurnCategoryCNH(state.travel.turn_id, state.travel.passengersNumber);

        state.drivers = data.data.drivers;

        console.log(state.drivers);

    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(fetchTurns);
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <TravelCard :turns="state.turns" :travel="state.travel" :automobiles="state.automobiles" :drivers="state.drivers" title="Cadastrar viagem"
                @on-click:submit="handleSubmit" @on-click:continue="fetchSecoundPart" />
        </div>

        <!-- <div class="grid grid-cols-1 gap-4 mt-8">
            <TurnosTable :data="state.turns" @on-click:delete="handleDelete" />
        </div> -->
    </DefaultLayout>
</template>
