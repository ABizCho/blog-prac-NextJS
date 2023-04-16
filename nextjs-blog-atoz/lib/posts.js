import fs from "fs";
import path from "path";
import matter from "gray-matter";

//마크다운 렌더링 라이브러리s
import { remark } from "remark";
import html from "remark-html";

/*
	< Static Generation with data. >

	1. Fetch from External api
	2. Querying DB, directly
	3. Inner file system.
*/

/*
// 1. An Way to Fetch data from other sources, like 외부 API 엔드포인트.
export async function getSortedPostsData() {
  // Next.js polyfills fetch() on both the client and server. You don't need to import it.
  const res = await fetch("..");
  return res.json();
}
*/

/*
// 2. DB에 Query 직접 쏘기.
// 이 방법은, getStaticProps가 오직 SERVER-SIDE에서 실행되기에 가능한 방법이다.
// 이거 client-side에서는 실행안됨. getStaticProps말고 다른 client-side 함수 등에선 실행 못한다는 뜻.

import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
*/

// 3. Source Data from File System
// process.cwd(): Node.js에서 현재 작업 중인 디렉토리(current working directory)의 경로를 반환함!
// 현재 작업중인 디렉을 기준으로 상대경로를 계산할 수 있다는 뜻~ 절대경로 없이 상대경로로 참조가능해요!
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // /posts 디렉토리 내 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 파일 이름에서 ".md" 제거하여 id로 사용
    const id = fileName.replace(/\.md$/, "");

    // 마크다운 파일을 문자열로 읽기
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter를 사용하여 포스트 메타데이터 파싱
    const matterResult = matter(fileContents);

    // id와 데이터를 결합하여 반환
    return {
      id,
      ...matterResult.data,
    };
  });
  // 날짜에 따라 포스트 정렬 및 반환
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1; // b를 a 앞에 위치시킴 (최신순)
    } else {
      return -1; // a를 b 앞에 위치시킴 (과거순)
    }
  });
}

/*
[id].js로 다이나믹 라우팅을 하기 위해 추가한 함수.

이 함수는, posts디렉 내의 모든 파일의 이름을 `.md`를 삭제하여 리스트로 반환할것임.

중요!
단순히 strings 배열을 반환하지 않고,
objects의 배열이 되어야 함.

각 object는 params key를 가져야 하며,
그 id 키를 가진 객체를 포함해야 한다.
(우린 [id]를 파일이름으로 쓸것이기 때문).

이 조건이 충족되지 않는다면, getStaticProps는 실패할 것.

결론적으로, 우린 getAllPostIds 함수를,

/pages/posts/[id].js 파일에 임포트하여, getStaticPaths 내부에서 사용할 것임.


*/

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // 반환값의 모습은 이러함.
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// 이 함수는 id에 기반해 포스트데이터를 반환한다.
// greay-matter를 사용해 마크다운 파일 내 metaData 섹션을 파싱하여, 반환할 포스트 데이터에 구성해준다.

// getPostData 함수에, async 키워드를 붙였음
// remark를 위해 await을 사용해야 하기 때문임.
// async/await은 "비동기"로, data를 fetch할 수 있도록 해준다.
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // 마크다운을 HTML string으로 변환하기 위해, remark 사용.

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // id와 md 메타데이터, 그리고 contentHtml을 반환 데이터로 컴바인
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
