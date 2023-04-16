import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
const postsDirectory = path.join(process.cwd(), "pages/posts");

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
