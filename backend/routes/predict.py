from flask import Blueprint, request, jsonify
from services.ml_service import predict_price
from utils.encoder import encode_input
from models.prediction import save_prediction

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    encoded_features = encode_input(data)
    prediction = predict_price(encoded_features)

    prediction_id = save_prediction(data, prediction)

    return jsonify({
        "success": True,
        "predicted_price": prediction,
        "prediction_id": prediction_id,
    })