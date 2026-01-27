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


const Friday = 5;

((appContainer: HTMLDivElement | null) => {
  if (!appContainer) {
    return;
  }

  [
    { 
      name: "EIE3105",
      weekday: Friday,
      startsAt: {
        hour: 8,
        minutes: 30
      },
      endsAt: {
        hour: 11,
        minutes: 30
      }
    }
  ];


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
  const rows = 20;
  
  const timetableContainer: HTMLDivElement = document.createElement("div");
  timetableContainer.style.display = "grid";
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
    div.style.border = "#000 solid";
    div.style.fontSize = "30px";
    div.style.textAlign = "center";
  };

  const makeGridChildDiv = (): HTMLDivElement => {
    const div = document.createElement("div");
    styleGridChildDiv(div);
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

    Array
    .from({length: 19})
    .map((_, i) => {
      const date = new Date();
      date.setHours(8, 30);
      date.setSeconds(0, 0);
      date.setTime(date.getTime() + ((1000*60*30) * i));
      return date.toLocaleTimeString();
    })
    .forEach((contentText, i) => {
      timetableContainer.appendChild(makeGridChildDivWithContent(contentText, 2 + i, 1, 2 + i + 1, 2));
    });



    const startRowIndex = 2;

    {
      [
        {

        }
      ].forEach((item) => {
        const weekdayNumeric = 1;
        const offset = 0;//numOfHalfHoursSession after 830 am
        const numOfHalfHoursSession = 6;
        timetableContainer.appendChild(makeGridChildDivWithContent(`3105`, startRowIndex + offset, weekdayNumeric + 1, startRowIndex + offset + numOfHalfHoursSession, weekdayNumeric + 2));
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
