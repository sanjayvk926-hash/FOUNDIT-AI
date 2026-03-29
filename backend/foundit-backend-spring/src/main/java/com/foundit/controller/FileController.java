package com.foundit.controller;

import com.foundit.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "*")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    /**
     * Upload a single file
     */
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = fileStorageService.storeFile(file);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/files/download/")
                    .path(fileName)
                    .toUriString();

            Map<String, Object> response = new HashMap<>();
            response.put("fileName", fileName);
            response.put("fileDownloadUri", fileDownloadUri);
            response.put("fileType", file.getContentType());
            response.put("size", file.getSize());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Upload multiple files
     */
    @PostMapping("/upload-multiple")
    public ResponseEntity<?> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        Map<String, Object> response = new HashMap<>();
        
        for (MultipartFile file : files) {
            try {
                String fileName = fileStorageService.storeFile(file);
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/api/files/download/")
                        .path(fileName)
                        .toUriString();
                
                Map<String, Object> fileInfo = new HashMap<>();
                fileInfo.put("fileName", fileName);
                fileInfo.put("fileDownloadUri", fileDownloadUri);
                fileInfo.put("fileType", file.getContentType());
                fileInfo.put("size", file.getSize());
                
                response.put(file.getOriginalFilename(), fileInfo);
            } catch (Exception e) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Failed to upload: " + e.getMessage());
                response.put(file.getOriginalFilename(), error);
            }
        }

        return ResponseEntity.ok(response);
    }

    /**
     * Download a file
     */
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, 
                                                 HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            contentType = "application/octet-stream";
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, 
                       "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    /**
     * Delete a file
     */
    @DeleteMapping("/delete/{fileName:.+}")
    public ResponseEntity<?> deleteFile(@PathVariable String fileName) {
        try {
            boolean deleted = fileStorageService.deleteFile(fileName);
            
            Map<String, Object> response = new HashMap<>();
            if (deleted) {
                response.put("message", "File deleted successfully");
                response.put("fileName", fileName);
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "File not found or could not be deleted");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error deleting file: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
