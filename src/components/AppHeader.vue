<template>
  <ion-header class="world-hero">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
const props = defineProps<{ title?: string }>();
const title = props.title ?? 'Album';
</script>

<style scoped>
.world-hero ion-toolbar {
  background: linear-gradient(90deg, rgba(0,104,55,0.95), rgba(0,36,125,0.95));
  color: #fff;
}
</style>
