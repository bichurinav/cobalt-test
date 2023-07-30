<template>
  <div class="user-profile">
    {{ user }}
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator(value) {
      const arName = value.split(" ");
      return arName.length === 2;
    },
  },
});

const user = computed(() => {
  const arName = props.name.split(" ");
  if (arName.length < 2) throw new Error("Неправильный формат имени");
  return arName[0].charAt(0).toUpperCase() + arName[1].charAt(0).toUpperCase();
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vars.scss";
.user-profile {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  color: #fff;
  letter-spacing: -0.48px;
  background: $colorGray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}
</style>
