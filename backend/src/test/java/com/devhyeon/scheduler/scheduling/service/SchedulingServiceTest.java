package com.devhyeon.scheduler.scheduling.service;

import com.devhyeon.scheduler.event.entity.Event;
import com.devhyeon.scheduler.event.repository.EventRepository;
import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.friend.entity.FriendshipStatus;
import com.devhyeon.scheduler.friend.repository.FriendshipRepository;
import com.devhyeon.scheduler.scheduling.dto.SchedulingRequest;
import com.devhyeon.scheduler.scheduling.dto.SchedulingResponse;
import com.devhyeon.scheduler.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.eq;
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

        when(friendshipRepository.findByUserAndStatus(eq(user), eq(FriendshipStatus.ACCEPTED)))
                .thenReturn(List.of());
        when(eventRepository.findByUserInAndDateRange(anyList(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(List.of());

        SchedulingRequest request = new SchedulingRequest(
                "Meeting", LocalDate.now(), LocalDate.now().plusDays(1), 60, null);

        List<SchedulingResponse> results = schedulingService.calculateOptimalSlots(user, request);

        // 상위 3개 후보만 반환되는지 검증
        assertThat(results).hasSize(3);
        // 참여자가 본인 1명뿐이고 일정이 없으므로 모든 슬롯이 100% 참여 가능
        assertThat(results).allSatisfy(res -> assertThat(res.getPercent()).isEqualTo(100));
        // 추천도 내림차순 정렬 확인
        assertThat(results.get(0).getPercent())
                .isGreaterThanOrEqualTo(results.get(results.size() - 1).getPercent());
    }

    @Test
    void calculateOptimalSlots_withConflict_lowersPercent() {
        User user = User.builder().id(1L).email("a@b.com").name("Test").password("pwd").build();
        User friend = User.builder().id(2L).email("friend@b.com").name("Friend").password("pwd").build();

        Friendship friendship = Friendship.builder()
                .user(user)
                .friend(friend)
                .status(FriendshipStatus.ACCEPTED)
                .build();

        // friend의 첫째 날 오전 10~12시에 일정이 있어 첫 슬롯이 충돌
        Event conflictEvent = Event.builder()
                .title("회의")
                .startTime(LocalDateTime.of(LocalDate.now(), java.time.LocalTime.of(10, 0)))
                .endTime(LocalDateTime.of(LocalDate.now(), java.time.LocalTime.of(12, 0)))
                .allDay(false)
                .user(friend)
                .build();

        when(friendshipRepository.findByUserAndStatus(eq(user), eq(FriendshipStatus.ACCEPTED)))
                .thenReturn(List.of(friendship));
        when(eventRepository.findByUserInAndDateRange(anyList(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(List.of(conflictEvent));

        SchedulingRequest request = new SchedulingRequest(
                "Meeting", LocalDate.now(), LocalDate.now(), 120, List.of(2L));

        List<SchedulingResponse> results = schedulingService.calculateOptimalSlots(user, request);

        assertThat(results).hasSize(3);
        // 충돌이 없는 슬롯은 100%, 충돌 슬롯은 50%여야 함
        assertThat(results).allSatisfy(res -> assertThat(res.getPercent()).isIn(50, 100));
        // 최소 하나는 100% 후보가 존재해야 함
        assertThat(results).anySatisfy(res -> assertThat(res.getPercent()).isEqualTo(100));
    }
}
