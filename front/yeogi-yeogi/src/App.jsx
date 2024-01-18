
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './component/Layout';
import { MemberContext } from './component/context/MemberContext';
function App() {
  return (
    <MemberContext>
      <BrowserRouter> 
        <Layout />
      </BrowserRouter>
    </MemberContext>
  );
}

export default App;
