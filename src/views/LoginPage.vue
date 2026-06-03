<template>
  <ion-page class="auth-page">
    <ion-content class="ion-padding" fullscreen>
      <div class="auth-hero">
        <img class="hero-ball" src="/assets/ball.svg" alt="ball" />
        <div class="hero-text">
          <h1>Álbum da Copa</h1>
          <p>Complete sua coleção com as melhores figurinhas e acompanhe seu progresso.</p>
        </div>
      </div>

      <div class="auth-card-wrap">
        <ion-card class="card-accent auth-card">
          <div class="auth-card-header">
            <h2>Entrar</h2>
            <p>Use seu e-mail e senha para acessar seu álbum.</p>
          </div>

          <ion-card-content>
            <LoginForm @login="onLogin" />
            <div class="auth-links">
              <router-link to="/reset">Esqueci minha senha</router-link>
              <router-link to="/register">Criar conta</router-link>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonCard, IonCardContent } from '@ionic/vue';

const router = useRouter();
const { login } = useAuth();

async function onLogin(payload: { email: string; password: string }) {
  try {
    await login(payload);
    router.push('/album');
  } catch (e: any) {
    alert(e.message || 'Erro');
  }
}
</script>

<style scoped>
.auth-page {
  background: linear-gradient(180deg, #0a4c2c 0%, #00754b 45%, #f7b500 100%);
}
.auth-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 50px 20px 0;
}
.hero-ball {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.25));
}
.hero-text h1 {
  margin: 0;
  font-size: 34px;
  color: green;
  letter-spacing: 0.02em;
}
.hero-text p {
  margin: 12px auto 0;
  max-width: 320px;
  color: green;
  font-size: 15px;
  line-height: 1.6;
}
.auth-card-wrap {
  max-width: 460px;
  margin: 24px auto 32px;
  padding: 0 12px;
}
.auth-card {
  border-radius: 24px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}
.auth-card-header {
  padding: 24px 24px 0;
}
.auth-card-header h2 {
  margin: 0;
  font-size: 26px;
  color: #00247d;
}
.auth-card-header p {
  margin: 10px 0 0;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
}
.auth-links {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
}
.auth-links a {
  color: var(--ion-color-primary);
  font-weight: 600;
  text-decoration: none;
}
.auth-links a:hover {
  text-decoration: underline;
}
</style>
