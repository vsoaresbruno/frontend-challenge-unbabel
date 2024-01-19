<script>
import { mapMutations } from "vuex";

export default {
  props: {
    transcriptionsList: Array,
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
  components: {
    // TranscriptionsItem,
  },
  data() {
    return {
      editingIndex: null,
      isEditingVoice: false,
      isEditingText: false,
      // ... other data properties ...
    };
  },
};
</script>
<style scoped>
.trasncription__list {
  text-decoration: none;
}
.transcription__item {
  border-bottom: 1px solid #eaedef;
  padding: 24px;
}
.transcription__title {
  margin-bottom: 12px;
}
.transcription__description {
  font-weight: 400;
  color: #778195;
  font-size: 16px;
}
.transcription__description--editing,
.transcription__title--editing {
  width: 100%;
  outline: 3px solid #fcfff4;
  background: #f6f7f8;
  box-shadow: inset 0 0 0 2px #859eff;
  padding: 5px;
  border-radius: 3px;
}

.transcription__input--editing {
  width: 100%;
  background: #f6f7f8;
  box-shadow: inset 0 0 0 2px #859eff;
  margin-bottom: 12px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 16px;
  outline: 3px solid #fcfff4;
}

.transcription__input--editing:focus {
  outline: 3px solid #fcfff4;
  background: #f6f7f8;
  box-shadow: inset 0 0 0 2px #859eff;
  padding: 5px;
  border-radius: 3px;
}
.transcription__title--editing {
  margin-bottom: 12px;
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
        <!-- <div v-if="editingIndex === index" class="editable-area"> -->
        <div class="editable-area">
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
          <p class="transcription__description" v-else @click="editText(index)">
            {{ item.text }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
