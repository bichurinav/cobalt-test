export default {
  beforeMount(el, binding) {
    const handleClickOutside = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value();
      }
    };
    document.addEventListener("click", handleClickOutside);
    el._clickOutside = handleClickOutside;
  },
  beforeUnmount(el) {
    document.removeEventListener("click", el._clickOutside);
  },
};
