<script>
import { mapMutations } from "vuex";
import TheCheckbox from "./TheCheckbox.vue";

export default {
  props: {
    transcriptionsList: {
      type: Object,
    },
  },
  components: {
    TheCheckbox,
  },
  computed: {
    transcriptionFromStore() {
      return this.$store.state.data;
    },
  },
  methods: {
    ...mapMutations(["addFieldPair", "updateFieldPair"]),
    editVoice(index) {
      this.editingIndex = index;
      this.isEditingVoice = true;
      this.isEditingText = false;
    },
    editText(index) {
      this.editingIndex = index;
      this.isEditingVoice = false;
      this.isEditingText = true;
    },
    resetEditing() {
      this.editingIndex = null;
      this.isEditingVoice = false;
      this.isEditingText = false;
    },
  },

  data() {
    return {
      editingIndex: null,
      isEditingVoice: false,
      isEditingText: false,
      FaceIcon: require("../assets/images/person.svg"),
    };
  },
};
</script>

<style scoped>
.trasncription__list {
  text-decoration: none;
}
.transcription__item {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #eaedef;
  padding: 24px;
}
.transcription__editable-area {
  margin-left: 10px;
  width: 100%;
}
.transcription__title {
  font-family: "Montserrat";
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--title-color);
}
.transcription__content {
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 400;
  color: var(--content-color);
}
.transcription__input--editing {
  width: 100%;
  background: #f6f7f8;
  box-shadow: inset 0 0 0 2px var(--purple);
  margin-bottom: 12px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: 3px solid #fcfff4;
}
.transcription__input--editing:focus {
  background: #f6f7f8;
  box-shadow: inset 0 0 0 2px var(--purple);
  padding: 5px;
  border-radius: 3px;
  outline: 3px solid #fcfff4;
}
</style>

<template>
  <div>
    <ul>
      <li
        class="transcription__item"
        v-for="(item, index) in transcriptionsList"
        :key="index"
      >
        <TheCheckbox :index="item.id" />
        <img :src="FaceIcon" alt="face icon" />

        <div class="transcription__editable-area">
          <input
            v-if="editingIndex === index && isEditingVoice"
            type="text"
            v-model="item.voice"
            @blur="resetEditing"
            @input="
              updateFieldPair(index, { voice: item.voice, text: item.text })
            "
            placeholder="Enter title"
            autofocus
            class="transcription__input--editing"
          />

          <h3 class="transcription__title" v-else @click="editVoice(index)">
            {{ item.voice }}
          </h3>

          <textarea
            v-if="(editingIndex === index && isEditingText) || !item.text"
            v-model="item.text"
            @blur="resetEditing"
            @input="
              updateFieldPair(index, { voice: item.voice, text: item.text })
            "
            placeholder="Enter description"
            autofocus
            class="transcription__input--editing"
          ></textarea>
          <p class="transcription__content" v-else @click="editText(index)">
            {{ item.text }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
