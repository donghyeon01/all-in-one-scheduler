package com.devhyeon.scheduler.event.service;


import com.devhyeon.scheduler.event.dto.EventCreateRequest;
import com.devhyeon.scheduler.event.dto.EventResponse;
import com.devhyeon.scheduler.event.dto.EventUpdateRequest;
import com.devhyeon.scheduler.event.entity.Event;
import com.devhyeon.scheduler.event.repository.EventRepository;
import com.devhyeon.scheduler.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public void createEvent(
            EventCreateRequest request,
            User user
    ){
        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .location(request.getLocation())
                .allDay(request.isAllDay())
                .user(user)
                .build();

        eventRepository.save(event);
    }

    public List<EventResponse> getEvents(User user){
        return eventRepository.findByUser(user)
                .stream().map(EventResponse::from)
                .toList();
    }

    public void updateEvent(Long eventId, EventUpdateRequest request, User loginUser){
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NoSuchElementException("일정을 찾을 수 없습니다."));

        validateOwner(event, loginUser);

        event.update(
                request.getTitle(),
                request.getDescription(),
                request.getStartTime(),
                request.getEndTime(),
                request.getLocation(),
                request.isAllDay()
        );

        eventRepository.save(event);
    }

    public void deleteEvent(
            Long eventId,
            User loginUser
    ) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NoSuchElementException("일정을 찾을 수 없습니다."));

        validateOwner(event, loginUser);

        eventRepository.delete(event);
    }

    private void validateOwner(
            Event event,
            User loginUser
    ) {

        if (!event.getUser().getId().equals(loginUser.getId())) {
            throw new AccessDeniedException("권한이 없습니다.");
        }
    }
    public List<EventResponse> getEventsByRange(
            User user,
            LocalDateTime start,
            LocalDateTime end
    ) {

        return eventRepository
                .findByUserAndStartTimeBetween(
                        user,
                        start,
                        end
                )
                .stream()
                .map(EventResponse::from)
                .toList();
    }

}
