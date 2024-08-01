<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
        <pre>
          <code>
            {{JSON.stringify(articles,null,2)}}
          </code>
        </pre>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user?.username" class="nav-item">
                <a class="nav-link" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <template v-if="articles?.length">
            <ArticlePreview
              v-for="article in articles"
              :key="article.id"
              :author="article.author.username"
              :author-image="article.author.image || DEFAULT_PROFILE_IMAGE"
              published-at="January 20th"
              :likes="29"
              :title="article.title"
              :slug="article.slug"
              :description="article.description"
              :tags="['realworld', 'implementations']"
            ></ArticlePreview>
            <!-- <ArticlePreview
            v-for="article in articles"
            :key="article.slug"
              author="Eric Simons"
              author-image="http://i.imgur.com/Qr71crq.jpg"
              published-at="January 20th"
              :likes="29"
              title="sghdfgjdfj"
              slug="sghdfgjdfj"
              description="This is the description for the post."
              :tags="['realworld', 'implementations']"
            ></ArticlePreview> -->
          </template>
          <!-- <div class="article-preview">
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
              href="/article/how-to-build-webapps-that-scale"
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
          </div> -->

          <!-- <div class="article-preview">
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
                <li class="tag-default tag-pill tag-outline">realworld</li>
                <li class="tag-default tag-pill tag-outline">
                  implementations
                </li>
              </ul>
            </a>
          </div> -->

          <ul class="pagination">
            <li class="page-item active">
              <a class="page-link" href="">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="">2</a>
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DEFAULT_PROFILE_IMAGE } from "~/constants";
import { useAuthenticatedUser } from "~/composables/auth";
// import { type User } from '~/server/models/user/user.type';
// const user = useAuthenticatedUser();
const { data, status, error, refresh, clear } = await useAsyncData(
  "article",
  () => $fetch("/api/articles/sghdfgjdfj")
);
const { data: articles } = await useAsyncData("articles", () =>
  $fetch(
    // "/api/articles?tag=AngularJS&author=jake&favorited=jake&limit=20&offset=0"
    "/api/articles"
  )
);

const user = useUser();
// const tags=['realworld', 'implementations'];
</script>
