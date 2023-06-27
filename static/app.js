const imgform = document.getElementById("image-form");
const downloadBtn = document.getElementById("download-btn");

let downloadUrl = "";

const uploadLoader = document.getElementById("upload-loader");
const imagePreview = document.getElementById("image-preview");

imgform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitting");
  const file = document.getElementById("fileInput").files[0];
  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("file", file);
  uploadLoader.style.display = "block";
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      downloadUrl = data.output_url;
      downloadBtn.style.display = "block";
      uploadLoader.style.display = "none";
      imagePreview.src = downloadUrl;
      imagePreview.style.display = "block";
    });
});

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("downloading");
  fetch(downloadUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chintu-bg-remover-ultra-premium.png";
      a.click();
    });
});
