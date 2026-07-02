package com.devhyeon.scheduler.task.controller;

import com.devhyeon.scheduler.security.details.CustomUserDetails;
import com.devhyeon.scheduler.task.dto.*;
import com.devhyeon.scheduler.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // 할 일 생성
    @PostMapping
    public void createTask(
            @RequestBody TaskCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        taskService.createTask(
                request,
                userDetails.getUser());
    }

    // 할일 가져오기
    @GetMapping
    public List<TaskResponse> getTasks(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return taskService.getTasks(
                userDetails.getUser());
    }

    // 할 일 수정
    @PutMapping("/{taskId}")
    public void updateTask(@PathVariable Long taskId, @RequestBody TaskUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        taskService.updateTask(taskId, request, userDetails.getUser());
    }

    // 할 일 삭제
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        taskService.deleteTask(taskId, userDetails.getUser());
    }
}