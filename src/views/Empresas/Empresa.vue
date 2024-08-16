<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import services from '@/services';
import { useRouter } from 'vue-router';
import EditCompany from '@/components/cards/EditCompany.vue';

const router = useRouter();



const company = reactive({
    name: '',
    cnpj: '',
    is_enabled: '',
});

const companyId = ref('');

const fetchCompany = async () => {
    try {
        const id = router.currentRoute.value.params.id;

        const { data } = await services.empresas.getById(id);

        // console.log(data);
        companyId.value = data.company.id;
        company.name = data.company.name;
        company.cnpj = data.company.cnpj;
        company.is_enabled = data.company.is_enabled;

        // console.log(company);

    } catch (e) {
        console.error(e);
    }
}

onMounted(fetchCompany);


</script>

<template>
    <DefaultLayout>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-1 xl:grid-cols-1 2xl:gap-7.5">
            <EditCompany @company-created="fetchCompany" :company="company" :id="companyId"/>
        </div>
        <div class="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <!-- ====== Table One Start -->
            <div class="xl:col-span-8">
                <!-- <EmpresasTable :companies="company" @change-company="fetchCompany"/> -->
            </div>
        </div>
    </DefaultLayout>
</template>
