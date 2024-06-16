// import logo from './logo.svg';
import logo from './assets/p.jpeg';
import './App.scss';
import './routes/other-styles.styles.scss';
import { Badge, Button } from "@material-tailwind/react";
import { Routes, Route } from 'react-router-dom';
import NavigationPage from './routes/navigation.components';
import HomePage from './routes/home/homepage.components';
import { Toaster } from 'sonner';
import SignUpPage from './routes/signup/signuppage.components';
import TermsAndConditions from './routes/terms/terms.components';
import PrivacyPolicy from './routes/terms/privacy.components';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">

    //     <Badge content="5">
    //       <Button>Notifications</Button>
    //     </Badge>

    //     <img src={logo} className="App-logo" alt="logo" />
    //     {/* <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    //   </header>
    // </div>

    <>
    <Routes>
      <Route path='/' element={<NavigationPage />}>
        <Route index element={<HomePage/>} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/terms' element={<TermsAndConditions />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
      </Route>
    </Routes>
    <Toaster richColors/>
    </>

  );
}

export default App;
