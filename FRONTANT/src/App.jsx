import React from 'react'
import ChatBot from './Pages/ChatBot'
import Footer from './Pages/Footer'

import GE from './Components/GE'
import Navbar from './Components/Navbar'
import { Routes ,Route} from 'react-router-dom'


const App = () => {
  
  // Speak("hello");
  // console.log(Speak("hello"));
  
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/ai2" element={<GE />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App