<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li>That title is required</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.description"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list">
                  <span class="tag-default tag-pill">
                    <i class="ion-close-round"></i> tag
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["protected"],
});

const article = ref<{
  title: string;
  description: string;
  body: string;
}>({
  title: "",
  description: "",
  body: "",
});
const errors = ref<Record<string, string>>({});

const onSubmit = async () => {
  await $fetch("/api/articles", {
    method: "POST",
    body: {
      article: article.value,
    },
  }).catch((error) => {
    errors.value = error.data.errors;
  });
};
</script>
