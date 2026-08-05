import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ResetPasswordPage from '../views/ResetPasswordPage.vue'
import AlbumPage from '../views/AlbumPage.vue'
import AchievementsPage from '../views/AchievementsPage.vue'
import AboutPage from '../views/AboutPage.vue'
import TermsPage from '../views/TermsPage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'
import { useAuth } from '../composables/useAuth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Entrar',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Registrar',
    component: RegisterPage
  },
  {
    path: '/reset',
    name: 'RedefinirSenha',
    component: ResetPasswordPage
  },
  {
    path: '/album',
    name: 'Álbum',
    component: AlbumPage,
    beforeEnter: () => {
      const { current } = useAuth();
      if (!current.value?.id) {
        return '/login';
      }
      return true;
    }
  },
  {
    path: '/achievements',
    name: 'Conquistas',
    component: AchievementsPage,
    beforeEnter: () => {
      const { current } = useAuth();
      if (!current.value?.id) {
        return '/login';
      }
      return true;
    }
  },
  {
    path: '/about',
    name: 'Sobre',
    component: AboutPage
  },
  {
    path: '/terms',
    name: 'Termos',
    component: TermsPage
  },
  {
    path: '/privacy',
    name: 'Privacidade',
    component: PrivacyPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
