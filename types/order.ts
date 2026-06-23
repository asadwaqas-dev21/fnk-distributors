export interface Address {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
  shippingAddr: Address;
  stripeSession?: string;
  stripeIntent?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
