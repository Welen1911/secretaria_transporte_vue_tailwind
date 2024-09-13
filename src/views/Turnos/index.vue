<script setup lang="ts">
import TurnsCard from '@/components/cards/TurnsCard.vue';
import TurnosTable from '@/components/Tables/TurnosTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { userStore } from '@/stores/user';
import { onBeforeMount, reactive } from 'vue';

const store = userStore();

const state = reactive({
    turn: {
        period: '',
        start_begin: '',
        start_return: ''
    },
    turns: []
});

const handleSubmit = async () => {
    try {
        const { data } = await services.turnos.create(state.turn);

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

onBeforeMount(fetchTurns);
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <TurnsCard v-if="store.type === 'admin'" :turn="state.turn" title="Criar turno"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <TurnosTable :data="state.turns" @on-click:delete="handleDelete" />
        </div>
    </DefaultLayout>
</template>
