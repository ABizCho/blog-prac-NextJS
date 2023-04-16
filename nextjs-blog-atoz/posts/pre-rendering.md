---
title: 'pre-rendering'
date: '2023-04-15'
---


내용에 앞서, 이 페이지는 `Static Generation with data`를 보여주기 위한 예시 포스트야.<br>
이 페이지(.md 파일)는 Next.js 프로젝트 폴더 내에 존재하지. 즉 fetch를 해야하는 extenal data가 아니라, Inner Project, 파일 시스템에서 데이터를 가져오는 예시인거지.
<br>

이 파일이 어떻게 불러와지는지는, `/lib/posts.js` 파일을 참고해봐!! 거기에 주석으로 이어서 설명해놨어.
<br><br>


posts에 해당하는 .md 파일들의 최상단에,<br>

```md
title: 'xxx'
date: 'xxxx-xx-xx'
```
처럼 메타 데이터가 작성돼있지? 이걸 `YAML Front Matter`라고 불러. 이건 `gray-matter`라는 라이브러리를 사용해서 파싱될 수 있어.

파싱 대상은 `title`, `date`, and `file name`에 해당하는 마크다운 문서의 메타데이터야.<br>
특히, file name의 경우, 그 포스트의 URL로 사용하기 위한 `id`로 사용될거야!

<br>

---

Next.js는 두 가지 형태의 사전 렌더링을 제공합니다: **Static Generation**과 **Server-side Rendering**입니다. 그 차이점은 페이지의 HTML을 생성하는 시기에 있습니다.

- **Static Generation** 은 HTML을 빌드 시간에 생성하는 사전 렌더링 방법입니다. 미리 렌더링된 HTML은 각 요청에서 _재사용_됩니다.
- **Server-side Rendering** 은 각 요청에서 HTML을 생성하는 사전 렌더링 방법입니다.

중요한 것은, Next.js는 각 페이지에 사용할 사전 렌더링 형태를 선택할 수 있게 해준다는 것입니다. 대부분의 페이지에는 Static Generation을 사용하고, 다른 페이지에는 Server-side Rendering을 사용하여 "하이브리드" Next.js 앱을 만들 수 있습니다.