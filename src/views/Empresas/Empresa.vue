<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import services from '@/services';
import { useRouter } from 'vue-router';
import EditCompany from '@/components/cards/EditCompany.vue';

const router = useRouter();



const state = reactive({
    company: {
        name: '',
        cnpj: '',
        is_enabled: '',
    },
    companyId: ''
});


const fetchCompany = async () => {
    try {
        const id = await router.currentRoute.value.params.id;

        const { data } = await services.empresas.getById(id);
        
        const company = data.data.company;
        
        console.log(data.data);
        
        state.companyId = company.id;
        state.company.name = company.name;
        state.company.cnpj = company.cnpj;
        state.company.is_enabled = company.is_enabled;

        // console.log(company);

    } catch (e) {
        console.error(e);
    }
}

onBeforeMount(fetchCompany);


</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-1 xl:grid-cols-1 2xl:gap-7.5">
            <EditCompany @company-created="fetchCompany" :company="state.company" :id="state.companyId" />
        </div>
        <div class="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <!-- ====== Table One Start -->
            <div class="xl:col-span-8">
                <!-- <EmpresasTable :companies="company" @change-company="fetchCompany"/> -->
            </div>
        </div>
    </DefaultLayout>
</template>
