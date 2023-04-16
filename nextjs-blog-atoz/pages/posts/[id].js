import Head from "next/head";

import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

/*
다이나믹 라우트를 적용시키는 page 파일에는 총 세가지 요소가 필요하다.

1. 페이지를 렌더링할 컴포넌트

2. id를 위한 가능한 값의 배열을 반환하는 getStaticPaths

3. 포스트가 id를 가질 수 있도록 필요한 데이터를 fetch하는 getStaticProps

*/
export default function Post({ postData }) {
  // getStaticProps(using getStaticData)를 사용해 빌드 시 가장 먼저 fetch해온 postData를 props로 전달받아, postData의 childrens를 사용해 정적 페이지를 렌더링한다.
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
/*
Dynamic Routes를 하기 위해,

getStaticPaths라는 비동기 함수를 만들어 함께 export한다.

이 함수 안에서, id를 위한, 가능한 값의 리스트를 반환한다.
 */

/*
  dev 모드: getStaticPaths는 모든 요청에 동작한다.
  production 모드: getStaticPaths는 빌드타임에 동작한다.
*/
export async function getStaticPaths() {
  /*
  paths = [
	{
		params: {
			id: "fileName1"
		}
	},
	{
		params: {
			id: "fileName2"
		}
	},
	...
  ]
  */
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
    /*
    fallback이 false인 경우,
      getStaticPaths로부터 반환받지 않은 모든 경로는 404 페이지가 된다.

    true인 경우,
      - getStaticPaths에서 반환된 경로는 빌드시 HTML로 렌더링됨
      - 빌드시 생성되지 않은 경로는 404페이지를 생성하지 않음
        대신, 그런 경로에 대한 첫번째 요청에서 페이지의 "fallback(대체)"버전을 제공.

        백그라운드에서 Next.js는 요청된 경로를 정적으로 생성. 동일한 경로에 대한 후속 요청은 빌드 시 미리 렌더링된 다른 페이지와 마찬가지로 생성된 페이지를 제공.

    blocking인 경우,
      새 경로는 getStaticProps로 서버 측에서 렌더링되고 향후 요청을 위해 캐시되므로 경로당 한 번만 발생.
    */
  };
}

/*
getStaticProps 비동기 함수를 써서,

 blog post가 params.id를 쓸 수 있도록, 필요한 데이터를 fetch한다.
*/
export async function getStaticProps({ params }) {
  // getPorstData가 ,remark를 await으로 사용하기 위해, async 비동기 키워드를 사용한다.
  // 이에 따라, getPostData의 호출 시 await 하도록 수정한다.
  const postData = await getPostData(params.id);

  // static generation. 원리로
  // 빌드 시, fetch를 가장 먼저 수행한다. 이것이 그 함수.

  // 해당 파일 내 페이지 컴포넌트의 props로 전달한다.
  return {
    props: {
      postData,
    },
  };
}
