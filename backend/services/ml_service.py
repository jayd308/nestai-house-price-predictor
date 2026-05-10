import joblib
import pandas as pd
import os

_model = None


def load_model():
    global _model
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "house_price_model.pkl")
    _model = joblib.load(model_path)


def predict_price(features_dict):
    global _model
    if _model is None:
        load_model()
    df = pd.DataFrame([features_dict])
    prediction = _model.predict(df)
    return float(prediction[0])
