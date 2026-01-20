import React, { useState, useRef } from 'react';

function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("Upload a clear photo...");
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // State for image preview

  const fileInputRef = useRef(null);

  // Handles file selection, sets file name, creates image preview, and performs basic validation.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic file size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        setSelectedFile(null);
        setFileName("Upload a clear photo...");
        setImagePreviewUrl(null);
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setDiagnosisResult(null); // Clear previous results
      setError(null);           // Clear previous errors

      // Create a preview URL for the image to display to the user
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Reset all states if no file is selected
      setSelectedFile(null);
      setFileName("Upload a clear photo...");
      setDiagnosisResult(null);
      setError(null);
      setImagePreviewUrl(null);
    }
  };

  // Handles the "Upload and Check Availability" button click, sending the image to the backend.
  const handleDiagnosisClick = async () => {
    if (!selectedFile) {
      setError("Please select a photo to upload.");
      return;
    }

    // Clear previous errors and results when starting a new diagnosis
    setError(null);
    setDiagnosisResult(null);
    setIsLoading(true); // Indicate loading state

    const formData = new FormData();
    formData.append('img', selectedFile);

    try {
      // Send the image to your Flask backend's upload endpoint
      const response = await fetch('http://127.0.0.1:5000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorData = { error: `HTTP error! status: ${response.status}` };
        
        try {
          const responseText = await response.text();
          errorData = JSON.parse(responseText);
        } catch (e) {
          console.error("Error parsing server response as JSON:", e);
        }
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDiagnosisResult(data.prediction); 
    } catch (error) {
      console.error("Error during diagnosis:", error);
      setError(`Failed to get diagnosis: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  // Triggers the hidden file input when the visible input group is clicked.
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 90px)', paddingTop: '90px', paddingBottom: '2rem', fontFamily: 'var(--font-inter)' }}>
      <div className="container d-flex flex-column align-items-center justify-content-center text-center">
        {/* Header Section: Title and introductory text */}
        <div className="mb-4" style={{ marginTop: '2rem' }}>
          <i className="fas fa-camera-retro fa-3x text-success mb-2"></i>
          <h1 className="display-6 fw-bold mb-3">Worried About Your Plant? Let AI Help!</h1>
          <p className="lead text-muted px-md-5">
            Upload a clear photo of your plant. Our AI will analyze it and provide potential diagnoses and care tips.
          </p>
        </div>

        {/* How It Works Section: Explains the diagnosis process */}
        <div
          className="card shadow-sm p-4 mb-5"
          style={{
            maxWidth: '700px',
            width: '100%',
            borderRadius: '0.75rem',
            backgroundColor: '#fff5f5' // Light red background
          }}
        >
          <div className="card-body text-start">
            <h5 className="card-title mb-3 fw-bold text-danger">
              <i className="fas fa-info-circle me-2"></i> How It Works
            </h5>
            <ol className="list-group list-group-flush">
              <li className="list-group-item border-0 ps-0 py-1" style={{ backgroundColor: 'transparent' }}>
                📷 1. Take a clear, well-lit photo of the affected plant part or the whole plant.
              </li>
              <li className="list-group-item border-0 ps-0 py-1" style={{ backgroundColor: 'transparent' }}>
                🤖 2. Click <strong>"Diagnose Now"</strong> and our AI will analyze the photo.
              </li>
              <li className="list-group-item border-0 ps-0 py-1" style={{ backgroundColor: 'transparent' }}>
                🌱 3. Receive a diagnosis and care tips instantly!
              </li>
            </ol>
            {/* The enhanced NOTE block with new styles and animation */}
            <style>
              {`
                @keyframes fadeInNote {
                  0% {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}
            </style>
            <div
              className="mt-4 p-3 rounded shadow-sm"
              style={{
                backgroundColor: '#ffe6e6', // soft cherry red background
                borderLeft: '5px solid #e60026', // cherry red border
                color: '#cc0000', // cherry red text
                fontWeight: 600,
                fontSize: '1rem',
                animation: 'fadeInNote 1.2s ease-out',
                transition: 'all 0.5s ease-in-out',
              }}
            >
              <i className="fas fa-exclamation-triangle me-2" style={{ color: '#cc0000' }}></i>
              <strong>NOTE:</strong> For best results, pick a single leaf, keep it in an empty background, then upload and diagnose.
            </div>
          </div>
        </div>

        {/* Plant Diagnosis Section: Image upload and results display area */}
        <style>
          {`
            @keyframes diagnoseFadeUp {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
        <div
          className="p-4 shadow"
          style={{
            maxWidth: '720px',
            width: '100%',
            background: '#f0fff4', // soft mint green
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
          }}
        >
          <div className="card-body text-start">
            {/* Section title changed with new emojis */}
            <h5 className="card-title mb-4 fw-bold text-success">🪴 Diagnose Your Plant 🌿</h5>

            <div className="mb-4">
              <label htmlFor="plantPhotoInput" className="form-label fw-bold">Plant Photo</label>
              {/* Hidden file input element that is triggered by clicking the visible input group */}
              <input
                type="file"
                id="plantPhotoInput"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".jpg, .jpeg, .png, .webp" // Allowed file types
              />
              {/* Visible input group to display selected file name and trigger file input */}
              <div className="input-group" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
                <span className="input-group-text bg-white border-end-0">
                  <i className="fas fa-camera text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="displayPlantPhoto"
                  placeholder="Upload a clear photo..."
                  aria-label="Upload a clear photo"
                  readOnly
                  value={fileName}
                />
              </div>
              <div className="form-text text-muted mt-2">
                Max 5MB. JPG, PNG, WEBP formats accepted.
              </div>
              {/* Display the selected image preview */}
              {imagePreviewUrl && (
                <div className="mt-3 text-center">
                  <img src={imagePreviewUrl} alt="Plant Preview" style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
                </div>
              )}
            </div>

            {/* Button styling and text updated here */}
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-success btn-lg rounded-pill"
                style={{
                  fontSize: '1.2rem',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 'bold',
                  backgroundColor: '#28a745',
                  borderColor: '#28a745',
                  color: 'white',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                onClick={handleDiagnosisClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Analyzing...
                  </>
                ) : 'Diagnose Now'}
              </button>
            </div>

            {/* Error message display */}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}

            {/* Diagnosis Result Display */}
            {diagnosisResult && (
              <div className="mt-5 pt-3 border-top border-2"> {/* Added top border for clear separation */}
                {/* Result title updated with new emoji */}
                <h4 className="mb-4 fw-bolder text-success">🔍 Diagnosis Result:</h4>
                <div className="card shadow-lg" style={{ borderRadius: '1rem', backgroundColor: '#e9ecef' }}> {/* More prominent card style with rounded corners and light grey background */}
                  <div className="card-body text-start p-4"> {/* Increased padding inside the card */}
                    <div className="mb-3">
                      <p className="card-subtitle text-muted mb-1">
                        <strong className="text-primary fs-6">Disease Name:</strong> {/* Bolder, larger font, primary blue color */}
                      </p>
                      <p className="card-text fw-bold text-dark" style={{ fontSize: '1.3rem', letterSpacing: '0.5px' }}>
                        {diagnosisResult.name.replace(/\//g, ' - ').replace(/\\/g, ' ')}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="card-subtitle text-muted mb-1">
                        <strong className="text-warning fs-6">Cause:</strong> {/* Bolder, larger font, warning orange color */}
                      </p>
                      <p className="card-text text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                        {diagnosisResult.cause}
                      </p>
                    </div>

                    <div>
                      <p className="card-subtitle text-muted mb-1">
                        <strong className="text-danger fs-6">Cure/Care Tips:</strong> {/* Bolder, larger font, danger red color */}
                      </p>
                      <p className="card-text text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                        {diagnosisResult.cure}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;