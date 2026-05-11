import joblib
import pandas as pd
import os

model = None  # ✅ FIXED (was _model)

def load_model():
    global model
    model_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "house_price_model.pkl"
    )
    model = joblib.load(model_path)

def predict_price(features_dict):
    global model
    if model is None:
        load_model()

    df = pd.DataFrame([features_dict])
    prediction = model.predict(df)
    return float(prediction[0])