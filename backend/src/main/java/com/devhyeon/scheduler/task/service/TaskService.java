package com.devhyeon.scheduler.task.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devhyeon.scheduler.task.dto.TaskCreateRequest;
import com.devhyeon.scheduler.task.dto.TaskResponse;
import com.devhyeon.scheduler.task.entity.Task;
import com.devhyeon.scheduler.task.repository.TaskRepository;
import com.devhyeon.scheduler.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public void createTask(
            TaskCreateRequest request,
            User user) {

        Task task = Task.builder()
                .title(request.getTitle())
                .dueDate(request.getDueDate())
                .completed(false)
                .user(user)
                .build();

        taskRepository.save(task);
    }

    public List<TaskResponse> getTasks(User user) {

        return taskRepository.findByUser(user)
                .stream()
                .map(TaskResponse::from)
                .toList();
    }
}
