package com.foundit.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

@Service
public class QRCodeService {

    // ✅ FIXED (added default value)
    @Value("${qr.code.size:250}")
    private int qrCodeSize;

    @Value("${server.servlet.context-path:}")
    private String contextPath;

    public byte[] generateQRCode(Long locationId, String locationName) throws WriterException, IOException {
        String url = String.format("http://localhost:3000/report-found?location=%d", locationId);

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(url, BarcodeFormat.QR_CODE, qrCodeSize, qrCodeSize);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        return outputStream.toByteArray();
    }

    public String generateQRCodeBase64(Long locationId, String locationName) throws WriterException, IOException {
        byte[] qrCode = generateQRCode(locationId, locationName);
        return Base64.getEncoder().encodeToString(qrCode);
    }

    public byte[] generateCustomQRCode(String data) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, qrCodeSize, qrCodeSize);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        return outputStream.toByteArray();
    }
}
