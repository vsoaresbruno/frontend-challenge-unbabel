<script>
import { mapMutations } from "vuex";
import TheCheckbox from "./TheCheckbox.vue";

export default {
  props: {
    transcriptionsList: {
      type: Array,
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
    ...mapMutations(["ADD_TRANSCRIPTION", "updateFieldPair"]),
    ...mapMutations(["DELETE_TRANSCRIPTION"]),
    deleteTranscription(id) {
      this.DELETE_TRANSCRIPTION(id);
    },

    editVoice(index) {
      this.editingIndex = index;
      this.isEditingVoice = true;
      this.isEditingText = false;
      this.$nextTick(() => {
        this.$refs[`voiceInput-${index}`][0].focus();
      });
    },
    editText(index) {
      this.editingIndex = index;
      this.isEditingVoice = false;
      this.isEditingText = true;
      this.$nextTick(() => {
        this.$refs[`textInput-${index}`][0].focus();
      });
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
      DeleteIcon: require("../assets/images/delete.svg"),
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
  width: 100%;
  margin: 0 16px 0 10px;
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

.transcription__delete-button {
  cursor: pointer;
  background: unset;
  border: unset;
  visibility: hidden;
}

.transcription__item:hover .transcription__delete-button {
  visibility: visible;
}
</style>

<template>
  <div>
    <ul>
      <li
        class="transcription__item"
        data-testid="transcription-item"
        v-for="(item, index) in transcriptionsList"
        :key="index"
      >
        <TheCheckbox :id="item.id" />
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
            :ref="`voiceInput-${index}`"
            class="transcription__input--editing"
            data-testid="transcription-voice-editing"
          />

          <h3
            class="transcription__title"
            data-testid="transcription-voice"
            v-else
            @click="editVoice(index)"
          >
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
            :ref="`textInput-${index}`"
            class="transcription__input--editing"
            data-testid="transcription-text-editing"
          ></textarea>
          <p
            class="transcription__content"
            data-testid="transcription-text"
            v-else
            @click="editText(index)"
          >
            {{ item.text }}
          </p>
        </div>
        <button
          data-testid="delete-transcription"
          class="transcription__delete-button"
          @click="deleteTranscription(item.id)"
        >
          <img :src="DeleteIcon" />
        </button>
      </li>
    </ul>
  </div>
</template>
