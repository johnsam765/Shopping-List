import { ListGroup, Container, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getItem, delItem, setItemsLoading } from "../actions/ItemActions";
import { returnErrors } from "../actions/errorAction";
import axios from "axios";
const ShoppingList = ({ configToken }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const items = useSelector((state) => state.item.items);
  function delDB(id) {
    axios
      .delete(`/api/items/${id}`, configToken(data))
      .then((res) => dispatch(delItem(id)))
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
  const fetch = () => {
    axios
      .get("/api/items")
      .then((res) => {
        dispatch(setItemsLoading());
        dispatch(getItem(res));
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {data.auth.isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      delDB(_id);
                    }}
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};
export default ShoppingList;
