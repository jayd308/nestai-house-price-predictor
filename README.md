# NestAI — Smart Real Estate Price Prediction Platform

An AI-powered real estate web application that predicts fair market prices for houses using Machine Learning.

Built by **ABZ Company**, a leading real estate software firm based in Kigali, Rwanda.

## Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS 3
- Axios
- React Router DOM 7
- Framer Motion
- Lucide React

### Backend
- Python Flask
- Flask-CORS
- scikit-learn (RandomForestRegressor)
- Pandas
- Joblib
- Gunicorn

### Database
- MongoDB (via PyMongo)

## Project Structure

```
nestai/
├── backend/
│   ├── app.py                 # Flask entry point
│   ├── routes/
│   │   ├── health.py          # GET /health
│   │   ├── predict.py         # POST /predict
│   │   └── predictions.py     # GET /predictions, DELETE /predictions/:id
│   ├── models/
│   │   └── prediction.py      # MongoDB CRUD operations
│   ├── services/
│   │   └── ml_service.py      # ML model loading & prediction
│   ├── utils/
│   │   └── encoder.py         # Feature encoding maps
│   ├── house_price_model.pkl
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Hero, Features, Stats, Footer,
│   │   │                      # PredictionForm, ResultCard, LoadingSpinner,
│   │   │                      # ThemeToggle, Sidebar
│   │   ├── pages/             # Home, Predict, Dashboard, History
│   │   ├── services/          # api.js (Axios client)
│   │   ├── context/           # ThemeContext
│   │   ├── layouts/           # MainLayout
│   │   └── App.jsx            # Router config
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB (local or Atlas)

### 1. Clone & Setup Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

The API runs on `http://localhost:5000`.

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### 3. MongoDB

Ensure MongoDB is running locally on `mongodb://localhost:27017`, or set:

```bash
# Windows (PowerShell)
$env:MONGO_URI="mongodb://your-mongo-uri/abz_predictions"

# macOS/Linux
export MONGO_URI="mongodb://your-mongo-uri/abz_predictions"
```

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/health`             | Health check             |
| POST   | `/predict`            | Predict house price      |
| GET    | `/predictions`        | List predictions history |
| DELETE | `/predictions/<id>`   | Delete a prediction      |

### POST /predict

**Request body:**
```json
{
  "area": 1500,
  "bedrooms": 3,
  "bathrooms": 2,
  "stories": 2,
  "parking": 2,
  "age": 5,
  "city": "Kigali",
  "furnishing": "Furnished",
  "main_road": "Yes",
  "guest_room": "No",
  "basement": "No",
  "water_supply": "Yes",
  "air_conditioning": "No",
  "preferred_tenant": "Family",
  "locality_rating": 4
}
```

**Response:**
```json
{
  "success": true,
  "predicted_price": 1275956.0,
  "formatted_price": "1,275,956",
  "currency": "RWF"
}
```

## ML Model

The model is a `RandomForestRegressor` (max_depth=20, n_estimators=200) trained on 15 features:

- **Numerical**: Area, Bedrooms, Bathrooms, Stories, Parking, Age, Locality Rating
- **Categorical**: City, Furnishing, Main Road, Guest Room, Basement, Water Supply, Air Conditioning, Preferred Tenant

## Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
vercel --prod
```

Set `VITE_API_URL` to your deployed backend URL.

### Backend (Render)

1. Push backend to GitHub
2. Create new Web Service on Render
3. Set:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
   - Environment variable: `MONGO_URI`

### Database (MongoDB Atlas)

1. Create free cluster at MongoDB Atlas
2. Get connection string
3. Set as `MONGO_URI` environment variable

## Environment Variables

### Backend
| Variable    | Default                                  | Description       |
|-------------|------------------------------------------|-------------------|
| `MONGO_URI` | `mongodb://localhost:27017/abz_predictions` | MongoDB connection |

### Frontend
| Variable      | Default   | Description          |
|---------------|-----------|----------------------|
| `VITE_API_URL`| `/api`    | Backend API base URL |

## Features

- [x] AI-powered house price prediction
- [x] Modern landing page with animations
- [x] Responsive prediction form with validation
- [x] Real-time price estimation
- [x] Prediction history with search/filter
- [x] Admin dashboard with statistics
- [x] Dark/light mode toggle
- [x] MongoDB persistence
- [x] RESTful API endpoints
- [x] Glassmorphism UI design
- [x] Dark/light mode
