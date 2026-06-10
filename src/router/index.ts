import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ResetPasswordPage from '../views/ResetPasswordPage.vue'
import AlbumPage from '../views/AlbumPage.vue'
import AboutPage from '../views/AboutPage.vue'
import TermsPage from '../views/TermsPage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/reset',
    name: 'Reset',
    component: ResetPasswordPage
  },
  {
    path: '/album',
    name: 'Album',
    component: AlbumPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsPage
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: PrivacyPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
