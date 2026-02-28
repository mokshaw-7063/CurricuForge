"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password || !role) {
      setError("Please fill all fields")
      return
    }
    setError("")
    // Store user info in localStorage for navigation
    if (typeof window !== "undefined") {
      localStorage.setItem("curricuforge_user", JSON.stringify({ email, role }))
    }
    router.push("/dashboard")
  }

  return (
    <>
      <style jsx global>{`
        .login-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }
        .login-page {
          height: 100vh;
          background: linear-gradient(135deg, #edefef, #efeff1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-container {
          width: 90%;
          max-width: 1100px;
          background: white;
          border-radius: 20px;
          display: flex;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .login-left-panel {
          flex: 1;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .login-logo {
          font-size: 36px;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .login-tagline {
          margin-bottom: 30px;
          opacity: 0.9;
        }
        .login-features p {
          margin-bottom: 12px;
        }
        .login-right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .login-card {
          width: 100%;
          max-width: 350px;
        }
        .login-card h2 {
          margin-bottom: 10px;
          color: #1e293b;
        }
        .login-subtitle {
          margin-bottom: 30px;
          color: gray;
        }
        .login-input-group {
          position: relative;
          margin-bottom: 20px;
        }
        .login-input-group input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          outline: none;
          transition: 0.3s;
          font-size: 14px;
          color: #1e293b;
          background: white;
        }
        .login-input-group label {
          position: absolute;
          top: 12px;
          left: 12px;
          color: gray;
          transition: 0.3s;
          pointer-events: none;
          background: white;
          font-size: 14px;
        }
        .login-input-group input:focus {
          border-color: #4f46e5;
        }
        .login-input-group input:focus + label,
        .login-input-group input:not(:placeholder-shown) + label {
          top: -8px;
          left: 10px;
          font-size: 12px;
          padding: 0 4px;
          color: #4f46e5;
        }
        .login-input-group select {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          outline: none;
          transition: 0.3s;
          font-size: 14px;
          color: #1e293b;
          background: white;
        }
        .login-input-group select:focus {
          border-color: #4f46e5;
        }
        .login-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 14px;
          color: #1e293b;
        }
        .login-row label {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .login-forgot {
          text-decoration: none;
          color: #4f46e5;
          font-weight: 500;
        }
        .login-forgot:hover {
          text-decoration: underline;
        }
        .login-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          font-size: 16px;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(79,70,229,0.3);
        }
        .login-switch {
          margin-top: 20px;
          font-size: 14px;
          color: #1e293b;
        }
        .login-switch a {
          color: #4f46e5;
          text-decoration: none;
        }
        .login-switch a:hover {
          text-decoration: underline;
        }
        .login-error {
          color: #dc2626;
          font-size: 13px;
          margin-bottom: 10px;
        }
        @media(max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          .login-left-panel {
            padding: 40px;
          }
        }
      `}</style>
      <div className="login-page">
        <div className="login-container">
          <div className="login-left-panel">
            <h1 className="login-logo">CurricuForge</h1>
            <p className="login-tagline">Generative AI-Powered Curriculum Design Platform</p>
            <div className="login-features">
              <p>{"✨ AI-powered curriculum generation"}</p>
              <p>{"📚 Industry-aligned courses"}</p>
              <p>{"🎓 Trusted by 500+ institutions"}</p>
            </div>
          </div>

          <div className="login-right-panel">
            <div className="login-card">
              <h2>Welcome back</h2>
              <p className="login-subtitle">Sign in to continue building</p>

              {error && <p className="login-error">{error}</p>}

              <form onSubmit={handleSubmit}>
                <div className="login-input-group">
                  <input
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Email address</label>
                </div>

                <div className="login-input-group">
                  <input
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>

                <div className="login-input-group">
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                    <option value="reviewer">Reviewer</option>
                  </select>
                </div>

                <div className="login-row">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="/forgot-password" className="login-forgot">Forgot password?</a>
                </div>

                <button type="submit" className="login-btn">Sign in</button>

                <p className="login-switch">
                  {"Don't have an account? "}
                  <a href="/register">Create account</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
