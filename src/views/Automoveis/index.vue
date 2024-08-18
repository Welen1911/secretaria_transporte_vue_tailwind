<script setup lang="ts">
import AutomobileCard from '@/components/cards/AutomobileCard.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { reactive } from 'vue';

const state = reactive({
    automobile: {
        year: null,
        plate: '',
        model: '',
        capacity: null
    }
});

const handleSubmit = async () => {
    try {
        const { data } = await services.automoveis.create(state.automobile);

        clearInputs();

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

</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <AutomobileCard :automobile="state.automobile" title="Cadastrar automovel"
                @on-click:submit="handleSubmit" />
        </div>
    </DefaultLayout>
</template>
