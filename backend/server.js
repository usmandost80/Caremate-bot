import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Comprehensive symptom-response object
const symptomResponses = {
  // --- Physical Symptoms ---
  "fever": "A fever can be a sign of infection. Rest, drink plenty of fluids, and monitor your temperature. If it goes above 39 °C or lasts more than a few days, see a doctor.",
  "cough": "A cough may be from a cold or respiratory infection. Try to rest, stay hydrated, and if you have difficulty breathing, see a healthcare provider.",
  "sore throat": "A sore throat is common in viral infections. Gargle warm salt water, drink warm fluids, and rest your voice.",
  "headache": "Headaches may be caused by stress, dehydration, or tension. Drink water, rest in a quiet place, and take over-the-counter pain relief if needed.",
  "fatigue": "Feeling very tired could mean your body is fighting an illness. Rest, eat well, and sleep enough.",
  "shortness of breath": "Shortness of breath can be serious. If mild, sit upright and rest; if severe or with chest pain, see a doctor immediately.",
  "weakness": "Muscle weakness might be due to fatigue or illness. Try to rest and avoid strenuous activity.",
  "dizziness": "Dizziness can happen from dehydration or low blood pressure. Sit or lie down, drink water, and get medical advice if persistent.",
  "nausea": "Nausea may be due to stomach upset or infection. Eat light foods like crackers or ginger tea. Severe vomiting warrants medical attention.",
  "vomiting": "Sip small amounts of water or oral rehydration solution. If unable to keep fluids down, see a healthcare provider.",
  "diarrhea": "Stay hydrated. Avoid dairy and fatty foods. If diarrhea lasts more than 2 days or has blood, seek medical help.",
  "abdominal pain": "Rest and monitor your pain. Severe, sharp, or persistent pain requires medical evaluation.",
  "chest pain": "Chest pain may be serious. Seek emergency care if sharp, sudden, or associated with breathing difficulty.",
  "palpitations": "Feeling your heart race can be unsettling. Rest and avoid caffeine. If it continues, see a doctor.",
  "sweating": "Excessive sweating may be from fever or anxiety. Rest, cool down, and seek medical advice if unexplained.",
  "chills": "Chills often come with fever. Stay warm and monitor your temperature.",
  "muscle aches": "Common in viral infections. Rest, warm compress, or mild pain relief may help.",
  "joint pain": "Could be inflammation or strain. Rest and consult a doctor if persistent or severe.",
  "back pain": "Muscular or other causes. Gentle movements and rest recommended; see a doctor if severe.",
  "rash": "Keep skin clean and avoid scratching. Seek care if spreading or painful.",
  "itching": "May be due to allergies. Cool compresses and avoid scratching. Medical attention if severe.",
  "sneezing": "Common with colds or allergies. Use tissues, wash hands, and rest.",
  "runny nose": "Drink fluids, rest, and consider saline drops if needed.",
  "stuffy nose": "Use a humidifier or saline spray. Avoid irritants.",
  "loss of taste": "May be due to infection. Monitor symptoms and rest.",
  "loss of smell": "If sudden, consult a doctor. Otherwise, monitor and rest.",
  "sore eyes": "Avoid rubbing. Keep eyes clean. Seek ophthalmologist if persistent.",
  "ear pain": "Warm compress and rest. See doctor if severe or prolonged.",
  "blurred vision": "May occur with fatigue or dehydration. Seek care if persistent.",
  "numbness": "Sudden or severe numbness requires urgent evaluation.",
  "tingling": "Could be from poor circulation or nerves. Monitor, seek care if persistent.",
  "burning sensation": "May be from nerves or inflammation. Seek medical advice if persistent.",
  "heartburn": "Avoid spicy foods, eat smaller meals. See doctor if frequent.",
  "acid reflux": "Avoid lying down after meals. Limit caffeine. Consult a gastroenterologist if chronic.",
  "difficulty swallowing": "Seek medical care if painful or persistent.",
  "hoarseness": "Rest your voice. See ENT if persistent.",
  "nosebleed": "Lean forward and pinch gently. Seek care if heavy or recurrent.",
  "confusion": "Sudden confusion is serious. Seek urgent care.",
  "weakness in limb": "May indicate neurological issue. Seek immediate medical help if sudden.",
  "seizure": "Ensure safety, cushion head, and call emergency services.",
  "chest tightness": "Seek emergency care if new or severe.",
  "rapid heartbeat": "Rest, avoid caffeine, and consult a doctor if persistent.",
  "loss of appetite": "Try small meals. Seek care if prolonged.",
  "thirst": "Drink water. Seek care if excessive.",
  "frequent urination": "May signal infection. See doctor if painful or blood present.",
  "painful urination": "Seek medical attention for urine tests.",
  "joint stiffness": "Move gently. Consult specialist if recurring.",
  "leg pain": "Could be strain or circulation issues. Seek care if swelling persists.",
  "bone pain": "Persistent or severe pain needs evaluation.",
  "bruising easily": "Seek blood test if unexplained.",
  "bleeding": "Heavy or unusual bleeding requires urgent attention.",
  "rash with fever": "Seek healthcare provider promptly.",
  "gastrointestinal pain": "Monitor diet and pain. See doctor if lasts >1 day.",
  "constipation": "Try fiber and hydration. Consult doctor if severe.",
  "bloody stool": "Immediate medical evaluation required.",
  "joint swelling": "Rest, apply ice, and see a specialist if needed.",

  // --- Psychological / Mental Health Symptoms ---
  "anxiety": "Feeling anxious is common. Try deep breathing, grounding exercises, or talking to a friend. Consult a mental health professional if persistent.",
  "stress": "Stress affects body and mind. Take breaks, exercise, and practice relaxation techniques. Seek counseling if overwhelming.",
  "sadness": "Feeling sad sometimes is normal. Talk to someone you trust, get sunlight, and exercise. Persistent sadness may need professional support.",
  "depression": "Persistent low mood or hopelessness may indicate depression. Seek a mental health professional.",
  "insomnia": "Trouble sleeping may result from stress or habits. Maintain a sleep schedule and relax before bed. Consult a doctor if ongoing.",
  "panic": "Panic feelings can be frightening. Try slow, deep breaths. Seek professional help if frequent or severe.",
  "irritability": "Unusual irritability may stem from stress or lack of sleep. Relaxation and talking to someone may help.",
  "memory issues": "Difficulty concentrating or remembering things may occur under stress. Rest, eat well, and consult a professional if persistent.",
  "low motivation": "Low motivation may come from fatigue or mood changes. Small achievable tasks and self-care can help. Seek guidance if prolonged.",
  "mood swings": "Mood fluctuations are normal but may need support if they affect daily life. Reach out to a counselor if needed.",
  "social withdrawal": "Avoiding friends or activities may indicate stress or depression. Seek support and professional help if persistent.",
  "panic attacks": "Sudden intense fear with physical symptoms. Try grounding, but consult a mental health professional.",
  "hopelessness": "Persistent feelings of hopelessness should be discussed with a mental health professional.",
  "self-harm thoughts": "If you feel like hurting yourself, seek **immediate professional help**. Call local emergency services or a crisis helpline."
};

app.post("/api/generate", (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ reply: "Please describe your symptom." });

  const p = prompt.toLowerCase();

  for (const [symptom, advice] of Object.entries(symptomResponses)) {
    if (p.includes(symptom)) return res.json({ reply: advice });
  }

  // Fallback if nothing matches
  return res.json({
    reply:
      "I'm not completely sure what you mean. Could you describe your symptom more clearly? For example, mention pain, fever, cough, stress, anxiety, or sadness.",
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Triage backend running on port ${PORT}`);
});
