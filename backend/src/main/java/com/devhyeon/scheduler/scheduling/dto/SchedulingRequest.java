package com.devhyeon.scheduler.scheduling.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingRequest {

    private String title;

    @NotNull(message = "시작 날짜는 필수입니다.")
    private LocalDate startDate;

    @NotNull(message = "종료 날짜는 필수입니다.")
    private LocalDate endDate;

    private Integer slotMinutes;

    // 추가: 일정 조율에 참여할 친구들의 고유 ID 목록 (선택사항 또는 필수)
    private List<Long> friendIds;
}