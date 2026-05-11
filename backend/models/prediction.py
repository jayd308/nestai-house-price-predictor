import os
import json
from datetime import datetime
from urllib.parse import urlparse
from pymongo import MongoClient
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)


def get_db():
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/abz_predictions")
    client = MongoClient(uri)
    parsed = urlparse(uri)
    if not parsed.path or parsed.path == "/":
        return client.get_database("abz_predictions")
    return client.get_database()


def save_prediction(input_data, predicted_price):
    db = get_db()
    doc = {
        "input": input_data,
        "predicted_price": predicted_price,
        "created_at": datetime.utcnow(),
    }
    result = db.predictions.insert_one(doc)
    return str(result.inserted_id)


def get_all_predictions(limit=50, skip=0, search=None):
    db = get_db()
    query = {}
    if search:
        query["$or"] = [
            {"input.city": {"$regex": search, "$options": "i"}},
            {"input.area": {"$regex": search, "$options": "i"}},
        ]
    cursor = (
        db.predictions.find(query)
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
    )
    results = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        doc["created_at"] = doc["created_at"].isoformat()
        results.append(doc)
    return results


def get_prediction_count():
    db = get_db()
    return db.predictions.count_documents({})


def delete_prediction(prediction_id):
    db = get_db()
    result = db.predictions.delete_one({"_id": ObjectId(prediction_id)})
    return result.deleted_count > 0
