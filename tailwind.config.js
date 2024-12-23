module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./src/components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        validate: "#84ebb4",
        "validate-hover": "#1fc16b",
        "card-6":"#E8DFD9",
        "card-5":"#F0F4E4",
        "card-4":"#E7EBF7",
        "card-3": "#979db2",
        "card-2": "#b1bc94",
        "card-1": "#a99182",
        "card-0":"#e2e2e2",
        "background-color": "#ffffff",
        "info-color": "#d9d9d9",
        "discard-active": "#f05a66",
        "discard-hover": "#d11322",
        "login-form-color": "#e2e2e2",
        "transparency-cards": "#d9d9d9",
        "text-color":"#282936"
      },
      fontSize: {
        base: "0.75rem", // 12px
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        "0": "0rem",
        "1": "0.25rem", // 4px
        "2": "0.6666666666666666rem", // ~10.7px
        "3": "1rem", // 16px
        "4": "1.6666666666666667rem", // ~26.7px
        "5": "2rem", // 32px
        "6": "2.3333333333333335rem", // ~37.3px
        "7": "2.4166666666666665rem", // ~38.7px
      },
    },
  },
  plugins: [],
};
