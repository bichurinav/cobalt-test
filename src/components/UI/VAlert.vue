<template>
  <teleport to="body">
    <div v-if="show" class="alert">
      <img
        class="icon"
        src="/img/icons/close.svg"
        alt=""
        @click="closeAlertHandler"
      />
      <slot />
    </div>
  </teleport>
</template>

<script setup>
import { watch, toRef, ref, onBeforeUnmount } from "vue";
const emit = defineEmits(["close"]);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const show = toRef(() => props.show);
const timeout = ref(null);

watch(show, (val) => {
  if (val) {
    timeout.value = setTimeout(() => {
      emit("close");
    }, 3000);
  }
});

const closeAlertHandler = () => {
  emit("close");
};

onBeforeUnmount(() => {
  clearTimeout(timeout.value);
});
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 16px;
  left: -16px;
  padding: 16px;
  background: #43a047;
  color: #fff;
  min-width: 300px;
  animation: show 0.2s ease-in forwards;
  border-radius: 8px;

  @keyframes show {
    0% {
      opacity: 0;
      left: -16px;
    }
    100% {
      opacity: 1;
      left: 16px;
    }
  }

  .icon {
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 16px;
    width: 24px;
    height: 24px;
  }
}
</style>
