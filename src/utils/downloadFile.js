const convertBase64ToBlob = (base64, fileType) => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: fileType });
};

export const downloadFile = (base64, fileName) => {
  const link = document.createElement("a");
  const blob = convertBase64ToBlob(base64, "application/octet-stream");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  alert("link :"+link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
