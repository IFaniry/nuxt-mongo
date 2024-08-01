<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <NuxtLink class="navbar-brand" href="/">conduit</NuxtLink>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <NuxtLink class="nav-link active" href="/">Home</NuxtLink>
        </li>
        <template v-if="!user?.username">
          <li class="nav-item">
            <NuxtLink class="nav-link" href="/login">Sign in</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" href="/register">Sign up</NuxtLink>
          </li>
        </template>

        <template v-else>
          <li class="nav-item">
            <NuxtLink class="nav-link" href="/editor">
              <i class="ion-compose"></i>&nbsp;New Article
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" href="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              class="nav-link"
              :href="'/profile/'.concat(user.username)"
            >
              <img
                :src="user.image || DEFAULT_PROFILE_IMAGE"
                class="user-pic"
              />
              {{ user.username }}
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { DEFAULT_PROFILE_IMAGE } from "~/constants";

const user = useUser();
</script>
