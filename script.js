// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements for the generate button, download button, QR image, and loading spinner. These are stored in variables for later use.
    const generateBtn = document.querySelector('.generate-qr-code');
    const downloadBtn = document.querySelector('.download-qr-code');
    const qrImage = document.querySelector('.qr-image');
    const loading = document.querySelector('.loading'); // Changed from querySelectorAll to querySelector

    // Function to generate the QR code based on user input
    const generateQRCode = () => {
        // Retrieve user input values and remove any leading/trailing whitespace
        const userName = document.getElementById('user-name').value.trim();
        const userEmail = document.getElementById('user-email').value.trim();
        const userPhone = document.getElementById('user-phone').value.trim();

        // Validate that all input fields are filled
        if (!userName || !userEmail || !userPhone) {
            alert('Please fill in all fields.'); // Alert the user if any field is empty
            return; // Stop further execution of the function
        }

        // Show the loading animation and hide the QR image while the QR code is being generated
        loading.style.display = 'block';
        qrImage.style.display = 'none';

        // Construct the data for the QR code in a formatted string
        const qrData = `Name: ${userName}, Email: ${userEmail}, Phone: ${userPhone}`;

        // Construct the API URL with the encoded user data to generate the QR code
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

        // Set the QR image's source to the generated URL
        qrImage.src = qrApiUrl;

        // Event listener for when the QR code image has successfully loaded
        qrImage.onload = () => {
            // Hide the loading animation and show the QR code image
            loading.style.display = 'none'; // Hide the loading animation
            qrImage.style.display = 'block'; // Show the QR code image
        };

        // Event listener for when there is an error loading the QR code image
        qrImage.onerror = () => {
            loading.style.display = 'none'; // Hide the loading animation
            alert('Failed to generate QR code. Please try again.'); // Alert the user of the error
        };
    };

    // Function to download the generated QR code
    const downloadQRCode = () => {
        // Check if the QR image source is set and the image is visible
        if (qrImage.src && qrImage.style.display === 'block') {
            const link = document.createElement('a'); // Create a new anchor element
            link.href = qrImage.src; // Set the anchor element's href attribute to the QR image source
            link.download = 'qrcode.png'; // Set the download attribute to define the filename
            link.click(); // Programmatically click the anchor to trigger the download
        } else {
            alert('Please generate a QR code first.'); // Alert the user if no QR code is available
        }
    };

    // Attach event listeners to the buttons
    generateBtn.addEventListener('click', generateQRCode); // Generate QR code on button click
    downloadBtn.addEventListener('click', downloadQRCode); // Download QR code on button click
});
