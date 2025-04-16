from .. import db
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timezone

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, ForeignKey('provider.id'))
    category_id = db.Column(db.Integer, ForeignKey('category.id'))
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    size = db.Column(db.String(50))
    discount = db.Column(db.Numeric(5, 2))
    gender = db.Column(db.String(50))
    age = db.Column(db.String(50))
    tags = db.Column(ARRAY(db.String))
    image_paths = db.Column(ARRAY(db.String))
    qr_code_uuid = db.Column(UUID(as_uuid=True), default=uuid.uuid4)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    provier = relationship("Provider", backref="products")
    category = relationship("Category", backref="products")