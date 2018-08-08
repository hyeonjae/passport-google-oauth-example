# passport-google-oauth-example

## passport를 이용한 google oauth 2.0 로그인 예제

1. [이곳](https://console.developers.google.com)에서 
  - google+와 youtube api 라이브러리를 추가한다.
  - 사용자 인증 정보를 생성하고 '승인된 리디렉션 URI'에 'http://localhost:3000/auth/google/callback'을 추가한다.
2. 로그인이 필요한 서비스에서 로그인 페이지로 리다이렉트 된다.
3. 로그인 이후에는 가장 최근의 페이지로 리다이렉트 된다.

## 실행방법

```bash
$ npm install
$ PORT=3000 npm run start
```