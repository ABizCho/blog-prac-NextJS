import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Alert from "../components/alert";

import { getSortedPostsData } from "../lib/posts";

/*
  다시한번 말하지만, 

  1 Static Generation(SSG) : 빌드타임 딱 한번 렌더링
  2 Server side rendering(SSR) : 매 사용자 요청 시 렌더링

  이라는 차이가 있다.

  1. SSG를 위해선 아래의 GetStaticProps()라는 비동기 함수를 사용한다.

  2. SSR을 위해선 getStaticProps 대신, getServerSideProps()라는 비동기 함수를 쓴다.
  이는 context를 인자로 받는다.  

    -> 근데 이거 사용자 요청 시 fetch 꼭 필요한 경우아니면 진짜쓰지말자! 너무느림

  ---

  +. 다른 옵션으로, CSR이 있다. Data를 pre-render할 필요가 없다면! CSR 전략써보자.
  Private, user-specific pages where SEO is not relevant <- 이때 써용

  
      1. 외부 데이터가 필요하지 않은 페이지 부분은 정적으로 생성(사전 렌더링)합니다.
      2. 페이지가 로드되면 JavaScript를 사용하여 클라이언트에서 외부 데이터를 가져와 나머지 부분을 채웁니다.
      
      => 예를 들어, 사용자 대시보드 페이지 같은 경우에는 이 접근 방식이 잘 작동합니다. 대시보드는 개인적이고 사용자별 페이지이므로 검색 엔진 최적화(SEO)가 관련 없으며, 페이지를 사전 렌더링할 필요가 없습니다. 대시보드의 데이터는 자주 업데이트되므로 요청 시간에 데이터를 가져와야 합니다.

      SWR이라는 리액트 훅 NEXT.JS가 만들었어요.
      이거 데이터 fetching 위해 씁니다.
      client-side에서 fetching data할 때, 반드시 쓰길 강추해요! (from next.js team).

      자세히 알아봐용: https://nextjs.org/learn/basics/data-fetching/request-time
*/

// 주의!: getStaticProps는 오직 페이지, 즉 페이지 컴포넌트 있는 파일에서만 export 가능함. 넌 페이지 파일에선 불가능!, 이 제한은 그 페이지가 렌더링되기 전에, 리액트가 모든 필요한 데이터를 가져야 하기 때문임~

// getStaticProps() : static generation with Data를 위해, Next.js에게 data dependency를 알림 => need to resolve(to fetch external data) bef pre-rendering
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  // lib/posts.js에 정의한 파일시스템 이용 데이터 임포트,가공

  return {
    props: {
      allPostsData,
    },
    // 여기 getStaticProps 내부의 props 안에서 allPostsData를 반환함으로써,
    // allPostsData(= 블로그포스트파일 배열)이  Home 컴포넌트에 prop으로 전달함.
  };
}

/* 
// SSR을 사용할 때 사용하는 비동기 함수.
// 요청 시 호출되기 때문에, 요청에 구체된 인자가 CONTEXT로서 전달된다.

// TTFB(Time to first byte)는 매 요청마다 결과를 컴퓨팅해야하므로 getStaticProps보다 느려용.
// extra config 없이는, CDN이 결과 캐싱도 안해줘서, 매우 느립니다! 
// 그래서 매 요청마다, 그 컴포넌트가 필요한 데이터를 fetching 해줘야 할 경우가 아니라면 절대쓰지마요 이거
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
*/

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Layout의 prop으로 설정된 home은 :boolean으로, attr로 명시할 경우 True로 전달한다. */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello! It's me horiz'D</p>
        <p>
          안녕하세요! 풀스택 개발자 horizD의 첫 NEXT.JS 프로젝트입니다. 저에
          대해 궁금하시면 <a href="https://github.com/ABizCho">horizD 깃허브</a>{" "}
          방문해주세요!
        </p>
        <Alert type="success">clsx를 사용해 success 스타일링</Alert>
        <Alert type="error">clsx를 사용해 error 스타일링</Alert>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
