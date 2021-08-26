import { ListGroup, Container, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getItem, delItem, setItemsLoading } from "../actions/ItemActions";
import axios from "axios";
const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const delItems = (id) => {
    delDB(id);
  };
  const delDB=(id)=>
  {
    axios.delete(`/api/items/${id}`)
    .then(res=>dispatch(delItem(id)))
  }
  const fetch = () => {
    axios.get("/api/items").then((res) => {
      dispatch(setItemsLoading());
      dispatch(getItem(res));
    });
  }
  useEffect(()=>{fetch()}, []);
  
  
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    delItems(_id);
                  }}
                >
                  &times;
                </Button>
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
