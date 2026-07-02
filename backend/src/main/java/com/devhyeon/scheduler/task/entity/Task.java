package com.devhyeon.scheduler.task.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import com.devhyeon.scheduler.user.entity.User;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean completed;
    private LocalDate dueDate;
    @ManyToOne(fetch = FetchType.LAZY) // tasks 하나에 여러 user 존재 (foregin key 비슷.) fetch = FetchType.LAZY =>LAZY는 tasks
                                       // 조회할 때 user를 필요할 때만 가져온다는 뜻 반대는 eager
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
