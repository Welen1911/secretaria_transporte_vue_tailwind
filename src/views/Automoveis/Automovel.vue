<script setup lang="ts">
import AutomobileCard from '@/components/cards/AutomobileCard.vue';
import AutomoveisTable from '@/components/Tables/AutomoveisTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import services from '@/services';
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    automobile: {}
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

        console.log(state.auto_mobile);


    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(fetchAutomobile);
</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4">
            <AutomobileCard :automobile="state.automobile" title="Editar automovel" button="Editar"
                @on-click:submit="handleSubmit" />
        </div>

        <div class="grid grid-cols-1 gap-4 mt-8">
            <!-- <AutomoveisTable :data="state.automobiles" @on-click:delete="handleDelete" /> -->
        </div>
    </DefaultLayout>
</template>
