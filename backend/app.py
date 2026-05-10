from flask import Flask
from flask_cors import CORS
from routes.health import health_bp
from routes.predict import predict_bp
from routes.predictions import predictions_bp
from services.ml_service import load_model
import os

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/abz_predictions")

load_model()

app.register_blueprint(health_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(predictions_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
