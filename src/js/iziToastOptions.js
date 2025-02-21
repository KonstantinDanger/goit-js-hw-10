export default {
  title: 'Warning',
  message: 'Please choose a date in the future',
  position: 'topRight',

  withMessage(message) {
    this.message = message;
    return this;
  },

  withTitle(title) {
    this.title = title;
    return this;
  },

  withColor(color) {
    this.color = color;
    return this;
  },
};
