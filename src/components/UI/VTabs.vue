<template>
  <div class="tabs">
    <button
      v-for="(tab, idx) in tabs"
      :key="tab.id || idx"
      class="item"
      :disabled="tab.disabled"
      :class="{ selected: tab.selected }"
      @click="tabSelectHandler(tab)"
    >
      <span class="name">{{ tab.name }}</span>
      <div v-if="tab.disabled" class="tip">
        {{ tab.tip }}
      </div>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["select"]);

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator(value) {
      const selected = value.filter((tab) => tab.selected);
      return selected.length < 2;
    },
  },
});

const tabSelectHandler = (tab) => {
  if (tab.selected) return;
  emit("select", tab);
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vars.scss";

.tabs {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    min-height: 56px;
    background: #fff;
    border: 1px solid $colorGray;
    letter-spacing: -0.48px;
    transition: all 0.15s ease;
    border-radius: 8px;

    &:hover {
      border: 1px solid $borderTabHover;
      cursor: pointer;
      .tip {
        visibility: visible;
        top: -48px;
        opacity: 1;
      }
    }

    &:disabled {
      border: 1px solid rgba($colorGray, 0.5);
      color: $colorGray;
      cursor: not-allowed;
      .name {
        opacity: 0.5;
      }
    }

    &:focus {
      outline-color: $colorBasic;
      outline-width: 4px;
      outline-style: solid;
    }
    &.selected {
      background: $bgTabSelected;
      color: #fff;
      border: 1px solid $bgTabSelected;
    }

    .tip {
      visibility: hidden;
      position: absolute;
      opacity: 0;
      width: max-content;
      left: 50%;
      transform: translateX(-50%);
      top: -40px;
      border-radius: 4px;
      padding: 10px 16px;
      background: $bgTip;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: -0.28px;
      color: #fff;
      transition: all 0.15s ease-in;

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -16px;
        display: inline-block;
        border: 8px solid transparent;
        border-top: 12px solid $bgTip;
      }

      &:hover {
        visibility: hidden;
      }
    }
  }
}
</style>
