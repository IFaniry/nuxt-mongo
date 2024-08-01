<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <pre>
          <code>
            {{JSON.stringify(errors,null,2)}}
          </code>
        </pre>
          <p class="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onSubmit">
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
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = ref<{
  email: string;
  password: string;
}>({
  email: '',
  password: '',
});
const errors = ref<Record<string, string>>({});

const onSubmit = async () => {
  // TODO: configure MONGO https://docs.arashsheyda.me/nuxt-mongoose/resources/examples

  $fetch('/api/users/login', {
    method: 'POST',
    body: {
      user: user.value,
    },
  }).then(async () => {
    await navigateTo('/');
  });

  // try {
  //   await $fetch('/api/users/login', {
  //     method: 'POST',
  //     body: {
  //       user: user.value,
  //     },
  //   });
  //   await navigateTo('/');
  // } catch (error) {
  //   errors.value = error.data;
  // }
};
</script>
