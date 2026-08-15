-- 초기 스키마 생성: 엔티티 정의 기반 테이블 생성
-- V1__add_refresh_token_hash.sql이 이 스키마 위에서 동작한다.
-- refresh_tokens.token 은 평문 저장 컬럼이며 V1에서 SHA-256 해시로 전환된다.

CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email),
    KEY idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    completed BOOLEAN NOT NULL,
    due_date DATE,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    KEY idx_task_user (user_id),
    KEY idx_task_user_completed (user_id, completed),
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS events (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    start_time DATETIME(6) NOT NULL,
    end_time DATETIME(6) NOT NULL,
    location VARCHAR(255),
    all_day BOOLEAN NOT NULL,
    user_id BIGINT,
    PRIMARY KEY (id),
    KEY idx_event_user_start (user_id, start_time),
    KEY idx_event_user_end (user_id, end_time),
    CONSTRAINT fk_events_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS friendships (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    friend_id BIGINT NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_friendships_user_friend (user_id, friend_id),
    KEY idx_friendship_user_status (user_id, status),
    KEY idx_friendship_friend_status (friend_id, status),
    CONSTRAINT fk_friendships_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_friendships_friend FOREIGN KEY (friend_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- refresh_tokens: V1에서 token_id, token_hash 컬럼이 추가된다.
-- token 컬럼은 평문 Refresh Token을 저장하며 V1 마이그레이션 후 삭제 가능하다.
-- last_accessed_at은 엔티티에 정의되어 있으므로 V0에 포함한다.
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGINT NOT NULL AUTO_INCREMENT,
    token VARCHAR(512) NOT NULL,
    expiry_date DATETIME(6) NOT NULL,
    user_agent VARCHAR(512),
    ip_address VARCHAR(128),
    last_accessed_at DATETIME(6) NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    KEY idx_refresh_token_user (user_id),
    KEY idx_refresh_token_expiry (expiry_date),
    CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
