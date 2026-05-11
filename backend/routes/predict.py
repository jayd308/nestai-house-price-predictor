from flask import Blueprint, request, jsonify
import numpy as np
from services.ml_service import model

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    features = np.array([[
        data["Area"],
        data["Bedrooms"],
        data["Bathrooms"],
        data["Stories"],
        data["Parking"],
        data["Age"],
        data["City"],
        data["Furnishing"],
        data["Main Road"],
        data["Guest Room"],
        data["Basement"],
        data["Water Supply"],
        data["Air Conditioning"],
        data["Preferred Tenant"],
        data["Locality Rating"]
    ]])

    prediction = model.predict(features)[0]

    return jsonify({
        "success": True,
        "predicted_price": float(prediction)
    })