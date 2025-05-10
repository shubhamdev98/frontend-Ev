export const minPassword = 8;


export const validations = {
  required: {
    text: (field = "It") => {
      return `${field} is required`;
    },
  },
  email: (field = "It") => {
    return `Please enter a valid ${field}`;
  },
  min: {
    text: (field = "It",min=3) => {
      return `${field} must be at least ${min} characters`;
    },
  },
};
