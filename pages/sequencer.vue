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
          <div class="controls flex mb-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
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
          <div class="grid-patterns mb-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow">

            <h2 class="track">track-1</h2>
            <button v-for="step in 16" :class="`step track-1-${step - 1}`" :key="step">
              <span class="mobile-num">{{ step }}</span>
            </button>

            <h2 class="track">track-2</h2>
            <button v-for="step in 16" :class="`step track-1-${step - 1}`" :key="step">
              <span class="mobile-num">{{ step }}</span>
            </button>

            <h2 class="track">track-3</h2>
            <button v-for="step in 16" :class="`step track-1-${step - 1}`" :key="step">
              <span class="mobile-num">{{ step }}</span>
            </button>

            <h2 class="track">track-4</h2>
            <button v-for="step in 16" :class="`step track-1-${step - 1}`" :key="step">
              <span class="mobile-num">{{ step }}</span>
            </button>

            <div class="step-num"></div>
            <div class="step-num bar-start" v-for="step in 16" :key="step">{{ step }}</div>
          </div>

          <!-- <div class="grid-pattern patterns mb-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow"
            v-for="track in 4">
            <h2 class="bg-gray-400 p-1 track-{{ track }}">Track-{{ track }}</h2>
            <button v-for="step in 16" class="w-10 h-10" :key="(track - 1) * 16 + step"
              :class="`bg-gray-200 step p-1 track-box-${track}-${step - 1}`">
              <span class="step-number">{{ step }}</span>
            </button>
          </div> -->

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
      tempo: 120
    };
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
.grid-patterns {
  display: grid;
  grid-template-columns: 100px repeat(16, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1rem;
}

.tempo-slider {
  appearance: none;
  width: 100%;
  height: 2px;
  background: white;
  outline: none;
}

.step {
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
}
</style>
