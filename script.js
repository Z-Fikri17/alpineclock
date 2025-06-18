document.addEventListener('alpine:init', () => {
  Alpine.data('clockApp', () => ({
    timezone: 0,
    hourStyle: '',
    minuteStyle: '',
    secondStyle: '',

    init() {
      this.updateClock();
      setInterval(() => this.updateClock(), 1000);
    },

    updateClock() {
      const now = new Date();
      // Adjust time by timezone offset (in hours)
      const localOffset = now.getTimezoneOffset() / 60;
      now.setHours(now.getUTCHours() + parseInt(this.timezone));

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours() % 12;

      this.secondStyle = `transform: rotate(${seconds * 6}deg)`;
      this.minuteStyle = `transform: rotate(${minutes * 6}deg)`;
      this.hourStyle = `transform: rotate(${(hours + minutes / 60) * 30}deg)`;
    }
  }));
});
