export default class Sequencer {
  constructor(sequence) {
    this.sequence = sequence;
  }

  toggleStep(track, step) {
    const index = (track - 1) * 16 + step - 1;
    this.sequence[index] = !this.sequence[index];
  }

  getStep(track, step) {
    const index = (track - 1) * 16 + step - 1;
    return this.sequence[index];
  }

  play() {
    this.isPlaying = true;
    this.currentStep = 0;
    this.playStep();
  }

  playStep() {
    if (this.sequence[this.currentStep]) {
      console.log(`Step ${this.currentStep} triggered.`);
      // Logic here for playback
    }

    this.currentStep = (this.currentStep + 1) % this.sequence.length;
    if (this.isPlaying) {
      setTimeout(() => this.playStep(), 300); // Adjust the timing interval as needed
    }
  }

  pause() {
    this.isPlaying = false;
  }

  stop() {
    this.isPlaying = false;
    this.currentStep = 0;
  }
}
