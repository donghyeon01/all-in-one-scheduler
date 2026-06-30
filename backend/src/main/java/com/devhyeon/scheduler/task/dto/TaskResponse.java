package com.devhyeon.scheduler.task.dto;

import java.time.LocalDate;

import com.devhyeon.scheduler.task.entity.Task;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TaskResponse {

    private Long id;

    private String title;

    private boolean completed;

    private LocalDate dueDate;

    public static TaskResponse from(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .completed(task.isCompleted())
                .dueDate(task.getDueDate())
                .build();
    }
}
