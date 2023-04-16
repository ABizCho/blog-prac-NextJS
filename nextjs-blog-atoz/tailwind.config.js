// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 성능 최적화 & false positive를 피하기 위해, content 명시를 가능한한 특정해서 하자.
  ],
};
