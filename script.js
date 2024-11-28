
        const defaultUrl = "https://sharan.is-a.dev/";
        const qrcodeContainer = document.getElementById("qrcode");
        const linkInput = document.getElementById("linkInput");
        const generateBtn = document.getElementById("generateBtn");
        const downloadBtn = document.getElementById("downloadBtn");
        const errorMsg = document.getElementById("errorMsg");
        const fgColorInput = document.getElementById("fgColor");
        const bgColorInput = document.getElementById("bgColor");

        // Initialize QR Code
        const qrcode = new QRCode(qrcodeContainer, {
            text: defaultUrl,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });

        // URL Validation Function
        function isValidUrl(url) {
            try {
                const parsedUrl = new URL(url);
                return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
            } catch {
                return false;
            }
        }

        // Generate QR Code
        generateBtn.addEventListener("click", () => {
            const userLink = linkInput.value.trim();
            const fgColor = fgColorInput.value;
            const bgColor = bgColorInput.value;

            errorMsg.textContent = "";

            if (!userLink || !isValidUrl(userLink)) {
                errorMsg.textContent = "Please enter a valid URL (e.g., https://example.com).";
                return;
            }

            // Clear previous QR Code
            qrcodeContainer.innerHTML = "";

            // Generate new QR Code with custom colors
            new QRCode(qrcodeContainer, {
                text: userLink,
                width: 256,
                height: 256,
                colorDark: fgColor,
                colorLight: bgColor,
            });
        });

        // Download QR Code
        downloadBtn.addEventListener("click", () => {
            const qrCanvas = qrcodeContainer.querySelector("canvas");
            if (qrCanvas) {
                const qrImage = qrCanvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = qrImage;
                link.download = "qr-code.png";
                link.click();
            }
        });