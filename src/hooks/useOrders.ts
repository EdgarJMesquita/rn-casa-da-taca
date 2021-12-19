import { useContext } from "react";
import { OrdersContext } from "../context/OrderContext";

export function useOrders(){
  return useContext(OrdersContext);
}