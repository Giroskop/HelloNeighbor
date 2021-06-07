import style from './styles/style.sass'
import MainPage from "./components/MainPage/MainPage";
import ChatList from "./components/ChatList/ChatList";
import Map from "./components/Map/Map";
import  {BrowserRouter as Router} from 'react-router-dom'
import Routes from './components/Routes/Routes';
import AddAvatarZone from './components/MainPage/AddAvatarZone/AddAvatarZone';
import Event from './components/ProfileMenu/History/Event';
import Profile from './components/ProfileMenu/Profile/Profile';


const { default: Header } = require("./components/Header/Header");
const { default: Welcome } = require("./components/Welcome/Welcome");

function App() {
  return (
    <Router >
      <div className="App">
        <Header />
        <Routes />
        <ChatList />
        <Map />
        <AddAvatarZone />
      </div>
    </Router>
  );
}

export default App
