# cowin-api-wrapper
API wrapper for COWIN's public API with TypeScript support.

# Usage
``` npm install cowin-api-wrapper```

The goal here is to provide a wrapper over the public api available [here](https://apisetu.gov.in/public/marketplace/api/cowin).
```javascript
const cowin = require("cowin-api-wrapper")

// find appointments by pin
cowin.findAppointmentsByPin(160036, {date: new Date(2021, 4, 29)}).then((response) => {
  if (respnse.isError) {
    console.log(response.error);
  } else {
    console.log(response.appointments);
  }
});

// customise your response by passing the options object
const opts = { date: new Date(), week: true }
cowin.findAppointmentsByPin(160036, opts).then((response) => {
  if (respnse.isError) {
    console.log(response.error);
  } else {
    console.log(response.appointments);
  }
});
```

The wrapper aims to provide a consistent interface for fetching the data. The models at Cowin website won't give an accurate representation of the data returned by the API. The SessionResponse represents the API's response when querying for appointments for a single day. To remove discrepancies between the responses we use our custom ```Appointment``` type.
```typescript
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
```
