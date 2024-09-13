import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export const userStore = defineStore('user', () => {
    const id = ref(null);
    const name = ref(null);
    const matricula = ref(null);
    const email = ref(null);
    const type = ref(null);

    function setUser(data) {
        id.value = data.id;
        name.value = data.name;
        matricula.value = data.matricula;
        email.value = data.email;
        type.value = data.type;
    }

    return {
        id, name, matricula, email, type, setUser
    }
});
