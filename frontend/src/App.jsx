import React, { useState } from "react";
import femaleAvatar from "./assets/user-female.png";
import maleAvatar from "./assets/user-male.png";
import botAvatar from "./assets/bot.png";

function App() {
  const [gender, setGender] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- YOUR FUNCTION (unchanged) ----------
  const sendMessage = async () => {
    if (!input.trim()) return;

    const message = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: `You are a gentle medical triage assistant. Respond softly.\nUser: ${message}\nAssistant:`,
  }),
});

const data = await res.json();
setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);

    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong while contacting the server ❤️",
        },
      ]);
    }

    setLoading(false);
  };
  // -------------------------------------------------

  const getUserAvatar = () => {
    return gender === "male" ? maleAvatar : femaleAvatar;
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      
      {!gender ? (
        <div className="mt-20 bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Select Your Avatar</h2>

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setGender("male")}
              className="p-3 bg-blue-200 rounded-xl"
            >
              <img src={maleAvatar} className="h-20" />
              <p>Male</p>
            </button>

            <button
              onClick={() => setGender("female")}
              className="p-3 bg-pink-200 rounded-xl"
            >
              <img src={femaleAvatar} className="h-20" />
              <p>Female</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-4">

          <div className="h-96 overflow-y-auto p-2">
            {messages.map((msg, i) => (
              <div key={i} className="flex mb-4">
                <img
                  src={msg.sender === "bot" ? botAvatar : getUserAvatar()}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div className="bg-gray-200 p-3 rounded-xl max-w-xs">
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 italic">The assistant is thinking...</div>
            )}
          </div>

          <div className="flex mt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow border p-2 rounded-xl"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white px-4 rounded-xl"
            >
              Send
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
