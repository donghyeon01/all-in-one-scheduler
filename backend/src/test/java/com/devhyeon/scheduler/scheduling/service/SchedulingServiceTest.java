package com.devhyeon.scheduler.scheduling.service;

import com.devhyeon.scheduler.event.entity.Event;
import com.devhyeon.scheduler.event.repository.EventRepository;
import com.devhyeon.scheduler.friend.repository.FriendshipRepository;
import com.devhyeon.scheduler.scheduling.dto.SchedulingRequest;
import com.devhyeon.scheduler.scheduling.dto.SchedulingResponse;
import com.devhyeon.scheduler.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class SchedulingServiceTest {

    private FriendshipRepository friendshipRepository;
    private EventRepository eventRepository;
    private SchedulingService schedulingService;

    @BeforeEach
    void setup() {
        friendshipRepository = Mockito.mock(FriendshipRepository.class);
        eventRepository = Mockito.mock(EventRepository.class);

        schedulingService = new SchedulingService(friendshipRepository, eventRepository);
    }

    @Test
    void calculateOptimalSlots_noFriendsNoEvents_returnsCandidates() {
        User user = User.builder().id(1L).email("a@b.com").name("Test").password("pwd").build();

        when(friendshipRepository.findByUser(any())).thenReturn(List.of());
        when(eventRepository.findByUserIn(any())).thenReturn(List.of());

        SchedulingRequest request = new SchedulingRequest("Meeting", LocalDate.now(), LocalDate.now().plusDays(1), 60);

        List<SchedulingResponse> results = schedulingService.calculateOptimalSlots(user, request);

        // Should return up to 3 candidate slots and they should be non-empty
        assertFalse(results.isEmpty());
    }
}
