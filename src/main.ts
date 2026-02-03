const Monday = 1;
const Tuesday = 2;
const Wednesday = 3;
const Thursday = 4;
const Friday = 5;
const Saturday = 6;

((appContainer: HTMLDivElement | null) => {
  if (!appContainer) {
    return;
  }

  // Array.from({length: 7})

  /*
  <div class="container">
    <div>1</div>
    <div style="grid-area: 1 / 1 / 3 / 2;">2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </div>
  */
  const columns = 7;
  const rows = 22;
  
  const timetableContainer: HTMLDivElement = document.createElement("div");
  timetableContainer.style.display = "grid";
  timetableContainer.style.border = "solid rgb(0, 0, 0) 1px";
  timetableContainer.style.backgroundColor = "dodgerblue";
  timetableContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  timetableContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  timetableContainer.style.columnGap = "0px";
  timetableContainer.style.rowGap = "0px";

  var used = 0;

  const styleGridChildDiv = (div: HTMLDivElement) => {
    div.style.backgroundColor = "#f1f1f1";
    div.style.color = "#000";
    div.style.padding = "10px";
    div.style.border = "solid rgb(0, 0, 0) 1px";
    div.style.fontSize = "30px";
    div.style.textAlign = "center";
  };

  const makeGridChildDiv = (): HTMLDivElement => {
    const div = document.createElement("div");
    styleGridChildDiv(div);
    div.style.backgroundColor = "rgb(127 127 127)";
    used += 1;
    console.log(`used: ${used}`);
    return div;
  }

  const makeGridChildDivWithContent = (innerText: string, rstart: number, cstart: number, rendExclusive: number, cendExclusive: number): HTMLDivElement  => {
    const div = document.createElement("div");
    styleGridChildDiv(div);
    div.style.gridArea = `${rstart} / ${cstart} / ${rendExclusive} / ${cendExclusive}`;// `1 / ${i + 1} / 2 / ${i + 2}`;
    const occupied = (rendExclusive - rstart) * (cendExclusive - cstart);
    used += occupied;
    console.log(`used: ${used}`);
    div.innerText = innerText;
    return div;
  }

  {
    Array
    .from({length: 7})
    .forEach((_, i) => {
      timetableContainer.appendChild(makeGridChildDivWithContent(['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i], 1, i + 1, 2, i + 2));
    });

    const timeGrid = Array
    .from({length: rows - 1})
    .map((_, i) => {
      const eightThirty = new Date();
      eightThirty.setHours(8, 30);
      eightThirty.setSeconds(0, 0);
      
      const dateFrom = new Date(eightThirty.getTime() + ((1000*60*30) * i));
      const dateTo = new Date(eightThirty.getTime() + ((1000*60*30) * (i + 1)));
      
      return { hoursFrom: dateFrom.getHours(), minutesFrom: dateFrom.getMinutes(), hoursTo: dateTo.getHours(), minutesTo: dateTo.getMinutes() };
    });
    
    timeGrid.forEach(({hoursFrom, minutesFrom, hoursTo, minutesTo}, i) => {
      timetableContainer.appendChild(makeGridChildDivWithContent(`${`${hoursFrom}`.padStart(2, "0")}:${`${minutesFrom}`.padStart(2, "0")} - ${`${hoursTo}`.padStart(2, "0")}:${`${minutesTo}`.padStart(2, "0")}`, 2 + i, 1, 2 + i + 1, 2));
    });

    const startRowIndex = 2; // header used index 1

    interface SessionTime {
      hour: number, 
      minutes: number
    }
    
    interface ISession {
      subject: string
      venue: string
      component: string
      weekday: number
      startsAt: SessionTime
      endsAt: SessionTime
    }

    class Session extends Object implements ISession {
        public subject: string;
        public venue: string;
        public component: string;
        public weekday: number;
        public startsAt: SessionTime;
        public endsAt: SessionTime;
    
        constructor (session: ISession) {
            super();
            this.subject = session.subject;
            this.venue = session.venue;
            this.component = session.component;
            this.weekday = session.weekday;
            this.startsAt = session.startsAt;
            this.endsAt = session.endsAt;
        }
    
        override toString () {
            return `${this.subject} ${this.component} (${this.venue})`;
        }
    }
    
    {
      [
        new Session({ subject: "EIE3312", venue: "TU201", component: "Lecture", weekday: Monday, startsAt: { hour: 8, minutes: 30 }, endsAt: { hour: 11, minutes: 30 } }),
        new Session({ subject: "EIE4413", venue: "DE303", component: "Lecture", weekday: Monday, startsAt: { hour: 15, minutes: 30 }, endsAt: { hour: 16, minutes: 30 } }),
        new Session({ subject: "EIE3312", venue: "CF105 / CD514", component: "Lab", weekday: Tuesday, startsAt: { hour: 12, minutes: 30 }, endsAt: { hour: 15, minutes: 30 } }),
        new Session({ subject: "EIE3333", venue: "TU201", component: "Lecture", weekday: Wednesday, startsAt: { hour: 12, minutes: 30 }, endsAt: { hour: 15, minutes: 30 } }),
        new Session({ subject: "EIE3105", venue: "CF502", component: "Lab", weekday: Friday, startsAt: { hour: 12, minutes: 30 }, endsAt: { hour: 15, minutes: 30 } }),
        new Session({ subject: "EIE3105", venue: "CF502", component: "Lecture", weekday: Friday, startsAt: { hour: 16, minutes: 30 }, endsAt: { hour: 18, minutes: 30 } })
      ].forEach((item: Session) => {
        const startIndex = timeGrid.findIndex(time => time.hoursFrom == item.startsAt.hour && time.minutesFrom == item.startsAt.minutes);
        const endIndex = timeGrid.findIndex(time => time.hoursFrom == item.endsAt.hour && time.minutesFrom == item.endsAt.minutes);
        const weekdayNumeric = item.weekday;
        const offset = startIndex;//numOfHalfHoursSession after 830 am
        const numOfHalfHoursSession = endIndex - startIndex;
        timetableContainer.appendChild(makeGridChildDivWithContent(item.toString(), startRowIndex + offset, weekdayNumeric + 1, startRowIndex + offset + numOfHalfHoursSession, weekdayNumeric + 2));
      })
    }

    {
      Array
      .from({length: (columns * rows) - used})
      .forEach(() => {
        timetableContainer.appendChild(makeGridChildDiv());
      });
    }
  }

  appContainer.appendChild(timetableContainer);

})(document.querySelector<HTMLDivElement>('#app')!)
