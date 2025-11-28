package ru.cannonball.omni.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.cannonball.omni.service.GreetingService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
public class AppController {

    private final GreetingService greetingService;

    @GetMapping("/")
    public ResponseEntity<String> hello(@RequestParam(value = "name", required = false) String name) {
        var result = greetingService.hello(name);
        return ResponseEntity.ok(result);
    }
}
