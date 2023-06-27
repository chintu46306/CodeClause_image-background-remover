from flask import Flask, request, url_for, render_template, jsonify
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io
import uuid

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    output_folder_path = 'outputs/'

    # Access the image file from the request
    file = request.files['image_file']

    # Read the image file data
    image_data = file.read()

    # Create a Pillow image from the image data
    image = Image.open(io.BytesIO(image_data))

    print(image)

    # Process the image (e.g., resize, apply filters, etc.)
    # Example: Resize the image to 300x300 pixels
    output = remove(image)

    output_path = output_folder_path+str(uuid.uuid4())+".png"


    # Save the processed image
    output.save('./static/'+output_path)
    output_url = url_for('static', filename=output_path)

    return jsonify({'output_url': output_url})

if __name__ == '__main__':
    app.run(debug=False)
