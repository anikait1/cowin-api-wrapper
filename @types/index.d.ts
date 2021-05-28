export type SessionResponse = {
  center_id: number;
  name: string;
  address: string;
  state_name: string;
  district_name: string;
  block_name: string;
  pincode: number;
  from: string;
  to: string;
  lat: number;
  long: number;
  fee_type: string;
  session_id: string;
  date: string;
  available_capacity_dose1: number;
  available_capacity_dose2: number;
  available_capacity: number;
  fee: string;
  min_age_limit: number;
  vaccine: string;
  slots: string[];
};

export type BadRequest = {
  errorCode: string;
  error: string;
};

export type Appointment = {
  center_id: number;
  name: string;
  address: string;
  state_name: string;
  district_name: string;
  block_name: string;
  pincode: number;
  lat: number;
  long: number;
  from: string;
  to: string;
  fee_type: string;
  sessions: Session[];
};
export type Session = {
  session_id: string;
  date: string;
  available_capacity: number;
  min_age_limit: number;
  vaccine: string;
  slots: string[];
  available_capacity_dose1: number;
  available_capacity_dose2: number;
};

export type Options = {
  date?: Date;
  week?: boolean;
};

export type AppointmentResponse = {
  appointments: Appointment[] | null;
  isError: boolean,
  error: BadRequest | null;
}

export type State = {
  state_id: number,
  state_name: string
}

export type District = {
  district_id: number,
  district_name: string
}
