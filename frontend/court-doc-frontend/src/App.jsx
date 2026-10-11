import { useState } from "react";
import "./App.css";

const capabilities = [
  {
    number: "01",
    icon: "▤",
    title: "Case classification",
    description: "Identify the document type and case category.",
  },
  {
    number: "02",
    icon: "♙",
    title: "Parties involved",
    description: "Identify parties and their roles in the case.",
  },
  {
    number: "03",
    icon: "§",
    title: "Legal provisions",
    description: "Surface relevant acts, sections and citations.",
  },
  {
    number: "04",
    icon: "≡",
    title: "Judgment summary",
    description: "Present key arguments and findings clearly.",
  },
];

function CourtIllustration() {
  return (
    <div className="illustration">
      
      <div className="illustration-topline">
        <span>DOCUMENT INTELLIGENCE</span>
        <span>INDIA</span>
      </div>

      <svg
        className="courthouse-art"
        viewBox="0 0 500 210"
        role="img"
        aria-label="Illustration of a courthouse behind legal documents"
      >
        <defs>
          <linearGradient id="building" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f1e9d7" />
            <stop offset="100%" stopColor="#c9b58c" />
          </linearGradient>
        </defs>

        <g opacity="0.15" stroke="#d8c59b" fill="none">
          <circle cx="405" cy="83" r="83" />
          <circle cx="405" cy="83" r="66" />
          <path d="M405 0 V165 M322 83 H488" />
        </g>

        <g transform="translate(250 20)" opacity="0.88">
          <path d="M0 15 L130 55 H-130 Z" fill="url(#building)" />
          <rect x="-120" y="56" width="240" height="8" fill="#c6b18a" />

          <g fill="url(#building)" stroke="#c5b28e" strokeWidth="1">
            <rect x="-105" y="65" width="18" height="92" />
            <rect x="-61" y="65" width="18" height="92" />
            <rect x="-9" y="65" width="18" height="92" />
            <rect x="43" y="65" width="18" height="92" />
            <rect x="87" y="65" width="18" height="92" />
          </g>

          <rect x="-125" y="157" width="250" height="9" fill="#c6b18a" />
          <rect x="-142" y="166" width="284" height="8" fill="#d8c59b" />
        </g>

        <g opacity="0.75" stroke="#d0bc93" fill="none">
          <path d="M30 192 H470" />
          <path d="M55 199 H445" />
        </g>
      </svg>

      <div className="floating-card floating-card-top">
        <span className="mini-icon">✓</span>
        <div>
          <small>DOCUMENT STATUS</small>
          <strong>Ready for review</strong>
        </div>
      </div>

      <div className="paper-stack">
        <div className="paper-back paper-back-two">
          <div className="paper-lines">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="paper-back paper-back-one">
          <span className="paper-small-label">CASE RECORD</span>
          <div className="paper-rule" />
          <div className="paper-lines">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="paper-front">
          <span className="paper-small-label">IN THE COURT OF</span>
          <div className="paper-rule" />

          <div className="paper-title">
            JUDGMENT
            <br />
            &amp; ORDER
          </div>

          <div className="paper-lines">
            <span />
            <span />
            <span />
            <span />
            <span className="paper-line-short" />
          </div>

          <div className="paper-seal">CASE FILE</div>
        </div>
      </div>

      <div className="floating-card floating-card-bottom">
        <span className="floating-card-symbol">§</span>
        <div>
          <small>LEGAL INTELLIGENCE</small>
          <strong>Structured case insights</strong>
        </div>
        <span className="gold-arrow">↗</span>
      </div>

      <div className="illustration-caption">
        <span>FROM DOCUMENT</span>
        <span className="caption-divider" />
        <strong>To structured insight.</strong>
      </div>
    </div>
  );
}

