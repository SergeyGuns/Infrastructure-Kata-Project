package ru.cannonball.omni.service;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GreetingServiceImpl implements GreetingService {

    @Override
    public String hello(String userName) {
        var name = Optional.ofNullable(userName).orElse("Dear user");
        return String.format("%s welcome to start page!", name);
    }
}
