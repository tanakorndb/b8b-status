# 🌐 B8B Cloud AI · Live Status Dashboard (Netlify Ready)

Modern, ultra-lightweight, and professional status dashboard for **B8B Cloud AI Infrastructure**. Built specifically for zero-cost deployment on **Netlify** with real-time sync from macOS Self-Hosted CI Host.

---

## 📂 โครงสร้างไฟล์ทั้งหมด (Clean & Systematic Structure)

โปรเจกต์ถูกจัดเก็บอย่างเป็นระบบอยู่ที่:
`/Users/user/Documents/Home Cloud AI Project/b8b-status/`

```text
b8b-status/
├── index.html                  # Single-Page Dashboard (Glassmorphism & Obsidian Dark Theme)
├── status.json                 # Structured live JSON metrics data
├── netlify.toml                # Netlify build configuration & HTTP caching headers
├── build.js                    # Netlify build script (auto-tests live endpoints on deploy)
├── scripts/
│   └── update-status.js        # Script รวบรวมสถานะระบบจริงทั้งหมด (Host, Runners, Endpoints, MCP)
├── .github/
│   └── workflows/
│       └── status-sync.yml     # Workflow ซิงค์ status.json อัตโนมัติทุก 30 นาทีบน self-hosted runner
└── README.md                   # เอกสารคู่มือและการเชื่อมต่อ Netlify
```
