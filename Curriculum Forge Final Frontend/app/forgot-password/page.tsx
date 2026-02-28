"use client"

import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  function sendReset() {
    if (!email) {
      alert("Please enter your email.")
      return
    }
    setShowSuccess(true)
  }

  return (
    <>
      <style jsx global>{`
        .forgot-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .forgot-page {
          height: 100vh;
          background:
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.2), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,0.2), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .forgot-card {
          width: 100%;
          max-width: 420px;
          padding: 40px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .forgot-card h2 {
          margin-bottom: 10px;
        }
        .forgot-subtitle {
          font-size: 14px;
          opacity: 0.7;
          margin-bottom: 30px;
        }
        .forgot-input-group {
          margin-bottom: 20px;
        }
        .forgot-input-group input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          color: white;
          outline: none;
          font-size: 14px;
        }
        .forgot-input-group input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        .forgot-input-group input:focus {
          border-color: #6366f1;
        }
        .forgot-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          font-size: 16px;
        }
        .forgot-btn:hover {
          opacity: 0.9;
        }
        .forgot-back-link {
          margin-top: 20px;
          font-size: 14px;
          text-align: center;
        }
        .forgot-back-link a {
          color: #6366f1;
          text-decoration: none;
        }
        .forgot-back-link a:hover {
          text-decoration: underline;
        }
        .forgot-success {
          margin-top: 20px;
          padding: 12px;
          background: rgba(34,197,94,0.2);
          border-radius: 10px;
          color: white;
        }
      `}</style>
      <div className="forgot-page">
        <div className="forgot-card">
          <h2>Forgot Password?</h2>
          <p className="forgot-subtitle">{"Enter your registered email and we'll send a reset link."}</p>

          <div className="forgot-input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="forgot-btn" onClick={sendReset}>Send Reset Link</button>

          {showSuccess && (
            <div className="forgot-success">
              Reset link sent successfully! Check your email.
            </div>
          )}

          <div className="forgot-back-link">
            {"Remember your password? "}
            <a href="/login">Back to Login</a>
          </div>
        </div>
      </div>
    </>
  )
}
