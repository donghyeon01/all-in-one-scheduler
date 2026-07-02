package com.devhyeon.scheduler.event.controller;

import com.devhyeon.scheduler.event.dto.EventCreateRequest;
import com.devhyeon.scheduler.event.dto.EventResponse;
import com.devhyeon.scheduler.event.dto.EventUpdateRequest;
import com.devhyeon.scheduler.event.service.EventService;
import com.devhyeon.scheduler.security.details.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public void createEvent(@RequestBody EventCreateRequest request, @AuthenticationPrincipal CustomUserDetails userDetails){
        eventService.createEvent(
                request,
                userDetails.getUser()
        );
    }

    @GetMapping
    public List<EventResponse> getEvents(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        return eventService.getEvents(
                userDetails.getUser()
        );
    }

    @GetMapping("/range")
    public List<EventResponse> getEventsByRange(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        return eventService.getEventsByRange(
                userDetails.getUser(),
                start,
                end
        );
    }

    @PutMapping("/{eventId}")
    public void updateEvent(
            @PathVariable Long eventId,
            @RequestBody EventUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        eventService.updateEvent(
                eventId,
                request,
                userDetails.getUser()
        );
    }

    @DeleteMapping("/{eventId}")
    public void deleteEvent(
            @PathVariable Long eventId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        eventService.deleteEvent(
                eventId,
                userDetails.getUser()
        );
    }
}
