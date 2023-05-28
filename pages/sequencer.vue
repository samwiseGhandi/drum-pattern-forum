<template>
  <div class="container mx-auto p-8 flex flex-col justify-center items-center min-h-screen">
    <div class="mb-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 w-full">
        enter steps to make a <span class="underline underline-offset-3 decoration-8 decoration-blue-400">simple
          beat</span>!
      </h1>
      <p class="font-normal text-gray-500 text-xl dark:text-gray-800 w-full mb-4">
        Use the grid below to make a pattern:
      </p>
      <main class="w-full ">
        <!-- Sequencer -->
        <div class="sequencer">
          <!-- Controls -->
          <div class="controls flex mb-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
            <button @click="play" class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              :disabled="isPlaying">Play</button>
            <button @click="pause" class="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              :disabled="!isPlaying">Pause</button>
            <button @click="stop" class="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              :disabled="!isPlaying">Stop</button>

            <div class="tempo w-max">
              <p>BPM: <span class="tempo-val">{{ tempo }}</span></p>
              <input type="range" class="tempo-slider" min="40" max="300" v-model="tempo" />
            </div>
          </div>
          <!-- Pattern area -->
          <div class="patterns mb-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
            <div class="grid-pattern" v-for="track in 4">
              <h2 class="track-{{ track }}">Track-{{ track }}</h2>
              <div v-for="step in 16">
                <div :key="(track - 1) * 16 + step" :class="`box track-box-${track}-${step - 1}`">
                  <span class="step-number">{{ step }}</span>
                </div>
              </div>
            </div>
          </div>







          <!-- <audio class="kick-sound" src="./sounds/kick.wav"></audio>
        <audio class="clap-sound" src="./sounds/clap.wav"></audio>
        <audio class="open-hat-sound" src="./sounds/open-hat.wav"></audio>
        <audio class="closed-hat-sound" src="./sounds/closed-hat.wav"></audio> -->
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
.grid-pattern {
  display: grid;
  grid-template-columns: 130px repeat(16, 1fr);
  grid-template-rows: repeat(5, auto);
  gap: 1rem;
}

.box {
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
}
</style>
  