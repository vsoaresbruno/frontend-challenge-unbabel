<script>
import { ref, computed, nextTick } from "vue";
import { useStore } from "vuex";
import BaseCheckbox from "./BaseCheckbox.vue";
import IconPerson from "./IconPerson.vue";
import IconDelete from "./IconDelete.vue";

export default {
  name: "TranscriptionsList",
  components: {
    BaseCheckbox,
    IconPerson,
    IconDelete,
  },
  props: {
    transcriptionsList: {
      type: Array,
      require: true,
    },
  },
  setup() {
    const store = useStore();
    const transcriptionFromStore = computed(() => store.state.data);

    const editingIndex = ref(null);
    const isEditingVoice = ref(false);
    const isEditingText = ref(false);
    const voiceInputRefs = ref({});
    const textInputRefs = ref({});

    const deleteTranscription = (id) => {
      store.commit("DELETE_TRANSCRIPTION", id);
    };

    const editVoice = (index) => {
      editingIndex.value = index;
      isEditingVoice.value = true;
      isEditingText.value = false;
      nextTick(() => {
        voiceInputRefs.value[`voiceInput-${index}`]?.focus();
      });
    };

    const editText = (index) => {
      editingIndex.value = index;
      isEditingVoice.value = false;
      isEditingText.value = true;
      nextTick(() => {
        textInputRefs.value[`textInput-${index}`]?.focus();
      });
    };

    const resetEditing = () => {
      editingIndex.value = null;
      isEditingVoice.value = false;
      isEditingText.value = false;
    };

    const updateTranscriptions = (index, payload) => {
      store.commit("UPDATE_TRANSCRIPTION", { index, payload });
    };

    return {
      transcriptionFromStore,
      editingIndex,
      isEditingVoice,
      isEditingText,
      deleteTranscription,
      editVoice,
      editText,
      resetEditing,
      updateTranscriptions,
      voiceInputRefs,
      textInputRefs,
    };
  },
};
</script>

<template>
  <div>
    <ul role="list">
      <li
        class="transcription__item"
        data-testid="transcription-item"
        v-for="(item, index) in transcriptionsList"
        :key="index"
        role="listitem"
      >
        <BaseCheckbox :id="item.id" />
        <div class="transcriptions__face-icon-wrapper">
          <icon-person />
        </div>
        <div class="transcription__editable-area">
          <input
            v-if="editingIndex === index && isEditingVoice"
            type="text"
            v-model="item.voice"
            @blur="resetEditing"
            @input="
              updateTranscriptions(index, {
                voice: item.voice,
                text: item.text,
              })
            "
            placeholder="Enter title"
            :ref="
              (voice) => {
                voiceInputRefs[`voiceInput-${index}`] = voice;
              }
            "
            aria-label="voiceLabel"
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
              updateTranscriptions(index, {
                voice: item.voice,
                text: item.text,
              })
            "
            placeholder="Enter description"
            :ref="
              (text) => {
                textInputRefs[`textInput-${index}`] = text;
              }
            "
            aria-label="textLabel"
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
          role="button"
          aria-label="AddRow"
          data-testid="delete-transcription"
          class="transcription__delete-button"
          @click="deleteTranscription(item.id)"
        >
          <icon-delete />
        </button>
      </li>
    </ul>
  </div>
</template>

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
.transcription__item:hover .transcriptions__face-icon-wrapper {
  color: purple;
}
</style>
