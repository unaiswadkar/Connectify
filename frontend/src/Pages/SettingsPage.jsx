import { Check } from "lucide-react";
import { useThemeStore } from "../Store/useThemeStore";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "night",
  "coffee",
  "winter",
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Appearance</h1>
          <p className="text-base-content/60 mt-2">
            Choose a theme for your chat application.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`
                 rounded-xl border-2 transition-all h-40 
                hover:scale-105 overflow-hidden
                ${theme === t ? "border-primary shadow-lg" : "border-base-300"}
              `}
            >
              <div data-theme={t} className="bg-base-100 p-4">
                {/* Preview */}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                  </div>

                  {theme === t && <Check className="w-4 h-4 text-primary" />}
                </div>

                <div className="space-y-2">
                  <div className="h-2 rounded bg-primary"></div>

                  <div className="h-2 rounded bg-secondary w-2/3"></div>

                  <div className="flex gap-2 pt-2">
                    <div className="badge badge-primary badge-sm"></div>
                    <div className="badge badge-secondary badge-sm"></div>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 mt-1">
                <p className="capitalize font-medium">{t}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Chat Preview */}
      <div data-theme={theme} className="mt-10">
        <h2
          className="text-2xl font-bold
         flex justify-center pt-10  mb-2"
        >
          Chat Preview
        </h2>
        <p className="flex justify-center text- mb-6">
          Preview how your chats will look with the selected theme.
        </p>

        <div className="w-200 mx-auto rounded-2xl border border-base-300 bg-base-100 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 bg-base-200 border-b border-base-300">
            <div className="avatar placeholder">
              <div className="bg-[url(https://template.canva.com/EAGvD_psk8c/1/0/1600w-8OdaFv6O5e0.jpg)] text-primary-content rounded-full w-10"></div>
            </div>

            <div>
              <h3 className="font-semibold">Unais</h3>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4 h-72 overflow-hidden bg-base-100">
            <div className="chat chat-start">
              <div className="chat-bubble">Hey! 👋 How are you?</div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary">
                I'm doing great! Working on my chat app.
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-bubble">
                Nice! DaisyUI themes look awesome.
              </div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-secondary">
                Yep 😄 I'm testing them in the settings page.
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-base-200 border-t border-base-300">
            <div className="join w-full">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered join-item flex-1"
                disabled
              />
              <button className="btn btn-primary join-item">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
