import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuProps } from "../context/MenuContext";
import { OrderProps } from "../context/OrderContext";

type RootParamsList = {
  Login: undefined;
  Menu: undefined;
  TableMembers: { tableId: string };
  MemberOrders: { tableId: string, memberId: string };
  CreateOrder: { tableId: string, memberId: string, selectedMenuItem: MenuProps|undefined, order?: OrderProps };
  EditOrder: { tableId: string, memberId: string, order: OrderProps }
}

export type StackScreensProps = NativeStackScreenProps<RootParamsList>;
export type TableMembersProps = NativeStackScreenProps<RootParamsList,'TableMembers'>;
export type MemberOrdersProps = NativeStackScreenProps<RootParamsList,'MemberOrders'>;
export type CreateOrderProps = NativeStackScreenProps<RootParamsList,'CreateOrder'>;
export type EditOrderProps = NativeStackScreenProps<RootParamsList,'EditOrder'>;