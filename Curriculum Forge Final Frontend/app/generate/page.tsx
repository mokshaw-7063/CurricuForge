"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function GeneratePage() {
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [level, setLevel] = useState("")
  const [semesters, setSemesters] = useState("")
  const [weeklyHours, setWeeklyHours] = useState("")
  const [industryFocus, setIndustryFocus] = useState("")
  const [loading, setLoading] = useState(false)

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!subject || !level || !semesters) return

    setLoading(true)

    setTimeout(() => {
      const semCount = parseInt(semesters)
      const editorData: Record<string, { name: string; credits: number }[]> = {}

      const coursePool = [
        ["Fundamentals of ", 3, "Core"],
        ["Advanced ", 4, "Core"],
        ["Practical ", 3, "Lab"],
        [" Research Methods", 3, "Elective"],
        [" Industry Applications", 4, "Core"],
        ["Data Analysis for ", 3, "Core"],
        [" Project Workshop", 3, "Lab"],
        [" Seminar", 2, "Elective"],
      ]

      for (let i = 0; i < semCount; i++) {
        const semName = `Semester ${i + 1}`
        const numCourses = 3 + Math.floor(Math.random() * 3)
        const courses: { name: string; credits: number }[] = []

        for (let j = 0; j < numCourses; j++) {
          const tmpl = coursePool[(i * 3 + j) % coursePool.length]
          const courseName =
            String(tmpl[0]).endsWith(" ")
              ? `${tmpl[0]}${subject}${i > 0 ? " " + (i + 1) : ""}`
              : `${subject}${tmpl[0]}${i > 0 ? " " + (i + 1) : ""}`
          courses.push({
            name: courseName,
            credits: tmpl[1] as number,
          })
        }
        editorData[semName] = courses
      }

      localStorage.setItem("editorData", JSON.stringify(editorData))
      localStorage.setItem(
        "generatedMeta",
        JSON.stringify({ subject, level, semesters: semCount, weeklyHours, industryFocus })
      )
      setLoading(false)
      router.push("/curriculum-editor")
    }, 2000)
  }

  return (
    <>
      <style jsx global>{`
        .gen-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }
        .gen-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 20%, rgba(37,99,235,0.15), transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(124,58,237,0.15), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          display: flex;
          flex-direction: column;
        }
        .gen-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 40px;
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .gen-nav-logo {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .gen-nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .gen-nav-links a {
          color: white;
          text-decoration: none;
          font-size: 14px;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .gen-nav-links a:hover {
          opacity: 1;
        }
        .gen-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .gen-card {
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .gen-card h1 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 6px;
          text-align: center;
        }
        .gen-card .gen-subtitle {
          font-size: 14px;
          opacity: 0.6;
          margin-bottom: 32px;
          text-align: center;
        }
        .gen-form-group {
          margin-bottom: 20px;
        }
        .gen-form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          opacity: 0.9;
        }
        .gen-form-group label .gen-required {
          color: #f87171;
          margin-left: 2px;
        }
        .gen-form-group input,
        .gen-form-group select {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s, background 0.3s;
        }
        .gen-form-group input::placeholder {
          color: rgba(255,255,255,0.4);
        }
        .gen-form-group input:focus,
        .gen-form-group select:focus {
          border-color: #2563eb;
          background: rgba(255,255,255,0.12);
        }
        .gen-form-group select {
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }
        .gen-form-group select option {
          background: #1e293b;
          color: white;
        }
        .gen-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .gen-submit-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .gen-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(37,99,235,0.4);
        }
        .gen-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .gen-spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: gen-spin 0.6s linear infinite;
        }
        @keyframes gen-spin {
          to { transform: rotate(360deg); }
        }
        @media(max-width: 600px) {
          .gen-card {
            padding: 28px 20px;
          }
          .gen-form-row {
            grid-template-columns: 1fr;
          }
          .gen-nav {
            padding: 15px 20px;
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      <div className="gen-page">
        <nav className="gen-nav">
          <div className="gen-nav-logo">GenAI Curriculum Generator</div>
          <div className="gen-nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/curriculum-editor">Editor</a>
            <a href="/analytics">Analytics</a>
            <a href="/profile">Profile</a>
          </div>
        </nav>

        <div className="gen-center">
          <div className="gen-card">
            <h1>Design Your Curriculum</h1>
            <p className="gen-subtitle">
              Fill in the details below and let AI craft a complete semester-wise learning path for you.
            </p>

            <form onSubmit={handleGenerate}>
              <div className="gen-form-group">
                <label>
                  Skill / Subject <span className="gen-required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Artificial Intelligence, Web Development..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="gen-form-group">
                <label>
                  Education Level <span className="gen-required">*</span>
                </label>
                <select value={level} onChange={(e) => setLevel(e.target.value)} required>
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="gen-form-group">
                <label>
                  Number of Semesters <span className="gen-required">*</span>
                </label>
                <select value={semesters} onChange={(e) => setSemesters(e.target.value)} required>
                  <option value="">Select semesters</option>
                  <option value="1">1 Semester</option>
                  <option value="2">2 Semesters</option>
                  <option value="3">3 Semesters</option>
                  <option value="4">4 Semesters</option>
                  <option value="5">5 Semesters</option>
                  <option value="6">6 Semesters</option>
                  <option value="7">7 Semesters</option>
                  <option value="8">8 Semesters</option>
                </select>
              </div>

              <div className="gen-form-row">
                <div className="gen-form-group">
                  <label>Weekly Hours (optional)</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                  />
                </div>
                <div className="gen-form-group">
                  <label>Industry Focus (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. FinTech, Healthcare..."
                    value={industryFocus}
                    onChange={(e) => setIndustryFocus(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="gen-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="gen-spinner" />
                    Generating...
                  </>
                ) : (
                  "Generate Curriculum"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
