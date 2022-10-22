import "./App.css";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import CustomLayout from "./containers/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <CustomLayout></CustomLayout>
    </Router>
  );
}

export default App;
