import os
import tempfile
import cv2
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)


# Load your emotion detection model
model_path = "model.h5"
loaded_model = load_model(model_path)

# Define the emotions list to match the model's output
emotion_labels = ["angry", "disgust", "fear", "happiness", "sadness", "surprise", "neutral"]

def preprocess_image(image_path):
    try:
        # Load and preprocess the image
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert to RGB
        image_resized = cv2.resize(image, (48, 48), interpolation=cv2.INTER_AREA)  # Resize to match model input shape
        image_rescaled = image_resized / 255.0  # Rescale pixel values to [0, 1]
        return np.expand_dims(image_rescaled, axis=0)
    except Exception as e:
        print("Error preprocessing image:", str(e))
        return None

@app.route("/imageToEmotion", methods=["POST"])
@cross_origin()
def predict_emotion():
    try:
        # Check if image file exists in the request
        if "image" not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        # Receive image file from request
        image_file = request.files["image"]
        
        # Save image file temporarily
        temp_image_path = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
        image_file.save(temp_image_path.name)
        
        # Preprocess the image
        processed_image = preprocess_image(temp_image_path.name)
        
        if processed_image is not None:
            # Make prediction using the loaded model
            prediction = loaded_model.predict(processed_image)[0]
            
            # Get the index of the top predicted emotion
            top_emotion_index = np.argmax(prediction)
            
            # Get the confidence score of the top predicted emotion
            top_emotion_score = prediction[top_emotion_index]
            
            # Get the label of the top predicted emotion
            top_emotion_label = emotion_labels[top_emotion_index]
            
            # Return the predicted emotion and its confidence score as JSON response
            return jsonify({"emotion": top_emotion_label, "confidence_score": round(top_emotion_score * 100, 2)})
        else:
            return jsonify({"error": "Failed to preprocess image"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)

