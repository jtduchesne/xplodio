export const toParam = (name) => (
  name.toLowerCase()
    .replace(/^[\s_-]+|[\s_-]+$|[^a-z0-9\s_-]+/g, "")
    .replace(/[\s_]+/g, "-")
);

export const formatTime = (s) => (
  (s - (s %= 60))/60 + (9<s ? ":" : ":0") + s
);

export const upload = (file, onProgress) => {
  let formData = new FormData();
  formData.append("file", file);

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.upload.onprogress = onProgress;

    xhr.onload = () => resolve(xhr.response);
    xhr.onabort = () => reject("Upload cancelled by the user.");
    xhr.onerror = () => reject("Upload failed.");

    xhr.open('POST', "/uploads");
    xhr.send(formData);
  });
};
