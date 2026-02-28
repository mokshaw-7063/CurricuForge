"use client"

import { useState, useEffect } from "react"

interface Version {
  id: number
  date: string
  data: Record<string, unknown>
}

export default function VersionHistoryPage() {
  const [versions, setVersions] = useState<Version[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("versionHistory")
    if (stored) {
      setVersions(JSON.parse(stored))
    } else {
      const sampleVersions: Version[] = [
        {
          id: 1,
          date: "2025-01-15 10:30 AM",
          data: { "Semester 1": [{ name: "Intro to AI", credits: 3 }] },
        },
        {
          id: 2,
          date: "2025-01-14 03:45 PM",
          data: { "Semester 1": [{ name: "Intro to AI", credits: 3 }, { name: "Math for ML", credits: 4 }] },
        },
        {
          id: 3,
          date: "2025-01-13 09:00 AM",
          data: { "Semester 1": [{ name: "Python Basics", credits: 3 }] },
        },
      ]
      setVersions(sampleVersions)
    }
  }, [])

  function viewVersion(id: number) {
    const selected = versions.find((v) => v.id === id)
    if (selected) {
      alert(JSON.stringify(selected.data, null, 2))
    }
  }

  function restoreVersion(id: number) {
    const selected = versions.find((v) => v.id === id)
    if (selected) {
      localStorage.setItem("editorData", JSON.stringify(selected.data))
      alert("Version Restored Successfully")
      window.location.href = "/curriculum-editor"
    }
  }

  function deleteVersion(id: number) {
    if (confirm("Delete this version?")) {
      const updated = versions.filter((v) => v.id !== id)
      setVersions(updated)
      localStorage.setItem("versionHistory", JSON.stringify(updated))
    }
  }

  return (
    <>
      <style jsx global>{`
        .vh-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .vh-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.2), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,0.2), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }
        .vh-nav {
          padding: 20px 60px;
          font-size: 22px;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .vh-nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-size: 14px;
          opacity: 0.8;
        }
        .vh-nav-links a:hover {
          opacity: 1;
        }
        .vh-container {
          padding: 40px 60px;
        }
        .vh-back-btn {
          margin-bottom: 20px;
          display: inline-block;
          text-decoration: none;
          color: white;
          opacity: 0.8;
          font-weight: 500;
        }
        .vh-back-btn:hover {
          opacity: 1;
        }
        .vh-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 25px;
          margin-bottom: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .vh-glass h2 {
          margin-bottom: 20px;
        }
        .vh-version-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding: 15px;
          border-radius: 16px;
          background: rgba(255,255,255,0.1);
          transition: 0.3s;
        }
        .vh-version-card:hover {
          background: rgba(255,255,255,0.15);
        }
        .vh-version-info {
          display: flex;
          flex-direction: column;
        }
        .vh-version-info span {
          opacity: 0.7;
          font-size: 13px;
        }
        .vh-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          margin-left: 10px;
          font-size: 13px;
        }
        .vh-btn-primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
        }
        .vh-btn-outline {
          background: transparent;
          border: 1px solid #2563eb;
          color: white;
        }
        .vh-btn-danger {
          background: #dc2626;
          color: white;
        }
        .vh-btn:hover {
          opacity: 0.85;
        }
        .vh-empty {
          text-align: center;
          opacity: 0.6;
          padding: 40px;
          font-size: 14px;
        }
        @media(max-width: 768px) {
          .vh-container {
            padding: 20px;
          }
          .vh-version-card {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="vh-page">
        <nav className="vh-nav">
          <span>CurricuForge - Version History</span>
          <div className="vh-nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/generate">Generate</a>
            <a href="/curriculum-editor">Editor</a>
            <a href="/analytics">Analytics</a>
          </div>
        </nav>

        <div className="vh-container">
          <a href="/curriculum-editor" className="vh-back-btn">
            {"<- Back to Editor"}
          </a>

          <div className="vh-glass">
            <h2>Curriculum Version Timeline</h2>

            {versions.length === 0 ? (
              <div className="vh-empty">No versions saved yet</div>
            ) : (
              versions.map((v, index) => (
                <div className="vh-version-card" key={v.id}>
                  <div className="vh-version-info">
                    <strong>Version {versions.length - index}</strong>
                    <span>{v.date}</span>
                  </div>
                  <div>
                    <button className="vh-btn vh-btn-outline" onClick={() => viewVersion(v.id)}>
                      View
                    </button>
                    <button className="vh-btn vh-btn-primary" onClick={() => restoreVersion(v.id)}>
                      Restore
                    </button>
                    <button className="vh-btn vh-btn-danger" onClick={() => deleteVersion(v.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
