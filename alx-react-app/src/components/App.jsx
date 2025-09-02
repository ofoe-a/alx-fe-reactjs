// import './App.css';
// import WelcomeMessage from './components/WelcomeMessage';

// function App() {
//   return (
//     <div className="App">
//       <WelcomeMessage />
//     </div>
//   );
// }

// export default App;

import './App.css';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <UserProfile 
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />
    </div>
  );
}

export default App;
