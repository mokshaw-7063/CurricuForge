"use client"

import { useState } from "react"

interface Program {
  id: number
  name: string
  creator: string
  status: "pending" | "approved" | "rejected"
}

export default function AdminPanelPage() {
  const [programs, setPrograms] = useState<Program[]>([
    { id: 1, name: "AI Engineering", creator: "Anvitha", status: "pending" },
    { id: 2, name: "Data Science", creator: "Dr. Rao", status: "approved" },
    { id: 3, name: "Cybersecurity", creator: "Prof. Kumar", status: "pending" },
    { id: 4, name: "Cloud Computing", creator: "Dr. Sharma", status: "rejected" },
  ])

  function approve(id: number) {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "approved" } : p))
    )
  }

  function reject(id: number) {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "rejected" } : p))
    )
  }

  const approvedCount = programs.filter((p) => p.status === "approved").length
  const approvalRate = programs.length
    ? Math.round((approvedCount / programs.length) * 100)
    : 0

  return (
    <>
      <style jsx global>{`
        .admin-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .admin-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.2), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,0.2), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }
        .admin-nav {
          padding: 20px 60px;
          font-size: 22px;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-size: 14px;
          opacity: 0.8;
        }
        .admin-nav-links a:hover {
          opacity: 1;
        }
        .admin-container {
          padding: 40px 60px;
        }
        .admin-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .admin-glass h2 {
          margin-bottom: 15px;
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .admin-stat {
          text-align: center;
          padding: 20px;
          border-radius: 18px;
          background: rgba(255,255,255,0.1);
        }
        .admin-stat h3 {
          font-size: 28px;
          margin-bottom: 6px;
        }
        .admin-stat p {
          opacity: 0.7;
          font-size: 14px;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th,
        .admin-table td {
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          text-align: left;
        }
        .admin-table th {
          opacity: 0.7;
          font-weight: 500;
        }
        .admin-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          display: inline-block;
        }
        .admin-badge.approved {
          background: #16a34a;
        }
        .admin-badge.pending {
          background: #f59e0b;
          color: #1e293b;
        }
        .admin-badge.rejected {
          background: #dc2626;
        }
        .admin-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          background: #2563eb;
          color: white;
          margin-right: 5px;
          font-size: 13px;
        }
        .admin-btn:hover {
          opacity: 0.85;
        }
        .admin-btn-danger {
          background: #dc2626;
        }
        @media(max-width: 768px) {
          .admin-container {
            padding: 20px;
          }
          .admin-nav {
            padding: 15px 20px;
            flex-direction: column;
            gap: 10px;
          }
          .admin-table {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="admin-page">
        <nav className="admin-nav">
          <span>CurricuForge - Admin Panel</span>
          <div className="admin-nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/generate">Generate</a>
            <a href="/analytics">Analytics</a>
            <a href="/profile">Profile</a>
            <a href="/login">Logout</a>
          </div>
        </nav>

        <div className="admin-container">
          <div className="admin-glass">
            <h2>System Overview</h2>
            <div className="admin-stats-grid">
              <div className="admin-stat">
                <h3>128</h3>
                <p>Total Users</p>
              </div>
              <div className="admin-stat">
                <h3>{programs.length}</h3>
                <p>Total Programs</p>
              </div>
              <div className="admin-stat">
                <h3>{approvalRate}%</h3>
                <p>Approval Rate</p>
              </div>
            </div>
          </div>

          <div className="admin-glass">
            <h2>Curriculum Approval Queue</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id}>
                    <td>{program.name}</td>
                    <td>{program.creator}</td>
                    <td>
                      <span className={`admin-badge ${program.status}`}>
                        {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {program.status === "pending" ? (
                        <>
                          <button className="admin-btn" onClick={() => approve(program.id)}>
                            Approve
                          </button>
                          <button
                            className="admin-btn admin-btn-danger"
                            onClick={() => reject(program.id)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span style={{ opacity: 0.5 }}>{"--"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
