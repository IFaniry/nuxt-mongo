<template>
  <div class="article-preview">
    <div class="article-meta">
      <NuxtLink :href="'/profile/'.concat(props.author)"
        ><img :src="props.authorImage"
      /></NuxtLink>
      <div class="info">
        <NuxtLink :href="'/profile/'.concat(props.author)" class="author">{{
          props.author
        }}</NuxtLink>
        <span class="date">{{ props.publishedAt }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ props.likes }}
      </button>
    </div>
    <NuxtLink :href="'/article/'.concat(props.slug)" class="preview-link">
      <h1>{{ props.title }}</h1>
      <p>{{ props.description }}</p>
      <span>Read more...</span>
      <ul v-if="props.tags?.length" class="tag-list">
        <li
          v-for="tag in props.tags"
          :key="tag"
          class="tag-default tag-pill tag-outline"
        >
          {{ tag }}
        </li>
      </ul>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  author: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: Array<string>,
    required: true,
  },
});
</script>
