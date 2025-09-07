import './App.css';
import UserProfile from './components/UserProfile';
import UserContext from './components/UserContext';

function App() {
  const userData = {
    name: "Alice",
    age: "25",
    bio: "Loves hiking and photography",
  };

  return (
    <div className="App">
      <UserContext.Provider value={userData}>
        <UserProfile />
      </UserContext.Provider>
    </div>
  );
}

export default App;