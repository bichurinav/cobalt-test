const storageForm = (key) => {
  let stateFrom = localStorage.getItem(key) || null;

  return {
    get() {
      return JSON.parse(stateFrom);
    },
    set(formData) {
      localStorage.setItem(key, JSON.stringify(formData));
    },
    remove() {
      localStorage.setItem("formData", "");
    },
  };
};

export default storageForm;
