<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputGroup from '../Forms/InputGroup.vue';
import SelectTurn from '../Forms/SelectGroup/SelectTurn.vue';
import SelectAutomobile from '../Forms/SelectGroup/SelectAutomobile.vue';
import { ref } from 'vue';
import SelectDriver from '../Forms/SelectGroup/SelectDriver.vue';

const firstPart = ref<Boolean>(true);
const secoundPart = ref<Boolean>(false);

const props = defineProps({
    title: {
        type: String,
        default: 'Card'
    },
    turns: {
        type: Array,
        required: true
    },
    travel: {
        type: Object,
        required: true
    },
    automobiles: {
        type: Object,
        required: true
    },
    drivers: {
        type: Object,
        required: true
    },
    button: {
        type: String,
        default: 'Cadastrar'
    }
});

const emits = defineEmits(['onClick:submit', 'onClick:continue']);

const submit = () => emits('onClick:submit');

const continued = () => {
    emits('onClick:continue');
    secoundPart.value = true;
    firstPart.value = false;
};

</script>

<template>
    <DefaultCard :card-title="props.title">
        <form @submit.prevent="submit" action="#">
            <div class="p-6.5">
                <div class="mb-4.5 flex">
                    <!-- <InputGroup label="Turno" type="text" placeholder="A" v-model="turn.period" customClasses="w-full"
                        required /> -->
                    <SelectTurn :travel="travel" :turns="turns" class="w-full" :isDisabled="!firstPart"/>
                </div>
                <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <InputGroup label="Quantidade de passageiros" type="number" placeholder="1" customClasses="w-full"
                        v-model="travel.passengersNumber" required  :isDisabled="!firstPart"/>
                </div>
                <span @click="continued" v-if="travel.passengersNumber > 0 && travel.turn_id != null"
                    class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Confirmar
                </span>
            </div>
            <div class="p-6.5">
                <hr>
            </div>
            <div class="p-6.5" v-if="secoundPart">
                <div class="mb-4.5 flex">
                    <SelectAutomobile :travel="travel" :automobiles="automobiles" class="w-full" />
                </div>
                <div class="mb-4.5 flex">
                    <SelectDriver :travel="travel" :drivers="drivers" class="w-full" />
                </div>
                <button type="submit"
                    class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    {{ button }}
                </button>
            </div>
        </form>
    </DefaultCard>
</template>