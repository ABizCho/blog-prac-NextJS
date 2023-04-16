---
title: 'Static Generation과 Server-side Rendering 선택 기준'
date: '2023-04-16'
---

가능하면 데이터 유무 상관없이 **Static Generation**을 사용하는 걸 Next.js는 권장한다.<br>
한 번 빌드한 페이지는 CDN에서 제공돼서, 매번 서버에서 페이지를 렌더링하는 것보다 훨씬 빠르지.

아래와 같은 페이지를 만들 때, **Static Generation**을 사용할 수 있지 :

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

선택에 앞서 간단한 자문자답만 해보면 돼. "사용자의 요청에 앞서, 이 페이지를 미리 렌더링할 수 있을까?" 가능하면 Static Generation을 선택해.

하지만 사용자가 요청하기 전에 페이지를 미리 렌더링할 수 없으면, Static Generation은 좋은 선택이 아냐. 자주 업데이트되는 데이터를 보여줄 경우 각 요청마다 페이지 내용이 바뀌니까.

그런 경우에는 **Server-side Rendering**을 사용할 수 있어. 더 느리긴 하지만, 미리 렌더링된 페이지는 항상 최신 상태를 유지할 수 있어. 또는 사전 렌더링을 건너뛰고 클라이언트 측 JavaScript를 사용해서 데이터를 채울 수도 있어.