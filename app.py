from flask import Flask, request, jsonify
import numpy as np
import json
import tensorflow as tf
import os
from flask_cors import CORS
from PIL import Image # Import Pillow for image processing

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# --- Configuration and Model Loading ---

# Ensure the 'models' directory exists and contains the model
MODEL_PATH = "models/plant_disease_recog_model_pwp.keras"
if not os.path.exists(MODEL_PATH):
    print(f"Error: Model not found at {MODEL_PATH}. Please ensure the model file is in the 'models' directory.")
    # In a production environment, you might want to raise an exception or exit more gracefully.
    exit()

model = tf.keras.models.load_model(MODEL_PATH)

# List of labels corresponding to your model's output classes
label = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Background_without_leaves', 'Blueberry___healthy', 'Cherry___Powdery_mildew', 'Cherry___healthy',
    'Corn___Cercospora_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___Northern_Leaf_Blight', 'Corn___healthy',
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
    'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight',
    'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Ensure plant_disease.json exists and load it
JSON_PATH = "plant_disease.json"
if not os.path.exists(JSON_PATH):
    print(f"Error: plant_disease.json not found at {JSON_PATH}.")
    exit()

with open(JSON_PATH, 'r') as file:
    plant_disease_info = json.load(file) # Renamed to avoid conflict with 'plant_disease' label list

# --- Helper Functions ---

def extract_features(image_stream):
    """
    Loads an image from a stream, resizes it, and converts it to a numpy array
    suitable for model prediction.
    """
    try:
        img = Image.open(image_stream).convert('RGB') # Ensure image is in RGB format
        img = img.resize((160, 160)) # Resize to the model's expected input size
        feature = tf.keras.utils.img_to_array(img)
        feature = np.expand_dims(feature, axis=0) # Add batch dimension (1, 160, 160, 3)
        return feature
    except Exception as e:
        print(f"Error processing image stream: {e}")
        return None

def model_predict(image_stream):
    """
    Predicts the disease of a plant from an image stream using the loaded model.
    Returns the disease info (name, cause, cure) from plant_disease_info.
    """
    img_features = extract_features(image_stream)
    if img_features is None:
        return None

    prediction = model.predict(img_features)
    predicted_label_index = np.argmax(prediction)
    predicted_label_name = label[predicted_label_index]

    # Find the corresponding disease information in your JSON data
    result = next((item for item in plant_disease_info if item["name"] == predicted_label_name), None)
    return result

# --- Flask Routes ---

@app.route('/', methods=['GET'])
def home():
    """
    A simple home route for the Flask backend.
    In a React-Flask setup, the React app serves the frontend.
    """
    return "This is the Flask backend for plant disease diagnosis. Please access the React frontend."

@app.route('/upload/', methods=['POST'])
def upload_image():
    """
    Handles image uploads for plant disease diagnosis.
    Expects a file with the field name 'img'.
    """
    if 'img' not in request.files:
        return jsonify({"error": "No image file provided in the request"}), 400
    
    image_file = request.files['img']
    
    if image_file.filename == '':
        return jsonify({"error": "No selected image file"}), 400

    # It's good practice to check allowed extensions, even if not saving
    allowed_extensions = {'png', 'jpg', 'jpeg', 'webp'}
    if '.' not in image_file.filename or image_file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
        return jsonify({"error": "Invalid file type. Only JPG, PNG, WEBP are allowed."}), 400

    # Process the image directly from the stream
    prediction_data = model_predict(image_file.stream)

    if prediction_data:
        return jsonify({"prediction": prediction_data}), 200
    else:
        # This case might happen if extract_features returns None or label not found
        return jsonify({"error": "Could not process image or find prediction data."}), 500

if __name__ == "__main__":
    # Run the Flask app in debug mode (development only)
    app.run(debug=True)