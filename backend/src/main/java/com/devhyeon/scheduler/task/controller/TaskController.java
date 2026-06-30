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

    @PostMapping
    public void createTask(
            @RequestBody TaskCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        taskService.createTask(
                request,
                userDetails.getUser());
    }

    @GetMapping
    public List<TaskResponse> getTasks(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return taskService.getTasks(
                userDetails.getUser());
    }
}