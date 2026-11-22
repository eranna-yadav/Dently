# Dently

A modern dental clinic app (white, teal & navy) with two roles:

- **Patient:** Home (services, featured doctors, clinic info), Book Appointment (doctor → date → time → reason), My Appointments (status, reminders, history, treatment records), Profile (name, age, blood group, contact; editable).
- **Doctor / Admin:** Dashboard (today's appointments, patients, revenue), Manage Appointments (Confirm / Complete with treatment notes / Decline), Add Doctor (name, specialization, timings, working days, fees), Patient Records (search, history, add records).

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Data is stored in the browser's `localStorage` and pre-filled with demo data. To reset it, run `localStorage.removeItem('dently.v1')` in the browser console.
