package com.devhyeon.scheduler.scheduling.service;

import com.devhyeon.scheduler.event.entity.Event;
import com.devhyeon.scheduler.event.repository.EventRepository;
import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.friend.entity.FriendshipStatus; // 추가된 패키지 확인
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
        // 1. 참여자 목록 구성 (본인은 항상 포함)
        List<User> participants = new ArrayList<>();
        participants.add(user);

        // 수정 반영: 수락된(ACCEPTED) 상태의 정식 친구 목록만 조회해 옵니다.
        List<Friendship> acceptedFriendships = friendshipRepository.findByUserAndStatus(user, FriendshipStatus.ACCEPTED);

        if (request.getFriendIds() != null && !request.getFriendIds().isEmpty()) {
            // 사용자가 화면에서 특정 친구들을 체크(선택)한 경우 -> 선택된 친구만 필터링하여 참여자에 추가
            for (Friendship f : acceptedFriendships) {
                User friend = f.getFriend();
                if (request.getFriendIds().contains(friend.getId())) {
                    participants.add(friend);
                }
            }
        } else {
            // 만약 화면에서 아무도 선택하지 않았다면, 기본 동작으로 정식 친구 전원을 참여자로 지정
            for (Friendship f : acceptedFriendships) {
                participants.add(f.getFriend());
            }
        }

        int totalCount = participants.size();

        // 2. 참여자들의 모든 스케줄(이벤트) 조회
        List<Event> allEvents = eventRepository.findByUserIn(participants);

        // 사용자별 이벤트로 그룹화 (충돌 검사 성능 최적화)
        Map<Long, List<Event>> eventsByUser = new HashMap<>();
        for (Event e : allEvents) {
            if (e.getUser() != null && e.getUser().getId() != null) {
                eventsByUser.computeIfAbsent(e.getUser().getId(), k -> new ArrayList<>()).add(e);
            }
        }

        // 3. 시간대 블록 설정 후보 계산
        List<TimeBlockConfig> blockConfigs;

        if (request.getSlotMinutes() != null && request.getSlotMinutes() > 0) {
            // slotMinutes 가 제공된 경우 09:00 ~ 22:00 사이를 슬라이딩 윈도우 방식으로 분할
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
            // 기본 고정 시간대 블록
            blockConfigs = List.of(
                    new TimeBlockConfig(LocalTime.of(10, 0), LocalTime.of(12, 0), "오전 10:00 ~ 오후 12:00"),
                    new TimeBlockConfig(LocalTime.of(14, 0), LocalTime.of(16, 0), "오후 02:00 ~ 오후 04:00"),
                    new TimeBlockConfig(LocalTime.of(18, 0), LocalTime.of(20, 0), "오후 06:00 ~ 오후 08:00"),
                    new TimeBlockConfig(LocalTime.of(20, 0), LocalTime.of(22, 0), "오후 08:00 ~ 오후 10:00")
            );
        }

        List<SchedulingResponse> candidates = new ArrayList<>();

        // 4. 기간 내 날짜 스캔 및 빈 시간 계산 루프
        LocalDate current = request.getStartDate();
        LocalDate end = request.getEndDate();

        while (!current.isAfter(end)) {
            for (TimeBlockConfig config : blockConfigs) {
                LocalDateTime slotStart = LocalDateTime.of(current, config.startTime);
                LocalDateTime slotEnd = LocalDateTime.of(current, config.endTime);

                int availableCount = 0;

                // 각 참여자별로 해당 시간대에 이벤트 충돌이 있는지 체크
                for (User p : participants) {
                    boolean hasConflict = false;
                    List<Event> userEvents = eventsByUser.getOrDefault(p.getId(), Collections.emptyList());

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

        // 5. 추천도(percent) 내림차순 정렬, 동일할 시 날짜/시간 오름차순 정렬
        candidates.sort(new Comparator<SchedulingResponse>() {
            @Override
            public int compare(SchedulingResponse o1, SchedulingResponse o2) {
                int p1 = o1.getPercent();
                int p2 = o2.getPercent();
                if (p1 != p2) {
                    return Integer.compare(p2, p1);
                }
                int dateCompare = o1.getDate().compareTo(o2.getDate());
                if (dateCompare != 0) {
                    return dateCompare;
                }
                return o1.getStartTime().compareTo(o2.getStartTime());
            }
        });

        // 6. 상위 최대 3개 매칭 결과 후보 반환
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