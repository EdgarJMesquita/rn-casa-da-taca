import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuProps } from "../context/MenuContext";

type RootParamsList = {
  Login: undefined;
  Menu: undefined;
  TableMembers: { tableId: string };
  MemberOrders: { tableId: string, memberId: string };
  CreateOrder: { tableId: string, memberId: string, selectedMenuItem: MenuProps|undefined };
}

export type StackScreensProps = NativeStackScreenProps<RootParamsList>;
export type TableMembersProps = NativeStackScreenProps<RootParamsList,'TableMembers'>;
export type MemberOrdersProps = NativeStackScreenProps<RootParamsList,'MemberOrders'>;
export type CreateOrderProps = NativeStackScreenProps<RootParamsList,'CreateOrder'>;