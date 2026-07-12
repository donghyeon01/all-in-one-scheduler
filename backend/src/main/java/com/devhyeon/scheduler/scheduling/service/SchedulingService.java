package com.devhyeon.scheduler.scheduling.service;

import com.devhyeon.scheduler.event.entity.Event;
import com.devhyeon.scheduler.event.repository.EventRepository;
import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.friend.repository.FriendshipRepository;
import com.devhyeon.scheduler.scheduling.dto.SchedulingRequest;
import com.devhyeon.scheduler.scheduling.dto.SchedulingResponse;
import com.devhyeon.scheduler.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SchedulingService {

    private final FriendshipRepository friendshipRepository;
    private final EventRepository eventRepository;

    public List<SchedulingResponse> calculateOptimalSlots(User user, SchedulingRequest request) {
        // 1. 참여자 목록 구성 (본인 + 모든 친구)
        List<User> participants = new ArrayList<>();
        participants.add(user);

        List<Friendship> friendships = friendshipRepository.findByUser(user);
        for (Friendship friendship : friendships) {
            participants.add(friendship.getFriend());
        }

        int totalCount = participants.size();

        // 2. 참여자들의 모든 이벤트 조회
        List<Event> allEvents = eventRepository.findByUserIn(participants);

        // 사용자별 이벤트로 그룹화 (성능 최적화)
        Map<Long, List<Event>> eventsByUser = new HashMap<>();
        for (Event e : allEvents) {
            if (e.getUser() != null && e.getUser().getId() != null) {
                eventsByUser.computeIfAbsent(e.getUser().getId(), k -> new ArrayList<>()).add(e);
            }
        }

        // 3. 시간대 블록 설정 후보
        List<TimeBlockConfig> blockConfigs;

        if (request.getSlotMinutes() != null && request.getSlotMinutes() > 0) {
            // Generate sliding time slots between 09:00 and 22:00 with given slot duration
            int slot = request.getSlotMinutes();
            List<TimeBlockConfig> generated = new ArrayList<>();
            LocalTime windowStart = LocalTime.of(9, 0);
            LocalTime windowEnd = LocalTime.of(22, 0);
            LocalTime cursor = windowStart;
            while (!cursor.plusMinutes(slot).isAfter(windowEnd)) {
                LocalTime s = cursor;
                LocalTime e = cursor.plusMinutes(slot);
                String display = s.toString() + " ~ " + e.toString();
                generated.add(new TimeBlockConfig(s, e, display));
                cursor = cursor.plusMinutes(slot);
            }
            blockConfigs = List.copyOf(generated);
        } else {
            // 기본 고정 블록
            blockConfigs = List.of(
                    new TimeBlockConfig(LocalTime.of(10, 0), LocalTime.of(12, 0), "오전 10:00 ~ 오후 12:00"),
                    new TimeBlockConfig(LocalTime.of(14, 0), LocalTime.of(16, 0), "오후 02:00 ~ 오후 04:00"),
                    new TimeBlockConfig(LocalTime.of(18, 0), LocalTime.of(20, 0), "오후 06:00 ~ 오후 08:00"),
                    new TimeBlockConfig(LocalTime.of(20, 0), LocalTime.of(22, 0), "오후 08:00 ~ 오후 10:00")
            );
        }

        List<SchedulingResponse> candidates = new ArrayList<>();

        // 4. 기간 내 날짜 루프
        LocalDate current = request.getStartDate();
        LocalDate end = request.getEndDate();

        while (!current.isAfter(end)) {
            for (TimeBlockConfig config : blockConfigs) {
                LocalDateTime slotStart = LocalDateTime.of(current, config.startTime);
                LocalDateTime slotEnd = LocalDateTime.of(current, config.endTime);

                // 이 시간대에 참여 가능한 사람 수 계산
                int availableCount = 0;

                // 사용자별 이벤트 목록으로 그룹화하여 충돌 검사 비용을 줄임
                for (User p : participants) {
                    boolean hasConflict = false;

                    List<Event> userEvents = eventsByUser.getOrDefault(p.getId(), Collections.emptyList());

                    // 이 참여자의 스케줄 중 겹치는 일정이 있는지 검사
                    for (Event e : userEvents) {
                        if (e.getStartTime().isBefore(slotEnd) && e.getEndTime().isAfter(slotStart)) {
                            hasConflict = true;
                            break;
                        }
                    }

                    if (!hasConflict) {
                        availableCount++;
                    }
                }

                int percent = totalCount > 0 ? (availableCount * 100) / totalCount : 0;

                candidates.add(SchedulingResponse.builder()
                        .id(UUID.randomUUID().toString())
                        .percent(percent)
                        .date(current.toString())
                        .time(config.displayName)
                        .availableCount(availableCount)
                        .totalCount(totalCount)
                        .startTime(slotStart)
                        .endTime(slotEnd)
                        .build());
            }
            current = current.plusDays(1);
        }

        // 5. 추천도(percent) 내림차순, 동일할 시 날짜/시간 오름차순 정렬
        candidates.sort(new Comparator<SchedulingResponse>() {
            @Override
            public int compare(SchedulingResponse o1, SchedulingResponse o2) {
                int p1 = o1.getPercent();
                int p2 = o2.getPercent();
                if (p1 != p2) {
                    return Integer.compare(p2, p1); // 추천도 내림차순
                }
                // 날짜 오름차순
                int dateCompare = o1.getDate().compareTo(o2.getDate());
                if (dateCompare != 0) {
                    return dateCompare;
                }
                // 시간 오름차순
                return o1.getStartTime().compareTo(o2.getStartTime());
            }
        });

        // 6. 상위 최대 3개 후보 선택
        return candidates.subList(0, Math.min(candidates.size(), 3));
    }

    private static class TimeBlockConfig {
        LocalTime startTime;
        LocalTime endTime;
        String displayName;

        TimeBlockConfig(LocalTime startTime, LocalTime endTime, String displayName) {
            this.startTime = startTime;
            this.endTime = endTime;
            this.displayName = displayName;
        }
    }
}
