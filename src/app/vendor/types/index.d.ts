type ClientType = "recurring" | "new";

export interface IClient {
  name: string;
  phone: string;
  email: string;
  imageUrl: string;
  type: ClientType;
}
