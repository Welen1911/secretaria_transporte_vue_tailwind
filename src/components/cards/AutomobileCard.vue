<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputGroup from '../Forms/InputGroup.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Card'
    },
    automobile: {
        type: Object,
        required: true
    },
    button: {
        type: String,
        default: 'Cadastrar'
    }
});

const emits = defineEmits(['onClick:submit']);

const submit = () => emits('onClick:submit');

</script>

<template>
    <DefaultCard :card-title="props.title">
        <form @submit.prevent="submit" action="#">
            <div class="p-6.5">
                <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <InputGroup label="Ano" type="number" placeholder="2002" v-model="automobile.year"
                        customClasses="w-full xl:w-1/2" required />

                    <InputGroup label="Placa" type="text" placeholder="sbk2a20" customClasses="w-full xl:w-1/2"
                        v-model="automobile.plate" required />
                </div>

                <InputGroup label="Modelo" type="text" placeholder="VW Golf" customClasses="mb-4.5"
                    v-model="automobile.model" required />

                <InputGroup label="Capacidade de passageiros" type="number" placeholder="4" customClasses="mb-4.5"
                    v-model="automobile.capacity" required />
                <button
                    class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    {{ button }}
                </button>
            </div>
        </form>
    </DefaultCard>
</template>