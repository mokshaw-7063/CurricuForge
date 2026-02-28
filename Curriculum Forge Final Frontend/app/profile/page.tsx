"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("curricuforge_user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem("curricuforge_user")
    router.push("/login")
  }

  const displayName = user?.email?.split("@")[0] || "User"
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <>
      <style jsx global>{`
        .profile-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .profile-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.2), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,0.2), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }
        .profile-nav {
          padding: 20px 60px;
          font-size: 22px;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .profile-nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-size: 14px;
          opacity: 0.8;
        }
        .profile-nav-links a:hover {
          opacity: 1;
        }
        .profile-container {
          padding: 40px 60px;
          max-width: 800px;
          margin: 0 auto;
        }
        .profile-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 30px;
        }
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.3);
        }
        .profile-info h2 {
          font-size: 24px;
          margin-bottom: 4px;
        }
        .profile-info p {
          opacity: 0.7;
          font-size: 14px;
        }
        .profile-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .profile-detail-item {
          padding: 18px;
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
        }
        .profile-detail-item label {
          display: block;
          font-size: 12px;
          opacity: 0.6;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .profile-detail-item span {
          font-size: 16px;
          font-weight: 500;
        }
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 20px;
        }
        .profile-stat-item {
          text-align: center;
          padding: 20px;
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
        }
        .profile-stat-item h3 {
          font-size: 28px;
          margin-bottom: 4px;
        }
        .profile-stat-item p {
          opacity: 0.7;
          font-size: 13px;
        }
        .profile-actions {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        .profile-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
        }
        .profile-btn-primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
        }
        .profile-btn-outline {
          background: transparent;
          border: 1px solid #2563eb;
          color: white;
        }
        .profile-btn-danger {
          background: transparent;
          border: 1px solid #dc2626;
          color: #dc2626;
        }
        .profile-btn:hover {
          opacity: 0.85;
        }
        @media(max-width: 768px) {
          .profile-container {
            padding: 20px;
          }
          .profile-details {
            grid-template-columns: 1fr;
          }
          .profile-stats {
            grid-template-columns: 1fr;
          }
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
          .profile-nav {
            padding: 15px 20px;
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      <div className="profile-page">
        <nav className="profile-nav">
          <span>CurricuForge - Profile</span>
          <div className="profile-nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/generate">Generate</a>
            <a href="/curriculum-editor">Editor</a>
            <a href="/analytics">Analytics</a>
          </div>
        </nav>

        <div className="profile-container">
          <div className="profile-glass">
            <div className="profile-header">
              <img
                src={`https://ui-avatars.com/api/?name=${initials}&size=80&background=2563eb&color=fff`}
                className="profile-avatar"
                alt="User avatar"
              />
              <div className="profile-info">
                <h2>{displayName}</h2>
                <p>{user?.email || "user@example.com"}</p>
                <p style={{ marginTop: "4px", opacity: 0.8 }}>
                  Role: {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Faculty"}
                </p>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-detail-item">
                <label>Email</label>
                <span>{user?.email || "user@example.com"}</span>
              </div>
              <div className="profile-detail-item">
                <label>Role</label>
                <span>{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Faculty"}</span>
              </div>
              <div className="profile-detail-item">
                <label>Department</label>
                <span>Computer Science</span>
              </div>
              <div className="profile-detail-item">
                <label>Institution</label>
                <span>CurricuForge University</span>
              </div>
            </div>
          </div>

          <div className="profile-glass">
            <h3 style={{ marginBottom: "15px" }}>Activity Summary</h3>
            <div className="profile-stats">
              <div className="profile-stat-item">
                <h3>12</h3>
                <p>Curriculums Created</p>
              </div>
              <div className="profile-stat-item">
                <h3>8</h3>
                <p>Published</p>
              </div>
              <div className="profile-stat-item">
                <h3>156</h3>
                <p>Credits Generated</p>
              </div>
            </div>
          </div>

          <div className="profile-glass">
            <div className="profile-actions">
              <a href="/dashboard" className="profile-btn profile-btn-primary" style={{ textDecoration: "none" }}>
                Back to Dashboard
              </a>
              <a href="/curriculum-editor" className="profile-btn profile-btn-outline" style={{ textDecoration: "none" }}>
                Open Editor
              </a>
              <button className="profile-btn profile-btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
