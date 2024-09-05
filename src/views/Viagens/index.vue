<script setup lang="ts">
import TravelCard from '@/components/cards/TravelCard.vue';
import ViagemTable from '@/components/Tables/ViagemTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';

const state = reactive({
    turns: [],
    travel: {
        start: null,
        end: null,
        passengersNumber: null,
        turn_id: null,
        driver_id: null,
        automobile_id: null
    },
    automobiles: [],
    drivers: [],
    travels: []
});

const handleSubmit = async () => {
    try {
        const { data } = await services.viagens.create(state.travel);

        clearInputs();

        fetchTravels();

        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

const clearInputs = () => {
    state.travel = {
        passengersNumber: null,
        turn_id: null,
        driver_id: null,
        automobile_id: null
    }
}

const handleDelete = async (id: String) => {
    try {
        const { data } = await services.viagens.deleteById(id);

        console.log(data);

        fetchTravels();

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

const fetchTravels = async () => {
    try {
        const { data } = await services.viagens.getAll();

        console.log(data);

        state.travels = data.data.routes;

        state.travels.forEach(async travel => {
            travel.automobile = await fetchAutomobileId(travel.automobile_id);
            travel.driver = await fetchDriverId(travel.driver_id);
        });

    } catch (e) {
        console.error(e);
    }
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

const fetchAutomobileId = async (id: String) => {
    try {
        let { data } = await services.automoveis.getById(id);

        console.log('AutoMobile:', data);
        return data.data.automobile;
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

onBeforeMount(() => {
    fetchTurns();
    fetchTravels();
});
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <TravelCard :turns="state.turns" :travel="state.travel" :automobiles="state.automobiles"
                :drivers="state.drivers" title="Cadastrar viagem" @on-click:submit="handleSubmit"
                @on-click:continue="fetchSecoundPart" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <ViagemTable :data="state.travels" @on-click:delete="handleDelete" />
        </div>
    </DefaultLayout>
</template>
