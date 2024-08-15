<script setup lang="ts">
import {ref, onMounted} from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmpresasTable from '@/components/Tables/EmpresasTable.vue';
import CreateCompany from '@/components/cards/CreateCompany.vue';
import services from '@/services';


const companies = ref([]);

const fetchCompanies = async () => {
  try {
    const { data } = await services.empresas.getAll();

    // console.log(data);

    companies.value = data.companies;

    // console.log(companies);

  } catch (e) {
    console.error(e);
  }
}

onMounted(fetchCompanies);


</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-1 xl:grid-cols-1 2xl:gap-7.5">
      <CreateCompany @company-created="fetchCompanies"/>
    </div>
    <div class="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Table One Start -->
      <div class="xl:col-span-8">
        <EmpresasTable :companies="companies" @change-company="fetchCompanies"/>
      </div>
    </div>
  </DefaultLayout>
</template>
