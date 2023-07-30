<template>
  <div class="main-page">
    <VBreadcrumbs :pages="pages" class="breadcrumbs" />
    <header class="header">
      <h1 class="header__title">Проектные данные</h1>
      <div class="header__tabs">
        <VTabs :tabs="tabs" @select="selectTab" />
      </div>
    </header>
    <div v-if="componentActive">
      <component :is="componentActive" />
    </div>
    <div v-else>empty</div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import FormProject from "@/components/Main/FormProject.vue";

export default {
  components: {
    FormProject,
  },
  setup() {
    const pages = [
      {
        name: "Проектные данные",
        to: "/",
      },
    ];

    const tabs = reactive([
      {
        id: "tab-1",
        name: "Основное",
        component: "FormProject",
        selected: true,
        disabled: false,
        tip: "",
      },
      {
        id: "tab-2",
        name: "Перечень ПСД",
        component: "",
        selected: false,
        disabled: true,
        tip: "Сначала заполните: Основное",
      },
    ]);

    const componentActive = computed(() => {
      const tabSelected = tabs.find((tab) => tab.selected);
      return tabSelected ? tabSelected.component : false;
    });

    const selectTab = (tab) => {
      tab.selected = true;
    };

    return {
      pages,
      tabs,
      componentActive,
      selectTab,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  .breadcrumbs {
    margin: 16px 0;
  }

  .header {
    margin: 96px 0;

    &__title {
      font-size: 64px;
      letter-spacing: -5.12px;
      font-weight: 500;
      @media (max-width: 991px) {
        font-size: 48px;
        letter-spacing: -3.12px;
      }
      @media (max-width: 567px) {
        font-size: 32px;
        letter-spacing: -1.12px;
      }
    }

    &__tabs {
      margin-top: 32px;
    }

    @media (max-width: 991px) {
      margin: 60px 0;
    }
  }
}
</style>
