package com.foundit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableConfigurationProperties
@EnableAsync
@EnableScheduling
public class FoundItApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoundItApplication.class, args);
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║                                                ║");
        System.out.println("║         FoundIt AI Backend Started!            ║");
        System.out.println("║    Smart Lost & Found System for Campuses      ║");
        System.out.println("║                                                ║");
        System.out.println("║         Server running on port 8080            ║");
        System.out.println("║         API Base: http://localhost:8080/api    ║");
        System.out.println("║                                                ║");
        System.out.println("╚════════════════════════════════════════════════╝");
    }
}
