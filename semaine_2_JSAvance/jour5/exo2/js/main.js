// On place ces variables dans la portée globale afin d'y avoir
// accès dans la console du navigateur.

const cameraList = document.getElementById("webCamList");
const btnValidateCamera = document.getElementById("validateWebcam");
const video = document.querySelector("video");
const btnScreenshot = document.getElementById("takeScreenshot");
const displayScreenshot = document.getElementById("displayScreenshot");
const btnSaveScreenshot = document.getElementById("btnSaveScreenshot");
const screenshotContainer = document.getElementById("screenshotContainer");
const urlDownloadScreenshot = document.getElementById("urlDownloadScreenshot");

const saveImage = (downloadUrl) => {
    const downloadImage = document.createElement("a");
    document.body.appendChild(downloadImage);
    downloadImage.setAttribute("download", "image");
    downloadImage.href = downloadUrl;
    downloadImage.click();
    downloadImage.remove();
};

navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    devices.forEach(cameraInfo => {
        if(cameraInfo.kind != "videoinput") return;
        let cameraOption = document.createElement("option");
        cameraOption.value = cameraInfo.deviceId;
        cameraOption.innerText = cameraInfo.label;
        cameraList.appendChild(cameraOption);
        console.log(cameraInfo);
        });
  })

btnValidateCamera.addEventListener("click", () => {
    
    let selectedCamera = cameraList.value;
    const constraints = {
        video: { deviceId: { exact: selectedCamera } }
      };
    console.log(selectedCamera);
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        console.log(stream);
        if (video) {
            video.srcObject = stream;
            video.play();
          }
    });
});


btnScreenshot.addEventListener("click", () => {
    const context = displayScreenshot.getContext("2d");

    // Définir la taille du canvas selon la taille de la vidéo
    displayScreenshot.width = video.videoWidth;
    displayScreenshot.height = video.videoHeight;

    // Dessiner la vidéo sur le canvas
    context.drawImage(video, 0, 0, displayScreenshot.width, displayScreenshot.height);

    // Récupérer les pixels de l'image
    let imgData = context.getImageData(0, 0, displayScreenshot.width, displayScreenshot.height);
    let pixels = imgData.data;

    // Appliquer l'effet de grayscale
    for (let i = 0; i < pixels.length; i += 4) {
        let lightness = Math.round((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
        pixels[i] = lightness;       // Rouge
        pixels[i + 1] = lightness;   // Vert
        pixels[i + 2] = lightness;   // Bleu
        // pixels[i + 3] correspond à l'alpha (opacité) et reste inchangé
    }

    // Mettre à jour l'image dans le canvas
    context.putImageData(imgData, 0, 0);

    // Convertir le contenu du canvas en une URL d'image
    const imageDataUrl = displayScreenshot.toDataURL("image/png");

    if (displayScreenshot) {
        displayScreenshot.src = imageDataUrl;
    }

    screenshotContainer.style.display = "block";
});


btnSaveScreenshot.addEventListener("click", () => {
    saveImage(displayScreenshot.src);
})