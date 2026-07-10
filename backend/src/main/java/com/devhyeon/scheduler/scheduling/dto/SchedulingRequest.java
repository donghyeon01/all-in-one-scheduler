package com.devhyeon.scheduler.scheduling.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingRequest {
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
}
