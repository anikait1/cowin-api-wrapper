import { Appointment, SessionResponse } from "./@types";


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
