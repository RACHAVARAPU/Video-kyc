import cv2
import pytesseract as ts
ts.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Open the webcam
cap = cv2.VideoCapture(0)

# Check if the webcam is opened successfully
if not cap.isOpened():
    print("Error: Unable to open webcam")
    exit()

# Read and display video frames from the webcam
while True:
    ret, frame = cap.read()

    if not ret:
        print("Error: Unable to read frame")
        break

    cv2.imshow('Webcam', frame)
    text = ts.image_to_string(frame)
    print(text)
    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all windows
cap.release()
cv2.destroyAllWindows()
