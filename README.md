# All-In-One Scheduler

## Project Overview

All-In-One Scheduler는ToDo와캘린더,메모 등의 기능을 통합한 일정관리 애플리케이션입니다. Spring Boot와 React를 사용하여 개발 중이며,OCI/도커 기반으로 배포되었습니다.

## Current Development Status

### Completed Features

- [x] Basic Todo CRUD operations
- [x] Calendar view integration
- [x] Note taking functionality
- [x] User authentication system (JWT)
- [x] Local development environment setup
- [x] Docker-based deployment configuration

### In Progress/Planned Features

- [ ] End-to-end testing implementation
- [ ] CI/CD pipeline integration
- [ ] Mobile responsiveness optimization
- [ ] Additional user roles and permissions
- [ ] File upload functionality
- [ ] Real-time collaboration features

## Setup Guide

### Backend Requirements

- Java 17+
- MySQL 8.0+
- Gradle

### Frontend Requirements

- Node.js 16+
- npm 7+

## Running the Application

### Backend

```bash
cd backend
./gradlew bootRun -Dspring.profiles.active=local
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

```env
DB_USERNAME=root
DB_PASSWORD=password
JWT_SECRET=my-secret-key-my-secret-key-my-secret-key
VITE_API_URL=http://localhost:8080
MYSQL_ROOT_PASSWORD=secret
```

## Deployment Information

### Docker Setup

```bash
docker-compose up --build
```

### OCI Deployment

```bash
bash scripts/deploy-oci.sh .env.production
```

## Issue Tracking

- [ ] E2E 테스트 구현
- [ ] CI/CD 파이프라인 통합
- [ ] 모바일 반응형 최적화

## Contribution Guidelines

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Contact Information

For any questions or feedback, please contact:

- Email: your.email@example.com
- Slack: #scheduler-dev
