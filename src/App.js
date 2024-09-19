import BioForm from './bio.js'; // Adjust the path if your file is in a different location
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>
                <span> Outwit, Outplay, Outlast: </span> 
                <br/>
                <span> Who is your CBS Survivor twin? </span> 
                </h1>           
            <header className="App-header">
                {/* Other content */}
                <BioForm />
            </header>
        </div>
    );
}
export default App;


