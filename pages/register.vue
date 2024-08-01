<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <NuxtLink href="/login">Have an account?</NuxtLink>
          </p>

          <ul v-if="Object.keys(errors).length !== 0" class="error-messages">
            <li v-for="(error, field) in errors">
              {{ `That ${field} ${error}` }}
            </li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = ref<{
  username: string;
  email: string;
  password: string;
}>({
  username: '',
  email: '',
  password: '',
});
const errors = ref<Record<string, string>>({});

const { $api } = useNuxtApp();

const onSubmit = async () => {
  // TODO: configure MONGO https://docs.arashsheyda.me/nuxt-mongoose/resources/examples
  await $fetch('/api/users', {
    method: 'POST',
    body: {
      user: user.value,
    },
  }).catch((error) => {
    errors.value = error.data.errors;
  });
};
</script>
