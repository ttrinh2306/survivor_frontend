import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function BioForm() {
    const [occupation, setOccupation] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [petpeeves, setPetpeeves] = useState('');
    const [threewords, setThreewords] = useState('');
    const [why, setWhy] = useState('');
    const [experience, setExperience] = useState('');
    const [accomplishment, setAccomplishment] = useState('');
    const [inspiration, setInspiration] = useState('');

    const [result, setResult] = useState({ name: '', imageUrl: '' });
    const resultRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bioString = [
                occupation,
                hobbies,
                petpeeves,
                threewords,
                why,
                experience,
                accomplishment,
                inspiration
            ].join(' '); // Join all answers with a space. You can use '\n' for newline.
    
            const response = await axios.post('http://backend:5000/compare_bio', {
                bio: bioString // Send the aggregated string as 'bio'
            });
    
            setResult({
                name: response.data.similar_player,
                imageUrl: response.data.image_url // or the key name sent by your Flask API
            });
        } catch (error) {
            console.error('Error fetching similar player', error);
            // Optionally handle the error state here
        }
    };

    useEffect(() => {
        if (result.name) {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [result.name]);

    return (
        <div className="center-container">
            <img src="jeff.jpeg" alt="Jeff Probst pointing" className="scrolling-image" />

            <form onSubmit={handleSubmit}>
                <div className="question">
                        <span className="number">1</span> What's your occupation?
                    </div>
                    <textarea value={occupation} onChange={(e) => setOccupation(e.target.value)} 
                    placeholder = "e.g. waitress, graduate student, data scientist"
                    className="textarea" />

                    <div className="question">
                        <span className="number">2</span> What are your hobbies?
                    </div>
                    <textarea value={hobbies} onChange={(e) => setHobbies(e.target.value)} 
                    placeholder = "e.g. rock climb, basketball, run"
                    className="textarea" />

                    <div className="question">
                        <span className="number">3</span> What are your pet peeves?
                    </div>
                    <textarea value={petpeeves} onChange={(e) => setPetpeeves(e.target.value)} 
                    placeholder = "e.g. when people chew with their mouth open, when people give up easily"
                    className="textarea" />

                    <div className="question">
                        <span className="number">4</span> What are three words to describe you?
                    </div>
                    <textarea value={threewords} onChange={(e) => setThreewords(e.target.value)}
                    placeholder = "e.g. charismatic, competitive, goofy"
                    className="textarea" />

                    <div className="question">
                        <span className="number">5</span> Why do you want to be on Survivor?
                    </div>
                    <textarea value={why} onChange={(e) => setWhy(e.target.value)} 
                    placeholder = "e.g. because I trained my whole life for this, because I am a strategic wizard and like to manipulate others"
                    className="textarea" />

                    <div className="question">
                        <span className="number">6</span> What's one life experience you feel has prepared you for the game?
                    </div>
                    <textarea value={experience} onChange={(e) => setExperience(e.target.value)} 
                    placeholder = "e.g. grew up in a low income household"
                    
                    className="textarea" />

                    <div className="question">
                        <span className="number">7</span> What is one experience you are most proud of?
                    </div>
                    <textarea value={accomplishment} onChange={(e) => setAccomplishment(e.target.value)} 
                    placeholder = "e.g. ran my first half marathon last year, published four academic papers as a graduate student"
                    className="textarea" />

                    <div className="question">
                        <span className="number">8</span> Who is your biggest inspiration and why?
                    </div>
                    <textarea value={inspiration} onChange={(e) => setInspiration(e.target.value)} 
                    placeholder = "e.g. my father, he fought in the Viet Nam war and was in a reeducation camp for 3 years"
                    className="textarea" />  

                <button type="submit" className="submit-button">Find your Survivor twin! </button>
            </form>

            {result.name && (
                <div ref={resultRef} className="result-display">
                    <p>Your Survivor Twin: {result.name}</p>
                </div>
            )}
        </div>
    );
}

export default BioForm;
