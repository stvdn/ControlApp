export interface Product {
  id: number;
  provider_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  size: string;
  discount?: number | null;
  gender?: string | null;
  age?: string | null;
  tags?: string[] | null;
  image_paths: string[];
  qr_code_uuid?: string;
  created_at: Date;
  updated_at: Date;
}
