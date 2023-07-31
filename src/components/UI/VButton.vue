<template>
  <button class="v-button" :class="classesRoot" @click="clickHandler">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["click"]);

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary"].includes(value);
    },
  },
  to: {
    type: String,
  },
});

const classesRoot = computed(() => {
  const classes = [];
  classes.push(props.variant);
  return classes;
});

const clickHandler = () => {
  if (props.to) {
    router.push(props.to);
    return;
  }
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vars.scss";
.v-button {
  background: $bgPrimary;
  min-width: 452px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  height: 72px;
  border-radius: 8px;
  padding: 0 12px;
  letter-spacing: -0.48px;
  color: #fff;
  transition: all 0.15s ease;

  &:hover {
    background: $bgPrimaryHover;
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    color: $colorGray;
    background: $bgPrimaryDisabled;
    opacity: 0.5;
  }

  &:focus {
    outline-color: $colorBasic;
    outline-width: 4px;
    outline-style: solid;
  }
  // BUTTON SECONDARY
  &.secondary {
    border: 1px solid $borderSecondary;
    background: $bgSecondary;
    color: $colorBasic;

    &:hover {
      border: 1px solid $borderSecondaryHover;
      background: $bgSecondaryHover;
    }

    &:disabled {
      cursor: not-allowed;
      color: $colorGray;
      background: $bgSecondaryDisabled;
      border: 1px solid $borderSecondary;
    }
  }
}
</style>
