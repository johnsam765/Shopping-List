import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userLoading, userLoaded, authError } from "./actions/authAction";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { Container } from "reactstrap";
import { useEffect } from "react";
import axios from "axios";
import { returnErrors } from "./actions/errorAction";

function App() {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state);
  useEffect(() => {
    userRegSuccess(datas);
  }, []);
  const userRegSuccess = (datas) => {
    dispatch(userLoading());
    axios
      .get("/api/auth/user", configToken(datas))
      .then((res) => dispatch(userLoaded(res.data)))
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(authError());
      });
  };
  const configToken = (org) => {
    console.log(org, "org");
    console.log("Getting Called");
    const token = org.auth.token;
    // Headers
    const conf = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // If token then add to headers
    if (token) {
      conf.headers["x-auth-token"] = token;
    }
    console.log(conf);
    return conf;
  };
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal configToken={configToken} />
          <ShoppingList configToken={configToken} />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
