<template>
  <ion-page class="auth-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>Criar Conta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" fullscreen>
      <div class="auth-hero auth-hero-small">
        <div class="hero-text">
          <h1>Criar Conta</h1>
          <p>Junte-se à comunidade de colecionadores e comece a trocar figurinhas.</p>
        </div>
      </div>

      <div class="auth-card-wrap">
        <ion-card class="card-accent auth-card">
          <div class="auth-card-header">
            <h2>Registro</h2>
            <p>Informe seus dados para criar sua conta rapidamente.</p>
          </div>

          <ion-card-content>
            <RegisterForm @register="onRegister" />
            <div class="auth-links single-link">
              <router-link to="/login">Já tem conta? Faça login</router-link>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import RegisterForm from '../components/RegisterForm.vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonCard, IonCardContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/vue';

const router = useRouter();
const { register } = useAuth();

async function onRegister(payload: { name: string; email: string; password: string }) {
  try {
    await register(payload);
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
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px 20px;
}
.auth-hero-small {
  padding-top: 28px;
}
.hero-text h1 {
  margin: 0;
  font-size: 32px;
  color: black;
}
.hero-text p {
  margin: 10px auto 0;
  max-width: 320px;
  color: black;
  font-size: 15px;
  line-height: 1.6;
}
.auth-card-wrap {
  max-width: 460px;
  margin: 20px auto 32px;
  padding: 0 12px;
}
.auth-card {
  border-radius: 24px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.16);
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
  justify-content: center;
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
