<script setup lang="ts">
import { ref } from 'vue'

const selectedOption = ref<string>('')
const isOptionSelected = ref<boolean>(false)

const changeTextColor = () => {
  isOptionSelected.value = true
}

const props = defineProps({
  turns: {
    type: Object,
    required: true
  },
  travel: {
    type: Object,
    required: true
  },
  isDisabled: {
    type: Boolean,
    required: true
  }
});

</script>

<template>
  <div>
    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
      Turno
    </label>
    <div class="relative z-20 bg-white dark:bg-form-input">
      <select v-model="travel.turn_id" :class="{ 'text-black dark:text-white': isOptionSelected }" @change="changeTextColor"
        class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" :disabled="isDisabled">
        <option :value="null" disabled :selected="travel.turn_id == null">Selecione o turno</option>
        <option v-for="turn in turns" :key="turn.id" :value="turn.id">{{ turn.period }} - {{ turn.start_begin }} - {{
          turn.start_return }}</option>
      </select>
      <span class="absolute top-1/2 right-4 z-10 -translate-y-1/2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.8">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
              fill="#637381"></path>
          </g>
        </svg>
      </span>
    </div>
  </div>
</template>
