package com.devhyeon.scheduler.event.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class EventUpdateRequest {
    //    User의 user데이터를 제외하고 데이터 전달받도록
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private boolean allDay;
}
