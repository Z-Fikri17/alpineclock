document.addEventListener('alpine:init', () => {
  Alpine.data('clockApp', () => ({
    timezone: "0",
    hourStyle: '',
    minuteStyle: '',
    secondStyle: '',

    init() {
      this.updateClock();
      setInterval(() => this.updateClock(), 1000);

      // Watch for timezone changes
      this.$watch('timezone', () => {
        this.updateClock();
      });
    },

    updateClock() {
      const now = new Date();

      // Adjust based on selected timezone
      const offset = parseInt(this.timezone);
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const adjusted = new Date(utc + 3600000 * offset);

      const seconds = adjusted.getSeconds();
      const minutes = adjusted.getMinutes();
      const hours = adjusted.getHours() % 12;

      this.secondStyle = `transform: rotate(${seconds * 6}deg)`;
      this.minuteStyle = `transform: rotate(${minutes * 6}deg)`;
      this.hourStyle = `transform: rotate(${(hours + minutes / 60) * 30}deg)`;
    }
  }));
});
