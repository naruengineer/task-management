"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import ComingSoon from "../ComingSoon/ComingSoon";

export default function Calendar() {
  const [allready, setAllready] = useState(true);
  return (
    <div>
      {!allready ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          businessHours
          locale={"ja"}
          initialView="dayGridMonth" // 初期表示を月次に設定
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,today", // 月次・週次の切替ボタン
          }}
          initialEvents={[{ title: "initial event", start: new Date() }]}
        />
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}
