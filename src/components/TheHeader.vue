<template>
  <header class="header">
    <div class="container header__inner">
      <button class="button-menu">
        <span class="button-menu__line" />
        <span class="button-menu__line" />
        <span class="button-menu__line" />
      </button>
      <UserProfile class="profile" name="Генадий Васильевич" />
    </div>
  </header>
</template>

<script setup>
import UserProfile from "./UserProfile.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vars.scss";

.header {
  background: $bgHeader;
  height: 56px;

  &__inner {
    display: flex;
    align-items: center;
  }

  .button-menu {
    width: 24px;
    height: 24px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s ease;
    gap: 4px;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      transform: scale(0.9);
    }

    &__line {
      width: 16px;
      height: 2px;
      border-radius: 1px;
      background: $colorGray;
    }
  }

  .profile {
    margin-left: auto;
  }
}
</style>
