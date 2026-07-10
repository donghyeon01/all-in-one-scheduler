# Backend - All-In-One Scheduler

Spring Boot 기반 백엔드 서버는 사용자 인증, Todo, 일정, 친구 관계, 일정 조율 기능을 제공합니다.

## 실행

1. 루트에서 백엔드 디렉터리로 이동합니다.

```bash
cd backend
```

2. 로컬 프로필로 애플리케이션을 실행합니다.

```bash
./gradlew bootRun -Dspring.profiles.active=local
```

Windows PowerShell:

```powershell
./gradlew.bat bootRun -Dspring.profiles.active=local
```

## 환경 변수

`backend/src/main/resources/application-local.properties`는 다음 환경 변수 값을 사용합니다.

- `DB_USERNAME` (기본값: `root`)
- `DB_PASSWORD` (기본값: `password`)
- `JWT_SECRET` (기본값: `my-secret-key-my-secret-key-my-secret-key`)

예시:

```env
DB_USERNAME=root
DB_PASSWORD=password
JWT_SECRET=my-secret-key-my-secret-key-my-secret-key
```

## 인증 설계

- 로그인 시 Access Token과 Refresh Token을 발급합니다.
- Access Token은 클라이언트 측에서 메모리로 보관하고, API 요청 시 `Authorization` 헤더로 전송합니다.
- Refresh Token은 `refreshToken`이라는 httpOnly 쿠키로 저장되며, 브라우저에서 직접 접근할 수 없습니다.
- Refresh Token은 데이터베이스에도 저장되어 서버에서 유효성을 검증하고 회전(rotation) 처리합니다.
- `/api/auth/refresh` 호출 시 새로운 Access Token과 Refresh Token을 발급하고 기존 Refresh Token을 교체합니다.
- `/api/auth/logout` 호출 시 Refresh Token을 삭제하고 쿠키를 만료 처리합니다.

## 개선 포인트

- 프로덕션 환경에서는 HTTPS와 `Secure` 쿠키를 반드시 사용해야 합니다.
- Refresh Token rotation, 만료 토큰 정리, 로그아웃 시 세션 무효화 정책을 추가로 강화할 수 있습니다.
- 백엔드 테스트 및 API 문서화를 추가하는 것이 좋습니다.
