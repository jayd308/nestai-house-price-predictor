from flask import Blueprint, request, jsonify
from services.ml_service import predict_price
from utils.encoder import encode_input
from models.prediction import save_prediction

predict_bp = Blueprint("predict", __name__)


@predict_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        encoded = encode_input(data)
        price = predict_price(encoded)

        try:
            save_prediction(data, price)
        except Exception:
            pass

        return jsonify({
            "success": True,
            "predicted_price": round(price, 2),
            "formatted_price": f"{round(price):,}",
            "currency": "RWF",
            "input": data,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
