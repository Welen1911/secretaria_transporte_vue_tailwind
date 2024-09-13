import { createRouter, createWebHistory } from 'vue-router'

import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import CalendarView from '@/views/CalendarView.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import FormElementsView from '@/views/Forms/FormElementsView.vue'
import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
import SettingsView from '@/views/Pages/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TablesView from '@/views/TablesView.vue'
import AlertsView from '@/views/UiElements/AlertsView.vue'
import ButtonsView from '@/views/UiElements/ButtonsView.vue'
import Empresas from '@/views/Empresas/index.vue'
import Empresa from '@/views/Empresas/Empresa.vue'
import Automoveis from '@/views/Automoveis/index.vue'
import Automovel from '@/views/Automoveis/Automovel.vue'
import Motoristas from '@/views/Motoristas/index.vue'
import Motorista from '@/views/Motoristas/Motorista.vue'
import Turnos from '@/views/Turnos/index.vue'
import Turno from '@/views/Turnos/Turno.vue'
import Viagens from '@/views/Viagens/index.vue'
import Viagem from '@/views/Viagens/Viagem.vue'

const routes = [
  {
    path: '/',
    name: 'eCommerce',
    component: ECommerceView,
    meta: {
      title: 'eCommerce Dashboard'
    }
  },
  {
    path: '/turnos',
    name: 'turnos',
    component: Turnos,
    meta: {
      title: 'Turnos'
    }
  },
  {
    path: '/turnos/:id',
    name: 'turno',
    component: Turno,
    meta: {
      title: 'Turnos'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements'
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables'
    }
  },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart'
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons'
    }
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/empresas',
    name: 'empresas',
    component: Empresas,
    meta: {
      title: 'Empresas'
    }
  },
  {
    path: '/empresas/:id',
    name: 'empresaById',
    component: Empresa,
    meta: {
      title: 'Empresa X'
    }
  },
  {
    path: '/automoveis',
    name: 'automoveis',
    component: Automoveis,
    meta: {
      title: 'Automoveis'
    }
  },
  {
    path: '/automoveis/:id',
    name: 'automoveiById',
    component: Automovel,
    meta: {
      title: 'Automoveis'
    }
  },
  {
    path: '/motoristas',
    name: 'motoristas',
    component: Motoristas,
    meta: {
      title: 'Motoristas'
    }
  },
  {
    path: '/motoristas/:id',
    name: 'motoristaById',
    component: Motorista,
    meta: {
      title: 'Motoristas'
    }
  },
  {
    path: '/viagens',
    name: 'Viagens',
    component: Viagens,
    meta: {
      title: 'Viagens'
    }
  },
  {
    path: '/viagens/:id',
    name: 'Viagen',
    component: Viagem,
    meta: {
      title: 'Viagem'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})

export default router
