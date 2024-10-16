import React from 'react';

function OCRResults({ result }) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-lg font-medium text-gray-900">Extracted Information</h2>
      <dl className="mt-4 space-y-6">
        <div>
          <dt className="text-sm font-medium text-gray-500">Front Side</dt>
          <dd className="mt-1 text-sm text-gray-900">{result.front}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Back Side</dt>
          <dd className="mt-1 text-sm text-gray-900">{result.back}</dd>
        </div>
      </dl>
    </div>
  );
}

export default OCRResults;