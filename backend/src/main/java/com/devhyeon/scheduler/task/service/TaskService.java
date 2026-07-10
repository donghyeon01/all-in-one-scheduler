package com.devhyeon.scheduler.task.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.devhyeon.scheduler.task.dto.TaskCreateRequest;
import com.devhyeon.scheduler.task.dto.TaskResponse;
import com.devhyeon.scheduler.task.dto.TaskUpdateRequest;
import com.devhyeon.scheduler.task.entity.Task;
import com.devhyeon.scheduler.task.repository.TaskRepository;
import com.devhyeon.scheduler.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    // CRUD - C
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

    // CRUD - R
    public List<TaskResponse> getTasks(User user) {

        return taskRepository.findByUser(user)
                .stream()
                .map(TaskResponse::from)
                .toList();
    }

    // CRUD - U
    public void updateTask(
            Long taskId,
            TaskUpdateRequest request,
            User loginUser) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new NoSuchElementException("할 일을 찾을 수 없습니다."));

        validateOwner(task, loginUser);

        task.update(request.getTitle(), request.getDueDate(), request.isCompleted());

        taskRepository.save(task);
    }

    public void deleteTask(Long taskId, User loginUser) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new NoSuchElementException("할 일을 찾을 수 없습니다."));

        validateOwner(task, loginUser);
        taskRepository.delete(task);
    }

    private void validateOwner(
            Task task,
            User loginUser) {
        if (!task.getUser().getId().equals(loginUser.getId())) {
            throw new AccessDeniedException("권한이 없습니다.");
        }
    }
}
