package com.devhyeon.scheduler.friend.entity;

import com.devhyeon.scheduler.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "friendships",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "friend_id"})
        }
)
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 요청을 보낸 사람 (또는 관계의 주체)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friend_id", nullable = false)
    private User friend; // 요청을 받은 사람

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FriendshipStatus status;

    // 상태 변경 메서드
    public void accept() {
        this.status = FriendshipStatus.ACCEPTED;
    }
}