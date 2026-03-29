"""
FoundIt AI - Python Image Analysis Service
This service provides YOLO object detection and OpenCV feature extraction
for the FoundIt AI Lost & Found System.

Requirements:
- Python 3.8+
- Flask
- OpenCV
- YOLO (ultralytics)
- NumPy

Install:
pip install flask opencv-python ultralytics numpy pillow requests

Run:
python ai_service.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load YOLO model
# Download yolov8n.pt from https://github.com/ultralytics/ultralytics
model = YOLO('yolov8n.pt')  # You can use yolov8s.pt, yolov8m.pt for better accuracy

# Category mapping from YOLO classes to FoundIt categories
CATEGORY_MAPPING = {
    'cell phone': 'ELECTRONICS',
    'laptop': 'ELECTRONICS',
    'mouse': 'ELECTRONICS',
    'keyboard': 'ELECTRONICS',
    'book': 'BOOKS',
    'backpack': 'BAGS',
    'handbag': 'BAGS',
    'umbrella': 'ACCESSORIES',
    'tie': 'ACCESSORIES',
    'bottle': 'OTHER',
    'cup': 'OTHER',
    'wallet': 'WALLETS',
}

@app.route('/analyze', methods=['POST'])
def analyze_image():
    """
    Analyze image using YOLO for object detection and OpenCV for features
    
    Request:
    {
        "image_url": "http://localhost:8080/api/files/download/image.jpg",
        "item_id": "1"
    }
    
    Response:
    {
        "object_type": "phone",
        "color": "black",
        "category": "ELECTRONICS",
        "brand": "Apple",
        "features": "[0.123, 0.456, ...]"
    }
    """
    try:
        data = request.get_json()
        image_url = data.get('image_url')
        
        if not image_url:
            return jsonify({'error': 'image_url is required'}), 400
        
        # Download image
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))
        img_array = np.array(img)
        
        # Convert RGB to BGR for OpenCV
        img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        
        # YOLO Detection
        results = model(img_array)
        
        # Get detected objects
        detected_objects = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                confidence = float(box.conf[0])
                class_name = model.names[class_id]
                
                if confidence > 0.5:  # Confidence threshold
                    detected_objects.append({
                        'class': class_name,
                        'confidence': confidence
                    })
        
        # Get primary object (highest confidence)
        object_type = "unknown"
        category = "OTHER"
        
        if detected_objects:
            primary_object = max(detected_objects, key=lambda x: x['confidence'])
            object_type = primary_object['class']
            category = CATEGORY_MAPPING.get(object_type, 'OTHER')
        
        # Color Detection
        dominant_color = get_dominant_color(img_bgr)
        color_name = get_color_name(dominant_color)
        
        # Feature Extraction using ORB
        features = extract_features(img_bgr)
        
        # Brand detection (simplified - you can use OCR like Tesseract)
        brand = detect_brand(img_bgr)
        
        return jsonify({
            'object_type': object_type,
            'color': color_name,
            'category': category,
            'brand': brand,
            'features': features.tolist() if features is not None else [],
            'detected_objects': detected_objects
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/similarity', methods=['POST'])
def calculate_similarity():
    """
    Calculate similarity between two feature vectors
    
    Request:
    {
        "features1": "[0.123, 0.456, ...]",
        "features2": "[0.789, 0.012, ...]"
    }
    
    Response:
    {
        "similarity": 0.87
    }
    """
    try:
        data = request.get_json()
        features1 = np.array(eval(data.get('features1')))
        features2 = np.array(eval(data.get('features2')))
        
        # Calculate cosine similarity
        similarity = cosine_similarity(features1, features2)
        
        return jsonify({
            'similarity': float(similarity)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_dominant_color(image):
    """Extract dominant color from image"""
    # Reshape image to be a list of pixels
    pixels = image.reshape(-1, 3)
    pixels = np.float32(pixels)
    
    # K-means clustering to find dominant color
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    k = 3
    _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    
    # Get most common cluster
    dominant_color = centers[np.argmax(np.bincount(labels.flatten()))]
    
    return dominant_color


def get_color_name(bgr_color):
    """Convert BGR color to color name"""
    b, g, r = int(bgr_color[0]), int(bgr_color[1]), int(bgr_color[2])
    
    # Simple color categorization
    if r > 200 and g < 100 and b < 100:
        return "red"
    elif g > 200 and r < 100 and b < 100:
        return "green"
    elif b > 200 and r < 100 and g < 100:
        return "blue"
    elif r > 200 and g > 200 and b < 100:
        return "yellow"
    elif r < 50 and g < 50 and b < 50:
        return "black"
    elif r > 200 and g > 200 and b > 200:
        return "white"
    elif r > 150 and g > 100 and b < 100:
        return "brown"
    else:
        return "mixed"


def extract_features(image):
    """Extract image features using ORB"""
    try:
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Create ORB detector
        orb = cv2.ORB_create(nfeatures=128)
        
        # Detect keypoints and compute descriptors
        keypoints, descriptors = orb.detectAndCompute(gray, None)
        
        if descriptors is not None:
            # Flatten descriptors to create feature vector
            features = descriptors.flatten()
            
            # Normalize to fixed length (pad or truncate)
            target_length = 1024
            if len(features) < target_length:
                features = np.pad(features, (0, target_length - len(features)))
            else:
                features = features[:target_length]
            
            return features
        
        return None
        
    except Exception as e:
        print(f"Feature extraction error: {e}")
        return None


def detect_brand(image):
    """
    Detect brand from image (simplified version)
    For production, use OCR (Tesseract) or brand detection models
    """
    # Placeholder - implement OCR or brand detection
    return None


def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors"""
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
    
    return dot_product / (norm1 * norm2)


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'UP',
        'service': 'FoundIt AI - Image Analysis Service',
        'version': '1.0.0'
    })


if __name__ == '__main__':
    print("=" * 60)
    print("FoundIt AI - Image Analysis Service")
    print("=" * 60)
    print("Service running on: http://localhost:5000")
    print("Endpoints:")
    print("  POST /analyze - Analyze image with YOLO + OpenCV")
    print("  POST /similarity - Calculate feature similarity")
    print("  GET  /health - Health check")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
