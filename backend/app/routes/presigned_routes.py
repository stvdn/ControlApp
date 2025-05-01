from flask import Blueprint, jsonify, request, abort
import boto3
import os
from datetime import datetime


s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)

bp = Blueprint("presigned", __name__, "/api/presigned")

@bp.route('/get-presigned-upload', methods=['POST'])
def get_presigned_upload():
    data = request.json
    file_name = data.get('fileName')
    file_type = data.get('fileType')
    
    if not file_name or not file_type:
        return jsonify({'error': 'fileName and fileType are required'}), 400
    
    # Generate unique filename
    image_key = f"/product_image/{datetime.now().timestamp()}-{file_name}"
    
    try:
        presigned_url = s3.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': os.getenv('S3_BUCKET'),
                'Key': image_key,
                'ContentType': file_type,
            },
            ExpiresIn=3600  # URL expires in 1 hour
        )
        
        return jsonify({
            'presignedUrl': presigned_url,
            'image_key': image_key
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500