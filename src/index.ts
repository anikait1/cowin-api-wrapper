import superagent from "superagent";
import { formatDate, mapSessionResponse, Appointment } from "./format-response";

const URLS = {
  BASE_URL: "https://cdn-api.co-vin.in/api/v2",
  FIND_BY_PIN: "appointment/sessions/public/findByPin",
  FIND_BY_DISTRICT: "appointment/sessions/public/findByDistrict",
  CALENDAR_BY_PIN: "appointment/sessions/public/calendarByPin",
  CALENDAR_BY_DISTRICT: "appointment/sessions/public/calendarByDistrict",
  GET_STATES: "admin/location/states",
  GET_DISTRICTS: "admin/location/districts",
};

/**
 * Find vaccination sessions by PIN.
 * By default searches for current date.
 * @param { string | number } pin
 * @param { Date } date
 */
const findAppointmentsByPinDay = async (
  pin: string | number,
  date: Date = new Date()
): Promise<AppointmentResponse> => {
  const url = `${URLS.BASE_URL}/${URLS.FIND_BY_PIN}`;
  try {
    const response = await superagent
      .get(url)
      .query({ pincode: pin, date: formatDate(date) });

    const appointments: Appointment[] =
      response.body.sessions.map(mapSessionResponse);
    return { appointments, error: null, isError: false };
  } catch (err) {
    const badRequest: BadRequest = err.response?.body;
    return { appointments: null, error: badRequest, isError: true };
  }
};

/**
 * Find vaccination sessions by district.
 * By default searches for current date
 * @param { number } districtId
 * @param { Date } date
 */
const findAppointmentsByDistrictDay = async (
  districtId: number,
  date: Date = new Date()
): Promise<AppointmentResponse> => {
  const url = `${URLS.BASE_URL}/${URLS.FIND_BY_DISTRICT}`;

  try {
    const response = await superagent
      .get(url)
      .query({ district_id: districtId, date: formatDate(date) });

    const appointments: Appointment[] =
      response.body.sessions.map(mapSessionResponse);
    return { appointments, error: null, isError: false };
  } catch (err) {
    const badRequest: BadRequest = err.response?.body;
    return { appointments: null, error: badRequest, isError: true };
  }
};

/**
 * Find vaccine sessions by pin for a week.
 * By default week starts from current date
 * @param { string | number } pin
 * @param { Date } date
 */
const findAppointmentsByPinWeek = async (
  pin: string | number,
  date: Date = new Date()
): Promise<AppointmentResponse> => {
  const url = `${URLS.BASE_URL}/${URLS.CALENDAR_BY_PIN}`;

  try {
    const response = await superagent
      .get(url)
      .query({ pincode: pin, date: formatDate(date) });

    const appointments: Appointment[] = response.body.centers;
    return { appointments, error: null, isError: false };
  } catch (err) {
    return { appointments: null, error: null, isError: false };
  }
};

/**
 * Find vaccine sessions by district id for a week.
 * By default week starts from current date
 * @param { number } districtId
 * @param { Date } date
 */
const findAppointmentsByDistrictWeek = async (
  districtId: number,
  date: Date = new Date()
): Promise<AppointmentResponse> => {
  const url = `${URLS.BASE_URL}/${URLS.FIND_BY_DISTRICT}`;

  try {
    const response = await superagent
      .get(url)
      .query({ district_id: districtId, date: formatDate(date) });

    const appointments: Appointment[] = response.body.centers;
    return { appointments, error: null, isError: false };
  } catch (err) {
    const badRequest: BadRequest = err.response?.body;
    return { appointments: null, error: badRequest, isError: true };
  }
};

/**
 * Search for appointments using pin.
 * @param { string | number } pin
 * @param { Options } opts Allows you to switch between per day or per week results
 */
export const findAppointmentsByPin = (
  pin: string | number,
  opts: Options = {}
): Promise<AppointmentResponse> => {
  const { date = new Date(), week = false } = opts;
  if (week) {
    return findAppointmentsByPinWeek(pin, date);
  } else {
    return findAppointmentsByPinDay(pin, date);
  }
};

/**
 * Search for appointments using district.
 * @param { string | number } pin
 * @param { Options } opts Allows you to switch between per day or per week results
 */
export const findAppointmentsByDistrict = (
  districtId: number,
  opts: Options = {}
): Promise<AppointmentResponse> => {
  const { date = new Date(), week = false } = opts;
  if (week) {
    return findAppointmentsByDistrictWeek(districtId, date);
  } else {
    return findAppointmentsByDistrictDay(districtId, date);
  }
};

/**
 * Fetch the list of available states.
 */
export const getStates = (): Promise<State[]> => {
  const url = `${URLS.BASE_URL}/${URLS.GET_STATES}`;
  return superagent.get(url).then((response) => response.body.states);
};

/**
 * Fetch districts corresponding to the given state id.
 * @param { number } stateId
 */
export const getDistricts = (stateId: number): Promise<District> => {
  const url = `${URLS.BASE_URL}/${URLS.GET_DISTRICTS}/${stateId}`;
  return superagent.get(url).then((response) => response.body.districts);
};

type BadRequest = {
  errorCode: string;
  error: string;
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
