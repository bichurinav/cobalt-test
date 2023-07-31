<template>
  <label
    v-click-outside="() => (isOpenSelectList = false)"
    class="input"
    :class="{ error: errorText || error }"
  >
    <span class="placeholder">{{ $attrs.placeholder }}</span>
    <input
      v-bind="$attrs"
      placeholder=""
      :value="modelValue"
      @input="inputHanlder"
      @keyup="inputAsyncSelectHanlder"
    />
    <p v-if="desc && !errorText && !error" class="desc">
      {{ desc }}
    </p>
    <p v-if="error || errorText" class="error">
      {{ errorText || error }}
    </p>
    <div v-if="selectList?.length > 0 && isOpenSelectList" class="select-list">
      <button
        v-for="(value, idx) in selectList"
        :key="idx"
        class="select-list__item"
        @click="selectItemHanlder(value)"
      >
        {{ value }}
      </button>
    </div>
  </label>
</template>

<script setup>
import { ref } from "vue";
import { debounce } from "@/utils";
const emit = defineEmits(["update:modelValue", "setError", "clearErrorText"]);

const props = defineProps({
  modelValue: String,
  errorText: String,
  desc: String,
  rules: Array,
  asyncSelector: Function,
});

const error = ref("");
const selectList = ref([]);
const isOpenSelectList = ref(false);

const validator = (value, rules) => {
  const errors = [];

  rules.forEach((rule) => {
    if (rule.pattern) {
      if (!rule.pattern.test(value)) {
        errors.push(rule.error);
      }
    }
    if (rule.validator) {
      if (!rule.validator(value)) {
        errors.push(rule.error);
      }
    }
  });

  if (errors.length === 0) {
    error.value = "";
    emit("setError", false);
    return;
  }

  error.value = errors.at(-1);
  emit("setError", true);
};

const inputHanlder = (event) => {
  emit("clearErrorText");
  isOpenSelectList.value = false;

  const value = event.target.value;

  if (props.rules?.length > 0) {
    validator(value, props.rules);
  }

  emit("update:modelValue", value);
};

const selectItemHanlder = (value) => {
  validator(value, props.rules);
  emit("update:modelValue", value);
  isOpenSelectList.value = false;
};

const inputAsyncSelectHanlder = debounce(async () => {
  if (!props.asyncSelector) return;
  const data = await props.asyncSelector(props.modelValue);
  if (!Array.isArray(data) && data?.length === 0) return;
  isOpenSelectList.value = true;
  selectList.value = data;
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vars.scss";

.input {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  height: 64px;

  input {
    border: none;
    padding-bottom: 16px;
    border-bottom: 1px solid $colorSilver;
    transition: all 0.15s ease;
    letter-spacing: -0.48px;
    font-weight: 500;

    &:focus {
      border: none;
      outline: none;
      border-bottom: 1px solid $colorBasic;
    }

    &:hover {
      border-bottom: 1px solid $colorBasic;
    }

    &:disabled {
      cursor: not-allowed;
      color: $colorGray;
      &:hover {
        border-bottom: 1px solid $colorSilver;
      }
    }

    &[readonly] {
      border-bottom: 1px solid transparent !important;
    }
  }

  .placeholder {
    font-size: 14px;
    margin-bottom: 8px;
    line-height: 16px;
    letter-spacing: -0.28px;
    color: $colorGray;
  }

  .desc,
  .error {
    margin-top: 8px;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.12px;
  }

  .desc {
    color: $colorGray;
  }

  .error {
    color: $colorError;
  }

  .select-list {
    z-index: 10;
    width: 100%;
    display: inline-flex;
    position: absolute;
    top: 68px;
    left: 0;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    border-radius: 8px;
    background: #f9f9fd;
    border: 1px solid $colorSilver;
    overflow: auto;
    max-height: 560px;
    &__item {
      padding: inherit;
      display: flex;
      justify-content: flex-start;
      width: 100%;
      letter-spacing: -0.48px;
      border: 1px solid transparent;
      border-radius: inherit;
      &:hover {
        cursor: pointer;
        border: 1px solid $colorBasic;
      }
    }
  }
}

.input.error {
  input {
    border-bottom: 1px solid $colorError;
  }
}
</style>
