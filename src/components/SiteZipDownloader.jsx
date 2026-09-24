import React, { useState } from 'react';

export default function SiteZipDownloader() {
  const [url, setUrl] = useState('');
  const [maxPages, setMaxPages] = useState(25);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/download-react-project-zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, max_pages: Number(maxPages) }),
      });

      // Catch backend JSON errors BEFORE converting to blob — this is the
      // check that was missing/bypassed before, which caused error JSON
      // to get saved as a "zip" file that then failed to extract.
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const jsonError = await response.json();
        throw new Error(jsonError.message || jsonError.error || 'Server error occurred.');
      }

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const blob = await response.blob();

      // Extra safety net: a real zip should never be this tiny.
      if (blob.size < 100) {
        throw new Error('Received an unexpectedly small file — likely not a valid zip.');
      }

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      const cleanHost = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-');
      link.setAttribute('download', `${cleanHost}-react-app.zip`);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

    } catch (err) {
      setError(err.message || 'Error occurred while packaging React ZIP.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">React App Project Exporter</h3>
        <p className="text-xs text-slate-500">Website URL se saare pages scrape karke complete React.js app ki ZIP download karein.</p>
      </div>

      <form onSubmit={handleDownload} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Domain URL</label>
          <input
            type="url"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Max Pages to Export</label>
          <input
            type="number"
            min="1"
            max="100"
            value={maxPages}
            onChange={(e) => setMaxPages(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 transition"
          />
        </div>

        <button
          type="submit"
          disabled={downloading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {downloading ? 'Building React Components & Bundling ZIP...' : 'Export Complete React App ZIP'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl break-words">
          {error}
        </div>
      )}
    </div>
  );
}