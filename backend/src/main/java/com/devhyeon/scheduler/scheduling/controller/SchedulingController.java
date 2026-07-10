package com.devhyeon.scheduler.scheduling.controller;

import com.devhyeon.scheduler.scheduling.dto.SchedulingRequest;
import com.devhyeon.scheduler.scheduling.dto.SchedulingResponse;
import com.devhyeon.scheduler.scheduling.service.SchedulingService;
import com.devhyeon.scheduler.security.details.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/scheduling")
@RequiredArgsConstructor
public class SchedulingController {

    private final SchedulingService schedulingService;

    @PostMapping
    public List<SchedulingResponse> getOptimalSlots(
            @RequestBody SchedulingRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return schedulingService.calculateOptimalSlots(userDetails.getUser(), request);
    }
}
