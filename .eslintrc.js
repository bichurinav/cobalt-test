module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/require-default-prop": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    eqeqeq: ["error", "always"],
    quotes: ["error", "double"],
    "no-alert": "error",
    "no-var": "error",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "vue/html-self-closing": "off",
    "vue/v-on-event-hyphenation": ["error", "never"],
    "vue/attribute-hyphenation": ["error", "never"],
  },
};
