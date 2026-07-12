package com.devhyeon.scheduler.scheduling.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingRequest {

    private String title;

    @NotNull(message = "시작 날짜는 필수입니다.")
    private LocalDate startDate;

    @NotNull(message = "종료 날짜는 필수입니다.")
    private LocalDate endDate;

    // Optional: slot duration in minutes (e.g., 60). If provided, server will generate time slots of this length
    private Integer slotMinutes;
}
