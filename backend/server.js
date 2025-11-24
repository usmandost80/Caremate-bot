import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Symptom responses including psychological symptoms
const symptomResponses = {
  // Physical symptoms
  "fever": "A fever can be a sign of infection. Rest, drink plenty of fluids, and monitor your temperature. If it goes above 39 °C or lasts more than a few days, see a doctor.",
  "cough": "A cough may be from a cold or respiratory infection. Try to rest, stay hydrated, and if you have difficulty breathing, see a healthcare provider.",
  "sore throat": "A sore throat is common in viral infections. Gargle warm salt water, drink warm fluids, and rest your voice.",
  "headache": "Headaches may be caused by stress, dehydration, or tension. Drink water, rest in a quiet place, and take over‑the-counter pain relief if needed.",
  "fatigue": "Feeling very tired could mean your body is fighting an illness. Rest, ensure you're eating well and sleeping enough.",
  "shortness of breath": "Shortness of breath can be serious. If it's mild, sit upright and rest; if severe or comes with chest pain, see a doctor immediately.",
  "nausea": "Nausea may be due to stomach upset or infection. Eat light foods like crackers, consider ginger tea. If vomiting is severe, consult a doctor.",
  "vomiting": "If you are vomiting, try to sip small amounts of water or oral rehydration solution. If you can't keep liquids down, see a healthcare provider.",
  "diarrhea": "Stay hydrated. Avoid dairy and fatty foods; if diarrhea lasts more than 2 days or you have blood in stool, seek medical help.",
  "abdominal pain": "Stomach pain can be caused by many things. Rest, and if the pain is severe, sharp, or lasts long, see a doctor.",
  "chest pain": "Chest pain may be serious. Call emergency services if sharp, sudden, or accompanied by breathing issues.",
  // Psychological / mental health symptoms
  "anxiety": "Feeling anxious is common. Try deep breathing, grounding exercises, or short walks. Seek professional help if it becomes overwhelming.",
  "depression": "Low mood or lack of interest can signal depression. Connect with friends, maintain routines, and consider talking to a mental health professional.",
  "stress": "Stress can affect your body and mind. Try relaxation techniques, time management, and self-care. If it feels unmanageable, seek counseling.",
  "insomnia": "Trouble sleeping may be caused by stress or habits. Maintain a sleep schedule, reduce screen time before bed, and relax before sleeping.",
  "panic attack": "If experiencing panic attacks, focus on slow breathing, safe space, and grounding techniques. Professional support is recommended.",
  "mood swings": "Rapid mood changes can be due to stress, hormonal changes, or mental health conditions. Keep track and seek support if frequent.",
  "restlessness": "Feeling restless may improve with light exercise, meditation, or relaxation exercises.",
  "irritability": "Irritability can be linked to fatigue, stress, or underlying mental health issues. Take breaks, self-care, and consult a professional if persistent."
};

app.post("/api/generate", (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ reply: "Please tell me your symptoms." });
  }

  const p = prompt.toLowerCase();
  for (const [symptom, advice] of Object.entries(symptomResponses)) {
    if (p.includes(symptom)) {
      return res.json({ reply: advice });
    }
  }

  // If nothing matches
  return res.json({
    reply:
      "I'm not totally sure what you mean. Can you describe your symptom more clearly? Perhaps mention if it's pain, fever, or feeling anxious, depressed, or stressed.",
  });
});

// Use Render-assigned PORT or fallback to 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Triage backend running on port ${PORT}`);
});
