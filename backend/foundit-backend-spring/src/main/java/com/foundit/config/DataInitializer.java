package com.foundit.config;

import com.foundit.model.Location;
import com.foundit.model.User;
import com.foundit.repository.LocationRepository;
import com.foundit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize locations if empty
        if (locationRepository.count() == 0) {
            initializeLocations();
        }

        // Initialize admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            initializeAdminUser();
        }
    }

    private void initializeLocations() {
        System.out.println("Initializing campus locations...");

        // Library
        Location library = new Location();
        library.setName("Central Library");
        library.setDescription("Main campus library");
        library.setType(Location.LocationType.LIBRARY);
        library.setBuilding("Academic Block A");
        library.setFloor("2nd Floor");
        library.setActive(true);
        locationRepository.save(library);

        // Canteen
        Location canteen = new Location();
        canteen.setName("Main Canteen");
        canteen.setDescription("Student dining area");
        canteen.setType(Location.LocationType.CANTEEN);
        canteen.setBuilding("Student Center");
        canteen.setFloor("Ground Floor");
        canteen.setActive(true);
        locationRepository.save(canteen);

        // Classroom
        Location classroom = new Location();
        classroom.setName("Classroom Block C");
        classroom.setDescription("Lecture halls and classrooms");
        classroom.setType(Location.LocationType.CLASSROOM);
        classroom.setBuilding("Academic Block C");
        classroom.setFloor("Multiple Floors");
        classroom.setActive(true);
        locationRepository.save(classroom);

        // Parking
        Location parking = new Location();
        parking.setName("Student Parking Lot");
        parking.setDescription("Main student parking area");
        parking.setType(Location.LocationType.PARKING);
        parking.setBuilding("Parking Zone 1");
        parking.setFloor("Ground");
        parking.setActive(true);
        locationRepository.save(parking);

        // Lab
        Location lab = new Location();
        lab.setName("Computer Science Lab");
        lab.setDescription("CS department laboratory");
        lab.setType(Location.LocationType.LAB);
        lab.setBuilding("Engineering Block");
        lab.setFloor("3rd Floor");
        lab.setActive(true);
        locationRepository.save(lab);

        // Sports Complex
        Location sports = new Location();
        sports.setName("Sports Complex");
        sports.setDescription("Indoor and outdoor sports facilities");
        sports.setType(Location.LocationType.SPORTS_COMPLEX);
        sports.setBuilding("Sports Center");
        sports.setFloor("Multiple Levels");
        sports.setActive(true);
        locationRepository.save(sports);

        // Hostel
        Location hostel = new Location();
        hostel.setName("Boys Hostel Block A");
        hostel.setDescription("Student accommodation");
        hostel.setType(Location.LocationType.HOSTEL);
        hostel.setBuilding("Hostel Block A");
        hostel.setFloor("Multiple Floors");
        hostel.setActive(true);
        locationRepository.save(hostel);

        // Security Desk
        Location securityDesk = new Location();
        securityDesk.setName("Security Desk - Main Gate");
        securityDesk.setDescription("Main campus security office");
        securityDesk.setType(Location.LocationType.OFFICE);
        securityDesk.setBuilding("Main Building");
        securityDesk.setFloor("Ground Floor");
        securityDesk.setActive(true);
        locationRepository.save(securityDesk);

        System.out.println("✓ Campus locations initialized successfully!");
    }

    private void initializeAdminUser() {
        System.out.println("Creating default admin user...");

        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@foundit.ai");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFullName("System Administrator");
        admin.setStudentId("ADMIN001");
        admin.setPhoneNumber("9999999999");
        admin.setRole(User.UserRole.ADMIN);
        admin.setEnabled(true);

        userRepository.save(admin);

        System.out.println("✓ Admin user created!");
        System.out.println("  Username: admin");
        System.out.println("  Password: admin123");
        System.out.println("  Please change the password after first login!");
    }
}
