package com.devhyeon.scheduler.event.controller;

import com.devhyeon.scheduler.event.dto.EventCreateRequest;
import com.devhyeon.scheduler.event.dto.EventResponse;
import com.devhyeon.scheduler.event.dto.EventUpdateRequest;
import com.devhyeon.scheduler.event.service.EventService;
import com.devhyeon.scheduler.security.details.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @Valid @RequestBody EventCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        
        EventResponse response = eventService.createEvent(
                request,
                userDetails.getUser()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getEvents(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(eventService.getEvents(
                userDetails.getUser()
        ));
    }

    @GetMapping("/range")
    public ResponseEntity<List<EventResponse>> getEventsByRange(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(eventService.getEventsByRange(
                userDetails.getUser(),
                start,
                end
        ));
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long eventId,
            @Valid @RequestBody EventUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        EventResponse response = eventService.updateEvent(
                eventId,
                request,
                userDetails.getUser()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable Long eventId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        eventService.deleteEvent(
                eventId,
                userDetails.getUser()
        );
        return ResponseEntity.noContent().build();
    }
}

