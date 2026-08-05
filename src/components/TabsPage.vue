<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/" />
                </ion-buttons>
                <ion-title>Lista de Contatos</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Lista de Contatos</ion-title>
                </ion-toolbar>
            </ion-header>
        </ion-content>
    </ion-page>
</template>