<template>
  <ion-page>
    <AppHeader title="Sobre" />
    <ion-content class="ion-padding about-content">
      <ion-card class="about-card">
        <ion-card-content>
          <h2>Álbum da Copa</h2>
          <p>Versão do aplicativo: <strong>{{ appVersion }}</strong></p>
          <p>Use este espaço para acompanhar suas figurinhas, revisar seu progresso e acessar os termos legais do aplicativo.</p>
          <ion-list lines="none">
            <ion-item button router-link="/terms">
              <ion-label>Termo de Uso</ion-label>
            </ion-item>
            <ion-item button router-link="/privacy">
              <ion-label>Termo de Privacidade</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import { IonPage, IonContent, IonCard, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/vue';

const appVersion = __APP_VERSION__;
</script>

<style scoped>
.about-content {
  background: linear-gradient(to bottom, #f9fbf9 0%, #f4f7f2 100%);
}
.about-card {
  border-radius: 18px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.08);
}
.about-card h2 {
  margin-top: 0;
  color: #0e4d28;
}
.about-card p {
  margin: 0 0 16px;
  color: #28323f;
  line-height: 1.6;
}
</style>
