"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("curricuforge_user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .dash-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }
        .dash-page {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          min-height: 100vh;
        }
        .dash-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 40px;
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .dash-logo {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .dash-search-box input {
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .dash-search-box input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        .dash-nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .dash-nav-right a {
          color: white;
          text-decoration: none;
          font-size: 14px;
          opacity: 0.8;
        }
        .dash-nav-right a:hover {
          opacity: 1;
        }
        .dash-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.3);
          transition: 0.3s;
        }
        .dash-avatar:hover {
          transform: scale(1.1);
        }
        .dash-main {
          padding: 50px 60px;
        }
        .dash-welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .dash-welcome-header h1 {
          font-size: 28px;
          font-weight: 600;
        }
        .dash-btn-primary {
          padding: 10px 18px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          cursor: pointer;
          transition: 0.3s;
          font-size: 14px;
          font-weight: 600;
        }
        .dash-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99,102,241,0.4);
        }
        .dash-analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }
        .dash-stat-card {
          background: rgba(255,255,255,0.05);
          padding: 25px;
          border-radius: 16px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          transition: 0.3s;
        }
        .dash-stat-card:hover {
          transform: translateY(-6px);
          background: rgba(255,255,255,0.08);
        }
        .dash-stat-icon {
          font-size: 26px;
          margin-bottom: 10px;
        }
        .dash-stat-label {
          font-size: 14px;
          opacity: 0.7;
        }
        .dash-stat-value {
          font-size: 22px;
          font-weight: 600;
        }
        .dash-main h2 {
          margin-bottom: 20px;
          font-weight: 500;
        }
        .dash-recent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .dash-recent-card {
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 14px;
          transition: 0.3s;
          cursor: pointer;
        }
        .dash-recent-card:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-4px);
        }
        .dash-recent-card h3 {
          margin-bottom: 6px;
        }
        .dash-recent-card p {
          opacity: 0.7;
          font-size: 14px;
        }
        .dash-forge-ai-btn {
          position: fixed;
          bottom: 25px;
          right: 25px;
          padding: 14px 20px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(99,102,241,0.4);
          transition: 0.3s;
          font-weight: 600;
        }
        .dash-forge-ai-btn:hover {
          transform: scale(1.05);
        }
        @media(max-width: 768px) {
          .dash-main {
            padding: 30px 20px;
          }
          .dash-welcome-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
          .dash-navbar {
            padding: 15px 20px;
          }
        }
      `}</style>

      <div className="dash-page">
        <nav className="dash-navbar">
          <div className="dash-logo">CurricuForge</div>
          <div className="dash-search-box">
            <input type="text" placeholder="Search curriculums..." />
          </div>
          <div className="dash-nav-right">
            <a href="/generate">Generate</a>
            <a href="/curriculum-editor">Editor</a>
            <a href="/analytics">Analytics</a>
            <a href="/admin">Admin</a>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.email?.charAt(0) || "U"}&size=40&background=2563eb&color=fff`}
              className="dash-avatar"
              alt="User avatar"
              onClick={() => router.push("/profile")}
            />
          </div>
        </nav>

        <main className="dash-main">
          <div className="dash-welcome-header">
            <h1>{"Welcome back, " + (user?.email?.split("@")[0] || "User") + " \uD83D\uDC4B"}</h1>
            <button
              className="dash-btn-primary"
              onClick={() => router.push("/generate")}
            >
              + Create New Curriculum
            </button>
          </div>

          <div className="dash-analytics-grid">
            <div className="dash-stat-card">
              <div className="dash-stat-icon">{"\uD83D\uDCDA"}</div>
              <div className="dash-stat-label">Total Programs</div>
              <div className="dash-stat-value">24</div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon">{"\uD83C\uDF93"}</div>
              <div className="dash-stat-label">Credits Generated</div>
              <div className="dash-stat-value">412</div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon">{"\uD83C\uDFAF"}</div>
              <div className="dash-stat-label">Industry Alignment</div>
              <div className="dash-stat-value">94%</div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon">{"\u2696\uFE0F"}</div>
              <div className="dash-stat-label">Practical Ratio</div>
              <div className="dash-stat-value">68%</div>
            </div>
          </div>

          <h2>Recent Curriculums</h2>
          <div className="dash-recent-grid">
            <div className="dash-recent-card" onClick={() => router.push("/curriculum-editor")}>
              <h3>AI Engineering - BTech</h3>
              <p>4 Semesters - Industry Focus: FinTech</p>
            </div>
            <div className="dash-recent-card" onClick={() => router.push("/curriculum-editor")}>
              <h3>Full Stack Development</h3>
              <p>3 Semesters - Startup Oriented</p>
            </div>
          </div>
        </main>

        <button className="dash-forge-ai-btn">Ask ForgeAI</button>
      </div>
    </>
  )
}
