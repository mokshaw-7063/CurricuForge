"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Course {
  name: string
  credits: number
}

interface CurriculumData {
  [semester: string]: Course[]
}

export default function CurriculumPreviewPage() {
  const router = useRouter()
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null)
  const [totalCredits, setTotalCredits] = useState(0)
  const [openSemesters, setOpenSemesters] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const data = localStorage.getItem("editorData")
    if (data) {
      const parsed: CurriculumData = JSON.parse(data)
      setCurriculum(parsed)

      let credits = 0
      Object.values(parsed).forEach((courses) => {
        courses.forEach((c) => {
          credits += parseInt(String(c.credits || 0))
        })
      })
      setTotalCredits(credits)
    }
  }, [])

  function toggleAccordion(semester: string) {
    setOpenSemesters((prev) => ({
      ...prev,
      [semester]: !prev[semester],
    }))
  }

  function downloadJSON() {
    const data = localStorage.getItem("editorData")
    if (!data) {
      alert("No data available")
      return
    }
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "curriculum.json"
    a.click()
  }

  return (
    <>
      <style jsx global>{`
        .preview-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .preview-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.2), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,0.2), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }
        .preview-nav {
          padding: 20px 60px;
          font-size: 22px;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .preview-nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-size: 14px;
          opacity: 0.8;
        }
        .preview-nav-links a:hover {
          opacity: 1;
        }
        .preview-container {
          padding: 40px 60px;
        }
        .preview-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .preview-program-title {
          font-size: 28px;
          font-weight: 700;
        }
        .preview-credit-info {
          opacity: 0.7;
          margin-top: 6px;
        }
        .preview-accordion-item {
          background: rgba(255,255,255,0.08);
          border-radius: 18px;
          margin-bottom: 15px;
          overflow: hidden;
        }
        .preview-accordion-header {
          padding: 18px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          transition: background 0.2s;
        }
        .preview-accordion-header:hover {
          background: rgba(255,255,255,0.05);
        }
        .preview-accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
          padding: 0 18px;
        }
        .preview-accordion-item.active .preview-accordion-content {
          max-height: 2000px;
          padding: 18px;
        }
        .preview-course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 15px;
        }
        .preview-course-card {
          padding: 18px;
          border-radius: 16px;
          background: rgba(255,255,255,0.1);
        }
        .preview-credit-badge {
          display: inline-block;
          background: #2563eb;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          margin-bottom: 10px;
        }
        .preview-course-card h4 {
          font-size: 15px;
          font-weight: 600;
        }
        .preview-action-bar {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .preview-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
        }
        .preview-btn-primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
        }
        .preview-btn-primary:hover {
          opacity: 0.9;
        }
        .preview-btn-outline {
          background: transparent;
          border: 1px solid #2563eb;
          color: white;
        }
        .preview-btn-outline:hover {
          background: rgba(37,99,235,0.2);
        }
        .preview-empty {
          text-align: center;
          padding: 60px 20px;
          opacity: 0.7;
          font-size: 18px;
        }
        @media(max-width: 768px) {
          .preview-container {
            padding: 20px;
          }
          .preview-nav {
            padding: 15px 20px;
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      <div className="preview-page">
        <nav className="preview-nav">
          <span>CurricuForge - Curriculum Preview</span>
          <div className="preview-nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/generate">Generate</a>
            <a href="/curriculum-editor">Editor</a>
            <a href="/analytics">Analytics</a>
          </div>
        </nav>

        <div className="preview-container">
          {!curriculum ? (
            <div className="preview-glass">
              <div className="preview-empty">No Curriculum Found</div>
            </div>
          ) : (
            <>
              <div className="preview-glass">
                <div className="preview-program-title">Generated Curriculum</div>
                <div className="preview-credit-info">
                  Total Credits: {totalCredits}
                </div>
              </div>

              <div className="preview-glass">
                <h2 style={{ marginBottom: "20px" }}>Semester Structure</h2>
                {Object.keys(curriculum).map((semester) => (
                  <div
                    key={semester}
                    className={`preview-accordion-item ${openSemesters[semester] ? "active" : ""}`}
                  >
                    <div
                      className="preview-accordion-header"
                      onClick={() => toggleAccordion(semester)}
                    >
                      <span>{semester}</span>
                      <span>{openSemesters[semester] ? "-" : "+"}</span>
                    </div>
                    <div className="preview-accordion-content">
                      <div className="preview-course-grid">
                        {curriculum[semester].map((course, i) => (
                          <div key={i} className="preview-course-card">
                            <div className="preview-credit-badge">
                              {course.credits} Credits
                            </div>
                            <h4>{course.name}</h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="preview-glass">
                <div className="preview-action-bar">
                  <button
                    className="preview-btn preview-btn-primary"
                    onClick={downloadJSON}
                  >
                    Export JSON
                  </button>
                  <button
                    className="preview-btn preview-btn-outline"
                    onClick={() => router.push("/curriculum-editor")}
                  >
                    Edit Program
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
