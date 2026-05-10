from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load("house_price_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    df = pd.DataFrame([data])

    prediction = model.predict(df)

    return jsonify({
        "predicted_price": float(prediction[0])
    })

if __name__ == "__main__":
    app.run(debug=True)