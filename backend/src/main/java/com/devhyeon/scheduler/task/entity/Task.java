package com.devhyeon.scheduler.task.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

import com.devhyeon.scheduler.user.entity.User;

@Entity
@Getter
@Builder
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean completed;
    private LocalDate dueDate;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public void update(
            String title,
            LocalDate dueDate,
            boolean completed) {
        this.title = title;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}
