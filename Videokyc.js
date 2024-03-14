// script.js
const videoElement = document.getElementById('video');
const cardDetailsElement = document.getElementById('cardDetails');
let stream = null;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
  } catch (err) {
    console.error('Error accessing camera:', err);
  }
}

function stopCamera() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  }
}

async function captureAndScan() {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  const image = new Image();
  image.src = canvas.toDataURL();

  Tesseract.recognize(
    image,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    cardDetailsElement.textContent = text;
  });
}

startCamera();