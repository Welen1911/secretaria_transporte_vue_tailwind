<script setup lang="ts">
import TurnsCard from '@/components/cards/TurnsCard.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    turn: {}
});

const handleSubmit = async () => {
    try {
        const id = state.turn.id;

        delete state.turn.id;

        const { data } = await services.turnos.updateById(id, state.turn);

        console.log(data);
    } catch (e) {
        console.error(e);
    }

}

const fetchTurn = async () => {
    try {
        const id = await router.currentRoute.value.params.id;

        const { data } = await services.turnos.getById(id);

        // console.log(data);

        state.turn = data.data.turn;

        console.log(state.turn);


    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(fetchTurn);
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <TurnsCard :turn="state.turn" title="Editar motorista" button="Editar"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <!-- <AutomoveisTable :data="state.automobiles" @on-click:delete="handleDelete" /> -->
        </div>
    </DefaultLayout>
</template>
