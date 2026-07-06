import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set body parser with high limit for base64 images
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Lazy initializer for GoogleGenAI
let aiInstance: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// API endpoint for Fruit Analysis
app.post("/api/analyze-fruit", async (req, res) => {
  try {
    const { image, namaBuah } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Sila unggah gambar buah terlebih dahulu." });
    }

    // Parse base64 image data
    let mimeType = "image/jpeg";
    let base64Data = image;

    if (image.startsWith("data:")) {
      const match = image.match(/^data:([^;]+);base64,(.*)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      }
    }

    // Get lazy AI client
    const ai = getAIClient();

    // Prepare system instructions and prompt in Indonesian
    const promptText = `Anda adalah sistem pakar analisis kematangan buah berbasis citra visual.
Ketika menerima gambar buah ini, lakukan analisis secara detail berdasarkan:
1. WARNA: Identifikasi warna dominan dan distribusinya
2. TEKSTUR: Evaluasi permukaan (halus/kasar/berbintik/bercak)
3. BENTUK: Deteksi perubahan bentuk akibat tingkat kematangan

Klasifikasikan buah ini ke dalam salah satu kategori berikut:
- MENTAH (Warna dominan hijau/pucat, tekstur keras/mulus kencang)
- MATANG (Warna dominan cerah/khas kuning/merah, tekstur optimal)
- TERLALU MATANG (Warna dominan gelap/coklat/banyak bercak hitam, tekstur lunak)

Informasi buah yang dikirim oleh pengguna (jika ada): "${namaBuah || 'Tidak ditentukan'}". 
Jika buah yang dikirim tidak ditentukan, deteksi jenis buahnya (misalnya Mangga, Pisang, Apel, Alpukat, Pepaya, Jeruk, dll) secara akurat dari gambar.

Berikan output dalam struktur JSON yang akurat dengan bahasa Indonesia yang formal, informatif, dan mendalam.`;

    // Make Gemini API call with Schema enforcement
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        },
        {
          text: promptText,
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedFruit: {
              type: Type.STRING,
              description: "Detected fruit name (e.g., Mangga, Pisang, Apel, Alpukat, dll)",
            },
            kategori: {
              type: Type.STRING,
              description: "Must be exactly 'MENTAH' or 'MATANG' or 'TERLALU MATANG'",
            },
            keyakinan: {
              type: Type.INTEGER,
              description: "Confidence percentage of ripeness prediction (value between 0 and 100)",
            },
            warna: {
              type: Type.STRING,
              description: "Detailed visual analysis of color and distribution (2-3 sentences in Indonesian)",
            },
            tekstur: {
              type: Type.STRING,
              description: "Detailed analysis of surface texture (2-3 sentences in Indonesian)",
            },
            bentuk: {
              type: Type.STRING,
              description: "Detailed analysis of shape changes due to ripeness (2-3 sentences in Indonesian)",
            },
            rekomendasi: {
              type: Type.STRING,
              description: "Specific action/consumption recommendations based on ripeness (2-3 sentences in Indonesian)",
            },
          },
          required: ["detectedFruit", "kategori", "keyakinan", "warna", "tekstur", "bentuk", "rekomendasi"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Gagal menerima hasil analisis dari Gemini.");
    }

    const resultJson = JSON.parse(resultText);
    return res.json(resultJson);

  } catch (error: any) {
    console.error("Analysis Error:", error);
    return res.status(500).json({
      error: "Gagal menganalisis gambar buah.",
      details: error.message || error,
    });
  }
});

// Configure Vite and static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
