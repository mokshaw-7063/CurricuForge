"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const barData = [
  { name: "Total Courses", value: 10 },
  { name: "Total Credits", value: 120 },
]

const doughnutData = [
  { name: "Practical", value: 70 },
  { name: "Theory", value: 30 },
]

const radarData = [
  { subject: "Programming", A: 85 },
  { subject: "Math", A: 70 },
  { subject: "Research", A: 60 },
  { subject: "Industry", A: 90 },
  { subject: "Practical", A: 75 },
]

const bloomsData = [
  { name: "Remember", value: 10 },
  { name: "Understand", value: 20 },
  { name: "Apply", value: 25 },
  { name: "Analyze", value: 20 },
  { name: "Evaluate", value: 15 },
  { name: "Create", value: 10 },
]

const COLORS_DOUGHNUT = ["#2563eb", "#7c3aed"]
const COLORS_BLOOMS = ["#2563eb", "#7c3aed", "#06b6d4", "#14b8a6", "#f59e0b", "#ef4444"]

export default function AnalyticsPage() {
  return (
    <>
      <style jsx global>{`
        .analytics-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .analytics-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.2), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,0.2), transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }
        .analytics-nav {
          padding: 20px 60px;
          font-size: 22px;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .analytics-nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          opacity: 0.8;
          font-size: 14px;
        }
        .analytics-nav-links a:hover {
          opacity: 1;
        }
        .analytics-container {
          padding: 40px 60px;
        }
        .analytics-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .analytics-glass h2 {
          margin-bottom: 6px;
        }
        .analytics-glass h3 {
          margin-bottom: 15px;
        }
        .analytics-glass p {
          opacity: 0.7;
        }
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }
        @media(max-width: 768px) {
          .analytics-container {
            padding: 20px;
          }
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          .analytics-nav {
            padding: 15px 20px;
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      <div className="analytics-page">
        <nav className="analytics-nav">
          <span>CurricuForge - Curriculum Analytics</span>
          <div className="analytics-nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/generate">Generate</a>
            <a href="/curriculum-editor">Editor</a>
            <a href="/profile">Profile</a>
          </div>
        </nav>

        <div className="analytics-container">
          <div className="analytics-glass">
            <h2>Curriculum Analytics Overview</h2>
            <p>AI-powered structural breakdown of your curriculum.</p>
          </div>

          <div className="analytics-grid">
            <div className="analytics-glass">
              <h3>Credit Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: "white" }} />
                  <YAxis tick={{ fill: "white" }} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="analytics-glass">
              <h3>Practical vs Theory</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={doughnutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {doughnutData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_DOUGHNUT[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "white" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="analytics-glass">
              <h3>Skill Coverage Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "white", fontSize: 12 }} />
                  <PolarRadiusAxis tick={{ fill: "white" }} />
                  <Radar
                    name="Coverage %"
                    dataKey="A"
                    stroke="#2563eb"
                    fill="rgba(37,99,235,0.3)"
                    fillOpacity={0.6}
                  />
                  <Legend wrapperStyle={{ color: "white" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="analytics-glass">
              <h3>{"Bloom's Taxonomy"}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bloomsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {bloomsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_BLOOMS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "white" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
