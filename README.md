# 🧮 Ganitam Nirmoktra

> **Mathematics. Unlocked.**  
> An AI-powered mathematics learning platform that teaches students **multiple ways** to solve problems — turning math fear into curiosity.

![Version](https://img.shields.io/badge/version-1.0.0--MVP-blue)
![Stack](https://img.shields.io/badge/stack-MERN-green)
![AI](https://img.shields.io/badge/AI-Ollama%20%7C%20Qwen%202.5-purple)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 📖 About The Project

Most students hate mathematics because they are taught **only one method** to solve a problem. When that one method doesn't click, they feel lost, frustrated, and start fearing the subject.

**Ganitam Nirmoktra** changes that.

Instead of giving students just one solution, our AI mentor explains every problem using **multiple methods** with clear step-by-step breakdowns — helping students truly *understand* mathematics rather than just memorize answers.

> *"Where Curiosity Meets Computation."*

---

## ✨ Features

- 🔢 **Multi-Method Solving** — See every possible way to solve a problem
- 📐 **Step by Step Breakdown** — Understand every step with clear explanations
- 🎯 **Grade Level Filter** — Tailored content from Class 6 to Class 12
- 📚 **Subject Coverage** — Algebra, Geometry, Arithmetic, Trigonometry and more
- 📷 **OCR Image Input** — Upload a photo of your textbook question
- 🎤 **Voice Input** — Speak your question using Whisper AI
- ✏️ **Math Editor** — MathQuill powered equation editor
- 🎨 **Beautiful Rendering** — KaTeX renders all math like a real textbook
- 📜 **Solution History** — Access all your past solved problems
- 🔐 **Secure Auth** — JWT based authentication

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + Vite | UI Framework |
| Tailwind CSS | Styling |
| React Router DOM | Page Navigation |
| MathQuill | Math Input Editor |
| KaTeX | Math Expression Rendering |
| Axios | API Calls |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server Framework |
| MongoDB + Mongoose | Database |
| JWT + BCrypt | Authentication |
| Multer | File Upload Handling |
| Tesseract.js | OCR Image Processing |
| Whisper AI | Speech to Text |
| Ollama (Qwen 2.5) | AI Math Solver |
| Mongoose Paginate v2 | Advanced Queries |
| Express Validator | Input Validation |
| Helmet + Rate Limiter | Security |

---

## 🏗️ Project Structure

```
ganitam-nirmoktra/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/        # Navbar, Footer
│       │   ├── ui/            # Buttons, Cards, Inputs
│       │   └── shared/        # StarField, Loader
│       ├── pages/             # All route pages
│       ├── hooks/             # Custom React hooks
│       ├── context/           # Auth context
│       ├── services/          # API call functions
│       ├── constants/         # Static data
│       └── utils/             # Helper functions
│
└── backend/
    └── src/
        ├── features/
        │   ├── auth/          # auth.controller, routes, validator
        │   ├── user/          # user.model, controller, routes
        │   ├── solver/        # solver.controller, routes
        │   ├── problem/       # problem.model, controller, routes
        │   ├── history/       # history.model, controller, routes
        │   └── ocr/           # ocr.controller, routes
        ├── services/          # ollama, whisper, ocr services
        ├── config/            # db, multer, cloudinary config
        ├── middleware/        # auth, error, rateLimiter
        ├── utils/             # token, promptBuilder, cleanResponse
        └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Ollama installed locally
- OpenAI API key (for Whisper)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/ganitam-nirmoktra.git
cd ganitam-nirmoktra
```

**2. Install Frontend dependencies**
```bash
cd frontend
npm install
```

**3. Install Backend dependencies**
```bash
cd backend
npm install
```

**4. Setup environment variables**

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
OLLAMA_URL=http://localhost:11434
OPENAI_API_KEY=your_openai_key_for_whisper
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

**5. Pull the AI model with Ollama**
```bash
ollama pull qwen2.5:7b
```

**6. Run the project**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login user
```

### Solver
```
POST   /api/solver/solve         Solve text problem
POST   /api/solver/voice-solve   Solve voice input
```

### OCR
```
POST   /api/ocr/extract       Extract text from image
```

### History
```
GET    /api/history           Get paginated history
GET    /api/history/:id       Get single history item
DELETE /api/history/:id       Delete history item
```

### User
```
GET    /api/user/profile      Get user profile
PUT    /api/user/profile      Update user profile
```

---

## 🗺️ Roadmap

- [x] Frontend Architecture
- [x] Data Models & Schemas
- [ ] Auth System (Register + Login)
- [ ] AI Solver Integration
- [ ] OCR Image Input
- [ ] Voice Input (Whisper)
- [ ] Solution History
- [ ] Dashboard
- [ ] Deploy MVP

### Future Phases

| Phase | Target | Focus |
|---|---|---|
| Phase 1 | School (Class 6-12) | Core MVP ← We are here |
| Phase 2 | JEE / NEET Prep | Monetization |
| Phase 3 | College Level | Scale |
| Phase 4 | Competitive Exams | Premium |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Chandan** — Junior MERN Stack Developer  
Passionate about Mathematics and building tools that make learning easier.

[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/yourusername)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Ollama](https://ollama.com) — Local AI inference
- [Qwen 2.5](https://qwenlm.github.io) — Math reasoning model
- [KaTeX](https://katex.org) — Math rendering
- [MathQuill](http://mathquill.com) — Math input editor
- [Tesseract.js](https://tesseract.projectnaptha.com) — OCR
- [OpenAI Whisper](https://openai.com/research/whisper) — Speech to text

---

<div align="center">
  <strong>Mathematics. Unlocked. 🧮</strong>
  <br/>
  Built with ❤️ and a deep love for Mathematics
</div>