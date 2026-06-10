<template>
  <ion-page>
    <AppHeader title="Termo de Privacidade" />
    <ion-content class="ion-padding about-content">
      <ion-card>
        <ion-card-content>
          <h2>Termo de Privacidade</h2>
          <p>Este termo explica como coletamos, utilizamos e protegemos seus dados pessoais durante o uso do aplicativo.</p>
          <p>Nenhuma informação sensível será compartilhada sem seu consentimento, e os dados são usados apenas para melhorar sua experiência no app.</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import { IonPage, IonContent, IonCard, IonCardContent } from '@ionic/vue';
</script>

<style scoped>
.about-content {
  background: linear-gradient(to bottom, #f9fbf9 0%, #f4f7f2 100%);
}
ion-card {
  border-radius: 18px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.08);
}
h2 {
  margin-top: 0;
  color: #0e4d28;
}
p {
  color: #28323f;
  line-height: 1.6;
}
</style>
