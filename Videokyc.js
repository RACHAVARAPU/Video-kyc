import os
import cv2
import pytesseract
from PIL import Image

# Set Tesseract executable path if not in PATH
tesseract_path = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Adjust this path as per your system
if not os.path.exists(tesseract_path):
    raise Exception("Tesseract executable not found at the specified path:", tesseract_path)
pytesseract.pytesseract.tesseract_cmd = tesseract_path

# Function to capture image from webcam
def capture_image():
    # Open webcam
    cap = cv2.VideoCapture(0)

    while True:
        # Capture frame from webcam
        ret, frame = cap.read()

        # Display the frame
        cv2.imshow('Webcam', frame)

        # Check for key press (press 'c' to capture)
        if cv2.waitKey(1) & 0xFF == ord('c'):
            break

    # Release webcam and destroy OpenCV windows
    cap.release()
    cv2.destroyAllWindows()

    # Convert frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Convert frame to PIL Image
    pil_img = Image.fromarray(gray)

    return pil_img

# Capture image from webcam
img = capture_image()

# Perform OCR using Tesseract
extracted_text = pytesseract.image_to_string(img)

# Print the extracted text
print("Extracted Text:")
print(extracted_text)
