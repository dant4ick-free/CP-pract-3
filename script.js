document.getElementById('upload-button').addEventListener('click', async function() {
  const imageInput = document.getElementById('image-input');
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = async function() {
      const imageBase64 = reader.result.split(',')[1];

      const response = await fetch('https://functions.yandexcloud.net/d4e48qrvft4m7jei77hr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_file: file.name,
          image_data: imageBase64,
          image_invert: true // Change this value as needed
        })
      });

      const result = await response.json();
      document.getElementById('result').textContent = JSON.stringify(result, null, 2);

      if (result.uploaded_image_data) {
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = ''; // Clear previous image if any

        const imageElement = new Image();
        imageElement.src = 'data:image/png;base64,' + result.uploaded_image_data;
        imageElement.style.maxWidth = '500px'; // Adjust the max width as needed
        imageContainer.appendChild(imageElement);
      }
    };

    reader.readAsDataURL(file);
  }
});
