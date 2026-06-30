package com.devhyeon.scheduler.task.dto;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class TaskCreateRequest {
    private String title;
    private LocalDate dueDate;

}
