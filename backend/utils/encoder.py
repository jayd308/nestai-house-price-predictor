CITY_MAP = {
    "Kigali": 0,
    "Butare": 1,
    "Gisenyi": 2,
    "Ruhengeri": 3,
    "Musanze": 3,
    "Muhanga": 4,
    "Nyagatare": 5,
    "Rubavu": 2,
    "Rwamagana": 4,
    "Kayonza": 5,
}

FURNISHING_MAP = {
    "Furnished": 0,
    "Semi-Furnished": 1,
    "Unfurnished": 2,
}

BINARY_MAP = {
    "Yes": 1,
    "No": 0,
}

PREFERRED_TENANT_MAP = {
    "Family": 0,
    "Bachelor": 1,
    "Working Professional": 2,
    "Student": 2,
    "Any": 0,
}


def encode_input(data):
    return {
        "Area": float(data.get("area", 0)),
        "Bedrooms": int(data.get("bedrooms", 0)),
        "Bathrooms": int(data.get("bathrooms", 0)),
        "Stories": int(data.get("stories", 0)),
        "Parking": int(data.get("parking", 0)),
        "Age": int(data.get("age", 0)),
        "City": CITY_MAP.get(data.get("city", "Kigali"), 0),
        "Furnishing": FURNISHING_MAP.get(data.get("furnishing", "Furnished"), 0),
        "Main Road": BINARY_MAP.get(data.get("main_road", "No"), 0),
        "Guest Room": BINARY_MAP.get(data.get("guest_room", "No"), 0),
        "Basement": BINARY_MAP.get(data.get("basement", "No"), 0),
        "Water Supply": BINARY_MAP.get(data.get("water_supply", "No"), 0),
        "Air Conditioning": BINARY_MAP.get(data.get("air_conditioning", "No"), 0),
        "Preferred Tenant": PREFERRED_TENANT_MAP.get(
            data.get("preferred_tenant", "Family"), 0
        ),
        "Locality Rating": float(data.get("locality_rating", 3)),
    }
