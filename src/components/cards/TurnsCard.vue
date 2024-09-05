<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputGroup from '../Forms/InputGroup.vue';
import { userStore } from '@/stores/user';

const store = userStore();

const props = defineProps({
    title: {
        type: String,
        default: 'Card'
    },
    turn: {
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
                <div class="mb-4.5 flex">
                    <InputGroup label="Período" type="text" placeholder="A" v-model="turn.period"
                        customClasses="w-full" required  :is-disabled="store.type !== 'admin'"/>
                </div>
                <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <InputGroup label="Hora inicio" type="text" placeholder="A" v-model="turn.start_begin"
                        customClasses="w-full xl:w-1/2" required :is-disabled="store.type !== 'admin'"/>

                    <InputGroup label="Hora retorno" type="text" placeholder="1" customClasses="w-full xl:w-1/2"
                        v-model="turn.start_return" required :is-disabled="store.type !== 'admin'"/>
                </div>
                <button v-if="store.type === 'admin'"
                    class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    {{ button }}
                </button>
            </div>
        </form>
    </DefaultCard>
</template>