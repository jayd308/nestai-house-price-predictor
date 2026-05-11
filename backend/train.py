import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os

# Generate synthetic data
np.random.seed(42)
n_samples = 1000

data = {
    'Area': np.random.randint(500, 5000, n_samples),
    'Bedrooms': np.random.randint(1, 6, n_samples),
    'Bathrooms': np.random.randint(1, 4, n_samples),
    'Stories': np.random.randint(1, 4, n_samples),
    'Parking': np.random.randint(0, 3, n_samples),
    'Age': np.random.randint(0, 50, n_samples),
    'City': np.random.randint(0, 6, n_samples),  # encoded
    'Furnishing': np.random.randint(0, 3, n_samples),  # encoded
    'Main Road': np.random.randint(0, 2, n_samples),
    'Guest Room': np.random.randint(0, 2, n_samples),
    'Basement': np.random.randint(0, 2, n_samples),
    'Water Supply': np.random.randint(0, 2, n_samples),
    'Air Conditioning': np.random.randint(0, 2, n_samples),
    'Preferred Tenant': np.random.randint(0, 3, n_samples),  # encoded
    'Locality Rating': np.random.randint(1, 6, n_samples)
}

df = pd.DataFrame(data)

# Generate target price based on features
# Simple linear combination with noise
price = (
    df['Area'] * 100 +
    df['Bedrooms'] * 50000 +
    df['Bathrooms'] * 30000 +
    df['Stories'] * 20000 +
    df['Parking'] * 15000 -
    df['Age'] * 1000 +
    df['City'] * 10000 +
    df['Furnishing'] * -5000 +
    df['Main Road'] * 25000 +
    df['Guest Room'] * 15000 +
    df['Basement'] * 20000 +
    df['Water Supply'] * 10000 +
    df['Air Conditioning'] * 30000 +
    df['Preferred Tenant'] * 5000 +
    df['Locality Rating'] * 10000 +
    np.random.normal(0, 50000, n_samples)
)

df['Price'] = price

# Split data
X = df.drop('Price', axis=1)
y = df['Price']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'MSE: {mse}')

# Save model
model_path = os.path.join(os.path.dirname(__file__), 'house_price_model.pkl')
joblib.dump(model, model_path)
print(f'Model saved to {model_path}')