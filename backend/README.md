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

## DB 마이그레이션 (Refresh Token 해싱 지원)

프로덕션으로 배포하기 전에 Refresh Token 저장 방식을 변경(원문 토큰 대신 SHA-256 해시 저장 및 jti 저장)해야 합니다. 아래는 마이그레이션 SQL 예시(file: `backend/src/main/resources/db/migration/V1__add_refresh_token_hash.sql`). 이 프로젝트는 Flyway를 포함하지 않으므로, 마이그레이션을 직접 DB에 적용하거나 Flyway를 추가하여 자동화하세요.

기본 흐름(예시, MySQL/MariaDB 기준):

1. `refresh_tokens` 테이블에 `token_id`(VARCHAR)와 `token_hash`(CHAR(64) 또는 VARCHAR(64)) 칼럼을 추가합니다.
2. 기존에 `token` 칼럼(플레인 텍스트)이 존재한다면 SHA-256 해시를 계산하여 `token_hash`에 채웁니다: `UPDATE refresh_tokens SET token_hash = SHA2(token, 256) WHERE token IS NOT NULL;`
3. `token_hash`에 대해 유니크 인덱스를 생성합니다: `CREATE UNIQUE INDEX idx_refresh_tokens_token_hash ON refresh_tokens (token_hash);`
4. (선택) 안전하게 검증 후 이전의 `token` 칼럼을 제거할 수 있습니다. 즉시 제거하면 사용자 세션이 강제로 만료될 수 있으므로 주의하세요.

중요 고려사항:
- JWT의 jti(token id)는 SQL만으로 추출하기 어려우므로 기존 레코드의 `token_id`는 NULL로 남을 수 있습니다. 새로운 로그인/회전 시에는 서버가 `token_id`를 채웁니다.
- 프로덕션에서는 마이그레이션 전 반드시 DB 백업을 수행하세요.
- 안전을 위해 마이그레이션 후 기존 리프레시 토큰을 모두 무효화(삭제)하고 사용자가 재로그인하도록 요구하는 방식을 권장합니다.

예시 파일 경로:
`backend/src/main/resources/db/migration/V1__add_refresh_token_hash.sql`

-- 끝
