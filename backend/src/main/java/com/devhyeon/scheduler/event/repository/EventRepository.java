package com.devhyeon.scheduler.event.repository;

import com.devhyeon.scheduler.event.entity.Event;
import com.devhyeon.scheduler.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUser(User user);

    List<Event> findByUserAndStartTimeBetween(
            User user,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Event> findByUserIn(List<User> users);
}
