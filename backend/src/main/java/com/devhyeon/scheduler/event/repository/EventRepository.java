package com.devhyeon.scheduler.event.repository;

import com.devhyeon.scheduler.event.entity.Event;
import com.devhyeon.scheduler.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // N+1 방지: User를 페치 조인으로 함께 로드
    @Query("SELECT e FROM Event e JOIN FETCH e.user WHERE e.user = :user")
    List<Event> findByUser(@Param("user") User user);

    @Query("SELECT e FROM Event e JOIN FETCH e.user WHERE e.user = :user AND e.startTime >= :start AND e.startTime <= :end")
    List<Event> findByUserAndStartTimeBetween(
            @Param("user") User user,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    // SchedulingService용: 참여자 전체 이벤트를 날짜 범위로 필터링하여 메모리 로드 최소화
    @Query("SELECT e FROM Event e JOIN FETCH e.user WHERE e.user IN :users AND e.startTime >= :rangeStart AND e.endTime <= :rangeEnd")
    List<Event> findByUserInAndDateRange(
            @Param("users") List<User> users,
            @Param("rangeStart") LocalDateTime rangeStart,
            @Param("rangeEnd") LocalDateTime rangeEnd);

    // 기존 호환성 유지 (필요시에만 사용 권장)
    @Query("SELECT e FROM Event e JOIN FETCH e.user WHERE e.user IN :users")
    List<Event> findByUserIn(@Param("users") List<User> users);
}
