<template>
  <form @submit.prevent="handleSubmit">
    <ion-list>
      <ion-item>
        <ion-label position="floating">E-mail</ion-label>
        <ion-input v-model="email" type="email" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Senha</ion-label>
        <ion-input v-model="password" type="password" required></ion-input>
      </ion-item>

      <ion-item lines="none">
        <ion-button type="submit" expand="block" color="secondary" class="form-button">Entrar</ion-button>
      </ion-item>
    </ion-list>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';

const emit = defineEmits<{
  (e: 'login', payload: { email: string; password: string }): void
}>();

const email = ref('');
const password = ref('');

function handleSubmit() {
  emit('login', { email: email.value, password: password.value });
}
</script>

<style scoped>
.form-button {
  font-weight: 600;
  font-size: 16px;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
}
</style>
