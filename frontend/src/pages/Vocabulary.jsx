import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Search, Volume2, BookMarked, MessageCircle, Sparkles } from "lucide-react";
import api from "../services/api";

const pageConfig = {
  '/vocabulary': { endpoint: '/vocabulary/', title: 'Glossariy', subtitle: 'Tibbiy ingliz tili lug\'ati', icon: BookMarked, color: 'bg-teal-100 text-teal-600', nameField: 'word', transField: 'translation' },
  '/idioms': { endpoint: '/idioms/', title: 'Medical Idioms', subtitle: 'Tibbiyotga oid idiomalar', icon: MessageCircle, color: 'bg-emerald-100 text-emerald-600', nameField: 'idiom', transField: 'meaning' },
  '/phrasal-verbs': { endpoint: '/phrasal-verbs/', title: 'Phrasal Verbs', subtitle: 'Tibbiyotga oid phrasal verblar', icon: Sparkles, color: 'bg-cyan-100 text-cyan-600', nameField: 'verb', transField: 'meaning' },
};

function SpeakButton({ text, accent }) {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(() => {
    if (!text) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setSpeaking(true);
    const u = new SpeechSynthesisUtterance(text);
    const langCode = accent === 'US' ? 'en-US' : 'en-GB';
    u.lang = langCode;
    u.rate = 0.85;
    const voices = synth.getVoices();
    const voice = voices.find(v => v.lang === langCode) || voices.find(v => v.lang.startsWith('en'));
    if (voice) u.voice = voice;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setTimeout(() => synth.speak(u), 50);
  }, [text, accent]);

  return (
    <button onClick={speak} title={`${accent} talaffuz`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        speaking
          ? 'bg-teal-500 text-white border-teal-500 scale-105 shadow-md'
          : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600 hover:shadow-sm'
      }`}>
      <span>{accent}</span>
      <Volume2 className={`w-3.5 h-3.5 ${speaking ? 'animate-pulse' : ''}`} />
    </button>
  );
}

export default function Vocabulary() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const config = pageConfig[location.pathname] || pageConfig['/vocabulary'];
  const Icon = config.icon;

  useEffect(() => {
    setLoading(true);
    setSearch("");
    api.get(config.endpoint).then((res) => {
      setWords(Array.isArray(res.data) ? res.data : res.data.results || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.pathname]);

  const getName = (w) => w[config.nameField] || w.word || w.idiom || w.verb || '';
  const getTrans = (w) => w[config.transField] || w.translation || w.meaning || '';

  const filtered = words.filter((w) =>
    getName(w).toLowerCase().includes(search.toLowerCase()) ||
    getTrans(w).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${config.color.split(' ')[0]} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${config.color.split(' ')[1]}`} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{config.title}</h1>
          <p className="text-sm text-gray-500">{config.subtitle}</p>
        </div>
        <span className="ml-auto text-sm text-gray-400">{words.length} ta</span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          className="input" style={{ paddingLeft: "2.5rem" }} placeholder="Qidirish..." />
      </div>

      <div className="grid gap-3">
        {filtered.map((word, i) => (
          <div key={word.id || i} className="card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-lg font-semibold text-teal-700">{getName(word)}</span>
                  <div className="flex items-center gap-1.5">
                    <SpeakButton text={getName(word)} accent="US" />
                    <SpeakButton text={getName(word)} accent="UK" />
                  </div>
                </div>
                <p className="text-emerald-600 font-medium">{getTrans(word)}</p>
              </div>
            </div>
            {(word.definition || word.example_sentence) && (
              <p className="text-sm text-gray-600 mt-2">{word.definition || word.example_sentence}</p>
            )}
            {word.example && (
              <p className="text-sm text-gray-500 mt-2 italic border-l-2 border-teal-200 pl-3">"{word.example}"</p>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">Hech narsa topilmadi</div>
      )}
    </div>
  );
}
