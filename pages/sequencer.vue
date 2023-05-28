<template>
  <!-- <div class="container mx-auto p-8 flex flex-col justify-center items-center min-h-screen"> -->
  <div class="container mx-auto flex flex-col justify-center items-center min-h-screen">

    <div class="mb-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
      <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 w-full">
        enter steps to make a simple beat
      </h1>
      <p class="font-normal text-gray-500 text-xl dark:text-gray-800 w-full mb-4">
        Use the grid below to make a pattern:
      </p>
      <main class="w-full ">
        <!-- Sequencer -->
        <div class="sequencer">
          <!-- Controls -->
          <div class="controls flex mb-4 w-full p-4 text-center bg-gray-200 border border-gray-200 rounded-lg shadow">
            <button @click="play" class="mr-2 bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
              :disabled="isPlaying">Play</button>
            <button @click="pause" class="mr-2 bg-gray-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              :disabled="!isPlaying">Pause</button>
            <button @click="stop" class="mr-2 bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              :disabled="!isPlaying">Stop</button>

            <div
              class="tempo w-max bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex flex-1 content-evenly items-center">
              <p>BPM: <span class="tempo-val mr-4">{{ tempo }}</span></p>
              <input type="range" class="tempo-slider flex-1" min="40" max="300" v-model="tempo" />
            </div>
          </div>

          <!-- Pattern area -->
          <div v-for="track in amountOfTracks" :key="track" class="grid-column patterns flex mb-1">
            <h2 class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded track-{{ track }}">
              Track-{{ track }}</h2>
            <button v-for="step in 16" :key="step" :class="{
              'bg-gray-400 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded': !sequencer.getStep(track, step),
              'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded': sequencer.getStep(track, step),
              'active-step': isPlaying && currentStep === step - 1
            }" @click="toggleStep(track, step)">
              <span class="step-number">{{ step }}</span>
            </button>
          </div>

          <!-- <audio class="track-1-sound" src=""></audio>
          <audio class="track-2-sound" src=""></audio>
          <audio class="track-3-sound" src=""></audio>
          <audio class="track-4-sound" src=""></audio> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sequencer from "../utils/Sequencer";
export default {
  data() {
    return {
      sequencer: new Sequencer(Array(this.amountOfTracks).fill(Array(16).fill(false))), sequence: Array(16).fill(false), // Initialize the sequence array with 16 false values
      isPlaying: false,
      currentStep: 0,
      tempo: 120,
      amountOfTracks: 4,
    };
  },
  created() {
    this.sequencer = new Sequencer(this.sequence);
  },

  methods: {
    toggleStep(track, step) {
      this.sequencer.toggleStep(track, step);
    },

    play() {
      this.isPlaying = true;
      this.currentStep = 0;
      this.playStep();
    },

    playStep() {
      for (let track = 0; track <= this.amountOfTracks; track++) {
        if (this.sequencer.getStep(track, this.currentStep)) {
          console.log(`Track ${track + 1} - Step ${this.currentStep + 1} triggered.`);
          // Logic here for playback of each activated step in each track
        }
      }

      this.currentStep = (this.currentStep + 1) % 16; // Repeat after 16 steps

      if (this.isPlaying) {
        setTimeout(this.playStep, 500); // Adjust the timing interval as needed
      }

      // Highlight the current step button
      const previousStep = (this.currentStep === 0) ? this.sequence.length - 1 : this.currentStep - 1;
      const previousButton = document.querySelector(`.track-box-${Math.floor(previousStep / 16) + 1}-${(previousStep % 16) + 1}`);
      if (previousButton) {
        previousButton.classList.remove('active-step');
      }

      const currentButton = document.querySelector(`.track-box-${Math.floor(this.currentStep / 16) + 1}-${(this.currentStep % 16) + 1}`);
      if (currentButton) {
        currentButton.classList.add('active-step');
      }
    },
    pause() {
      this.isPlaying = false;
    },
    stop() {
      this.isPlaying = false;
      this.currentStep = 0;
      // Remove active step highlighting
      const activeStepButton = document.querySelector('.active-step');
      if (activeStepButton) {
        activeStepButton.classList.remove('active-step');
      }
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
.grid-patterns {
  display: grid;
  grid-template-columns: 120px repeat(16, 1fr);
  /* 16 columns */
  grid-template-rows: repeat(4, auto);
  /* 4 rows */
  grid-gap: 4px;
  /* Adjust the gap between cells as needed */
}

h2 {
  width: 120px;
}

.grid-row {
  display: grid;
  /* grid-template-columns: 120 repeat(16, 1fr); */
  /* First column auto, rest 15 columns */
  align-items: center;
  gap: 4px;
  /* Adjust the gap between cells as needed */
}

.grid-column {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.tempo-slider {
  appearance: none;
  width: 100%;
  height: 2px;
  background: white;
  outline: none;
}

.step {
  cursor: pointer;
}

.step-number {
  display: none;
}

.active-step {
  background-color: orange;
}
</style>
