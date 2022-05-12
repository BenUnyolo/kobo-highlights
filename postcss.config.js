// config from https://nextjs.org/learn/basics/assets-metadata-css/styling-tips
module.exports = {
  plugins: [
    "tailwindcss/nesting",
    "tailwindcss",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
};
