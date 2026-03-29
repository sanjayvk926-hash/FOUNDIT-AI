package com.foundit.controller;

import com.foundit.model.Location;
import com.foundit.repository.LocationRepository;
import com.foundit.service.QRCodeService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/qr")
@CrossOrigin(origins = "*")
public class QRCodeController {

    @Autowired
    private QRCodeService qrCodeService;

    @Autowired
    private LocationRepository locationRepository;

    /**
     * Generate QR code for a location
     */
    @GetMapping("/location/{locationId}")
    public ResponseEntity<?> generateLocationQRCode(@PathVariable Long locationId) {
        try {
            Location location = locationRepository.findById(locationId)
                    .orElseThrow(() -> new RuntimeException("Location not found"));

            byte[] qrCode = qrCodeService.generateQRCode(locationId, location.getName());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(qrCode.length);

            return new ResponseEntity<>(qrCode, headers, HttpStatus.OK);
        } catch (WriterException | IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to generate QR code: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    /**
     * Generate QR code as Base64 for a location
     */
    @GetMapping("/location/{locationId}/base64")
    public ResponseEntity<?> generateLocationQRCodeBase64(@PathVariable Long locationId) {
        try {
            Location location = locationRepository.findById(locationId)
                    .orElseThrow(() -> new RuntimeException("Location not found"));

            String qrCodeBase64 = qrCodeService.generateQRCodeBase64(locationId, location.getName());

            Map<String, String> response = new HashMap<>();
            response.put("qrCode", qrCodeBase64);
            response.put("locationName", location.getName());
            response.put("locationId", locationId.toString());

            return ResponseEntity.ok(response);
        } catch (WriterException | IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to generate QR code: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    /**
     * Generate custom QR code
     */
    @PostMapping("/custom")
    public ResponseEntity<?> generateCustomQRCode(@RequestBody Map<String, String> request) {
        try {
            String data = request.get("data");
            if (data == null || data.isEmpty()) {
                throw new RuntimeException("Data is required");
            }

            byte[] qrCode = qrCodeService.generateCustomQRCode(data);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(qrCode.length);

            return new ResponseEntity<>(qrCode, headers, HttpStatus.OK);
        } catch (WriterException | IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to generate QR code: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
