// prisma.ts (or any other filename you prefer)

export interface Admin {
  id?: number; // Optional since `id` is auto-incremented
  username?: string;
  password?: string;
}

export interface NipRequest {
  id?: number; // Optional since `id` is auto-incremented
  phone: string;
  status: number;
  errorMsg?: string;
  created_at: Date; // Assuming `DateTime` maps to Date in TypeScript
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
  userId: number;
  // Omit relationship fields (user) as they're not directly part of the interface
}

export interface Topologia {
  id: number;
  description: string;
}
export interface Reason {
  id: number;
  status: number;
  description: string;
}

export interface Agent {
  id: number;
  username: string;
}
export interface PortaRequestOut {
  id: number;
  phone: string;
  created_at: Date;
  updated_at?: Date;
  poa_curr_state: string;
  poa_date: string;
  poa_lib_acct_no: string;
  poa_lib_os_bal: string;
  poa_serv_type: string;
  poa_service_no: string;
  poa_transaction_id: string;
  gina_id_caso: string;
  document: string;
  name: string;
  poa_add_date: string;
  poa_cust_type: string;
  poa_timestamp: string;
  topologia_id: string;
  updated_by: string;
  reason_id: number;
  poa_message_pxs: string;
  signed_file_url?: string;
  reason?: Reason;
  topologia?: Topologia;
  agent?: Agent;
  // Omit relationship fields (user, origin) as they're not directly part of the interface
}

export interface User {
  id?: number; // Optional since `id` is auto-incremented
  username: string;
  password: string;
  area?: string;
  sgo_username?: string;
  sgo_password?: string;
  sgo_area?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
  // Omit relationship fields (nipRequests, portaRequests) as they're not directly part of the interface
}

export interface Origin {
  id?: number; // Optional since `id` is auto-incremented
  name?: string;
  created_at: string; // Assuming `created_at` remains a string in TypeScript
}
