/**
 * Formats the date from 23/5/2021 -> 23-5-2021
 * @param date
 * @returns
 */
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-IN").replace(/\//g, "-");

/**
 * Maps the plain session response to appointment object
 * @param { SessionResponse } session
 * @returns { Appointment }
 */
export const mapSessionResponse = ({
  session_id,
  date,
  available_capacity,
  available_capacity_dose1,
  available_capacity_dose2,
  slots,
  min_age_limit,
  vaccine,
  ...center
}: SessionResponse): Appointment => ({
  ...center,
  sessions: [
    {
      session_id,
      date,
      slots,
      min_age_limit,
      vaccine,
      available_capacity,
      available_capacity_dose1,
      available_capacity_dose2,
    },
  ],
});

type SessionResponse = {
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

type Session = {
  session_id: string;
  date: string;
  available_capacity: number;
  min_age_limit: number;
  vaccine: string;
  slots: string[];
  available_capacity_dose1: number;
  available_capacity_dose2: number;
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
