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
  const timetableContainer: HTMLDivElement = document.createElement("div");
  timetableContainer.classList.add("container");
  {
    Array
    .from({length: 6})
    .forEach((_, i) => {
      const element = document.createElement("div");
      element.innerText = `${i + 1}`;
      element.style.gridArea = `1 / ${i + 1} / 2 / ${i + 2}`;
      timetableContainer.appendChild(element);
    });
  }
  
  {
    const startIndex = 2;
    const weekday = 1;
    const numOfHalfHoursSession = 4;
    const lesson = document.createElement("div");
    lesson.style.gridArea = `${startIndex} / ${weekday} / ${startIndex + numOfHalfHoursSession} / ${weekday + 1}`;
    timetableContainer.appendChild(lesson);
  }

    {
      const startIndex = 2;
      const startOffset = 3;
      const weekday = 2;
      const numOfHalfHoursSession = 4;
      const lesson = document.createElement("div");
      lesson.style.gridArea = `${startIndex + startOffset} / ${weekday} / ${startIndex + startOffset + numOfHalfHoursSession} / ${weekday + 1}`;
      timetableContainer.appendChild(lesson);
    }
  appContainer.appendChild(timetableContainer);

})(document.querySelector<HTMLDivElement>('#app')!)
