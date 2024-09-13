<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import SwitchThree from '@/components/Forms/Switchers/SwitchThree.vue';
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import services from '@/services';
import { onMounted, reactive } from 'vue';

const emits = defineEmits(['companyCreated']);

const props = defineProps({
    company: {
        type: Object,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

onMounted(() => console.log(props.company));

const changeEnabled = (val: string) => {
    props.company.is_enabled = val;
}

const handleSubmit = async (id: string) => {
    try {

        
        const { data } = await services.empresas.updateById(id, { ...props.company });

        console.log(data);

        // emits('companyCreated');
        // cleanInputs();
    } catch (e) {
        console.error(e);
    }
}

// const cleanInputs = () => {
//     company.cnpj = '';
//     company.is_enabled = 'Sim';
//     company.is_enabled_boo = true;
//     company.name = '';
// }

</script>

<template>
    <DefaultCard cardTitle="Empresa">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nome:
                </label>
                <input type="text" placeholder="Default Input" v-model="props.company.name"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />


            </div>
            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    CNPJ:
                </label>
                <input type="text" placeholder="Default Input" v-model="props.company.cnpj"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Ativo:
                </label>
                <SwitchThree :model="company.is_enabled_boo" @changeEnabled="changeEnabled" />
            </div>
            <div>
                <ButtonDefault @click="handleSubmit(props.id)" route="" label="Salvar"
                    customClasses="bg-primary text-white rounded-full" />
            </div>
        </div>
    </DefaultCard>
</template>
