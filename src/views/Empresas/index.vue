<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmpresasTable from '@/components/Tables/EmpresasTable.vue';
</script>

<template>
  <DefaultLayout>
    <div class="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Table One Start -->
      <div class="xl:col-span-8">
        <EmpresasTable />
      </div>
    </div>
  </DefaultLayout>
</template>
