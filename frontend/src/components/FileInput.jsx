import React from 'react';
import { Upload } from 'lucide-react';

function FileInput({ label, onChange, file }) {
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    onChange(selectedFile);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center">
        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
          {file ? (
            <img src={URL.createObjectURL(file)} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <Upload className="h-full w-full text-gray-300" aria-hidden="true" />
          )}
        </span>
        <label
          htmlFor={label.toLowerCase().replace(' ', '-')}
          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Change
        </label>
        <input
          id={label.toLowerCase().replace(' ', '-')}
          name={label.toLowerCase().replace(' ', '-')}
          type="file"
          className="sr-only"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
    </div>
  );
}

export default FileInput;