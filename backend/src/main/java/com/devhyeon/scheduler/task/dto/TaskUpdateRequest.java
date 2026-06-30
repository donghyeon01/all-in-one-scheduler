package com.devhyeon.scheduler.task.dto;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class TaskUpdateRequest {
    private String title;

    private LocalDate dueDate;

    private boolean completed;
}
