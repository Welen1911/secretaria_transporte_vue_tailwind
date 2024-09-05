<script setup lang="ts">
import AutomobileCard from '@/components/cards/AutomobileCard.vue';
import AutomoveisTable from '@/components/Tables/AutomoveisTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { userStore } from '@/stores/user';
import { onBeforeMount, reactive } from 'vue';

const store = userStore();

const state = reactive({
    automobile: {
        year: null,
        plate: '',
        model: '',
        capacity: null
    },
    automobiles: []
});

const handleSubmit = async () => {
    try {
        const { data } = await services.automoveis.create(state.automobile);

        clearInputs();

        fetchAutomobiles();

        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

const clearInputs = () => {
    state.automobile = {
        year: null,
        plate: '',
        model: '',
        capacity: null
    }
}

const handleDelete = async (id: String) => {
    try {
        const { data } = await services.automoveis.deleteById(id);

        console.log(data);

        fetchAutomobiles();

    } catch (e) {
        console.error(e);
    }
}

const fetchAutomobiles = async () => {
    try {
        const { data } = await services.automoveis.getAll();

        state.automobiles = data.data.auto_mobiles;

        console.log(state.automobiles);


    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(fetchAutomobiles);
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <AutomobileCard v-if="store.type === 'admin'"  :automobile="state.automobile" title="Cadastrar automovel"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <AutomoveisTable :data="state.automobiles" @on-click:delete="handleDelete" />
        </div>
    </DefaultLayout>
</template>
