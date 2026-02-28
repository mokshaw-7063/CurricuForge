"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Course {
  name: string
  credits: number
}

interface Curriculum {
  [semester: string]: Course[]
}

const DEFAULT_CURRICULUM: Curriculum = {
  "Semester 1": [
    { name: "Introduction to AI", credits: 3 },
    { name: "Mathematics for ML", credits: 4 },
    { name: "Python Programming", credits: 3 },
  ],
  "Semester 2": [
    { name: "Deep Learning Fundamentals", credits: 4 },
    { name: "Data Structures & Algorithms", credits: 3 },
  ],
}

export default function CurriculumEditorPage() {
  const router = useRouter()
  const [curriculum, setCurriculum] = useState<Curriculum>(DEFAULT_CURRICULUM)
  const [currentSemester, setCurrentSemester] = useState("")
  const [programTitle, setProgramTitle] = useState("AI Engineering - 4 Years")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem("editorData")
    const storedMeta = localStorage.getItem("generatedMeta")

    if (storedData) {
      try {
        const parsed: Curriculum = JSON.parse(storedData)
        if (Object.keys(parsed).length > 0) {
          setCurriculum(parsed)
          setCurrentSemester(Object.keys(parsed)[0])

          if (storedMeta) {
            const meta = JSON.parse(storedMeta)
            setProgramTitle(
              `${meta.subject || "Program"} - ${meta.level || ""} (${meta.semesters || 0} Semesters)`
            )
          }
          setLoaded(true)
          return
        }
      } catch {
        // fall through to defaults
      }
    }

    setCurriculum(DEFAULT_CURRICULUM)
    setCurrentSemester("Semester 1")
    setLoaded(true)
  }, [])

  function switchSemester(name: string) {
    setCurrentSemester(name)
  }

  function addSemester() {
    const name = prompt("Enter Semester Name:")
    if (!name) return
    setCurriculum((prev) => ({ ...prev, [name]: [] }))
  }

  function addCourse() {
    const name = prompt("Course Name:")
    if (!name) return
    setCurriculum((prev) => ({
      ...prev,
      [currentSemester]: [...(prev[currentSemester] || []), { name, credits: 3 }],
    }))
  }

  function deleteCourse(index: number) {
    setCurriculum((prev) => ({
      ...prev,
      [currentSemester]: prev[currentSemester].filter((_, i) => i !== index),
    }))
  }

  function updateCourseName(index: number, value: string) {
    setCurriculum((prev) => ({
      ...prev,
      [currentSemester]: prev[currentSemester].map((c, i) =>
        i === index ? { ...c, name: value } : c
      ),
    }))
  }

  function updateCredits(index: number, value: number) {
    setCurriculum((prev) => ({
      ...prev,
      [currentSemester]: prev[currentSemester].map((c, i) =>
        i === index ? { ...c, credits: value } : c
      ),
    }))
  }

  function saveCurriculum() {
    localStorage.setItem("editorData", JSON.stringify(curriculum))
    router.push("/curriculum-preview")
  }

  function exportJSON() {
    const dataStr = JSON.stringify(curriculum, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "curriculum.json"
    a.click()
  }

  if (!loaded) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}>
        Loading Editor...
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .editor-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .editor-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.2), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,0.2), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }
        .editor-nav {
          padding: 20px 60px;
          font-size: 22px;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .editor-nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-size: 14px;
          opacity: 0.8;
        }
        .editor-nav-links a:hover {
          opacity: 1;
        }
        .editor-container {
          padding: 40px 60px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 30px;
        }
        @media(max-width: 1000px) {
          .editor-container {
            grid-template-columns: 1fr;
          }
        }
        .editor-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 25px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .editor-semester-list h3 {
          margin-bottom: 15px;
        }
        .editor-semester-item {
          padding: 12px 16px;
          border-radius: 14px;
          margin-bottom: 10px;
          cursor: pointer;
          background: rgba(255,255,255,0.1);
          transition: 0.3s;
        }
        .editor-semester-item.active {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }
        .editor-semester-item:hover {
          background: rgba(255,255,255,0.15);
        }
        .editor-semester-item.active:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }
        .editor-program-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .editor-program-header input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.4);
          color: white;
          font-size: 22px;
          outline: none;
          padding: 4px 0;
        }
        .editor-course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .editor-course-card {
          padding: 20px;
          border-radius: 18px;
          background: rgba(255,255,255,0.1);
          position: relative;
        }
        .editor-course-card input {
          width: 100%;
          padding: 6px;
          border-radius: 8px;
          border: none;
          background: rgba(255,255,255,0.15);
          color: white;
          margin-bottom: 8px;
          outline: none;
        }
        .editor-course-card input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        .editor-credit-input {
          width: 80px !important;
        }
        .editor-delete-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #dc2626;
          border: none;
          color: white;
          padding: 4px 8px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
        }
        .editor-delete-btn:hover {
          background: #b91c1c;
        }
        .editor-add-btn {
          margin-top: 10px;
          padding: 6px 10px;
          border: none;
          border-radius: 20px;
          background: #2563eb;
          color: white;
          cursor: pointer;
          font-size: 14px;
        }
        .editor-add-btn:hover {
          background: #1d4ed8;
        }
        .editor-action-bar {
          margin-top: 30px;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .editor-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
        }
        .editor-btn-primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
        }
        .editor-btn-primary:hover {
          opacity: 0.9;
        }
        .editor-btn-outline {
          background: transparent;
          border: 1px solid #2563eb;
          color: white;
        }
        .editor-btn-outline:hover {
          background: rgba(37,99,235,0.2);
        }
        @media(max-width: 768px) {
          .editor-nav {
            padding: 15px 20px;
            flex-direction: column;
            gap: 10px;
          }
          .editor-container {
            padding: 20px;
          }
        }
      `}</style>

      <div className="editor-page">
        <nav className="editor-nav">
          <span>CurricuForge - Curriculum Editor</span>
          <div className="editor-nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/generate">Generate</a>
            <a href="/curriculum-preview">Preview</a>
            <a href="/version-history">Version History</a>
            <a href="/analytics">Analytics</a>
          </div>
        </nav>

        <div className="editor-container">
          <div className="editor-glass editor-semester-list">
            <h3>Semesters</h3>
            {Object.keys(curriculum).map((sem) => (
              <div
                key={sem}
                className={`editor-semester-item ${sem === currentSemester ? "active" : ""}`}
                onClick={() => switchSemester(sem)}
              >
                {sem}
              </div>
            ))}
            <button className="editor-add-btn" onClick={addSemester}>
              + Add Semester
            </button>
          </div>

          <div className="editor-glass">
            <div className="editor-program-header">
              <input
                value={programTitle}
                onChange={(e) => setProgramTitle(e.target.value)}
              />
              <button className="editor-btn editor-btn-outline">
                Regenerate Semester
              </button>
            </div>

            <div className="editor-course-grid">
              {(curriculum[currentSemester] || []).map((course, index) => (
                <div className="editor-course-card" key={index}>
                  <button
                    className="editor-delete-btn"
                    onClick={() => deleteCourse(index)}
                  >
                    {"x"}
                  </button>
                  <input
                    value={course.name}
                    onChange={(e) => updateCourseName(index, e.target.value)}
                  />
                  <input
                    className="editor-credit-input"
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCredits(index, parseInt(e.target.value) || 0)}
                  />{" "}
                  <span style={{ fontSize: "14px", opacity: 0.7 }}>Credits</span>
                </div>
              ))}
            </div>

            <button className="editor-add-btn" onClick={addCourse}>
              + Add Course
            </button>

            <div className="editor-action-bar">
              <button className="editor-btn editor-btn-primary" onClick={saveCurriculum}>
                Save Changes
              </button>
              <button
                className="editor-btn editor-btn-outline"
                onClick={() => {
                  localStorage.setItem("editorData", JSON.stringify(curriculum))
                  router.push("/curriculum-preview")
                }}
              >
                Publish Curriculum
              </button>
              <button className="editor-btn editor-btn-outline" onClick={exportJSON}>
                Export JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
