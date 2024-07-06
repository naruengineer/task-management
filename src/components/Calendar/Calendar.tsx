"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import ComingSoon from "../ComingSoon/ComingSoon";

export default function Calendar() {
  const [allready, isAllready] = useState(false);
  return (
    <div>
      {allready === false ? (
        <ComingSoon />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialEvents={[{ title: "initial event", start: new Date() }]}
        />
      )}
    </div>
  );
}
