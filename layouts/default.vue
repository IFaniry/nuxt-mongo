<template>
  <component :is="Header" />
  <slot></slot>
  <component :is="Footer" />
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>
