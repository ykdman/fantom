# fantom 프로젝트

- 프로그래머스 풀스택 3기 과정 서브 프로젝트

## 컨셉

- 팬카페 컨셉의 아티스트 이다.
- 회원은 여러 아티스트의 팬이 될수 있다.

  - 회원은 자신이 팔로우 한 아티스트별 팬 공간을 만들 수 있다.

## 기능

### 회원

- 로그인
- 회원 정보 조회
- 회원 가입
- 회원 탈퇴

### 팬 되기

- 회원이 팬을 맺은 아티스트를 위한 팬 개인의 기록소 만들기
- 기록소 수정
- 기록소 삭제

---

## API 설계

### 회원

- 로그인 `POST` | ‘/login’

  - req : body (id, pw)
  - res : ‘로그인 성공’
  - redirect : main page

- 회원 가입 `POST` | ‘/signup’
  - req : body (id, pwd, name)
  - res : 회원가입을 환영합니다.
  - redirect : ?
- 회원 정보 조회 `GET` | ‘/users/:id’

  - req : params (id)
  - res : json (id, pwd?, name)
  - redirect :

- 회원 탈퇴 `DELETE` | ‘/users/:id’
  - req : params (id)
  - res : message 탈퇴가 완료되었습니다.
