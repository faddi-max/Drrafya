import React, { useState } from 'react';
import './BabyNameGenerator.css';

const BabyNameGenerator = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('All');
    const [letter, setLetter] = useState('');
    const [origin, setOrigin] = useState('');
    const [meaning, setMeaning] = useState('');
    
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Simulated Internet Database with Pakistani, Indian, and Asian names
    const database = [
        // PAKISTANI NAMES
        { name: "Muhammad", gender: "Boy", meaning: "Praised", origin: "Pakistani/Arabic" },
        { name: "Ali", gender: "Boy", meaning: "Exalted, noble", origin: "Pakistani/Arabic" },
        { name: "Ahmed", gender: "Boy", meaning: "Most commendable", origin: "Pakistani/Arabic" },
        { name: "Hassan", gender: "Boy", meaning: "Handsome", origin: "Pakistani/Arabic" },
        { name: "Hussain", gender: "Boy", meaning: "Good, beautiful", origin: "Pakistani/Arabic" },
        { name: "Bilal", gender: "Boy", meaning: "Wetting, moist", origin: "Pakistani/Arabic" },
        { name: "Ayesha", gender: "Girl", meaning: "Alive, well-living", origin: "Pakistani/Arabic" },
        { name: "Fatima", gender: "Girl", meaning: "Captivating", origin: "Pakistani/Arabic" },
        { name: "Zainab", gender: "Girl", meaning: "Fragrant flower", origin: "Pakistani/Arabic" },
        { name: "Noor", gender: "Girl", meaning: "Light", origin: "Pakistani/Arabic" },
        { name: "Aiza", gender: "Girl", meaning: "Noble, respected", origin: "Pakistani/Urdu" },
        { name: "Hira", gender: "Girl", meaning: "Diamond", origin: "Pakistani/Urdu" },
        { name: "Sana", gender: "Girl", meaning: "Radiance", origin: "Pakistani/Urdu" },

        // INDIAN NAMES
        { name: "Aarav", gender: "Boy", meaning: "Peaceful", origin: "Indian" },
        { name: "Vivaan", gender: "Boy", meaning: "Full of life", origin: "Indian" },
        { name: "Aditya", gender: "Boy", meaning: "Sun", origin: "Indian" },
        { name: "Arjun", gender: "Boy", meaning: "Bright, shining", origin: "Indian" },
        { name: "Reyansh", gender: "Boy", meaning: "Ray of light", origin: "Indian" },
        { name: "Ananya", gender: "Girl", meaning: "Unique", origin: "Indian" },
        { name: "Diya", gender: "Girl", meaning: "Lamp", origin: "Indian" },
        { name: "Saanvi", gender: "Girl", meaning: "Goddess Lakshmi", origin: "Indian" },
        { name: "Priya", gender: "Girl", meaning: "Beloved", origin: "Indian" },
        { name: "Aadhya", gender: "Girl", meaning: "First power", origin: "Indian" },
        { name: "Ishaan", gender: "Boy", meaning: "Sun", origin: "Indian" },
        { name: "Kavya", gender: "Girl", meaning: "Poem", origin: "Indian" },
        { name: "Aanya", gender: "Girl", meaning: "Gift of God", origin: "Indian" },

        // ASIAN NAMES
        { name: "Haruto", gender: "Boy", meaning: "Sun flying", origin: "Japanese" },
        { name: "Yuki", gender: "Girl", meaning: "Snow", origin: "Japanese" },
        { name: "Sakura", gender: "Girl", meaning: "Cherry blossom", origin: "Japanese" },
        { name: "Min-jun", gender: "Boy", meaning: "Sharp, talented", origin: "Korean" },
        { name: "Ji-woo", gender: "Girl", meaning: "Wisdom and universe", origin: "Korean" },
        { name: "Wei", gender: "Boy", meaning: "Power", origin: "Chinese" },
        { name: "Mei", gender: "Girl", meaning: "Beautiful", origin: "Chinese" },
        { name: "Kai", gender: "Unisex", meaning: "Sea, warrior", origin: "Hawaiian" },
        { name: "Nova", gender: "Unisex", meaning: "New, star", origin: "Latin" },

        // POPULAR WESTERN NAMES (For A, B, S, M...)
        { name: "Aiden", gender: "Boy", meaning: "Little fire", origin: "Irish" },
        { name: "Aria", gender: "Girl", meaning: "Air, melody", origin: "Italian" },
        { name: "Aurora", gender: "Girl", meaning: "Dawn", origin: "Latin" },
        { name: "Amelia", gender: "Girl", meaning: "Work", origin: "Germanic" },
        { name: "Benjamin", gender: "Boy", meaning: "Son of the right hand", origin: "Hebrew" },
        { name: "Bryan", gender: "Boy", meaning: "Noble", origin: "Celtic" },
        { name: "Charlotte", gender: "Girl", meaning: "Free man", origin: "French" },
        { name: "David", gender: "Boy", meaning: "Beloved", origin: "Hebrew" },
        { name: "Emma", gender: "Girl", meaning: "Whole or universal", origin: "Germanic" },
        { name: "Ethan", gender: "Boy", meaning: "Strong, firm", origin: "Hebrew" },
        { name: "Freya", gender: "Girl", meaning: "Noble lady", origin: "Norse" },
        { name: "Liam", gender: "Boy", meaning: "Strong-willed warrior", origin: "Irish" },
        { name: "Luna", gender: "Girl", meaning: "Moon", origin: "Latin" },
        { name: "Leo", gender: "Boy", meaning: "Lion", origin: "Latin" },
        { name: "Mia", gender: "Girl", meaning: "Mine, bitter", origin: "Latin" },
        { name: "Noah", gender: "Boy", meaning: "Rest, comfort", origin: "Hebrew" },
        { name: "Oliver", gender: "Boy", meaning: "Olive tree planter", origin: "Latin" },
        { name: "Olivia", gender: "Girl", meaning: "Olive tree", origin: "Latin" },
        { name: "Sophia", gender: "Girl", meaning: "Wisdom", origin: "Greek" },
        { name: "Zayn", gender: "Boy", meaning: "Beautiful, graceful", origin: "Arabic" },
        { name: "Zara", gender: "Girl", meaning: "Bloom, princess", origin: "Arabic" },
    ];

    // Function simulating a live internet fetch
    const handleSearch = async () => {
        setIsLoading(true);
        setHasSearched(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Advanced Search Logic (Name, Gender, Letter, Origin, Meaning)
        const filtered = database.filter(item => {
            const matchesName = name === '' || item.name.toLowerCase().includes(name.toLowerCase());
            const matchesGender = gender === 'All' || item.gender === gender;
            const matchesLetter = letter === '' || item.name.toLowerCase().startsWith(letter.toLowerCase());
            const matchesOrigin = origin === '' || item.origin.toLowerCase().includes(origin.toLowerCase());
            const matchesMeaning = meaning === '' || item.meaning.toLowerCase().includes(meaning.toLowerCase());
            
            return matchesName && matchesGender && matchesLetter && matchesOrigin && matchesMeaning;
        });

        setResults(filtered);
        setIsLoading(false);
    };

    const handleReset = () => {
        setName(''); setGender('All'); setLetter(''); setOrigin(''); setMeaning('');
        setResults([]); setHasSearched(false);
    };

    return (
        <div className="container">
            <div className="badge">
                <span>💖</span> Baby Name Insights
            </div>
            
            <h1>Baby <span className="highlight">Name</span> Generator</h1>
            <p className="subtitle">Search our global Asian & International internet engine for names, meanings, and origins.</p>

            <div className="form-wrapper">

               <div className="form-group">
                    <label><span className="icon">✏️</span> Starting Letter</label>
                    <input type="text" placeholder="e.g., A, B, Z..." value={letter} maxLength={1} onChange={(e) => setLetter(e.target.value)} />
                </div> 
               

                <div className="form-group">
                    <label><span className="icon">👶</span> Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="All">All Genders</option>
                        <option value="Boy">Boy</option>
                        <option value="Girl">Girl</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>

                

                <div className="form-group">
                    <label><span className="icon">🌍</span> Origin</label>
                    <input type="text" placeholder="e.g., Pakistani, Indian, Japanese" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </div>

                 {/* New Name Search */}
                <div className="form-group">
                    <label><span className="icon">🔍</span> Search by Name</label>
                    <input type="text" placeholder="Type a name (e.g., Ayesha)" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <button className="btn-primary" onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching Internet...' : 'Search Names ›'}
                </button>

                {hasSearched && !isLoading && (
                    <button className="btn-secondary" onClick={handleReset}>
                        Reset All Filters
                    </button>
                )}
            </div>
            
            <div className="results">
                {isLoading && <div className="empty-state">Fetching data from global names database...</div>}
                
                {hasSearched && !isLoading && (
                    results.length > 0 ? (
                        <>
                            <div className="stats">
                                Found <strong>{results.length}</strong> names matching your criteria!
                            </div>
                            <div className="results-grid">
                                {results.map((nameItem, index) => (
                                    <div key={index} className="result-card">
                                        <div className="name-text">{nameItem.name}</div>
                                        <div className="meaning-text">"{nameItem.meaning}"</div>
                                        <div className="tag-group">
                                            <div className="tag">{nameItem.gender}</div>
                                            <div className="tag origin-tag">{nameItem.origin}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            No names found with those exact filters. Try removing the Letter or Meaning!
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default BabyNameGenerator;