// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

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
      const date = new Date();
      date.setHours(8, 30);
      date.setSeconds(0, 0);
      date.setTime(date.getTime() + ((1000*60*30) * i));
      return { hour: date.getHours(), minutes: date.getMinutes()  }
    });

    timeGrid.forEach(({hour, minutes}, i) => {
      timetableContainer.appendChild(makeGridChildDivWithContent(`${`${hour}`.padStart(2, "0")}:${`${minutes}`.padStart(2, "0")}`, 2 + i, 1, 2 + i + 1, 2));
    });

    const startRowIndex = 2; // header used index 1

    {
      [
        { name: "EIE3312 Lecture (TU201)", weekday: Monday, startsAt: { hour: 8, minutes: 30 }, endsAt: { hour: 11, minutes: 30 } },
        { name: "EIE4413 Lecture (DE303)", weekday: Monday, startsAt: { hour: 15, minutes: 30 }, endsAt: { hour: 16, minutes: 30 } },
        { name: "EIE3312 Lab (CF105 / CD514)", weekday: Tuesday, startsAt: { hour: 12, minutes: 30 }, endsAt: { hour: 15, minutes: 30 } },
        { name: "EIE3333 Lecture (TU201)", weekday: Wednesday, startsAt: { hour: 12, minutes: 30 }, endsAt: { hour: 15, minutes: 30 } },
        { name: "EIE3105 Lab (CF502)", weekday: Friday, startsAt: { hour: 12, minutes: 30 }, endsAt: { hour: 15, minutes: 30 } },
        { name: "EIE3105 Lecture (CF502)", weekday: Friday, startsAt: { hour: 16, minutes: 30 }, endsAt: { hour: 18, minutes: 30 } }
      ].forEach((item) => {
        const startIndex = timeGrid.findIndex(time => time.hour == item.startsAt.hour && time.minutes == item.startsAt.minutes);
        const endIndex = timeGrid.findIndex(time => time.hour == item.endsAt.hour && time.minutes == item.endsAt.minutes);
        const weekdayNumeric = item.weekday;
        const offset = startIndex;//numOfHalfHoursSession after 830 am
        const numOfHalfHoursSession = endIndex - startIndex;
        timetableContainer.appendChild(makeGridChildDivWithContent(`${item.name}`, startRowIndex + offset, weekdayNumeric + 1, startRowIndex + offset + numOfHalfHoursSession, weekdayNumeric + 2));
      })
    }

    Array
    .from({length: (columns * rows) - used})
    .forEach(() => {
      timetableContainer.appendChild(makeGridChildDiv());
    });
  }

  appContainer.appendChild(timetableContainer);

})(document.querySelector<HTMLDivElement>('#app')!)
