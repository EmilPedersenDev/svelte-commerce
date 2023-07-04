module.exports = {
    content: ['./src/routes/**/*.{svelte,js,ts}'],
    plugins: [require("@tailwindcss/typography"), require('daisyui')],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
};
