from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Load the trained model and scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

# Define the feature columns (should match what was used in model.py)
FEATURES = [
    "profile_pic", "ratio_numlen_username", "len_fullname", "ratio_numlen_fullname",
    "sim_name_username", "len_desc", "extern_url", "private", "num_posts",
    "num_followers", "num_following"
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Receive JSON input from frontend
        df = pd.DataFrame([data])  # Convert JSON to DataFrame
        
        # Check if the necessary features exist
        missing_features = [col for col in FEATURES if col not in df.columns]
        if missing_features:
            return jsonify({"error": f"Missing input features: {missing_features}"}), 400

        # Standardize input data
        X = scaler.transform(df[FEATURES])

        # Predict using the trained model
        prediction = model.predict(X)[0]
        
        return jsonify({"fake_account": bool(prediction)})  # 1 = Fake, 0 = Real

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
