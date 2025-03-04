import React, { useState } from 'react';
import { Search, Phone, AtSign, User, Github, Instagram, Linkedin, Loader } from 'lucide-react';

function App() {
  const [searchType, setSearchType] = useState<'phone' | 'email' | 'nickname'>('phone');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Initializing secure connection...",
    "Scanning global databases...",
    "Analyzing digital footprints...",
    "Processing intelligence data...",
    "Compiling findings..."
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setCurrentStep(0);
    setResults([]);

    // Simulate progressive loading steps
    for (let i = 0; i < loadingSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Simulate final results
    await new Promise(resolve => setTimeout(resolve, 400));
    setResults([
      { type: 'Social Media', platform: 'Twitter', username: searchQuery },
      { type: 'Email', address: `${searchQuery}@example.com` },
      { type: 'Location', country: 'Unknown' }
    ]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header with Social Links */}
      <div className="glass-panel py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-slate-400 mb-3 font-medium">
            Developed by Thomas O'neil Álvarez
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/ccyl13" 
               className="social-link"
               target="_blank" 
               rel="noopener noreferrer">
              <Github size={22} />
            </a>
            <a href="https://www.instagram.com/thomas_oneil_alvarez_/" 
               className="social-link"
               target="_blank" 
               rel="noopener noreferrer">
              <Instagram size={22} />
            </a>
            <a href="https://www.linkedin.com/in/thomasoneilálvarez/" 
               className="social-link"
               target="_blank" 
               rel="noopener noreferrer">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold mb-3 text-white tracking-tight">
            OSINT Scanner
            <span className="text-emerald-500">v1.0</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">Advanced Open Source Intelligence Tool</p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setSearchType('phone')}
                className={`search-type-button ${searchType === 'phone' ? 'active' : ''}`}
              >
                <Phone size={18} />
                <span>Phone</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchType('email')}
                className={`search-type-button ${searchType === 'email' ? 'active' : ''}`}
              >
                <AtSign size={18} />
                <span>Email</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchType('nickname')}
                className={`search-type-button ${searchType === 'nickname' ? 'active' : ''}`}
              >
                <User size={18} />
                <span>Nickname</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Enter ${searchType} to analyze...`}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-4 pl-12
                         text-slate-300 placeholder:text-slate-600
                         focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20
                         transition-colors duration-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600" size={20} />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="search-button"
                disabled={isLoading || !searchQuery.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="animate-spin" size={20} />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search size={20} />
                    <span>Start Analysis</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {isLoading && (
          <div className="glass-panel p-8 text-center space-y-6 fade-in scanning-effect">
            <div className="scanning-line"></div>
            <div className="space-y-4">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentStep
                      ? 'opacity-100 scale-100'
                      : index < currentStep
                      ? 'opacity-50 scale-95'
                      : 'opacity-0 scale-90'
                  }`}
                >
                  <p className={`terminal-effect ${index === currentStep ? 'typewriter' : ''}`}>
                    {step}
                  </p>
                  {index === currentStep && (
                    <div className="flex justify-center mt-2">
                      <div className="loading-grid">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6 fade-in">
            <h2 className="text-2xl font-semibold text-white mb-6">Intelligence Report</h2>
            {results.map((result, index) => (
              <div 
                key={index} 
                className="result-card"
                style={{
                  animation: `fadeIn 0.5s ease-out forwards ${index * 0.2}s`,
                  opacity: 0
                }}
              >
                <h3 className="text-emerald-400 text-xl font-semibold mb-4 border-b border-slate-800 pb-2">
                  {result.type}
                </h3>
                <pre className="text-sm font-mono bg-slate-950/50 p-4 rounded-lg overflow-x-auto text-slate-300">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}

        <footer className="text-center mt-16 text-slate-500 text-sm glass-panel py-4">
          <p>Developed by Thomas O'neil Álvarez • For educational purposes only</p>
        </footer>
      </main>
    </div>
  );
}

export default App;