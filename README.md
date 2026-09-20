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

---

## 🚀 ขั้นตอนการเชื่อมต่อกับ Netlify (2 วิธีง่ายๆ)

### วิธีที่ 1: เชื่อมต่อผ่าน GitHub (แนะนำที่สุด - ทำครั้งเดียว อัปเดตตลอดชีพ)

1. **สร้าง Git Repository บน GitHub** (ใช้ `gh` CLI ในเครื่องนี้ได้ทันที):
   ```bash
   cd "/Users/user/Documents/Home Cloud AI Project/b8b-status"
   git init
   git add .
   git commit -m "feat: initial B8B status dashboard for Netlify"
   gh repo create tanakorndb/b8b-status --public --source=. --remote=origin --push
   ```

2. **เปิดหน้าเว็บ [Netlify](https://app.netlify.com)**:
   - คลิก **"Add new site"** > **"Import an existing project"**
   - เลือก **GitHub** > ค้นหาและเลือกคลัง **`tanakorndb/b8b-status`**
   - การตั้งค่า Build Settings:
     - **Build command**: `node build.js` (Netlify จะอ่านจาก `netlify.toml` ให้อัตโนมัติ)
     - **Publish directory**: `.` (หรือเว้นว่างไว้ตาม `netlify.toml`)
   - คลิก **"Deploy b8b-status"** เสร็จสิ้น!

3. **ตั้งค่า Custom Domain (ทางเลือกเสริม)**:
   - ไปที่ **Site configuration** > **Domain management**
   - เพิ่มโดเมน เช่น `status.b8b.group` หรือ `status.b8b.homes`
   - ใน Cloudflare DNS เพียงชี้ CNAME:
     - Name: `status`
     - Target: `<your-site-name>.netlify.app` (Proxy: DNS Only หรือ Proxied ก็ได้)

---

### วิธีที่ 2: Deploy ขึ้น Netlify ทันทีผ่าน Terminal (ไม่ต้องต่อ GitHub)

หากมี Netlify CLI ในเครื่อง สามารถรันคำสั่งบรรทัดเดียวได้เลย:
```bash
cd "/Users/user/Documents/Home Cloud AI Project/b8b-status"
npx netlify deploy --prod
```

---

## ⚡ กลไกการอัปเดตข้อมูลแบบ Zero-Cost

1. **ฝั่ง Web Browser บน Netlify**:
   - หน้าเว็บจะโหลด `status.json` ที่แคชไว้สั้นๆ (30 วินาที) ทำให้หน้าเว็บโหลดเร็วระดับ Instant (< 50ms)
   - มีปุ่ม **Refresh** และ **Auto-refresh** ทุก 30 วินาที
   - มีปุ่ม **Copy Report** คัดลอก Markdown ส่งทีมหรือลูกค้าได้ทันที
2. **ฝั่ง Host macOS CI**:
   - รัน GitHub Action `.github/workflows/status-sync.yml` บน self-hosted runner `mac-owner-*` ทุก 30 นาที
   - เมื่อสถานะมีการเปลี่ยนแปลง จะ commit และ push ไปที่ GitHub ทำให้ Netlify แสดงสถานะล่าสุดเสมอโดยไม่มีค่าใช้จ่ายเซิร์ฟเวอร์ใดๆ ทั้งสิ้น

---

## 💻 การทดสอบและดูหน้าเว็บในเครื่อง (Local Preview)

```bash
# วิธีที่ 1: เปิดผ่านเบราว์เซอร์ตรงๆ
open "/Users/user/Documents/Home Cloud AI Project/b8b-status/index.html"

# วิธีที่ 2: สั่งผ่าน b8b CLI
b8b web
```
