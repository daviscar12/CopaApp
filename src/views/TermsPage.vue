<template>
  <ion-page>
    <AppHeader title="Termo de Uso" />
    <ion-content class="ion-padding about-content">
      <ion-card>
        <ion-card-content>
          <h2>Termo de Uso</h2>
          <p>Este termo descreve as condições de uso do aplicativo. Ao utilizar o app, você concorda com as regras de uso, limites de responsabilidade e direitos autorais relacionados ao conteúdo.</p>
          <p>Leia atentamente os termos e entre em contato com o suporte caso tenha dúvidas ou precise de mais informações.</p>
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
