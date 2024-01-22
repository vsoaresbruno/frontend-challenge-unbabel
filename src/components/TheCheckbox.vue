<script>
export default {
  name: "TheCheckbox",
  props: {
    id: String,
  },
};
</script>

<template>
  <div class="transcriptions__checkbox-wrapper">
    <input
      type="checkbox"
      :id="`transcriptions__item-${id}`"
      class="transcriptions__checkbox"
    /><label
      :for="`transcriptions__item-${id}`"
      class="transcriptions__checkbox-label"
    ></label>
  </div>
</template>

<style scoped>
.transcriptions__checkbox-wrapper,
.transcriptions__face-icon-wrapper {
  display: flex;
  margin-right: 10px;
}

.transcriptions__checkbox {
  opacity: 0;
}

.transcriptions__checkbox-label {
  width: 12px;
  height: 12px;
  border: 2px solid var(--purple);
  border-radius: 2px;
  position: absolute;
  margin-top: 5px;
}

.transcriptions__checkbox:checked + .transcriptions__checkbox-label {
  background: var(--purple);
}

.transcriptions__checkbox:checked + .transcriptions__checkbox-label:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 3px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
  top: 2px;
  left: 1px;
}
</style>
