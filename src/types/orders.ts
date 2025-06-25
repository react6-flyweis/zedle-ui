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

export interface LogisticsBooking {
  id: string;
  customerName: string;
  vehicleType: string;
  cargo: string;
  address: string;
  status: "ongoing" | "completed" | "canceled";
  backgroundImage?: string;
  avatar?: string;
}
