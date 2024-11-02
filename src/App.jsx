import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import RegisterForm from './components/RegisterForm';
import SimulateCreditForm from './components/SimulateCreditForm';
import RequestForm from './components/RequestForm';
import RequestsList from './components/RequestsList';
import EvaluateRequestForm from './components/EvaluateRequestForm';
import MyRequestsList from './components/MyRequests';
import RequestDetails from './components/RequestDetails';
import NotFound from './components/NotFound';


function App() {
	return (
		<Router>
			<div className="container">
			<Navbar></Navbar>
				<Routes>
				<Route path="/home" element={<Home/>} />
				<Route path="/loginForm" element={<LoginForm/>} />
				<Route path="/registerForm" element={<RegisterForm/>} />
				<Route path="/simulateCredit" element={<SimulateCreditForm/>} />
				<Route path="/requestForm" element={<RequestForm/>} />
				<Route path="/requestsList" element={<RequestsList/>} />
				<Route path="/evaluateRequest/:requestId" element={<EvaluateRequestForm/>} />
				<Route path="/myRequests" element={<MyRequestsList/>} />
				<Route path="/requestDetails/:requestId" element={<RequestDetails/>} />
        <Route path="*" element={<NotFound/>} />
				</Routes>
			</div>
		</Router>
	);
}


export default App
