package com.devhyeon.scheduler.event.entity;


import com.devhyeon.scheduler.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private LocalDateTime startTime;
    @Column(nullable = false)
    private LocalDateTime endTime;

    private String location;
    @Column(nullable = false)
    private  boolean allDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // user테이블에 있는 id 참조
    private User user;

    public void update(
            String title,
            String description,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String location,
            boolean allDay
    ){
        this.title=title;
        this.description=description;
        this.startTime=startTime;
        this.endTime=endTime;
        this.location=location;
        this.allDay=allDay;
    }
}
