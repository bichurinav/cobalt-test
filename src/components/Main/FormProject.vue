<template>
  <form class="form-project" @submit.prevent>
    <div class="form-group">
      <h3 class="form-group__title">Наименование и шифр</h3>
      <div class="form-group__fields">
        <VInput
          v-model="dataForm.inputName.value"
          type="text"
          placeholder="Наименование"
          :errorText="dataForm.inputName.errorText"
          :rules="[emptyValid]"
          @setError="(state) => (dataForm.inputName.isError = state)"
          @clearErrorText="dataForm.inputName.errorText = ''"
        />
        <VInput
          v-model="dataForm.inputCode.value"
          type="text"
          placeholder="Шифр"
          :errorText="dataForm.inputCode.errorText"
          :rules="[emptyValid]"
          @setError="(state) => (dataForm.inputCode.isError = state)"
          @clearErrorText="dataForm.inputCode.errorText = ''"
        />
      </div>
    </div>

    <div class="form-group">
      <h3 class="form-group__title">Местонахождение проекта</h3>
      <div class="form-group__fields">
        <VInput
          v-model="dataForm.inputCountry.value"
          type="text"
          placeholder="Страна"
          :errorText="dataForm.inputCountry.errorText"
          :rules="[emptyValid]"
          :asyncSelector="AddressApi.getCountry.bind(AddressApi)"
          @setError="(state) => (dataForm.inputCountry.isError = state)"
          @clearErrorText="dataForm.inputCountry.errorText = ''"
        />
        <VInput
          v-model="dataForm.inputArea.value"
          type="text"
          placeholder="Область / Край"
          :errorText="dataForm.inputArea.errorText"
          :rules="[emptyValid]"
          :asyncSelector="AddressApi.getArea.bind(AddressApi)"
          @setError="(state) => (dataForm.inputArea.isError = state)"
          @clearErrorText="dataForm.inputArea.errorText = ''"
        />
        <VInput
          v-model="dataForm.inputCity.value"
          type="text"
          placeholder="Населенный пункт"
          :errorText="dataForm.inputCity.errorText"
          :rules="[emptyValid]"
          :asyncSelector="AddressApi.getCity.bind(AddressApi)"
          @setError="(state) => (dataForm.inputCity.isError = state)"
          @clearErrorText="dataForm.inputCity.errorText = ''"
        />
        <VInput
          v-model="dataForm.inputStreet.value"
          type="text"
          placeholder="Улица / Проспект"
          :errorText="dataForm.inputStreet.errorText"
          :rules="[emptyValid]"
          :asyncSelector="AddressApi.getStreet.bind(AddressApi)"
          @setError="(state) => (dataForm.inputStreet.isError = state)"
          @clearErrorText="dataForm.inputStreet.errorText = ''"
        />
        <div class="row">
          <VInput
            v-model="dataForm.inputHouse.value"
            class="row__item"
            type="text"
            placeholder="Дом"
            :errorText="dataForm.inputStreet.errorText"
            :rules="[emptyValid]"
            @setError="(state) => (dataForm.inputHouse.isError = state)"
            @clearErrorText="dataForm.inputHouse.errorText = ''"
          />
          <VInput
            v-model="dataForm.inputHouseFrame.value"
            class="row__item"
            type="text"
            placeholder="Корпус"
            :errorText="dataForm.inputHouseFrame.errorText"
            :rules="[]"
            @setError="(state) => (dataForm.inputHouseFrame.isError = state)"
            @clearErrorText="dataForm.inputHouseFrame.errorText = ''"
          />
        </div>
        <div class="input-index">
          <VInput
            v-model="dataForm.inputIndex.value"
            type="text"
            placeholder="Индекс"
            :errorText="dataForm.inputIndex.errorText"
            :rules="[numsValid, indexValid]"
            @setError="(state) => (dataForm.inputIndex.isError = state)"
            @clearErrorText="dataForm.inputIndex.errorText = ''"
          />
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="button-group">
        <VButton
          :disabled="!isAccessCancel"
          variant="secondary"
          @click="cancelDataHandler"
        >
          Отменить
        </VButton>
        <VButton :disabled="!isAccessSave" @click="saveDataHandler">
          Сохранить
        </VButton>
      </div>
    </footer>
    <VAlert :show="isShowingNotif" @close="isShowingNotif = false">
      Изменения сохранены!
    </VAlert>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { debounce } from "@/utils/helpers";
