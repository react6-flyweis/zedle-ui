export interface OrderItem {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderDate: string;
  deliveryDate: string;
  total: string;
  shipTo: string;
  status: string;
  deliveryTime: string;
  items: OrderItem[];
}
