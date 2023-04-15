import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
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
      </section>
    </Layout>
  );
}
