<template>
  <div class="breadcrumbs">
    <template v-if="pages.length > 3">
      <router-link class="breadcrumbs__link" :to="pages[0].to">
        {{ pages[0].name }}
      </router-link>
      <div class="divider">/</div>
      <div class="breadcrumbs-hidden">
        <svg
          width="24"
          height="24"
          class="more-icon"
          viewBox="0 0 24 24"
          fill="#161619"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <rect
              id="Rectangle 173"
              x="3"
              y="10"
              width="4"
              height="4"
              rx="2"
              fill="inherit"
            />
            <rect
              id="Rectangle 174"
              x="17"
              y="10"
              width="4"
              height="4"
              rx="2"
              fill="inherit"
            />
            <rect
              id="Rectangle 175"
              x="10"
              y="10"
              width="4"
              height="4"
              rx="2"
              fill="inherit"
            />
          </g>
        </svg>
        <div class="dropdown">
          <router-link
            v-for="(page, idx) in hiddenPages"
            :key="'hidelink-' + idx"
            :to="page.to"
            class="dropdown__item breadcrumbs__link"
          >
            {{ page.name }}
          </router-link>
        </div>
      </div>
      <div class="divider">/</div>
      <template v-for="(page, idx) in lastPages" :key="idx">
        <template v-if="idx + 1 !== lastPages.length">
          <router-link
            v-if="idx + 1 !== lastPages.length"
            :to="page.to"
            class="breadcrumbs__link"
          >
            {{ page.name }}
          </router-link>
          <div class="divider">/</div>
        </template>
        <span v-else class="breadcrumbs__item">
          {{ page.name }}
        </span>
      </template>
    </template>
    <template v-else>
      <template v-for="(page, idx) in pages" :key="idx">
        <template v-if="idx + 1 !== pages.length">
          <router-link
            v-if="idx + 1 !== pages.length"
            :to="page.to"
            class="breadcrumbs__link"
          >
            {{ page.name }}
          </router-link>
          <div class="divider">/</div>
        </template>
        <span v-else class="breadcrumbs__item">
          {{ page.name }}
        </span>
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  pages: {
    type: Array,
    required: true,
  },
});

const hiddenPages = computed(() => {
  return props.pages.slice(1, -2);
});

const lastPages = computed(() => {
  return props.pages.filter((_, idx, pages) => idx + 1 > pages.length - 2);
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vars.scss";

.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__link,
  &__item {
    letter-spacing: -0.48px;
    white-space: nowrap;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 1px;
  }

  &__link {
    color: $colorBasic;
    transition: color 0.15s ease-in;

    &:hover {
      color: $colorGray;
    }
  }

  &__item {
    cursor: default;
  }

  .more-icon {
    position: relative;
    top: 3px;
    cursor: pointer;
  }

  .divider {
    color: $colorSilver;
    margin: 0 8px;
  }

  &-hidden {
    position: relative;
    .dropdown {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      display: inline-flex;
      flex-direction: column;
      width: max-content;
      padding: 16px;
      left: 0;
      top: calc(24px + (16px * 2));
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      border: 1px solid $colorSilver;
      transition: all 0.15s ease-in;

      &:after {
        content: "";
        position: absolute;
        top: -20px;
        left: 0;
        width: 100%;
        height: 20px;
      }

      &__item {
        padding: 16px 0;
      }
    }

    &:hover {
      .more-icon {
        fill: $colorGray;
      }
      .dropdown {
        opacity: 1;
        visibility: visible;
        top: calc(24px + 16px);
      }
    }
  }
}
</style>
