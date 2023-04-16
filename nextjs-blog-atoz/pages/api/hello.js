//  http://localhost:3000/api/hello
// API Routes는 Next.js 앱 내에서 서버리스 API 엔드포인트를 만들 수 있도록 해준다.

/*
API Route의 좋은 사용 사례는 Form 입력을 처리하는 것입니다. 예를 들어 페이지에서 Form을 만들고 API 경로에 POST 요청을 보내도록 할 수 있습니다. 그런 다음 코드를 작성하여 데이터베이스에 직접 저장할 수 있습니다.

API Route 코드는 클라이언트 번들의 일부가 아니므로 안전하게 server-side 코드를 작성할 수 있습니다.
*/

export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}

// export default function handler(req, res) {
//   const email = req.body.email;
//   // Then save email to your database, etc...
// }
