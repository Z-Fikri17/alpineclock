document.addEventListener('alpine:init', () => {
  Alpine.data('clockApp', () => ({
    timezone: "0", // Keep it as string for select binding

    hourStyle: '',
    minuteStyle: '',
    secondStyle: '',

    init() {
      this.updateClock();
      setInterval(() => this.updateClock(), 1000);

      // React to timezone changes automatically
      this.$watch('timezone', () => {
        this.updateClock();
      });
    },

    updateClock() {
      const now = new Date();
      const offset = parseInt(this.timezone); // string to number

      now.setHours(now.getUTCHours() + offset);

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours() % 12;

      this.secondStyle = `transform: rotate(${seconds * 6}deg)`;
      this.minuteStyle = `transform: rotate(${minutes * 6}deg)`;
      this.hourStyle = `transform: rotate(${(hours + minutes / 60) * 30}deg)`;
    }
  }));
});
