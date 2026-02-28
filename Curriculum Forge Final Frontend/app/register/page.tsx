"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    educationLevel: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setError("")
    alert("Account Created Successfully!")
    router.push("/login")
  }

  return (
    <>
      <style jsx global>{`
        .register-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }
        .register-page {
          height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .register-container {
          width: 95%;
          max-width: 1000px;
          background: white;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
        }
        .register-left {
          flex: 1;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          padding: 70px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .register-left h1 {
          font-size: 40px;
          margin-bottom: 15px;
          font-weight: 700;
        }
        .register-left p {
          opacity: 0.9;
          margin-bottom: 30px;
        }
        .register-left ul {
          list-style: none;
        }
        .register-left li {
          margin-bottom: 15px;
          font-size: 15px;
          opacity: 0.95;
        }
        .register-right {
          flex: 1;
          padding: 60px 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .register-form-box {
          width: 100%;
          max-width: 380px;
        }
        .register-form-box h2 {
          margin-bottom: 8px;
          color: #1e293b;
        }
        .register-form-box .register-subtitle {
          color: gray;
          margin-bottom: 30px;
        }
        .register-input-group {
          position: relative;
          margin-bottom: 20px;
        }
        .register-input-group input,
        .register-input-group select {
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
        .register-input-group label {
          position: absolute;
          top: 12px;
          left: 12px;
          color: gray;
          transition: 0.3s;
          pointer-events: none;
          background: white;
          font-size: 14px;
        }
        .register-input-group input:focus,
        .register-input-group select:focus {
          border-color: #4f46e5;
        }
        .register-input-group input:focus + label,
        .register-input-group input:not(:placeholder-shown) + label {
          top: -8px;
          left: 10px;
          font-size: 12px;
          padding: 0 4px;
          color: #4f46e5;
        }
        .register-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-size: 16px;
        }
        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(79,70,229,0.3);
        }
        .register-switch {
          margin-top: 20px;
          font-size: 14px;
          color: #1e293b;
        }
        .register-switch a {
          color: #4f46e5;
          text-decoration: none;
        }
        .register-switch a:hover {
          text-decoration: underline;
        }
        .register-error {
          color: #dc2626;
          font-size: 13px;
          margin-bottom: 10px;
        }
        @media(max-width: 768px) {
          .register-container {
            flex-direction: column;
          }
          .register-left {
            text-align: center;
            padding: 40px;
          }
        }
      `}</style>
      <div className="register-page">
        <div className="register-container">
          <div className="register-left">
            <h1>CurricuForge</h1>
            <p>AI-Powered Curriculum Engineering Platform</p>
            <ul>
              <li>{"✔ Structured semester-wise programs"}</li>
              <li>{"✔ Industry-aligned course architecture"}</li>
              <li>{"✔ Capstone-ready frameworks"}</li>
              <li>{"✔ AI-powered academic assistant"}</li>
            </ul>
          </div>

          <div className="register-right">
            <div className="register-form-box">
              <h2>Create Account</h2>
              <p className="register-subtitle">Join the future of curriculum design</p>

              {error && <p className="register-error">{error}</p>}

              <form onSubmit={handleSubmit}>
                <div className="register-input-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <label>Full Name</label>
                </div>

                <div className="register-input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label>Email Address</label>
                </div>

                <div className="register-input-group">
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Education Level</option>
                    <option>Diploma</option>
                    <option>BTech</option>
                    <option>Masters</option>
                    <option>Certification</option>
                  </select>
                </div>

                <div className="register-input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label>Password</label>
                </div>

                <div className="register-input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder=" "
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label>Confirm Password</label>
                </div>

                <button type="submit" className="register-btn">Create Account</button>

                <p className="register-switch">
                  {"Already have an account? "}
                  <a href="/login">Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
