package com.devhyeon.scheduler.task.controller;

import com.devhyeon.scheduler.security.details.CustomUserDetails;
import com.devhyeon.scheduler.task.dto.*;
import com.devhyeon.scheduler.task.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // 할 일 생성 - 201 Created
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        TaskResponse response = taskService.createTask(request, userDetails.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 할일 가져오기 - 200 OK
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(taskService.getTasks(userDetails.getUser()));
    }

    // 할 일 수정 - 200 OK + 수정된 결과 반환
    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @Valid @RequestBody TaskUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        TaskResponse response = taskService.updateTask(taskId, request, userDetails.getUser());
        return ResponseEntity.ok(response);
    }

    // 할 일 삭제 - 204 No Content
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        taskService.deleteTask(taskId, userDetails.getUser());
        return ResponseEntity.noContent().build();
    }
}
