import React, { useState, useEffect } from 'react';
import FileInput from '../components/FileInput';
import OCRResults from '../components/OCRResults';
import { FileText, Loader } from 'lucide-react';
import { useAxios } from '../hooks/useAxios';

export default function OCRReaderPage() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [submitData, setSubmitData] = useState(null);

  const handleFileChange = (file, side) => {
    if (side === 'front') {
      setFrontImage(file);
    } else {
      setBackImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!frontImage || !backImage) {
      alert('Please upload both front and back images');
      return;
    }

    const formData = new FormData();
    formData.append('aadhaarImages', frontImage);
    formData.append('aadhaarImages', backImage);

    setSubmitData({
      url: 'http://localhost:3000/upload',
      options: {
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    });
  };

  const { data, loading, error } = useAxios(submitData?.url, submitData?.options);

  useEffect(() => {
    if (data) {
      console.log('response is', data);
      setOcrResult(data);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">OCR Aadhaar Card Reader</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <FileInput
                  label="Front Image"
                  onChange={(file) => handleFileChange(file, 'front')}
                  file={frontImage}
                />
                <FileInput
                  label="Back Image"
                  onChange={(file) => handleFileChange(file, 'back')}
                  file={backImage}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FileText className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      Process OCR
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white shadow-lg rounded-lg p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">OCR Results</h2>
              {ocrResult ? (
                <OCRResults result={ocrResult} />
              ) : (
                <p className="text-gray-500">No results yet. Upload images and process OCR to see results here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}