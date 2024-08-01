<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              :src="profile?.image || DEFAULT_PROFILE_IMAGE"
              class="user-img"
            />
            <h4>{{ profile?.username }}</h4>
            <p>
              {{ profile?.bio }}
            </p>
            <button
              type="button"
              v-if="!isProfileMine"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ !followingPreviousValue ? "Follow" : "Unfollow" }}
              {{ profile?.username }}
            </button>
            <button
              type="button"
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="/profile/eric-simons"
                ><img src="http://i.imgur.com/Qr71crq.jpg"
              /></a>
              <div class="info">
                <a href="/profile/eric-simons" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a
              href="/article/how-to-buil-webapps-that-scale"
              class="preview-link"
            >
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">realworld</li>
                <li class="tag-default tag-pill tag-outline">
                  implementations
                </li>
              </ul>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="/profile/albert-pai"
                ><img src="http://i.imgur.com/N4VcUeJ.jpg"
              /></a>
              <div class="info">
                <a href="/profile/albert-pai" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="/article/the-song-you" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>

          <ul class="pagination">
            <li class="page-item active">
              <a class="page-link" href="">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="">2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DEFAULT_PROFILE_IMAGE } from "~/constants";

const route = useRoute();
const username = route.params.username;
const followingPreviousValue = ref(false);

const {
  data: profile,
  status,
  error,
  refresh,
  clear,
} = await useAsyncData(`profile:${username}`, () =>
  $fetch(`/api/profiles/${username}`, {
    onResponse() {
      followingPreviousValue.value = profile.value?.following || false;
    },
  })
);
const me = useUser();
const isProfileMine = computed(
  () => me.value?.username === profile.value?.username
);

// const { data } = await useFetch(`/api/profiles/${username}/follow`, {
//   method: 'post',
//   body: {
//     todo: 'newTodo.value'
//   },
//   onRequest () {
//     previousTodos.value = todos.value // Store the previously cached value to restore if fetch fails.

//     todos.value.push(newTodo.value) // Optimistically update the todos.
//   },
//   onRequestError () {
//     todos.value = previousTodos.value // Rollback the data if the request failed.
//   },
//   async onResponse () {
//     await refreshNuxtData('todos') // Invalidate todos in the background if the request succeeded.
//   }
// })

const onFollow = () => {
  // $fetch()
  followingPreviousValue.value = !followingPreviousValue.value;
};
</script>
