FROM eclipse-temurin:21-jdk

WORKDIR /app

# 빌드 설정 파일을 먼저 복사하여 의존성 해결 단계를 캐싱 (소스 변경 시에도 재사용)
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle ./
COPY settings.gradle ./
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon || true

COPY src ./src

RUN ./gradlew clean bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=0 /app/build/libs/*.jar /app/app.jar

EXPOSE 8080

# 컨테이너 환경에 최적화된 JVM 옵션 (메모리 비율 기반 힙 할당 + G1GC)
ENTRYPOINT ["java", \
            "-XX:+UseContainerSupport", \
            "-XX:MaxRAMPercentage=75.0", \
            "-XX:InitialRAMPercentage=50.0", \
            "-XX:+UseG1GC", \
            "-XX:MaxGCPauseMillis=200", \
            "-XX:+HeapDumpOnOutOfMemoryError", \
            "-XX:HeapDumpPath=/app/heapdump.hprof", \
            "-jar", "/app/app.jar"]
