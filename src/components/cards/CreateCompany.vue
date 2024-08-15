<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import SwitchThree from '@/components/Forms/Switchers/SwitchThree.vue';
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import services from '@/services';
import { reactive } from 'vue';

const emits = defineEmits(['companyCreated']);

const company = reactive({
    name: '',
    cnpj: '',
    is_enabled: 'Sim',
    is_enabled_boo: true
})

const changeEnabled = (val: string) => {
    company.is_enabled = val;
}

const handleSubmit = async () => {
    try {

        const { data } = await services.empresas.create({ ...company });

        console.log(data);

        emits('companyCreated');
        cleanInputs();
    } catch (e) {
        console.error(e);
    }
}

const cleanInputs = () => {
    company.cnpj = '';
    company.is_enabled = 'Sim';
    company.is_enabled_boo = true;
    company.name = '';
}

</script>

<template>
    <DefaultCard cardTitle="Cadastrar empresa">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nome:
                </label>
                <input type="text" placeholder="Default Input" v-model="company.name"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />


            </div>
            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    CNPJ:
                </label>
                <input type="text" placeholder="Default Input" v-model="company.cnpj"
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
                <ButtonDefault @click="handleSubmit" route="" label="Cadastrar"
                    customClasses="bg-primary text-white rounded-full" />
            </div>
        </div>
    </DefaultCard>
</template>
