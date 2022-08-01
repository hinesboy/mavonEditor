<template>
  <div>
    <div class="navigate">
      <span @click="viewIndex = 1">Full demo</span>
      <span @click="viewIndex = 2">Simple demo</span>
    </div>
    <div>
      <App v-if="viewIndex == 1"></App>
      <Editor v-else-if="viewIndex == 2"></Editor>
    </div>
  </div>
</template>

<script>
import app from './app.vue';
import editor from './editor.vue';

export default {
  name: 'demo',
  components: {
    App: app,
    Editor: editor
  },
  data() {
    return {
      viewIndex: 1
    };
  }
};
</script>
<style>
.navigate {
  text-align: center;
  font-size: 18px;
  color: blue;
}

.navigate span {
  margin-right: 5px;
}

.navigate span:hover {
  cursor: pointer;
  font-weight: bolder;
}
</style>
