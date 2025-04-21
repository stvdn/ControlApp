from .. import db
from datetime import datetime, timezone
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class OrderTicket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user_info.id'))
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    status = db.Column(db.String(50), default='pending')
    payment_method = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    user = relationship("UserInfo", backref="order_ticket")