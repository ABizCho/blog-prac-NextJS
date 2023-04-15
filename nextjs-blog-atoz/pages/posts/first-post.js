//Head는 Next.js에 설계된 리액트 컴포넌트이다. html head처럼, page의 헤드를 수정토록 해준다. title은 그 하위필수요소이다.
// 렌더링 된 html페이지를 보면, head가 된 것을 볼 수 있다. 이런 메타데이터는 SEO향상에 도움을 준다.
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      /> */}
      <h1>First Post</h1>;
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </Layout>
  );
}
