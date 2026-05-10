from flask import Blueprint, request, jsonify
from models.prediction import get_all_predictions, get_prediction_count, delete_prediction

predictions_bp = Blueprint("predictions", __name__)


@predictions_bp.route("/predictions", methods=["GET"])
def list_predictions():
    limit = request.args.get("limit", 50, type=int)
    skip = request.args.get("skip", 0, type=int)
    search = request.args.get("search", None)
    predictions = get_all_predictions(limit=limit, skip=skip, search=search)
    count = get_prediction_count()
    return jsonify({
        "success": True,
        "predictions": predictions,
        "total": count,
        "limit": limit,
        "skip": skip,
    })


@predictions_bp.route("/predictions/<prediction_id>", methods=["DELETE"])
def remove_prediction(prediction_id):
    deleted = delete_prediction(prediction_id)
    if deleted:
        return jsonify({"success": True, "message": "Prediction deleted"})
    return jsonify({"error": "Prediction not found"}), 404
