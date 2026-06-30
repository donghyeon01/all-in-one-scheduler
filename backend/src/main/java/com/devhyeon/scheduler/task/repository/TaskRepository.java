package com.devhyeon.scheduler.task.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.devhyeon.scheduler.user.entity.User;
import com.devhyeon.scheduler.task.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
