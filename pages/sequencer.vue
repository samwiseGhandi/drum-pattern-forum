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
          <div class="mb-4 w-full p-4 text-center bg-gray-200 border border-gray-200 rounded-lg shadow">
            <div class="grid-column patterns flex mb-1" v-for="track in amountOfTracks">
              <h2 class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded track-{{ track }}">
                Track-{{ track }}</h2>
              <button v-for="step in 16" class="w-10 h-10" :key="(track - 1) * 16 + step"
                :class="`bg-gray-400 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded track-box-${track}-${step} `"
                @click="toggleStep(step)">
                <span class="step-number">{{ step }}</span>
              </button>
            </div>
            <div class="grid-column">
              <h2 class="p-1 track"></h2>
              <div v-for="step in 16" class="w-10 h-4" :key="(step - 1) * 16 + step"
                :class="`p-1 track-box-${step}-${step - 1}`">
                <span class="step-nr text-xs">{{ step }}</span>
              </div>
            </div>
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
export default {
  data() {
    return {
      sequence: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      isPlaying: false,
      currentStep: 0,
      tempo: 120,
      amountOfTracks: 4,
    };
  },
  methods: {
    toggleStep(index) {
      this.sequence[index] = !this.sequence[index];
    },
    play() {
      this.currentStep = 0; // Reset the current step to the beginning
      this.isPlaying = true;
      this.playStep();
    },
    playStep() {
      const previousStep = (this.currentStep - 1 + this.sequence.length) % this.sequence.length;
      const previousStepElement = document.querySelector(`.track-box-${previousStep + 1}`);
      if (previousStepElement) {
        previousStepElement.classList.remove("active-step");
      }

      if (this.sequence[this.currentStep]) {
        console.log(`Step ${this.currentStep} triggered.`);
        // Logic here for playback
      }

      const currentStepElement = document.querySelector(`.track-box-${this.currentStep + 1}`);
      if (currentStepElement) {
        currentStepElement.classList.add("active-step");
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
