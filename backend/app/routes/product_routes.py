from flask import Blueprint, jsonify, request, abort
from ..models import Product
from .. import db

bp = Blueprint("product", __name__, url_prefix="/api/product")

@bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()
    products_list = [
        {
            'id': product.id,
            'provider_id': product.provider_id,
            'category_id': product.category_id,
            'name': product.name,
            'description': product.description,
            'price': str(product.price),
            'stock': product.stock,
            'size': product.size,
            'discount': str(product.discount),
            'gender': product.gender,
            'age': product.age,
            'tags': product.tags,
            'image_paths': product.image_paths,
            'qr_code_uuid': str(product.qr_code_uuid),
            'created_at': product.created_at,
            'updated_at': product.updated_at,
        }
        for product in products
    ]
    return jsonify(products_list)

@bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({
        'id': product.id,
        'provider_id': product.provider_id,
        'category_id': product.category_id,
        'name': product.name,
        'description': product.description,
        'price': str(product.price),
        'stock': product.stock,
        'size': product.size,
        'discount': str(product.discount),
        'gender': product.gender,
        'age': product.age,
        'tags': product.tags,
        'image_paths': product.image_paths,
        'qr_code_uuid': str(product.qr_code_uuid),
        'created_at': product.created_at.isoformat(),
        'updated_at': product.updated_at.isoformat(),
    })

@bp.route("/", methods=["POST"])
def post_product():
    data = request.get_json()
    if not data:
        abort(400, "Invalid JSON")
    try:
        new_product = Product(
            provider_id=data['provider_id'],
            category_id=data['category_id'],
            name=data['name'],
            description=data['description'],
            price=data['price'],
            stock=data['stock'],
            size=data.get('size'),
            discount=data.get('discount'),
            gender=data.get('gender'),
            age=data.get('age'),
            tags=data.get('tags'),
            image_paths=data.get('image_paths')
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product created', 'id': new_product.id}), 201
    except KeyError as e:
        abort(400, f'Missing required fields: {e}')
    except Exception as e:
        abort(500, f'An unexpected error occurred: {e}')

@bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid JSON')

    try:
        product.provider_id = data.get('provider_id', product.provider_id)
        product.category_id = data.get('category_id', product.category_id)
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.stock = data.get('stock', product.stock)
        product.size = data.get('size', product.size)
        product.discount = data.get('discount', product.discount)
        product.gender = data.get('gender', product.gender)
        product.age = data.get('age', product.age)
        product.tags = data.get('tags', product.tags)
        product.image_paths = data.get('image_paths', product.image_paths)
        product.created_by = data.get('created_by', product.created_by)
        db.session.commit()
        return jsonify({'message': 'Product updated'})
    except KeyError as e:
        abort(400, f'Missing required fields: {e}')
    except Exception as e:
        abort(500, f'An unexpected error occurred: {e}')

# DELETE a product
@bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'})