package com.devhyeon.scheduler.scheduling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchedulingResponse {
    private String id;
    private String percent; // 예: "100"
    private String date; // YYYY-MM-DD
    private String time; // 예: "오후 02:00 ~ 오후 04:00"
    private int availableCount;
    private int totalCount;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