import AddressApi from "@/services/modules/AddressApi";

import { emptyValid, numsValid, indexValid } from "@/utils/validations";

import storageForm from "@/storageForm";
const storage = storageForm("formData");

const isAccessCancel = ref(false);
const isAccessSave = ref(false);
const isShowingNotif = ref(false);

const dataForm = ref(
  storage.get() || {
    inputName: {
      isError: true,
      errorText: "",
      value: "",
    },
    inputCode: {
      isError: true,
      errorText: "",
      value: "",
    },
    inputCountry: {
      isError: true,
      errorText: "",
      value: "",
    },
    inputArea: {
      isError: true,
      errorText: "",
      value: "",
    },
    inputCity: {
      isError: true,
      errorText: "",
      value: "",
    },
    inputStreet: {
      isError: true,
      errorText: "",
      value: "",
    },
    inputHouse: {
      isError: true,
      errorText: "",
      value: "",
    },
    inputHouseFrame: {
      isError: false,
      errorText: "",
      value: "",
    },
    inputIndex: {
      isError: true,
      errorText: "",
      value: "",
    },
  }
);

watch(
  dataForm,
  debounce((form) => {
    isAccessCancel.value = true;

    let validInputs = true;
    let countInputs = 0;
    let emptyInputs = 0;

    for (let key in form) {
      if (form[key].isError) {
        validInputs = false;
      }
      if (form[key].value === "") {
        emptyInputs++;
      }
      countInputs++;
    }

    if (countInputs === emptyInputs) {
      isAccessCancel.value = false;
    }

    if (!validInputs) {
      isAccessSave.value = false;
      return;
    }

    isAccessSave.value = true;
  }),
  { deep: true }
);

const cancelDataHandler = () => {
  for (let key in dataForm.value) {
    const field = dataForm.value[key];
    field.value = "";
    field.isError = true;
    if (key === "inputHouseFrame") {
      field.isError = false;
    }
    field.errorText = "";
  }
  if (storage.get()) {
    storage.remove();
  }
  isAccessSave.value = false;
};

const saveDataHandler = () => {
  storage.set(dataForm.value);
  isAccessSave.value = false;
  isShowingNotif.value = true;
};

onMounted(() => {
  if (storage.get()) {
    isAccessCancel.value = true;
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vars.scss";

.form-project {
  .form-group {
    display: flex;
    flex-direction: column;
    row-gap: 32px;

    &:first-child {
      margin-bottom: 96px;
    }

    &__title {
      font-size: 32px;
      height: 56px;
      letter-spacing: -1.92px;
      border-bottom: 1px solid $colorSilver;
      font-weight: 500;
      @media (max-width: 991px) {
        font-size: 20px;
        letter-spacing: -1px;
      }
    }

    &__fields {
      width: 50%;
      display: flex;
      flex-direction: column;
      row-gap: 32px;
      @media (max-width: 991px) {
        width: 70%;
      }
      @media (max-width: 767px) {
        width: 100%;
      }
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    column-gap: 16px;
    width: 100%;
    @media (max-width: 567px) {
      &__item {
        min-width: calc(50% - 8px);
      }
    }
  }

  .input-index {
    width: 50%;
  }

  .footer {
    margin-top: 128px;
    border-top: 1px solid $colorSilver;
    display: flex;
    align-self: center;
    justify-content: flex-end;
    .button-group {
      margin-top: 16px;
      width: auto;
      display: inline-flex;
      align-items: center;
      column-gap: 16px;
      margin-bottom: 128px;
      @media (max-width: 991px) {
        width: 100%;
        column-gap: 6px;
        margin-bottom: 60px;
        button {
          min-width: calc(50% - 3px);
        }
      }
    }
    @media (max-width: 991px) {
      margin-top: 60px;
    }
  }
}
</style>