function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [analysis, setAnalysis] = useState(null);
  const [filename, setFilename] = useState("");
  const [textPreview, setTextPreview] = useState("");

  function handleFile(selectedFile) {
    setError("");
    setStatus("idle");
    setAnalysis(null);
    setFilename("");
    setTextPreview("");

    if (!selectedFile) return;

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please select a PDF document.");
      return;
    }

    setFile(selectedFile);
  }

 async function handleAnalyze() {
  if (!file) {
    setError("Please select a PDF document first.");
    return;
  }

  setError("");
  setStatus("loading");

  try {
    const formData = new FormData();
    formData.append("document", file);

    const response = await fetch(
      "http://10.195.39.45:3000/api/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Upload failed.");
    }


    setAnalysis(result.analysis);
    setFilename(result.filename);
    setTextPreview(result.textPreview || "");
    setStatus("done");
    setError("");
  } catch (err) {
    setStatus("error");
    setError(
      `Could not process the PDF: ${err.message}. Check that the backend is running and that CORS is configured if needed.`
    );
  }
}

  function removeFile() {
    setFile(null);
    setError("");
    setStatus("idle");
    setAnalysis(null);
    setFilename("");
    setTextPreview("");
  }

  return (
    <div className="site-shell" id="home">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="CourtLens AI home">
          <span className="brand-mark">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path
                d="M5 15 L20 6 L35 15 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M8 17 H32 M10 30 H30 M7 34 H33"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M11 18 V29 M17 18 V29 M23 18 V29 M29 18 V29"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>

          <span className="brand-copy">
            <strong>COURTLENS <span>AI</span></strong>
            <small>LEGAL DOCUMENT INTELLIGENCE</small>
          </span>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="#home">Overview</a>
          <a href="#analyze">Analyze</a>
          <a href="#features">Capabilities</a>
        </nav>

        <a className="nav-cta" href="#analyze">
          <span className="nav-cta-icon">↗</span>
          Open Workspace
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              COURT DOCUMENT INTELLIGENCE
            </div>

            <h1>
              Clarity in every
              <br />
              <em>judgment.</em>
            </h1>

            <p className="hero-description">
              Transform lengthy court documents into structured case
              information. Identify parties, understand legal provisions,
              and surface key findings in one focused workspace.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#analyze">
                Analyze a Document
                <span>↗</span>
              </a>

              <a className="text-link" href="#features">
                Discover capabilities <span>→</span>
              </a>
            </div>

            <div className="hero-footnote">
              <span className="footnote-number">01</span>
              <span>BUILT FOR COMPLEX LEGAL DOCUMENTS</span>
            </div>
          </div>

          <CourtIllustration />
        </section>

        <div className="trust-strip">
          <span className="trust-label">THE WORKFLOW</span>
          <span><b>01</b> Upload your document</span>
          <span className="trust-separator">/</span>
          <span><b>02</b> Extract key information</span>
          <span className="trust-separator">/</span>
          <span><b>03</b> Review structured insights</span>
        </div>

        <section className="workspace-section" id="analyze">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                YOUR WORKSPACE
              </div>

              <h2>Begin with a document.</h2>

              <p>
                Bring a court document into focus. The analysis will appear
                here once the document-processing service is connected.
              </p>
            </div>

            <span className="section-index">01 / ANALYZE</span>
          </div>

          <div className="workspace-grid">
            <section className="upload-panel">
              <div className="panel-heading">
                <div className="panel-icon">↑</div>
                <div>
                  <h3>Analyze a court document</h3>
                  <p>Upload a supported PDF to get started.</p>
                </div>
              </div>

              <label
                className={`drop-zone ${file ? "has-file" : ""}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  handleFile(event.dataTransfer.files[0]);
                }}
              >
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(event) =>
                    handleFile(event.target.files[0])
                  }
                />

                <div className="upload-cloud">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M14 33H11a8 8 0 0 1-1-16 14 14 0 0 1 27-2 9 9 0 0 1 1 18h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M24 37V22m-6 6 6-6 6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <strong>
                  {file ? file.name : "Drop your document here"}
                </strong>

                <span className="drop-hint">
                  {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : "or browse files from your computer"}
                </span>

                <span className="browse-button">
                  {file ? "Choose another PDF" : "Browse Files"}
                </span>
              </label>

              {error && (
  <div className="feedback-message" role="status">
    {error}
  </div>
)}

{status === "loading" && (
  <div className="analysis-results">
    <p>Processing document...</p>
  </div>
)}

{analysis && status === "done" && (
  <section className="analysis-results" aria-live="polite">
    <div className="results-header">
      <div>
        <span className="results-eyebrow">DOCUMENT INTELLIGENCE</span>
        <h3>Analysis Results</h3>
        <p>{filename}</p>
      </div>
      <span className="results-badge">
        {analysis.analysisMode === "ai" ? "AI-assisted" : "Rule-based fallback"}
      </span>
    </div>

    <div className="results-type-card">
      <span className="results-label">DOCUMENT TYPE</span>
      <h4>{analysis.documentType || "Unclassified"}</h4>
      <p>
        {analysis.classificationConfidence ||
          "Classification status unavailable"}
      </p>
    </div>

    <div className="results-stats">
      <div className="results-stat">
        <span className="results-label">CHARACTERS</span>
        <strong>
          {Number(analysis.characterCount || 0).toLocaleString()}
        </strong>
      </div>

      <div className="results-stat">
        <span className="results-label">DATES FOUND</span>
        <strong>{analysis.dates?.length ?? 0}</strong>
      </div>

      <div className="results-stat">
        <span className="results-label">LEGAL REFERENCES</span>
        <strong>{analysis.legalReferences?.length ?? 0}</strong>
      </div>
    </div>

    {analysis.summary && (
      <div className="results-detail ai-summary">
        <h4>AI-Generated Summary</h4>
        <p>{analysis.summary}</p>
      </div>
    )}

    {Array.isArray(analysis.keyPoints) && analysis.keyPoints.length > 0 && (
      <div className="results-detail">
        <h4>Key Points</h4>
        <ul>
          {analysis.keyPoints.map((point, index) => (
            <li key={`point-${index}`}>{point}</li>
          ))}
        </ul>
      </div>
    )}

    {Array.isArray(analysis.parties) && analysis.parties.length > 0 && (
      <div className="results-detail">
        <h4>Parties Identified</h4>
        <ul>
          {analysis.parties.map((party, index) => (
            <li key={`party-${index}`}>{party}</li>
          ))}
        </ul>
      </div>
    )}

    <div className="results-detail">
      <h4>Important Dates</h4>
      {analysis.dates?.length > 0 ? (
        <ul>
          {analysis.dates.map((date, index) => (
            <li key={`${date}-${index}`}>{date}</li>
          ))}
        </ul>
      ) : (
        <p>No dates detected in the extracted text.</p>
      )}
    </div>

    <div className="results-detail">
      <h4>Legal References</h4>
      {analysis.legalReferences?.length > 0 ? (
        <ul>
          {analysis.legalReferences.map((reference, index) => (
            <li key={`${reference}-${index}`}>{reference}</li>
          ))}
        </ul>
      ) : (
        <p>No legal references detected in the extracted text.</p>
      )}
    </div>

    <details className="results-detail extracted-text">
      <summary>View extracted text</summary>
      <pre>{textPreview || "No text preview available."}</pre>
    </details>

    <p className="results-disclaimer">
      AI-generated and extracted information may be incomplete or inaccurate.
      Verify all findings against the original document. CourtLens AI does not
      provide legal advice.
    </p>
  </section>
)}
              <div className="upload-footer">
                <span className="file-format">
                  <span className="format-dot" />
                  PDF DOCUMENTS
                </span>

                <div className="upload-buttons">
                  {file && (
                    <button
                      className="button button-secondary"
                      onClick={removeFile}
                    >
                      Remove
                    </button>
                  )}

                  <button
                    className="button button-primary"
                    onClick={handleAnalyze}
                    disabled={!file || status === "loading"}
                  >
                    {status === "loading" ? "Analyzing..." : "Analyze Document"}
                    {status !== "loading" && <span> →</span>}
                  </button>
                </div>
              </div>
            </section>

            <aside className="capabilities-panel">
              <div className="capabilities-heading">
                <div>
                  <div className="eyebrow">ANALYSIS OVERVIEW</div>
                  <h3>What you'll get</h3>
                </div>

                <span className="capabilities-count">04</span>
              </div>

              {capabilities.map((item) => (
                <article className="capability-item" key={item.number}>
                  <span className="capability-icon">{item.icon}</span>

                  <div className="capability-copy">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>

                  <span className="capability-number">{item.number}</span>
                </article>
              ))}

              <div className="capabilities-note">
                <span>i</span>
                Analysis depends on the connected document-processing service.
              </div>
            </aside>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="features-intro">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              DESIGNED FOR CLARITY
            </div>

            <h2>Less searching.<br /><em>More understanding.</em></h2>

            <p>
              A structured view of the information that matters in a
              complex court document.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-number">01</span>
              <h3>Understand the case</h3>
              <p>
                Present case type, parties, and key information in one
                readable overview.
              </p>
              <span className="feature-arrow">↗</span>
            </article>

            <article className="feature-card">
              <span className="feature-number">02</span>
              <h3>Locate legal provisions</h3>
              <p>
                Organize identified acts and sections with references
                returned by the analysis service.
              </p>
              <span className="feature-arrow">↗</span>
            </article>

            <article className="feature-card">
              <span className="feature-number">03</span>
              <h3>Review the outcome</h3>
              <p>
                Read the reported decision alongside supporting passages
                and page references when available.
              </p>
              <span className="feature-arrow">↗</span>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home">
          <span className="footer-emblem">⚖</span>
          <span>COURTLENS <b>AI</b></span>
        </a>

        <p>Structured insight for complex court documents.</p>

        <span className="footer-meta">LEGAL TECHNOLOGY / INDIA</span>
      </footer>
    </div>
  );
}

export default App;