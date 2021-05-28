const cowin = require("./dist/index");

cowin.findAppointmentsByPin(16003, {date: new Date(2021, 4, 29)}).then((respnse) => {
  if (respnse.isError) {
    console.log(respnse.error);
  } else {
    console.log(respnse.appointments);
  }
});
