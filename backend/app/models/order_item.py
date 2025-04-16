from .. import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, ForeignKey('order_ticket.id'))
    product = db.Column(db.Integer, ForeignKey('product.id'))
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(5,2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    order = relationship("OrderTicket", backref="order_item")