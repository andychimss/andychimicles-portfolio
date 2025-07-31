"use client";

import { useState } from "react";

type Step = "company-setup" | "create-campaign" | "review-generation" | "personalized-simulator";

interface FormData {
  companyName: string;
  brandGuidelines: string;
  safetyGuidelines: string;
  forbiddenWords: string;
  apiKey: string;
  selectedPlatforms: string[];
  jingleLyrics: string;
  selectedGenres: string[];
  approvedVariants: string[];
}

export default function AdTuneDashboardPage() {
  const [currentStep, setCurrentStep] = useState<Step>("company-setup");
  const [isLaunched, setIsLaunched] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Indie Rock");
  const [selectedCity, setSelectedCity] = useState("Denver");
  const [isAdServed, setIsAdServed] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    companyName: "Skittles",
    brandGuidelines: "Keep tone fun, colorful, family-friendly.",
    safetyGuidelines: "No profanity, no competitor mentions, comply with FTC.",
    forbiddenWords: "sour, jolly ranchers, fudge",
    apiKey: "DEMO-KEY-123",
    selectedPlatforms: ["Spotify", "Pandora", "Soundcloud"],
    jingleLyrics: `[00:00.00]Hey {city}! Taste the rainbow new!
[00:02.50]Crunchin' down the avenue, flavor lights the night,
[00:05.40]Berry, mango, sour-lime poppin' left and right.
[00:08.20]Candy dreams get real when the chew starts to thrill,
[00:11.00]One bite and you'll feel that Gummies Skittles chill.
[00:13.50]Gum-mieees! Taste the rainbow chewy bright,
[00:16.00]Gum-mieees! {city} hits the flavor right.
[00:18.50]Gum-mieees! Soft burst, color in your day,
[00:21.00]Skittles Gummies! Chew the rainbow-run, don't walk away!`,
    selectedGenres: ["Indie Rock", "Hip-Hop", "EDM"],
    approvedVariants: []
  });

  const audioTracks = [
    { genre: "Hip-Hop", file: "/adtunedashboard/hiphop.mp3", city: "New York" },
    { genre: "EDM", file: "/adtunedashboard/edm.mp3", city: "Los Angeles" },
    { genre: "Indie Rock", file: "/adtunedashboard/indie.mp3", city: "Denver" }
  ];

  const handleContinue = () => {
    if (currentStep === "company-setup") {
      setCurrentStep("create-campaign");
    } else if (currentStep === "create-campaign") {
      setCurrentStep("review-generation");
    } else if (currentStep === "review-generation") {
      setIsLaunched(true);
      setCurrentStep("personalized-simulator");
    }
  };

  const handleApprove = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      approvedVariants: [...prev.approvedVariants.filter(g => g !== genre), genre]
    }));
  };

  const cityMapping: { [key: string]: string } = {
    "Indie Rock": "Denver",
    "Hip-Hop": "New York", 
    "EDM": "Los Angeles"
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-44 bg-gray-800 min-h-screen p-4">
          <h1 className="text-xl font-bold mb-8">AdTune Demo</h1>
          
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4">Current Step:</h3>
            <div className="space-y-2">
              <div className={`p-2 rounded ${currentStep === "company-setup" ? "bg-blue-600" : "bg-gray-700"} 
                              ${formData.companyName ? "text-green-400" : ""}`}>
                1. Company Setup {formData.companyName && "✓"}
              </div>
              <div className={`p-2 rounded ${currentStep === "create-campaign" ? "bg-blue-600" : "bg-gray-700"}
                              ${formData.jingleLyrics ? "text-green-400" : ""}`}>
                2. Create Campaign {formData.jingleLyrics && "✓"}
              </div>
              <div className={`p-2 rounded ${currentStep === "personalized-simulator" ? "bg-blue-600" : "bg-gray-700"}`}>
                3. Personalized Jingle Simulator
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-sm font-semibold mb-2">Demo Settings:</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <div>API Key: {formData.apiKey}</div>
              <div>Forbidden: {formData.forbiddenWords}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {currentStep === "company-setup" && (
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🎵</span>
                <h1 className="text-3xl font-bold">AdTune Demo</h1>
              </div>
              
              <div className="mb-8 bg-white rounded-lg border-2 border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">How it works</h2>
                <div className="text-gray-700 leading-relaxed">
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="font-medium">Set up company guidelines</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-medium">Create campaigns with personalized lyrics</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-medium">Sample AI-generated songs across genres</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-medium">Activate campaign to deliver personalized jingles on Spotify</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-8 text-gray-200">Company Guidelines</h3>

              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2">Company name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Brand guidelines</label>
                  <textarea
                    value={formData.brandGuidelines}
                    onChange={(e) => setFormData(prev => ({ ...prev, brandGuidelines: e.target.value }))}
                    className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Safety guidelines</label>
                  <textarea
                    value={formData.safetyGuidelines}
                    onChange={(e) => setFormData(prev => ({ ...prev, safetyGuidelines: e.target.value }))}
                    className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Forbidden words</label>
                  <input
                    type="text"
                    value={formData.forbiddenWords}
                    onChange={(e) => setFormData(prev => ({ ...prev, forbiddenWords: e.target.value }))}
                    className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Spotify API Key</label>
                  <input
                    type="text"
                    value={formData.apiKey}
                    onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                    className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white"
                  />
                </div>

                <button
                  onClick={handleContinue}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-medium transition-colors cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === "create-campaign" && (
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">📝</span>
                <h1 className="text-3xl font-bold">Create Campaign</h1>
              </div>

              <div className="space-y-8 max-w-4xl">
                <div>
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    <h2 className="text-xl font-semibold">Select ad platforms</h2>
                  </div>
                  <div className="flex gap-6">
                    {["Spotify", "Pandora", "Soundcloud"].map((platform) => (
                      <label key={platform} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.selectedPlatforms.includes(platform)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({ ...prev, selectedPlatforms: [...prev.selectedPlatforms, platform] }));
                            } else {
                              setFormData(prev => ({ ...prev, selectedPlatforms: prev.selectedPlatforms.filter(p => p !== platform) }));
                            }
                          }}
                          className="mr-2 w-4 h-4 text-red-600"
                        />
                        {platform}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                    <h2 className="text-xl font-semibold">Add jingle lyrics</h2>
                  </div>
                  <p className="text-gray-300 mb-4">Use placeholders for listener attributes, e.g., {"{city}"}.</p>
                  <div>
                    <label className="block text-lg font-medium mb-3">Jingle Lyrics</label>
                    <textarea
                      value={formData.jingleLyrics}
                      onChange={(e) => setFormData(prev => ({ ...prev, jingleLyrics: e.target.value }))}
                      className="w-full p-4 bg-gray-700 rounded border border-gray-600 text-white h-48 font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                    <h2 className="text-xl font-semibold">Select genres to generate:</h2>
                  </div>
                  <div className="flex gap-6">
                    {["Indie Rock", "Hip-Hop", "EDM"].map((genre) => (
                      <label key={genre} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.selectedGenres.includes(genre)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({ ...prev, selectedGenres: [...prev.selectedGenres, genre] }));
                            } else {
                              setFormData(prev => ({ ...prev, selectedGenres: prev.selectedGenres.filter(g => g !== genre) }));
                            }
                          }}
                          className="mr-2 w-4 h-4 text-red-600"
                        />
                        {genre}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-medium transition-colors cursor-pointer"
                >
                  Generate Test Jingles
                </button>
              </div>
            </div>
          )}

          {currentStep === "review-generation" && (
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🎧</span>
                <h1 className="text-3xl font-bold">Approve Test Generations</h1>
              </div>
              
              <div className="space-y-6">
                {audioTracks.map((track) => (
                  <div key={track.genre} className="bg-gray-800 rounded p-6">
                    <div className="text-sm mb-4 font-medium">
                      <strong>Genre:</strong> {track.genre} | <strong>City:</strong> {track.city}
                    </div>
                    
                    <audio controls className="w-full mb-4">
                      <source src={track.file} type="audio/mpeg" />
                    </audio>
                    
                    <div className="text-sm font-mono text-gray-300 mb-4">
                      {formData.jingleLyrics.replace(/\{city\}/g, track.city).split('\n').slice(0, 8).join('\n')}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Review:</span>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`review-${track.genre}`}
                          value="approve"
                          checked={formData.approvedVariants.includes(track.genre)}
                          onChange={() => handleApprove(track.genre)}
                          className="mr-2"
                        />
                        ✅ Approve
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`review-${track.genre}`}
                          value="changes"
                          className="mr-2"
                        />
                        ⚠️ Needs changes
                      </label>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4">
                  <button
                    onClick={handleContinue}
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-medium transition-colors cursor-pointer"
                  >
                    Publish Campaign
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded font-medium transition-colors cursor-pointer">
                    Regenerate with Feedback
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === "personalized-simulator" && (
            <div>
              {isLaunched && (
                <div className="bg-green-700 text-white p-4 rounded mb-6">
                  Campaign successfully launched and active on Spotify
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🚀</span>
                <h1 className="text-3xl font-bold">Personalized Jingle Simulator</h1>
              </div>
              
              <p className="text-gray-300 mb-8">
                Simulate Spotify dynamic ad serving based on a user's current playlist's Genre and City.
              </p>

              <div className="grid grid-cols-2 gap-6 max-w-lg mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => {
                      setSelectedGenre(e.target.value);
                      setSelectedCity(cityMapping[e.target.value] || "Denver");
                      setIsAdServed(false); // Reset ad when genre changes
                    }}
                    className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white"
                  >
                    {audioTracks.map((track) => (
                      <option key={track.genre} value={track.genre}>
                        {track.genre}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setIsAdServed(false); // Reset ad when city changes
                    }}
                    className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setIsAdServed(true)}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-medium transition-colors cursor-pointer"
                >
                  Serve Ad
                </button>
                <button 
                  onClick={() => setCurrentStep("create-campaign")}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded font-medium transition-colors cursor-pointer"
                >
                  ← Back to Brief
                </button>
              </div>

              {isAdServed && (
                <div className="bg-gray-800 rounded p-6">
                  <h3 className="text-lg font-semibold mb-4">🎵 Served Ad Preview</h3>
                  
                  <div className="text-sm mb-4 font-medium">
                    <strong>Genre:</strong> {selectedGenre} | <strong>City:</strong> {selectedCity}
                  </div>
                  
                  <audio controls className="w-full mb-4">
                    <source src={audioTracks.find(track => track.genre === selectedGenre)?.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  
                  <div className="text-sm font-mono text-gray-300 mb-4">
                    {formData.jingleLyrics.replace(/\{city\}/g, selectedCity).split('\n').slice(0, 8).join('\n')}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    This ad would be dynamically served to users in {selectedCity} listening to {selectedGenre.toLowerCase()} music on Spotify.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}