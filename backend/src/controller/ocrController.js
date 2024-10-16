const { createWorker } = require('tesseract.js');

// Function to perform OCR on uploaded images
const performOCR = async (req, res) => {
    try {
        const files = req.files;

        // Check if two files (front and back images) are uploaded
        if (!files || files.length !== 2) {
            return res.status(400).json({ error: 'Please upload both front and back images' });
        }

        const worker = await createWorker();

        try {
            await worker.loadLanguage('eng');
            await worker.initialize('eng');

            // Perform OCR on both front and back images
            const frontResult = await worker.recognize(files[0].path);
            const backResult = await worker.recognize(files[1].path);

            // Send the extracted text back to the frontend
            res.json({
                front: frontResult.data.text,
                back: backResult.data.text,
            });
        } catch (ocrError) {
            console.error('Error during OCR processing:', ocrError);
            res.status(500).json({ error: 'Failed to process images' });
        } finally {
            await worker.terminate(); // Cleanup worker
        }
    } catch (error) {
        console.error('Error processing OCR:', error);
        res.status(500).json({ error: 'Failed to process images' });
    }
};

module.exports = {
    performOCR,
};