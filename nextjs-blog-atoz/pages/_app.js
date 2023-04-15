import "../styles/global.css";

/*
_app.js의 default export는 탑 레벨 리액트 컴포넌트( 앱 내 모든 페이지를 감싸는 )이다.
이 컴포넌트를 이용해, 다수의 페이지 사이에서 state를 유지하거나 or global styles를 적용할 수 있다.

pages/_app.js에서 global.css를 import함으로써, global CSS를 적용할 수 있다.

global CSS 는 페이지 상 모든 요소에 영향을 미치므로, global CSS는 pages/_app.js 바깥에서 import될 수 없다.

이런 이유로, 홈에서 여타 페이지로 네비게이트 시, 의도치않게 global style이 적용될 수 있다는 점을 주의

결과적으로, _app.js에 import된 어떤 스타일도 globally 적용된다.
*/

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
