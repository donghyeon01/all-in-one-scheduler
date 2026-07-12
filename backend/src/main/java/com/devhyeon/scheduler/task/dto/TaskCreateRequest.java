package com.devhyeon.scheduler.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class TaskCreateRequest {

    @NotBlank(message = "할 일 제목은 필수입니다.")
    private String title;

    @NotNull(message = "마감일은 필수입니다.")
    private LocalDate dueDate;
}
