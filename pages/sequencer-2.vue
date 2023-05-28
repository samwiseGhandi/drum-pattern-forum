<template>
  <div>
    <h1>Sequencer page</h1>
    <div class="sequencer track-1">
      <button v-for="(step, index) in sequence" :key="index" :class="{ active: step, playing: currentStep === index }"
        class="mr-2 w-10 h-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="toggleStep(index)"></button>
    </div>
    <div class="sequencer track-2">
      <button v-for="(step, index) in sequence" :key="index" :class="{ active: step, playing: currentStep === index }"
        class="mr-2 w-10 h-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="toggleStep(index)"></button>
    </div>
    <div class="sequencer track-3">
      <button v-for="(step, index) in sequence" :key="index" :class="{ active: step, playing: currentStep === index }"
        class="mr-2 w-10 h-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="toggleStep(index)"></button>
    </div>
    <div class="sequencer track-4">
      <button v-for="(step, index) in sequence" :key="index" :class="{ active: step, playing: currentStep === index }"
        class="mr-2 w-10 h-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="toggleStep(index)"></button>
    </div>
    <div class="controls">
      <button @click="play" class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        :disabled="isPlaying">Play</button>
      <button @click="pause" class="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        :disabled="!isPlaying">Pause</button>
      <button @click="stop" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        :disabled="!isPlaying">Stop</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sequence: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      currentStep: 0,
      isPlaying: false,
    };
  },
  methods: {
    toggleStep(index) {
      this.sequence[index] = !this.sequence[index];
    },
    play() {
      this.isPlaying = true;
      this.playStep();
    },
    playStep() {
      if (this.sequence[this.currentStep]) {
        console.log(`Step ${this.currentStep} triggered.`);
        // Add your custom logic here for what should happen on each step
      }
      this.currentStep = (this.currentStep + 1) % this.sequence.length;
      if (this.isPlaying) {
        setTimeout(this.playStep, 300); // Adjust the timing interval as needed
      }
    },
    pause() {
      this.isPlaying = false;
    },
    stop() {
      this.isPlaying = false;
      this.currentStep = 0;
    },
  },
};
</script>

<style lang="scss">
.sequencer {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.active {
  background-color: green;
}

.playing {
  background-color: yellow;
}
</style>
