'use strict';
// Data layer (Claude). Loads dist/data/*.json and writes the numbers into the page.
// It never changes the section templates or styles. It fills existing nodes, adds
// data-evidence attributes, and supplies the data-driven copy in EN/ES/PT.
// Evidence states: verified (counted in Waltham, dated) · reported (drivers' own posts, counted, dated)
// · estimate (sourced Boston or national figure)
// · illustrative (worked example) · unknown (no data). Restaurant counts are availability,
// not delivery demand. Pay figures come from the Local Fifty model (model/): per hour logged in, waiting included.
(async function(){
  const files=['meta','pay','apps','availability','demand','areas','requirements','sources'];
  const optional=['testimonials','hourly','shift','multi_app'];  // shown only when present
  // data-bundle.js (generated) sets window.LOCAL_FIFTY_DATA, so the page works from file:// too.
  // Fall back to the JSON files if the bundle is missing.
  let D=window.LOCAL_FIFTY_DATA;
  if(!D||!files.every(f=>D[f])){ D={};
    try{
      const res=await Promise.all(files.map(f=>fetch('data/'+f+'.json').then(r=>{if(!r.ok)throw new Error(f);return r.json();})));
      files.forEach((f,i)=>D[f]=res[i]);
      for(const f of optional){try{const r=await fetch('data/'+f+'.json'); if(r.ok)D[f]=await r.json();}catch(e){}}
    }catch(e){ console.warn('Local Fifty data not loaded; pre-rendered values stay.',e); return; }
  }
  window.LOCAL_FIFTY_DATA=D;

  const P=D.pay, A=D.apps.apps, AV=D.availability, AR=D.areas;
  // Town, metro and state names come from the town's data, so the same copy serves every town.
  const TOWN=D.meta.town, METRO=D.meta.metro, STATE_NAME=D.meta.state_name, RM=P.state_rideshare_minimum;
  const MAPSRC=D.meta.map_source||{en:'a town street map',es:'un mapa de calles de la ciudad',pt_in:'em um mapa de ruas da cidade'};
  const fa=P.featured_app, F=P.per_hour[fa], R=P.driver_reports;
  // Headline basis (Zack 2026-10-05): all three apps at once on a weekend dinner shift (pay.json.headline). App cards show each app alone.
  const HD=P.headline||null, HMULTI=!!(HD&&HD.apps.length>1);
  const HF=HD?{pay_per_hour:{value:HD.pay},gas_per_hour:{value:HD.gas},tax_set_aside_per_hour:{value:HD.tax},keep_per_hour:{value:HD.kept,low:HD.low,high:HD.high},miles_per_hour:{value:HD.miles}}:F;
  // "DoorDash, Uber Eats and Grubhub" in language l (0 en, 1 es, 2 pt)
  const appNames=(apps,l)=>{const n=['doordash','ubereats','grubhub'].filter(a=>(apps||[]).includes(a)).map(a=>A[a].name), and=[' and ',' y ',' e '][l];
    return n.length<2?(n[0]||''):n.slice(0,-1).join(', ')+and+n[n.length-1];};
  const cdMiles=P.calculator_defaults.miles_per_hour||(F.miles_per_hour?F.miles_per_hour.value:14);
  const cdMiles1=Math.round(cdMiles*10)/10;   // for sentences; formulas and the calculator use the full value
  // second app to suggest: next-highest kept pay per hour
  const byKeep=['doordash','ubereats','grubhub'].sort((a,b)=>P.per_hour[b].keep_per_hour.value-P.per_hour[a].keep_per_hour.value);
  const best=byKeep[0], second=byKeep.filter(k=>k!==fa)[0];   // highest kept pay, and the best app other than the one suggested first
  const usd=n=>'$'+n.toFixed(2);
  const usd0=n=>'$'+Math.round(n);
  const dd=A.doordash, ue=A.ubereats, gh=A.grubhub;
  const ev=P.example_evening;
  const lo=P.hero_range.low.value, hi=P.hero_range.high.value;
  const total=D.apps.total_restaurants_on_any_app.value;
  const a1=AR.areas[0], a2=AR.areas[1], a3=AR.areas[2];
  const AL=(a,l)=>(a.label&&a.label[l])||a.name;  // area name in the reader's language
  const W=AV.windows, nH=AV.n_with_hours;
  const peakHour=h=>({en:(h%12||12)+(h<12?' am':' pm'),es:h+':00',pt:h+'h'});
  const pk=AV.peak; const pkDay={en:{Thu:'Thursday',Fri:'Friday',Wed:'Wednesday',Sun:'Sunday',Sat:'Saturday',Mon:'Monday',Tue:'Tuesday'},es:{Thu:'jueves',Fri:'viernes',Wed:'miércoles',Sun:'domingo',Sat:'sábado',Mon:'lunes',Tue:'martes'},pt:{Thu:'quinta',Fri:'sexta',Wed:'quarta',Sun:'domingo',Sat:'sábado',Mon:'segunda',Tue:'terça'}};

  // ---- copy that carries data, three languages. Short sentences. Terms defined in line. ----
  Object.assign(copy,{
    // Model estimate (model/MODEL.md): per hour logged in, waiting included. Then what drivers who counted their waits report.
    heroLede:[`In ${TOWN}, an hour logged in pays about ${usd0(lo)} to ${usd0(hi)} before costs, waiting included.<br> About ${usd0(F.keep_per_hour.value)} stays after gas and taxes.<br> ${R?`<span data-evidence="reported">Drivers who counted waiting time report ${usd0(R.low)} to ${usd0(R.high)} an hour.</span> `:''}Our estimate, not yet measured in ${TOWN}.`,
              `En ${TOWN}, una hora conectado paga unos ${usd0(lo)} a ${usd0(hi)} antes de gastos, con la espera incluida.<br> Quedan unos ${usd0(F.keep_per_hour.value)} después de gasolina e impuestos.<br> ${R?`<span data-evidence="reported">Quienes contaron la espera reportan de ${usd0(R.low)} a ${usd0(R.high)} por hora.</span> `:''}Es nuestra estimación, aún no medida en ${TOWN}.`,
              `Em ${TOWN}, uma hora conectado paga cerca de ${usd0(lo)} a ${usd0(hi)} antes dos custos, com a espera incluída.<br> Sobram cerca de ${usd0(F.keep_per_hour.value)} após gasolina e impostos.<br> ${R?`<span data-evidence="reported">Quem contou a espera relata de ${usd0(R.low)} a ${usd0(R.high)} por hora.</span> `:''}É nossa estimativa, ainda não medida em ${TOWN}.`],
    // Hooks for the number-led hero (Codex asked for these instead of parsing heroLede). Each range has its own short note.
    heroRangeBoston:[`${usd0(lo)} to ${usd0(hi)}`,`${usd0(lo)} a ${usd0(hi)}`,`${usd0(lo)} a ${usd0(hi)}`],
    heroRangeBostonNote:['an hour logged in across the three apps, before costs, waiting included','por hora conectado en las tres apps, antes de gastos, con la espera incluida','por hora conectado nos três apps, antes dos custos, com a espera incluída'],
    // No reports for this metro: these keys are left out and the hero shows the app range only.
    ...(R?{
    heroRangeReported:[`${usd0(R.low)} to ${usd0(R.high)}`,`${usd0(R.low)} a ${usd0(R.high)}`,`${usd0(R.low)} a ${usd0(R.high)}`],
    heroRangeReportedNote:[`an hour, from ${R.n} ${METRO}-area drivers who counted waiting time`,`por hora, según ${R.n} conductores del área de ${METRO} que contaron la espera`,`por hora, segundo ${R.n} entregadores da região de ${METRO} que contaram a espera`]
    }:{}),
    heroKeepLine:[`About ${usd0(F.keep_per_hour.value)} an hour stays after gas and taxes. Our estimate for ${TOWN}.`,`Quedan unos ${usd0(F.keep_per_hour.value)} por hora después de gasolina e impuestos. Nuestra estimación para ${TOWN}.`,`Sobram cerca de ${usd0(F.keep_per_hour.value)} por hora após gasolina e impostos. Nossa estimativa para ${TOWN}.`],
    payVisualIntro:[`One hour logged in on ${A[fa].name} in ${TOWN}, on a weekend dinner shift, waiting included. Here is where the money goes.`,`Una hora conectado en ${A[fa].name} en ${TOWN}, en un turno de cena de fin de semana, con la espera incluida. Así se reparte el dinero.`,`Uma hora conectado no ${A[fa].name} em ${TOWN}, num turno de jantar no fim de semana, com a espera incluída. Veja para onde vai o dinheiro.`],
    illustrative:[`${TOWN.toUpperCase()} ESTIMATE`,`ESTIMACIÓN PARA ${TOWN.toUpperCase()}`,`ESTIMATIVA PARA ${TOWN.toUpperCase()}`],
    example:[`${TOWN} estimate`,`Estimación para ${TOWN}`,`Estimativa para ${TOWN}`],
    carHint:['Gas only to start. Add repairs, insurance, and wear.','Solo gasolina al inicio. Suma reparaciones, seguro y desgaste.','Só gasolina no início. Some reparos, seguro e desgaste.'],
    calcSource:[`Starting numbers: ${usd(F.pay_per_hour.value)} an hour logged in on ${A[fa].name} on a weekend dinner shift, waiting included (our ${TOWN} estimate). ${usd(F.gas_per_hour.value)} gas. ${usd(F.tax_set_aside_per_hour.value)} for taxes: ${P.calculator_defaults.tax_rate_on_taxable||30}% of pay minus 72.5 cents for each mile, about ${cdMiles1} miles an hour. 4 hours. Repairs and tires add about ${usd(F.repairs_per_hour?F.repairs_per_hour.value:0)} an hour. ${R?`${R.n} ${METRO}-area drivers who counted waits reported ${usd(R.low)} to ${usd(R.high)} an hour. `:''}We built the estimate from app pay in ${P.model?P.model.n_metros:85} U.S. metros, adjusted for ${TOWN}. No ${TOWN} earnings have been measured yet.`,
                `Valores iniciales: ${usd(F.pay_per_hour.value)} por hora conectado en ${A[fa].name} en un turno de cena de fin de semana, con la espera incluida (nuestra estimación para ${TOWN}). ${usd(F.gas_per_hour.value)} de gasolina. ${usd(F.tax_set_aside_per_hour.value)} para impuestos: el ${P.calculator_defaults.tax_rate_on_taxable||30}% del pago menos 72.5 centavos por cada milla, unas ${cdMiles1} millas por hora. 4 horas. Reparaciones y llantas suman unos ${usd(F.repairs_per_hour?F.repairs_per_hour.value:0)} por hora. ${R?`${R.n} conductores del área de ${METRO} que contaron la espera reportaron de ${usd(R.low)} a ${usd(R.high)} por hora. `:''}Hicimos la estimación con el pago de las apps en ${P.model?P.model.n_metros:85} áreas de EE. UU., ajustada para ${TOWN}. Aún no se han medido ganancias en ${TOWN}.`,
                `Valores iniciais: ${usd(F.pay_per_hour.value)} por hora conectado no ${A[fa].name} num turno de jantar no fim de semana, com a espera incluída (nossa estimativa para ${TOWN}). ${usd(F.gas_per_hour.value)} de gasolina. ${usd(F.tax_set_aside_per_hour.value)} para impostos: ${P.calculator_defaults.tax_rate_on_taxable||30}% do ganho menos 72,5 centavos por milha, cerca de ${String(cdMiles1).replace('.',',')} milhas por hora. 4 horas. Reparos e pneus somam cerca de ${usd(F.repairs_per_hour?F.repairs_per_hour.value:0)} por hora. ${R?`${R.n} entregadores da região de ${METRO} que contaram a espera relataram de ${usd(R.low)} a ${usd(R.high)} por hora. `:''}Fizemos a estimativa com o ganho dos apps em ${P.model?P.model.n_metros:85} regiões dos EUA, ajustada para ${TOWN}. Nenhum ganho em ${TOWN} foi medido ainda.`],
    eveningIntro:[`A Saturday evening on ${A[fa].name}. ${ev.hours} hours. ${ev.deliveries} deliveries. About ${usd0(ev.gross)} pay. About ${usd0(ev.gas)} gas. About ${usd0(ev.after_gas)} after gas. About ${usd0((ev.tax_set_aside_low+ev.tax_set_aside_high)/2)} goes to taxes, after the mileage deduction. A built example from our ${TOWN} estimate, waiting included.`,
                  `Un sábado por la tarde en ${A[fa].name}. ${ev.hours} horas. ${ev.deliveries} entregas. Unos ${usd0(ev.gross)} de pago. Unos ${usd0(ev.gas)} de gasolina. Unos ${usd0(ev.after_gas)} después de gasolina. Unos ${usd0((ev.tax_set_aside_low+ev.tax_set_aside_high)/2)} van a impuestos, después de la deducción por millas. Ejemplo armado con nuestra estimación para ${TOWN}, con la espera incluida.`,
                  `Um sábado à noite no ${A[fa].name}. ${ev.hours} horas. ${ev.deliveries} entregas. Cerca de ${usd0(ev.gross)} de ganho. Cerca de ${usd0(ev.gas)} de gasolina. Cerca de ${usd0(ev.after_gas)} após gasolina. Cerca de ${usd0((ev.tax_set_aside_low+ev.tax_set_aside_high)/2)} vão para impostos, após a dedução por milhas. Exemplo montado com nossa estimativa para ${TOWN}, com a espera incluída.`],
    req6:['Age 18 or older. Uber Eats asks for 19 to drive a car. DoorDash asks for 19 or 21 in some states.','Tener 18 años o más. Uber Eats pide 19 para manejar un auto. DoorDash pide 19 o 21 en algunos estados.','Ter 18 anos ou mais. O Uber Eats pede 19 para dirigir um carro. O DoorDash pede 19 ou 21 em alguns estados.'],
    // EN reads the vehicle rules from apps.json. ES and PT translate the same rules (re-read 2026-10-04).
    reqNote:[`Rules checked Oct 4, 2026 on each app’s site. DoorDash: ${dd.requirements.vehicles} Uber Eats: ${ue.requirements.vehicles} Grubhub: ${gh.requirements.vehicles}`,
             'Reglas revisadas el 4 de oct de 2026 en el sitio de cada app. DoorDash: cualquier auto o scooter. Bicicletas en algunas ciudades. Uber Eats: auto de 2 o 4 puertas, scooter o bicicleta. 19 años para auto o scooter, 18 para bicicleta. Grubhub: auto, moto, scooter o bicicleta. Los tipos permitidos dependen de la ciudad.',
             'Regras conferidas em 4 de out de 2026 no site de cada app. DoorDash: qualquer carro ou scooter. Bicicletas em algumas cidades. Uber Eats: carro de 2 ou 4 portas, scooter ou bicicleta. 19 anos para carro ou scooter, 18 para bicicleta. Grubhub: carro, moto, scooter ou bicicleta. Os tipos permitidos dependem da cidade.'],
    appsIntro:[`Compare the same things: restaurants on each app in ${TOWN}, and pay after costs.`,`Compara lo mismo: restaurantes de cada app en ${TOWN} y pago después de gastos.`,`Compare as mesmas coisas: restaurantes de cada app em ${TOWN} e ganho após custos.`],
    recommendTitle:['Start with DoorDash.','Empieza con DoorDash.','Comece com o DoorDash.'],
    recommendText:[`It has ${dd.restaurants_in_town.value} ${TOWN} restaurants, the most by far. ${best===fa?`It also has the highest estimated pay per hour. Add ${A[second].name} second.`:best===second?`${A[best].name} has the highest estimated pay per hour, so add it second.`:`${A[best].name} has the highest estimated pay per hour. Add ${A[second].name} second.`} Counts made Oct 2026.`,
                   `Tiene ${dd.restaurants_in_town.value} restaurantes en ${TOWN}, muchos más que las otras. ${best===fa?`También tiene el pago estimado por hora más alto. Agrega ${A[second].name} después.`:best===second?`${A[best].name} tiene el pago estimado por hora más alto, así que agrégala después.`:`${A[best].name} tiene el pago estimado por hora más alto. Agrega ${A[second].name} después.`} Conteo de oct 2026.`,
                   `Tem ${dd.restaurants_in_town.value} restaurantes em ${TOWN}, muito mais que os outros. ${best===fa?`Também tem o maior ganho estimado por hora. Adicione o ${A[second].name} depois.`:best===second?`O ${A[best].name} tem o maior ganho estimado por hora, então adicione-o depois.`:`O ${A[best].name} tem o maior ganho estimado por hora. Adicione o ${A[second].name} depois.`} Contagem de out 2026.`],
    localOrders:[`${TOWN} restaurants on the app`,`Restaurantes de ${TOWN} en la app`,`Restaurantes de ${TOWN} no app`],
    netPay:['Pay after gas and taxes','Pago después de gasolina e impuestos','Ganho após gasolina e impostos'],
    bonus:['Pay for new drivers','Pago para nuevos conductores','Ganho para novos entregadores'],
    checkOffer:['Check the app. Offers change weekly.','Revisa la app. Las ofertas cambian cada semana.','Confira o app. As ofertas mudam toda semana.'],
    appNote:[`Links go directly to the apps. No referral codes are used. Restaurant counts were made in Oct 2026. Pay figures are our ${TOWN} estimate per hour logged in on a weekend dinner shift, waiting included. Not yet measured in ${TOWN}.`,`Los enlaces van a las apps, sin códigos de referido. Los restaurantes se contaron en oct 2026. Las cifras de pago son nuestra estimación para ${TOWN} por hora conectado en un turno de cena de fin de semana, con la espera incluida. Aún sin medir en ${TOWN}.`,`Os links vão direto aos apps, sem códigos de indicação. Os restaurantes foram contados em out 2026. Os valores são nossa estimativa para ${TOWN} por hora conectado num turno de jantar no fim de semana, com a espera incluída. Ainda não medidos em ${TOWN}.`],
    whenIntro:['This grid shows how many restaurants are open. It does not show orders. We have not measured orders yet.','Esta tabla muestra cuántos restaurantes están abiertos. No muestra pedidos. Aún no hemos medido los pedidos.','Esta grade mostra quantos restaurantes estão abertos. Não mostra pedidos. Ainda não medimos os pedidos.'],
    weekView:[`Restaurants open in ${TOWN}`,`Restaurantes abiertos en ${TOWN}`,`Restaurantes abertos em ${TOWN}`],
    threeHours:['Each square is 3 hours. Darker means more restaurants open.','Cada cuadro representa 3 horas. Más oscuro, más restaurantes abiertos.','Cada quadrado representa 3 horas. Mais escuro, mais restaurantes abertos.'],
    unknownDemand:[`Shade shows restaurants open, out of ${nH} with listed hours. Not orders. Counted Oct 2026.`,`El tono muestra restaurantes abiertos, de ${nH} con horario. No son pedidos. Conteo de oct 2026.`,`O tom mostra restaurantes abertos, de ${nH} com horário. Não são pedidos. Contagem de out 2026.`],
    cellOpen:['restaurants open','restaurantes abiertos','restaurantes abertos'],
    // Evidence key (Codex places it, one line under the hero). One label per marker shape.
    evidenceVerified:[`Counted in ${TOWN}`,`Contado en ${TOWN}`,`Contado em ${TOWN}`],
    evidenceReported:['Drivers’ reports','Reportes de conductores','Relatos de entregadores'],
    evidenceEstimate:['Estimate','Estimación','Estimativa'],
    evidenceIllustrative:['Example','Ejemplo','Exemplo'],
    evidenceUnknown:['Not known yet','Aún no se sabe','Ainda não se sabe'],
    evidenceKeyLabel:['How we know each number','Cómo sabemos cada número','Como sabemos cada número'],
    lunchP:[`Weekday lunch: up to ${W.lunch_weekday_11_13} open.`,`Almuerzo entre semana: hasta ${W.lunch_weekday_11_13} abiertos.`,`Almoço em dia de semana: até ${W.lunch_weekday_11_13} abertos.`],
    dinnerP:[`Up to ${W.dinner_17_20} open. ${pkDay.en[pk.day]} at ${peakHour(pk.hour).en} has the most open.`,`Hasta ${W.dinner_17_20} abiertos. El ${pkDay.es[pk.day]} a las ${peakHour(pk.hour).es} hay más abiertos.`,`Até ${W.dinner_17_20} abertos. ${pkDay.pt[pk.day].charAt(0).toUpperCase()+pkDay.pt[pk.day].slice(1)} às ${peakHour(pk.hour).pt} tem mais abertos.`],
    lateP:[`At 10 pm: ${W.h22_min} to ${W.h22_max} open. At 11 pm: ${W.h23_min} to ${W.h23_max}. Check that a place is open before you go.`,`A las 10 pm: de ${W.h22_min} a ${W.h22_max} abiertos. A las 11 pm: de ${W.h23_min} a ${W.h23_max}. Revisa que el lugar esté abierto antes de ir.`,`Às 22h: de ${W.h22_min} a ${W.h22_max} abertos. Às 23h: de ${W.h23_min} a ${W.h23_max}. Confira se o local está aberto antes de ir.`],
    // Restaurants, not pickups: we count where restaurants are, not where orders come from.
    whereIntro:[`${a1.restaurants+a2.restaurants} of ${total} restaurants on the apps are in two areas: ${AL(a1,'en')} and ${AL(a2,'en')}. Choose an area below.`,`${a1.restaurants+a2.restaurants} de ${total} restaurantes de las apps están en dos zonas: ${AL(a1,'es')} y ${AL(a2,'es')}. Elige una zona abajo.`,`${a1.restaurants+a2.restaurants} de ${total} restaurantes dos apps ficam em duas áreas: ${AL(a1,'pt')} e ${AL(a2,'pt')}. Escolha uma área abaixo.`],
    area1p:[`${a1.restaurants} of ${total} restaurants on the apps. The biggest pickup area.`,`${a1.restaurants} de ${total} restaurantes en las apps. La zona de recogida más grande.`,`${a1.restaurants} de ${total} restaurantes nos apps. A maior área de retirada.`],
    area2p:[`${a2.restaurants} restaurants. Downtown along Main Street, near the Common and the train station.`,`${a2.restaurants} restaurantes. El centro, a lo largo de Main Street, cerca del Common y la estación de tren.`,`${a2.restaurants} restaurantes. O centro, ao longo da Main Street, perto do Common e da estação de trem.`],
    area3p:[`${a3.restaurants} restaurants in two strips. ${a3.parts['Lexington St / Trapelo Rd']} on Lexington Street up to Trapelo Road. ${a3.parts['Route 20 west / Market Place']} on Main Street west toward Market Place.`,`${a3.restaurants} restaurantes en dos franjas. ${a3.parts['Lexington St / Trapelo Rd']} en Lexington Street hasta Trapelo Road. ${a3.parts['Route 20 west / Market Place']} en Main Street hacia el oeste, hasta Market Place.`,`${a3.restaurants} restaurantes em duas faixas. ${a3.parts['Lexington St / Trapelo Rd']} na Lexington Street até a Trapelo Road. ${a3.parts['Route 20 west / Market Place']} na Main Street, a oeste, até Market Place.`],
    areaStatus:['Counted Oct 2026 · order volume not measured','Conteo de oct 2026 · pedidos sin medir','Contagem de out 2026 · pedidos não medidos'],
    mapSource:[`Street layout references ${MAPSRC.en}. Watercolor artwork is an illustration. Restaurant counts come from app listings, Oct 2026. Order volume is not measured.`,`Calles basadas en ${MAPSRC.es}. La acuarela es una ilustración. Los restaurantes se contaron en las apps, oct 2026. Los pedidos no están medidos.`,`Ruas baseadas ${MAPSRC.pt_in}. A aquarela é uma ilustração. Os restaurantes foram contados nos apps, out 2026. Os pedidos não foram medidos.`],
    sourcesPay:[`Pay: Local Fifty estimate for ${TOWN}. It uses app pay tracked by Solo in ${P.model?P.model.n_metros:85} U.S. metros, Sept 2026. Waiting time comes from New York City’s official app data and ${METRO}-area drivers’ own logs. It is adjusted for ${TOWN}’s trip lengths, income, and nearby metros. In tests on metros it had not seen, it was off by ${P.model?P.model.validation_mae_pct:7}% on average. Gas from AAA Massachusetts. Repairs from AAA. Taxes: self-employment, federal, and Massachusetts rates, after the IRS deduction of 72.5 cents a mile. No ${TOWN} earnings measured yet.`,
                `Pago: estimación de Local Fifty para ${TOWN}. Usa el pago de las apps registrado por Solo en ${P.model?P.model.n_metros:85} áreas de EE. UU., sept 2026. La espera viene de datos oficiales de Nueva York y de registros de conductores del área de ${METRO}. Está ajustada a los viajes, ingresos y áreas cercanas de ${TOWN}. En pruebas con áreas que no había visto, falló un ${P.model?P.model.validation_mae_pct:7}% en promedio. Gasolina según AAA Massachusetts. Reparaciones según AAA. Impuestos: tasas de trabajo independiente, federal y de Massachusetts, después de la deducción del IRS de 72.5 centavos por milla. Aún sin ganancias medidas en ${TOWN}.`,
                `Ganho: estimativa da Local Fifty para ${TOWN}. Usa o ganho dos apps registrado pelo Solo em ${P.model?P.model.n_metros:85} regiões dos EUA, set 2026. A espera vem de dados oficiais de Nova York e de registros de entregadores da região de ${METRO}. Está ajustada às viagens, renda e regiões próximas de ${TOWN}. Em testes com regiões que não tinha visto, errou ${P.model?P.model.validation_mae_pct:7}% em média. Gasolina pela AAA Massachusetts. Reparos pela AAA. Impostos: taxas de autônomo, federal e de Massachusetts, após a dedução do IRS de 72,5 centavos por milha. Ainda sem ganhos medidos em ${TOWN}.`],
    sourcesDemand:[`Restaurants: every ${TOWN} storefront on each app, matched to Google Places, Oct 3, 2026. Open hours from Google. Order demand per hour is unknown.`,`Restaurantes: cada local de ${TOWN} en cada app, cruzado con Google Places, 3 de oct de 2026. Horarios de Google. La demanda de pedidos por hora se desconoce.`,`Restaurantes: cada loja de ${TOWN} em cada app, cruzada com o Google Places, 3 de out de 2026. Horários do Google. A demanda de pedidos por hora é desconhecida.`],
    sourcesRules:RM?[`Rules: checked on each app’s site, Oct 2026. The ${STATE_NAME} ${usd(RM.value)} minimum is for Uber and Lyft rides with passengers only. It does not apply to food delivery.`,`Reglas: revisadas en el sitio de cada app, oct 2026. El mínimo de ${usd(RM.value)} de ${STATE_NAME} es solo para viajes con pasajeros de Uber y Lyft. No aplica al reparto de comida.`,`Regras: conferidas no site de cada app, out 2026. O mínimo de ${usd(RM.value)} de ${STATE_NAME} vale só para corridas com passageiros do Uber e Lyft. Não se aplica à entrega de comida.`]
               :['Rules: checked on each app’s site, Oct 2026.','Reglas: revisadas en el sitio de cada app, oct 2026.','Regras: conferidas no site de cada app, out 2026.'],
  });
  // Town-specific labels that app.js still holds as Waltham defaults.
  const L3=o=>[o.en,o.es,o.pt];
  Object.assign(copy,{
    location:[`DELIVERY DRIVING · ${TOWN.toUpperCase()}, ${D.meta.state}`,`REPARTO DE COMIDA · ${TOWN.toUpperCase()}, ${D.meta.state}`,`ENTREGA DE COMIDA · ${TOWN.toUpperCase()}, ${D.meta.state}`],
    heroTitle:[`Does delivery<br> driving in<br> ${TOWN} <em>pay?</em>`,`¿Conviene hacer<br> entregas en<br> <em>${TOWN}?</em>`,`Vale a pena<br> fazer entregas em<br> <em>${TOWN}?</em>`],
    radius:[`Want to stay near ${TOWN}? Check each drop-off before you accept. A nearby pickup can still lead to a long trip.`,`¿Quieres quedarte cerca de ${TOWN}? Revisa el destino antes de aceptar. Recoger cerca no significa entregar cerca.`,`Quer ficar perto de ${TOWN}? Confira o destino antes de aceitar. Uma retirada próxima pode ter uma entrega distante.`],
  });
  AR.areas.forEach(a=>{ if(a.label) copy['area'+a.id]=L3(a.label); if(a.short&&a.id>1) copy['area'+a.id+'short']=L3(a.short); });
  if(D.meta.hero_art_caption) copy.heroArtCaption=[D.meta.hero_art_caption,D.meta.hero_art_caption,D.meta.hero_art_caption];
  // Any older default string still naming Waltham (shown only if a key above is missing) follows the town too.
  if(TOWN!=='Waltham') Object.keys(copy).forEach(k=>{ if(Array.isArray(copy[k])) copy[k]=copy[k].map(x=>typeof x==='string'?x.replace(/Waltham/g,TOWN).replace(/WALTHAM/g,TOWN.toUpperCase()):x); });

  // ---- Round 6 (Zack's feedback, 2026-10-04): one headline number, plain-word evidence labels,
  // money strip lines, step times, plain "when" answer, map zones, goal calculator, testimonials, intro. ----
  const KEEP=HF.keep_per_hour.value, TD=AV.typical_day_by_hour||[];   // the headline (three apps) when pay.json has one
  const hr=(h,l)=>l==='en'?((h%12||12)+(h<12?' am':' pm')):(l==='es'?(h+':00'):(h+'h'));
  const appRange=[`${usd0(lo)} to ${usd0(hi)}`,`${usd0(lo)} a ${usd0(hi)}`,`${usd0(lo)} a ${usd0(hi)}`];
  Object.assign(copy,{
    siteIntro:[`Local Fifty is a free guide to food delivery work in ${TOWN}. See what you would really keep, which app to try first, and when to drive.`,
               `Local Fifty es una guía gratis sobre el reparto de comida en ${TOWN}. Mira cuánto te quedaría de verdad, qué app probar primero y cuándo manejar.`,
               `Local Fifty é um guia grátis sobre entregas de comida em ${TOWN}. Veja quanto sobraria de verdade, qual app testar primeiro e quando dirigir.`],
    // One headline number (never a range): what stays per hour after gas and taxes.
    heroNumber:[usd0(KEEP),usd0(KEEP),usd0(KEEP)],
    heroNumberUnit:['an hour after gas and taxes, on a weekend dinner shift','por hora después de gasolina e impuestos, en un turno de cena de fin de semana','por hora após gasolina e impostos, num turno de jantar no fim de semana'],
    heroNumberToggle:['How we got this number','Cómo sacamos este número','Como chegamos a este número'],
    heroNumberDetail:[`This is ${A[fa].name} on a Friday or Saturday dinner shift, 5 to 9 pm, per hour logged in, waiting included. It pays about ${usd(F.pay_per_hour.value)} before costs. Take off ${usd(F.gas_per_hour.value)} for gas and ${usd(F.tax_set_aside_per_hour.value)} for taxes. Taxes are low because you can deduct 72.5 cents for each work mile. On a delivery alone it pays more, about ${usd0(F.engaged_pay_per_hour?F.engaged_pay_per_hour.value:F.pay_per_hour.value)} an hour. Across the three apps, an hour logged in pays ${appRange[0]} before costs. ${R?`${R.n} ${METRO}-area drivers who counted waiting time report ${usd0(R.low)} to ${usd0(R.high)} an hour before costs. `:''}Across all hours of the week, a typical hour keeps about ${usd0(F.all_hours?F.all_hours.keep_per_hour:F.keep_per_hour.value)}. In your first weeks, expect less. We built this from app pay in ${P.model?P.model.n_metros:85} U.S. metros and 20 local shift logs, adjusted for ${TOWN}. No one has measured ${TOWN} yet.`,
                      `Esto es ${A[fa].name} en un turno de cena de viernes o sábado, de 5 a 9 pm, por hora conectado, con la espera incluida. Paga unos ${usd(F.pay_per_hour.value)} antes de gastos. Resta ${usd(F.gas_per_hour.value)} de gasolina y ${usd(F.tax_set_aside_per_hour.value)} de impuestos. Los impuestos son bajos porque puedes deducir 72.5 centavos por cada milla de trabajo. Solo durante una entrega paga más, unos ${usd0(F.engaged_pay_per_hour?F.engaged_pay_per_hour.value:F.pay_per_hour.value)} por hora. En las tres apps, una hora conectado paga ${appRange[1]} antes de gastos. ${R?`${R.n} conductores del área de ${METRO} que contaron la espera reportan de ${usd0(R.low)} a ${usd0(R.high)} por hora antes de gastos. `:''}En todas las horas de la semana, una hora típica deja unos ${usd0(F.all_hours?F.all_hours.keep_per_hour:F.keep_per_hour.value)}. En tus primeras semanas, espera menos. Lo calculamos con el pago de las apps en ${P.model?P.model.n_metros:85} áreas de EE. UU. y 20 registros de turnos locales, ajustado para ${TOWN}. Nadie ha medido ${TOWN} todavía.`,
                      `Isto é o ${A[fa].name} num turno de jantar de sexta ou sábado, das 17h às 21h, por hora conectado, com a espera incluída. Paga cerca de ${usd(F.pay_per_hour.value)} antes dos custos. Tire ${usd(F.gas_per_hour.value)} de gasolina e ${usd(F.tax_set_aside_per_hour.value)} de impostos. Os impostos são baixos porque você pode deduzir 72,5 centavos por milha de trabalho. Só durante uma entrega paga mais, cerca de ${usd0(F.engaged_pay_per_hour?F.engaged_pay_per_hour.value:F.pay_per_hour.value)} por hora. Nos três apps, uma hora conectado paga ${appRange[2]} antes dos custos. ${R?`${R.n} entregadores da região de ${METRO} que contaram a espera relatam de ${usd0(R.low)} a ${usd0(R.high)} por hora antes dos custos. `:''}Em todas as horas da semana, uma hora típica deixa cerca de ${usd0(F.all_hours?F.all_hours.keep_per_hour:F.keep_per_hour.value)}. Nas primeiras semanas, espere menos. Calculamos com o ganho dos apps em ${P.model?P.model.n_metros:85} regiões dos EUA e 20 registros de turnos locais, ajustado para ${TOWN}. Ninguém mediu ${TOWN} ainda.`],
    // Plain-word evidence labels. data.js puts the key name in data-evidence-label on each element.
    evidenceLabelMetroApp:[`${TOWN} estimate`,`Estimación para ${TOWN}`,`Estimativa para ${TOWN}`],
    evidenceLabelReports:R?[`${R.n} drivers’ reports`,`${R.n} reportes de conductores`,`${R.n} relatos de entregadores`]:['Drivers’ reports','Reportes de conductores','Relatos de entregadores'],
    evidenceLabelCounted:[`Counted in ${TOWN}, Oct 2026`,`Contado en ${TOWN}, oct 2026`,`Contado em ${TOWN}, out 2026`],
    evidenceLabelExample:['Example','Ejemplo','Exemplo'],
    evidenceLabelUnknown:['Not known yet','Aún no se sabe','Ainda não se sabe'],
    evidenceLabelSimplifiedMap:['Simplified map','Mapa simplificado','Mapa simplificado'],
    // Money strip (per hour, featured app in the metro).
    moneyTag:[`${TOWN} estimate · weekend dinner, per hour logged in`,`Estimación para ${TOWN} · cena de fin de semana, por hora conectado`,`Estimativa para ${TOWN} · jantar no fim de semana, por hora conectado`],
    moneyPayNote:[`What ${A[fa].name} pays per hour logged in, tips and waiting included.`,`Lo que paga ${A[fa].name} por hora conectado, con propinas y espera.`,`O que o ${A[fa].name} paga por hora conectado, com gorjetas e espera.`],
    moneyGasNote:['Gas only. Repairs and insurance cost more.','Solo gasolina. Reparaciones y seguro cuestan más.','Só gasolina. Reparos e seguro custam mais.'],
    moneyTaxNote:['What you would owe. It is low because you deduct 72.5 cents a mile.','Lo que deberías. Es poco porque deduces 72.5 centavos por milla.','O que você deveria. É pouco porque você deduz 72,5 centavos por milha.'],
    moneyKeepNote:['What is left for you, before repairs and insurance.','Lo que te queda, antes de reparaciones y seguro.','O que sobra para você, antes de reparos e seguro.'],
    moneyAside:['Every hour is different. This is a typical hour with waiting, not a promise.','Cada hora es distinta. Es una hora típica con espera, no una promesa.','Cada hora é diferente. É uma hora típica com espera, não uma promessa.'],
    // Evening step times: fallbacks for the Saturday 5 pm example; replaced below from LocalFiftyShift.plan when shift.json loads.
    stepTime1:['5:00 pm','5:00 pm','17h00'], stepTime2:['5:10 pm','5:10 pm','17h10'], stepTime3:['5:20 pm','5:20 pm','17h20'],
    stepTime4:['5:25 pm','5:25 pm','17h25'], stepTime5:['9:00 pm','9:00 pm','21h00'],
    eveningTimesNote:[`Times are an example, not a forecast. One order is shown. The example has about ${ev.deliveries} in ${ev.hours} hours.`,
                      `Las horas son un ejemplo, no una previsión. Se muestra un pedido. El ejemplo tiene unos ${ev.deliveries} en ${ev.hours} horas.`,
                      `Os horários são um exemplo, não uma previsão. Mostramos um pedido. O exemplo tem cerca de ${ev.deliveries} em ${ev.hours} horas.`],
    // "When should I drive?" in plain words, from the typical day (average of 7 days, open restaurants).
    whenLead:[`Most restaurants are open from 11 am to 9 pm, every day.`,`La mayoría de los restaurantes abren de 11 am a 9 pm, todos los días.`,`A maioria dos restaurantes abre das 11h às 21h, todos os dias.`],
    whenWindow1Title:['11 am to 9 pm','11 am a 9 pm','11h às 21h'],
    whenWindow1Text:[`About ${Math.min(...TD.slice(11,21))} to ${Math.max(...TD.slice(11,21))} restaurants open. The most choice.`,`Unos ${Math.min(...TD.slice(11,21))} a ${Math.max(...TD.slice(11,21))} restaurantes abiertos. Más opciones.`,`Cerca de ${Math.min(...TD.slice(11,21))} a ${Math.max(...TD.slice(11,21))} restaurantes abertos. Mais opções.`],
    whenWindow2Title:['9 pm to 11 pm','9 pm a 11 pm','21h às 23h'],
    whenWindow2Text:[`Fewer open. About ${TD[21]} at 9 pm and ${TD[22]} at 10 pm.`,`Menos abiertos. Unos ${TD[21]} a las 9 pm y ${TD[22]} a las 10 pm.`,`Menos abertos. Cerca de ${TD[21]} às 21h e ${TD[22]} às 22h.`],
    whenWindow3Title:['Before 11 am','Antes de las 11 am','Antes das 11h'],
    whenWindow3Text:[`Few open. About ${TD[9]} at 9 am and ${TD[10]} at 10 am.`,`Pocos abiertos. Unos ${TD[9]} a las 9 am y ${TD[10]} a las 10 am.`,`Poucos abertos. Cerca de ${TD[9]} às 9h e ${TD[10]} às 10h.`],
    whenHonest:['These are open restaurants, not orders. We have not measured orders yet.','Son restaurantes abiertos, no pedidos. Aún no hemos medido los pedidos.','São restaurantes abertos, não pedidos. Ainda não medimos os pedidos.'],
    whenTypicalDayLabel:['Restaurants open on a typical day','Restaurantes abiertos en un día típico','Restaurantes abertos em um dia típico'],
    whenSeeEveryDay:['See every day','Ver cada día','Ver cada dia'],
    // Footer: logos identify the apps.
    notAffiliated:['Not affiliated with DoorDash, Uber, or Grubhub. Logos identify each app.','Sin relación con DoorDash, Uber ni Grubhub. Los logos identifican cada app.','Sem vínculo com DoorDash, Uber ou Grubhub. Os logos identificam cada app.'],
    // Goal calculator.
    goalTitle:['How long to reach my goal?','¿Cuánto tardo en llegar a mi meta?','Quanto tempo para chegar à minha meta?'],
    goalIntro:['Pick a goal. Then change the numbers to match your week.','Elige una meta. Luego cambia los números según tu semana.','Escolha uma meta. Depois mude os números para a sua semana.'],
    goalTryOwn:['Try your own numbers','Prueba tus propios números','Teste seus próprios números'],
    goalAmountLabel:['My goal','Mi meta','Minha meta'],
    goalTimesLabel:['Times a week','Veces por semana','Vezes por semana'],
    goalHoursLabel:['Hours each time','Horas cada vez','Horas cada vez'],
    goalPreset1:['$2,000 emergency cushion','$2,000 para emergencias','$2.000 para emergências'],
    goalPreset2:['$9,000 toward a used truck','$9,000 para una camioneta usada','$9.000 para uma caminhonete usada'],
    goalPreset3:['My own amount','Mi propia cantidad','Meu próprio valor'],
    goalResultLabel:['Time to reach your goal','Tiempo para llegar a tu meta','Tempo para chegar à sua meta'],
    goalError:['Enter a goal and at least 1 hour a week.','Escribe una meta y al menos 1 hora por semana.','Digite uma meta e pelo menos 1 hora por semana.'],
    goalBasis:[`Uses ${usd(KEEP)} kept an hour after gas and taxes (our ${TOWN} estimate for a weekend dinner shift, waiting included). Weeks are 4.33 a month.`,`Usa ${usd(KEEP)} por hora después de gasolina e impuestos (nuestra estimación para ${TOWN} en un turno de cena de fin de semana, con la espera incluida). Un mes tiene 4.33 semanas.`,`Usa ${usd(KEEP)} por hora após gasolina e impostos (nossa estimativa para ${TOWN} num turno de jantar no fim de semana, com a espera incluída). Um mês tem 4,33 semanas.`],
    // Testimonials UI words (the quotes themselves come from testimonials.json).
    testiTitle:['What drivers say','Lo que dicen los conductores','O que dizem os entregadores'],
    testiPositive:['Positive','Positivo','Positivo'], testiMixed:['Neutral','Neutral','Neutro'], testiNegative:['Negative','Negativo','Negativo'],
    testiReadMore:['Read more','Leer más','Ler mais'], testiReadLess:['Show less','Ver menos','Ver menos'],
    testiOriginal:['Read the original post','Leer la publicación original','Ler a publicação original'],
    testiTranslated:['Translated from English','Traducido del inglés','Traduzido do inglês'],
    testiOf:['of','de','de'],
    ...(D.testimonials?{testiIntro:(()=>{const T=D.testimonials,c=T.display_counts||T.counts,n=(c.positive||0)+(c.neutral||c.mixed||0)+(c.negative||0),r=T.read_total_approx,p=T.positive_in_sources_approx;return [
      `${n} posts from ${METRO}-area and ${STATE_NAME} drivers, 2024 to 2026. Mostly good and neutral ones, plus ${c.negative} bad. Most posts we read were not positive: about ${p} of ${r}.`,
      `${n} publicaciones de conductores de ${METRO} y ${STATE_NAME}, de 2024 a 2026. Sobre todo buenas y neutrales, más ${c.negative} malas. La mayoría de lo que leímos no era positivo: unas ${p} de ${r}.`,
      `${n} publicações de entregadores de ${METRO} e ${STATE_NAME}, de 2024 a 2026. Principalmente boas e neutras, mais ${c.negative} ruins. A maioria do que lemos não era positiva: cerca de ${p} de ${r}.`];})()}:{}),
  });
  (AR.map_features||[]).forEach(f=>{copy['mapFeature_'+f.key]=[f.label.en,f.label.es,f.label.pt];});
  AR.zones&&AR.zones.forEach((z,i)=>{const a=AR.areas.find(x=>x.id===z.area_id);
    const nm=z.label?[z.label.en,z.label.es,z.label.pt]:a?[AL(a,'en'),AL(a,'es'),AL(a,'pt')]:[z.name,z.name,z.name];  // strip label wins
    copy['zoneName'+i]=nm;
    copy['zoneFact'+i]=[`${z.restaurants} restaurants on the apps`,`${z.restaurants} restaurantes en las apps`,`${z.restaurants} restaurantes nos apps`];});

  // ---- Goal calculator logic (Claude). Codex's markup: #goal-amount, #goal-times, #goal-hours,
  // [data-goal-preset], #goal-months, #goal-weekly, #goal-slower, #goal-error. Missing markup: no-op. ----
  const WEEKS_PER_MONTH=4.33;
  const keptLow=R?Math.max(0,(R.low-F.gas_per_hour.value)*(1-P.calculator_defaults.tax_rate/100)):null;
  const keptHigh=R?Math.max(0,(R.high-F.gas_per_hour.value)*(1-P.calculator_defaults.tax_rate/100)):null;
  const monthsText=(m)=>{const l=language;
    if(!isFinite(m))return '—';
    if(m<1)return ['Less than 1 month','Menos de 1 mes','Menos de 1 mês'][ix()];
    if(m>24){const y=Math.round(m/12*2)/2;const ys=String(y).replace('.',l==='en'?'.':',');return [`About ${ys} years`,`Unos ${ys} años`,`Cerca de ${ys} anos`][ix()];}
    const h=Math.round(m*2)/2, s=String(h).replace('.',l==='en'?'.':',');
    return [`About ${s} month${h===1?'':'s'}`,`Unos ${s} mes${h===1?'':'es'}`,`Cerca de ${s} ${h===1?'mês':'meses'}`][ix()];};
    window.goalCalc=function(){
    const $=id=>document.getElementById(id); const amt=$('goal-amount'),times=$('goal-times'),hours=$('goal-hours');
    if(!amt||!times||!hours)return null;
    const g=parseFloat(amt.value), n=parseFloat(times.value), h=parseFloat(hours.value);
    const err=$('goal-error'), ok=g>0&&n>0&&h>0&&isFinite(g+n+h);
    if(err){err.hidden=ok; err.textContent=ok?'':t('goalError');}
    if(!ok){['goal-months','goal-weekly','goal-slower'].forEach(id=>{if($(id))$(id).textContent='—';});return null;}
    const keep=(window.LOCAL_FIFTY_GOAL_KEEP>0?window.LOCAL_FIFTY_GOAL_KEEP:KEEP), weekly=keep*n*h, months=g/(weekly*WEEKS_PER_MONTH);
    // basis note for the apps (and hours) chosen; default = the headline apps
    { const gApps=window.LOCAL_FIFTY_GOAL_APPS||(HD?HD.apps:[fa]), fromHours=!!window.LOCAL_FIFTY_GOAL_SEL, N=l=>appNames(gApps,l);
      copy.goalBasis=fromHours?[`Uses ${usd(keep)} kept an hour: your selected hours with ${N(0)} (our ${TOWN} estimate, waiting included). Weeks are 4.33 a month.`,
                                `Usa ${usd(keep)} por hora: tus horas elegidas con ${N(1)} (nuestra estimación para ${TOWN}, con la espera incluida). Un mes tiene 4.33 semanas.`,
                                `Usa ${usd(keep)} por hora: suas horas escolhidas com ${N(2)} (nossa estimativa para ${TOWN}, com a espera incluída). Um mês tem 4,33 semanas.`]
                             :[`Uses ${usd(keep)} kept an hour after gas and taxes with ${N(0)} (our ${TOWN} estimate for a weekend dinner shift, waiting included). Weeks are 4.33 a month.`,
                                `Usa ${usd(keep)} por hora después de gasolina e impuestos con ${N(1)} (nuestra estimación para ${TOWN} en un turno de cena de fin de semana, con la espera incluida). Un mes tiene 4.33 semanas.`,
                                `Usa ${usd(keep)} por hora após gasolina e impostos com ${N(2)} (nossa estimativa para ${TOWN} num turno de jantar no fim de semana, com a espera incluída). Um mês tem 4,33 semanas.`];
      document.querySelectorAll('[data-t="goalBasis"]').forEach(el=>{el.textContent=copy.goalBasis[ix()];}); }
    if($('goal-months'))$('goal-months').textContent=monthsText(months);
    // deliveries a week: the selected hours' rate when the hourly picker set one, else the weekend dinner rate
    const dph=(window.LOCAL_FIFTY_GOAL_DPH>0?window.LOCAL_FIFTY_GOAL_DPH:(F.deliveries_per_hour?F.deliveries_per_hour.value:0)), nd=Math.round(dph*n*h);
    if($('goal-weekly'))$('goal-weekly').textContent=nd>0?[`About ${usd0(weekly)} a week kept, about ${nd} ${nd===1?'delivery':'deliveries'}`,`Unos ${usd0(weekly)} por semana, unas ${nd} ${nd===1?'entrega':'entregas'}`,`Cerca de ${usd0(weekly)} por semana, cerca de ${nd} ${nd===1?'entrega':'entregas'}`][ix()]
      :[`About ${usd0(weekly)} a week kept`,`Unos ${usd0(weekly)} por semana`,`Cerca de ${usd0(weekly)} por semana`][ix()];
    const sl=$('goal-slower');
    if(sl){ if(R&&keptLow>0){
        const a=g/(keptHigh*n*h*WEEKS_PER_MONTH), b=g/(keptLow*n*h*WEEKS_PER_MONTH), yrs=b>24;  // one unit for both ends
        const v=x=>yrs?Math.max(0.5,Math.round(x/12*2)/2):Math.max(1,Math.round(x));  // never "0 months"
        const fmt=x=>String(x).replace('.',language==='en'?'.':',');
        const va=v(a), vb=v(b), one=vb===1&&!yrs;
        const u=yrs?['years','años','anos'][ix()]:one?['month','mes','mês'][ix()]:['months','meses','meses'][ix()];
        const span=va===vb?[`about ${fmt(vb)}`,`unos ${fmt(vb)}`,`cerca de ${fmt(vb)}`][ix()]:[`${fmt(va)} to ${fmt(vb)}`,`de ${fmt(va)} a ${fmt(vb)}`,`de ${fmt(va)} a ${fmt(vb)}`][ix()];
        sl.hidden=false; sl.textContent=[`If you wait a lot between orders, it can take longer: ${span} ${u}, based on ${R.n} ${METRO}-area drivers’ own reports.`,
          `Si esperas mucho entre pedidos, puede tardar más: ${span} ${u}, según ${R.n} conductores del área de ${METRO}.`,
          `Se você espera muito entre pedidos, pode demorar mais: ${span} ${u}, segundo ${R.n} entregadores da região de ${METRO}.`][ix()];}
      else sl.hidden=true; }
    return {months, weekly};
  };
  window.LOCAL_FIFTY_GOAL_DEFAULTS={amount:2000,times:3,hours:P.calculator_defaults.hours,presets:[2000,9000]};
  document.addEventListener('input',e=>{if(e.target&&/^goal-/.test(e.target.id))goalCalc();});
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-goal-preset]'); if(!b)return;
    const v=b.dataset.goalPreset, amt=document.getElementById('goal-amount'); if(!amt)return;
    if(v==='custom'){amt.focus();amt.select&&amt.select();} else {amt.value=v;}
    // a preset goal keeps any hours chosen in the picker; only the amount changes
    document.querySelectorAll('[data-goal-preset]').forEach(x=>x.setAttribute('aria-pressed',String(x===b))); goalCalc();});
  const baseSetLang=setLanguage; setLanguage=function(l){baseSetLang(l); goalCalc();};

  // ---- "When should I drive?" by hour (Zack 2026-10-05). Data: dist/data/hourly.json. Codex renders; these are the words and helpers. ----
  const H=D.hourly;
  if(H){
    const W=H.windows, best=W.find(w=>w.rank==='best'), worst=W.find(w=>w.rank==='worst');
    const dayName={en:{'Fri–Sat':'Friday and Saturday','Mon–Thu':'Monday to Thursday','Sat–Sun':'Saturday and Sunday','Mon–Fri':'Monday to Friday'},
                   es:{'Fri–Sat':'viernes y sábado','Mon–Thu':'lunes a jueves','Sat–Sun':'sábado y domingo','Mon–Fri':'lunes a viernes'},
                   pt:{'Fri–Sat':'sexta e sábado','Mon–Thu':'segunda a quinta','Sat–Sun':'sábado e domingo','Mon–Fri':'segunda a sexta'}};
    const span=(w,l)=>`${dayName[l][w.days]||w.days}, ${hr(w.start,l)}–${hr(w.end%24,l)}`;
    Object.assign(copy,{
      whenLead:[`When you drive matters. Best pay: ${span(best,'en')}, about ${usd0(best.kept)} an hour.`,`Importa cuándo manejas. Lo que más paga: ${span(best,'es')}, unos ${usd0(best.kept)} por hora.`,`Importa quando você dirige. O que mais paga: ${span(best,'pt')}, cerca de ${usd0(best.kept)} por hora.`],
      whenChartLabel:[`Estimated pay by hour on ${A[H.app].name}, after gas and taxes`,`Pago estimado por hora en ${A[H.app].name}, después de gasolina e impuestos`,`Ganho estimado por hora no ${A[H.app].name}, após gasolina e impostos`],
      whenTabWeekdays:['Weekdays','Entre semana','Dias úteis'], whenTabWeekends:['Weekends','Fin de semana','Fim de semana'],
      whenNoEstimate:['Few restaurants open','Pocos restaurantes abiertos','Poucos restaurantes abertos'],
      whenTapDetail:['{kept} an hour · likely {low} to {high}','{kept} por hora · probablemente de {low} a {high}','{kept} por hora · provavelmente de {low} a {high}'],
      whenPickerTitle:['Tap the hours you can drive','Toca las horas en que puedes manejar','Toque nas horas em que você pode dirigir'],
      whenPickerHint:['Tap again to remove an hour.','Toca de nuevo para quitar una hora.','Toque de novo para tirar uma hora.'],
      whenPickerResult:['About {weekly} a week from these hours','Unos {weekly} por semana con estas horas','Cerca de {weekly} por semana com essas horas'],
      whenPickerHours:['{hours} hours a week','{hours} horas por semana','{hours} horas por semana'],
      whenPickerDeliveries:['About {deliveries} deliveries a week','Unas {deliveries} entregas por semana','Cerca de {deliveries} entregas por semana'],
      // singular forms for a count of 1 (Codex: use these when the number is 1)
      whenPickerHoursOne:['{hours} hour a week','{hours} hora por semana','{hours} hora por semana'],
      whenPickerDeliveriesOne:['About {deliveries} delivery a week','Unas {deliveries} entrega por semana','Cerca de {deliveries} entrega por semana'],
      whenUseInGoal:['Use these hours in my goal','Usar estas horas en mi meta','Usar essas horas na minha meta'],
      whenWindowBest:['Best','Mejor','Melhor'], whenWindowGood:['Also good','También bueno','Também bom'], whenWindowWorst:['Slowest','Más lento','Mais devagar'],
      whenHowWeGotThis:['How we got this','Cómo lo calculamos','Como calculamos'],
      whenHowWeGotThisText:[`Each bar is our ${TOWN} estimate for ${A[H.app].name}: pay per hour logged in, after gas and taxes. It starts from which restaurants are open each hour in ${TOWN}. Then it adds when people order: lunch and dinner peaks, with 6 pm the busiest. When more people order, you wait less between orders. Friday and Saturday dinner match what drivers log. The shape between meals is partly our assumption for now. We are recording real ${TOWN} delivery times every 30 minutes to replace it. These are open restaurants and estimates, not measured orders.`,
                            `Cada barra es nuestra estimación para ${TOWN} en ${A[H.app].name}: pago por hora conectado, después de gasolina e impuestos. Parte de qué restaurantes abren cada hora en ${TOWN}. Luego suma cuándo pide la gente: picos de almuerzo y cena, y las 6 pm es la hora más ocupada. Cuando más gente pide, esperas menos entre pedidos. La cena de viernes y sábado coincide con lo que registran los conductores. La forma entre comidas es en parte nuestra suposición por ahora. Estamos registrando tiempos de entrega reales en ${TOWN} cada 30 minutos para reemplazarla. Son restaurantes abiertos y estimaciones, no pedidos medidos.`,
                            `Cada barra é nossa estimativa para ${TOWN} no ${A[H.app].name}: ganho por hora conectado, após gasolina e impostos. Parte de quais restaurantes abrem a cada hora em ${TOWN}. Depois soma quando as pessoas pedem: picos de almoço e jantar, e 18h é a hora mais movimentada. Quando mais gente pede, você espera menos entre pedidos. O jantar de sexta e sábado bate com o que os entregadores registram. A forma entre as refeições é em parte nossa suposição por enquanto. Estamos registrando tempos de entrega reais em ${TOWN} a cada 30 minutos para substituí-la. São restaurantes abertos e estimativas, não pedidos medidos.`],
    });
    // Helpers for Codex's chart and picker. selection = [{day: 0..6 (Mon=0), hour: 0..23}]
    window.LocalFiftyHourly={
      windowLabel(w){ return span(w,language); },   // localized "Friday and Saturday, 5 pm–9 pm" for a windows[] item
      // apps (optional): two or three apps at once, from multi_app.json; few-open hours count as no estimate either way
      weekly(sel,apps){ let w=0,lo=0,hi=0,n=0,dv=0; const MD=D.multi_app, key=(apps&&apps.length&&MD)?MD.apps.filter(a=>apps.includes(a)).join('+'):H.app;
        const MH=(key!==H.app&&MD)?MD.hourly[key]:null, cb=MH?MD.combos[key].dinner:null;
        (sel||[]).forEach(({day,hour})=>{const k=H.kept[day]?.[hour]; if(k==null) return;
          if(MH){const km=MH.kept[day][hour]; w+=km; lo+=km*cb.low/cb.kept; hi+=km*cb.high/cb.kept; dv+=60*MH.busy[day][hour]/MH.minutes[day][hour];}
          else{w+=k; lo+=H.low[day][hour]; hi+=H.high[day][hour]; const o=this.orders(day,hour); if(o) dv+=o.deliveries_per_hour;}
          n++;});
        return {weekly:Math.round(w*100)/100, low:Math.round(lo*100)/100, high:Math.round(hi*100)/100, hours:(sel||[]).length, hours_with_estimate:n,
                deliveries:D.shift?Math.round(dv):null}; },   // deliveries a week from the selected hours (null without shift.json)
      // One hour of the week (day 0 = Mon): deliveries in that hour and the average wait between orders, from shift.json's grid.
      orders(day,hour){ const S_=D.shift; if(!S_) return null; const u=S_.utilization[day][hour], T_=S_.order.minutes_per_order;
        return {deliveries_per_hour:Math.round(u*60/T_*10)/10, wait_minutes:Math.round(T_*(1-u)/Math.max(u,1e-3)), few_open:S_.few_open[day][hour]}; },
      // The same as words, for the tap detail: "About 2.1 deliveries an hour · about 6 minutes between orders"
      ordersText(day,hour,apps){ const multiKey=(apps&&apps.length&&D.multi_app)?D.multi_app.apps.filter(a=>apps.includes(a)).join('+'):H.app;
        const o=(multiKey!==H.app&&window.LocalFiftyMulti)?window.LocalFiftyMulti.hour(apps,day,hour):this.orders(day,hour);
        if(!o||o.few_open) return ''; const l=['en','es','pt'].indexOf(language), w=o.wait_minutes;
        const wt=w<60?[`${w} minutes`,`${w} minutos`,`${w} minutos`][l]:(()=>{const r=Math.round(w/5)*5,h=Math.floor(r/60),m=r%60;return [`${h} hour${h>1?'s':''}${m?` ${m} minutes`:''}`,`${h} hora${h>1?'s':''}${m?` y ${m} minutos`:''}`,`${h} hora${h>1?'s':''}${m?` e ${m} minutos`:''}`][l];})();
        const n=o.deliveries_per_hour.toLocaleString(['en-US','es-US','pt-BR'][l]);
        return [`About ${n} deliveries an hour · about ${wt} between orders`,`Unas ${n} entregas por hora · alrededor de ${wt} entre pedidos`,`Cerca de ${n} entregas por hora · cerca de ${wt} entre pedidos`][l]; },
      // ranked windows for the apps chosen (best, good, worst); windowLabel() formats each
      windows(apps){ const MD_=D.multi_app, k=(apps&&apps.length&&MD_)?MD_.apps.filter(a=>apps.includes(a)).join('+'):H.app;
        return (k!==H.app&&MD_&&MD_.hourly[k])?MD_.hourly[k].windows:H.windows; },
      // section text for the apps chosen: {lead, chartLabel, howText}
      words(apps){ const l=['en','es','pt'].indexOf(language), ap=(apps&&apps.length)?apps:[H.app], N=appNames(ap,l), multi=ap.length>1;
        const W=this.windows(ap), b=W.find(w=>w.rank==='best'), lg=['en','es','pt'][l];
        return {
          lead:[`When you drive matters. Best pay: ${span(b,'en')}, about ${usd0(b.kept)} an hour${multi?` with ${N}`:''}.`,`Importa cuándo manejas. Lo que más paga: ${span(b,'es')}, unos ${usd0(b.kept)} por hora${multi?` con ${N}`:''}.`,`Importa quando você dirige. O que mais paga: ${span(b,'pt')}, cerca de ${usd0(b.kept)} por hora${multi?` com ${N}`:''}.`][l],
          chartLabel:[`Estimated pay by hour ${multi?'with':'on'} ${N}, after gas and taxes`,`Pago estimado por hora ${multi?'con':'en'} ${N}, después de gasolina e impuestos`,`Ganho estimado por hora ${multi?'com':'no'} ${N}, após gasolina e impostos`][l],
          howText:multi?[`Each bar is our ${TOWN} estimate with ${N} on at once: pay per hour logged in, after gas and taxes. It starts from which restaurants are open each hour in ${TOWN} and when people order, with 6 pm the busiest. With more apps you get more offers, so you can skip low-paying ones and, at quiet times, wait less. Friday and Saturday dinner match our estimate for these apps. The shape between meals is partly our assumption; we are recording real ${TOWN} delivery times to replace it. These are estimates, not measured orders.`,
                               `Cada barra es nuestra estimación para ${TOWN} con ${N} a la vez: pago por hora conectado, después de gasolina e impuestos. Parte de qué restaurantes abren cada hora en ${TOWN} y de cuándo pide la gente, con las 6 pm como la hora más ocupada. Con más apps recibes más ofertas, así que puedes rechazar las de poco pago y, en horas tranquilas, esperar menos. La cena de viernes y sábado coincide con nuestra estimación para estas apps. La forma entre comidas es en parte nuestra suposición; estamos registrando tiempos de entrega reales en ${TOWN} para reemplazarla. Son estimaciones, no pedidos medidos.`,
                               `Cada barra é nossa estimativa para ${TOWN} com ${N} ao mesmo tempo: ganho por hora conectado, após gasolina e impostos. Parte de quais restaurantes abrem a cada hora em ${TOWN} e de quando as pessoas pedem, com 18h como a hora mais movimentada. Com mais apps você recebe mais ofertas, então pode recusar as que pagam pouco e, nas horas calmas, esperar menos. O jantar de sexta e sábado bate com nossa estimativa para esses apps. A forma entre as refeições é em parte nossa suposição; estamos registrando tempos de entrega reais em ${TOWN} para substituí-la. São estimativas, não pedidos medidos.`][l]
                             :copy.whenHowWeGotThisText[l],
        }; },
      toGoal(sel){ window.LOCAL_FIFTY_GOAL_SEL=sel; const r=this.weekly(sel,window.LOCAL_FIFTY_GOAL_APPS); if(!r.hours) return r; const days=new Set(sel.map(s=>s.day)).size||1;
        const $=id=>document.getElementById(id);
        if($('goal-times')) $('goal-times').value=days; if($('goal-hours')) $('goal-hours').value=Math.round(r.hours/days*10)/10;
        window.LOCAL_FIFTY_GOAL_KEEP=r.hours?r.weekly/r.hours:null;   // goalCalc uses the selected hours' average kept pay
        window.LOCAL_FIFTY_GOAL_DPH=(r.hours&&r.deliveries!=null)?r.deliveries/r.hours:null;   // and their deliveries an hour
        goalCalc(); return r; },
    };
  }
  // ---- "What is a delivery shift like?" (Zack 2026-10-05): step times for one order, the wait for the next order, and how many
  // deliveries fit in the chosen start time and length. Same steps as shift_plan() in scripts/build_site_data.py (data/shift.json).
  const S=D.shift;
  if(S){
    const T=S.order.minutes_per_order, WEEK=7*1440, MAXW=S.max_wait_minutes;
    const uAt=m=>{const x=((Math.floor(m)%WEEK)+WEEK)%WEEK; return S.utilization[Math.floor(x/1440)][Math.floor((x%1440)/60)];};
    const waitFor=u=>T*(1-u)/Math.max(u,1e-3);
    const hhmm=m=>{const x=((Math.round(m)%1440)+1440)%1440; return String(Math.floor(x/60)).padStart(2,'0')+':'+String(x%60).padStart(2,'0');};
    const appName=A[S.app].name, wAll=Math.round(S.waits.all_hours), wDin=Math.round(S.waits.weekend_dinner);
    Object.assign(copy,{
      shiftWaitTitle:['Wait for your next delivery','Espera tu próxima entrega','Espere a próxima entrega'],
      shiftWaitNote:[`The time between one drop-off and your next order. You are not paid while you wait. Across the week in ${TOWN}, it averages about ${wAll} minutes. On a Friday or Saturday dinner shift, about ${wDin}. Late nights and weekday mornings are slower. Waiting near a group of restaurants keeps the next pickup close.`,
                     `Es el tiempo entre una entrega y tu próximo pedido. No te pagan mientras esperas. En ${TOWN}, el promedio de la semana es de unos ${wAll} minutos. En un turno de cena de viernes o sábado, unos ${wDin}. Tarde en la noche y las mañanas entre semana hay menos pedidos. Esperar cerca de varios restaurantes deja la próxima recogida cerca.`,
                     `É o tempo entre uma entrega e o próximo pedido. Você não recebe enquanto espera. Em ${TOWN}, a média da semana é de cerca de ${wAll} minutos. Num turno de jantar de sexta ou sábado, cerca de ${wDin}. Tarde da noite e nas manhãs de dias úteis há menos pedidos. Esperar perto de vários restaurantes deixa a próxima retirada perto.`],
    });
    window.LocalFiftyShift={
      // plan({start:'17:00', hours:4, day:'Sat'}) -> step times (minutes from the start, rounded to 5, and 'HH:MM'), the average wait
      // for the next order over the shift, and deliveries. additional_deliveries = after the first one shown in steps 1-4.
      // apps (optional): e.g. ['doordash','grubhub'] for two apps at once; default = the featured app alone
      plan({start='17:00',hours=4,day=S.default_day,apps=null}={}){
        const [h,mi]=String(start).split(':').map(Number), s0=(h||0)*60+(mi||0), end=Math.round(Number(hours)*60);
        const t0=Math.max(0,S.days.indexOf(day))*1440+s0;
        const MD=D.multi_app, key=(apps&&apps.length&&MD)?MD.apps.filter(a=>apps.includes(a)).join('+'):S.app;
        const MH=(key!==S.app&&MD&&MD.hourly[key])?MD.hourly[key]:null;
        const cell=m=>{const x=((Math.floor(m)%WEEK)+WEEK)%WEEK; return [Math.floor(x/1440),Math.floor((x%1440)/60)];};
        const uF=m=>{if(!MH) return uAt(m); const [d_,h_]=cell(m); return MH.busy[d_][h_];};
        const tF=m=>{if(!MH) return T; const [d_,h_]=cell(m); return MH.minutes[d_][h_];};
        const w1=Math.min(MAXW,tF(t0)*(1-uF(t0))/Math.max(uF(t0),1e-3));
        let idle=0, dv=0; for(let i=0;i<end;i++){const u=uF(t0+i); idle+=1-u; dv+=u/tF(t0+i);}
        const avgWait=idle/Math.max(dv,1e-6), wait=Math.min(MAXW,avgWait);   // waiting minutes per delivery over the shift
        const O=S.order, legs=[['open_app',w1+O.drive_to_restaurant],['pick_up',O.restaurant_wait],['drive_to_drop_off',O.drive_to_customer],['drop_off',O.handoff],['wait_next',wait],['more_deliveries',null]];
        let at=0, prev=-5; const steps=legs.map(([key,dur])=>{const r=Math.max(Math.round(at/5)*5,prev+5); prev=r;
          const st={key,at:r,time:hhmm(s0+r),minutes:dur==null?null:Math.round(dur*10)/10,after_end:r>=end}; if(dur!=null) at+=dur; return st;});
        const doneFirst=O.drive_to_restaurant+w1+O.restaurant_wait+O.drive_to_customer+O.handoff;
        let more=0; if(doneFirst<end){for(let i=Math.floor(doneFirst);i<end;i++) more+=uF(t0+i)/tF(t0+i);}
        const first=doneFirst<=end?1:0, n=Math.round(more);
        const PM=S.pay_model; let pay=0,mls=0,tx=0;
        let keptM=0;
        if(MH) for(let i=0;i<end;i++){const [d_,h_]=cell(t0+i); pay+=MH.pay[d_][h_]/60; keptM+=MH.kept[d_][h_]/60;}
        else if(PM) for(let i=0;i<end;i++){const u=uAt(t0+i), p=PM.engaged_pay_per_hour*u, m=PM.miles_per_busy_hour*u; pay+=p/60; mls+=m/60; tx+=Math.max(0,p-PM.mileage_rate*m)/60;}
        const gas=(PM&&!MH)?mls*PM.gas_per_mile:null; tx=(PM&&!MH)?tx*PM.tax_on_taxable:null;
        let quiet=0; for(let i=0;i<end;i+=60){const x=((t0+i)%WEEK+WEEK)%WEEK; if(S.few_open[Math.floor(x/1440)][Math.floor((x%1440)/60)]) quiet++;}
        return {start_time:start, duration_hours:Number(hours), day, apps:key.split('+'), steps, end_time:hhmm(s0+end),
                first_wait_minutes:Math.round(w1*10)/10, wait_minutes:Math.round(avgWait*10)/10, wait_over_max:avgWait>=MAXW,
                additional_deliveries:n, deliveries:first+n,
                deliveries_low:first+Math.round(more*S.deliveries_ratio_low), deliveries_high:first+Math.round(more*S.deliveries_ratio_high),
                first_delivery_done:first===1, quiet_hours:quiet, minutes_per_order:MH?Math.round(tF(t0)*10)/10:T, evidence:S.evidence,
                pay:(PM||MH)?Math.round(pay*100)/100:null, gas:gas!=null?Math.round(gas*100)/100:null, tax:tx!=null?Math.round(tx*100)/100:null,
                kept:MH?Math.round(keptM*100)/100:(PM?Math.round((pay-gas-tx)*100)/100:null), miles:(PM&&!MH)?Math.round(mls*10)/10:null};
      },
      // words(plan) -> the step text in the reader's language: {waitTitle, waitValue, waitNote, moreTitle, moreNote, openAppNote, timesNote, quietNote}
      words(r){ const l=language, L=k=>copy[k][['en','es','pt'].indexOf(l)];
        const hrs=x=>({en:`${x} ${x===1?'hour':'hours'}`,es:`${x} ${x===1?'hora':'horas'}`,pt:`${x} ${x===1?'hora':'horas'}`})[l];
        const m=Math.round(r.wait_minutes), w1=Math.round(r.first_wait_minutes), n=r.additional_deliveries, tot=r.deliveries, H=r.duration_hours;
        const pick=(en,es,pt)=>({en,es,pt})[l];
        // minutes in words: under an hour to the minute, then hours and minutes rounded to 5
        const dur=x=>{ if(x<60) return pick(`${x} ${x===1?'minute':'minutes'}`,`${x} ${x===1?'minuto':'minutos'}`,`${x} ${x===1?'minuto':'minutos'}`);
          const h=Math.floor(Math.round(x/5)*5/60), mm=Math.round(x/5)*5%60; return pick(`${h} hour${h>1?'s':''}${mm?` ${mm} minutes`:''}`,`${h} hora${h>1?'s':''}${mm?` y ${mm} minutos`:''}`,`${h} hora${h>1?'s':''}${mm?` e ${mm} minutos`:''}`); };
        return {
          waitTitle:L('shiftWaitTitle'),
          waitNote:(()=>{ const ap=r.apps||[S.app], key=ap.join('+'), C=D.multi_app&&D.multi_app.combos[key];
            if(!C||ap.length<2) return L('shiftWaitNote');
            const N=appNames(ap,['en','es','pt'].indexOf(l)), wa=Math.round(C.all_hours.wait), wd=Math.round(C.dinner.wait), longer=C.dinner.wait>S.waits.weekend_dinner+0.5;
            return pick(`The time between one drop-off and your next order. You are not paid while you wait. With ${N}, it averages about ${wa} minutes across the week in ${TOWN}, and about ${wd} on a Friday or Saturday dinner shift.${longer?' That can be a little longer than one app, because you skip low-paying offers; each order pays more.':''} Late nights and weekday mornings are slower.`,
                        `Es el tiempo entre una entrega y tu próximo pedido. No te pagan mientras esperas. Con ${N}, el promedio de la semana en ${TOWN} es de unos ${wa} minutos, y unos ${wd} en un turno de cena de viernes o sábado.${longer?' Puede ser un poco más que con una app, porque rechazas ofertas de poco pago; cada pedido paga más.':''} Tarde en la noche y las mañanas entre semana hay menos pedidos.`,
                        `É o tempo entre uma entrega e o próximo pedido. Você não recebe enquanto espera. Com ${N}, a média da semana em ${TOWN} é de cerca de ${wa} minutos, e cerca de ${wd} num turno de jantar de sexta ou sábado.${longer?' Pode ser um pouco mais que com um app, porque você recusa ofertas que pagam pouco; cada pedido paga mais.':''} Tarde da noite e nas manhãs de dias úteis há menos pedidos.`); })(),
          waitValue:r.wait_over_max?pick('Over 2 hours','Más de 2 horas','Mais de 2 horas'):pick(`About ${dur(m)}`,`Alrededor de ${dur(m)}`,`Cerca de ${dur(m)}`),
          moreTitle:n===0?pick('No time for more deliveries','No queda tiempo para más entregas','Não sobra tempo para mais entregas')
                    :n===1?pick('Do 1 more delivery','Haz 1 entrega más','Faça mais 1 entrega'):pick(`Do ${n} more deliveries`,`Haz ${n} entregas más`,`Faça mais ${n} entregas`),
          moreNote:!r.first_delivery_done?pick('This shift ends before the first delivery is likely done.','El turno termina antes de que la primera entrega esté lista.','O turno termina antes de a primeira entrega ficar pronta.')
                   :pick(`${tot} ${tot===1?'delivery':'deliveries'} in ${hrs(H)}, counting the first one.`,`${tot} ${tot===1?'entrega':'entregas'} en ${hrs(H)}, contando la primera.`,`${tot} ${tot===1?'entrega':'entregas'} em ${hrs(H)}, contando a primeira.`),
          openAppNote:w1>=MAXW?pick('At this hour the first offer can take over 2 hours.','A esta hora, el primer pedido puede tardar más de 2 horas.','Neste horário, o primeiro pedido pode levar mais de 2 horas.')
                      :pick(`Your first offer should come in about ${dur(w1)}.`,`Tu primer pedido debería llegar en alrededor de ${dur(w1)}.`,`O primeiro pedido deve chegar em cerca de ${dur(w1)}.`),
          timesNote:(()=>{ const ap=r.apps||[S.app], li_=['en','es','pt'].indexOf(l), N=appNames(ap,li_), tm=Math.round(r.minutes_per_order||T), multi=ap.length>1;
            return pick(`One delivery takes about ${tm} minutes, from accepting the offer to the drop-off. Times are our ${TOWN} estimate for a Saturday ${multi?'with':'on'} ${N}, rounded to 5 minutes.`,
                        `Una entrega toma unos ${tm} minutos, desde que aceptas el pedido hasta que lo entregas. Las horas son nuestra estimación para ${TOWN} un sábado ${multi?'con':'en'} ${N}, redondeadas a 5 minutos.`,
                        `Uma entrega leva cerca de ${tm} minutos, do aceite do pedido até a entrega. Os horários são nossa estimativa para ${TOWN} num sábado ${multi?'com':'no'} ${N}, arredondados para 5 minutos.`); })(),
          // label for steps that start after the shift ends (Codex: "8:05am · After your shift"; the last step shows it alone, no range)
          afterEndLabel:pick('After your shift','Después de tu turno','Depois do seu turno'),
          // one-line result for the chosen hours (in place of the removed "Check what you kept" step)
          summary:r.kept==null?'':pick(`${hrs(H)}: about ${tot} ${tot===1?'delivery':'deliveries'}, about ${usd0(r.pay)} pay, and about ${usd0(r.kept)} kept after gas and taxes.`,
                                       `${hrs(H)}: unas ${tot} ${tot===1?'entrega':'entregas'}, unos ${usd0(r.pay)} de pago y unos ${usd0(r.kept)} después de gasolina e impuestos.`,
                                       `${hrs(H)}: cerca de ${tot} ${tot===1?'entrega':'entregas'}, cerca de ${usd0(r.pay)} de ganho e cerca de ${usd0(r.kept)} após gasolina e impostos.`),
          quietNote:r.quiet_hours>0?pick(`Few restaurants are open for ${hrs(r.quiet_hours)} of this shift. Expect long waits.`,`Pocos restaurantes abren durante ${hrs(r.quiet_hours)} de este turno. Las esperas serán largas.`,`Poucos restaurantes abertos durante ${hrs(r.quiet_hours)} deste turno. As esperas serão longas.`):'',
        }; },
    };
    // The fixed example's step times (Saturday 5 pm, same hours as the calculator), from the same planner.
    const exPlan=window.LocalFiftyShift.plan({start:'17:00',hours:ev.hours,apps:HD?HD.apps:null});
    const fmtT=(hm,l)=>{const [h,m]=hm.split(':').map(Number), mm=String(m).padStart(2,'0'); return l==='pt'?`${h}h${mm}`:`${h%12||12}:${mm} ${h<12?'am':'pm'}`;};
    [0,1,2,3].forEach(i=>{copy['stepTime'+(i+1)]=['en','es','pt'].map(l=>fmtT(exPlan.steps[i].time,l));});
    copy.stepTime5=['en','es','pt'].map(l=>fmtT(exPlan.end_time,l));
    // Answer the page's shift controls (Codex's 'local-fifty:shift-change' event; app.js runs first, so also answer once now).
    const answer=e=>{const s=document.getElementById('shift-start'), d=document.getElementById('shift-duration');
      if(!s||!s.value||!(Number(d&&d.value)>0)) return;
      const apps=(e&&e.detail&&e.detail.apps)||window.LOCAL_FIFTY_SHIFT_APPS||(HD?HD.apps:null);
      window.dispatchEvent(new CustomEvent('local-fifty:shift-estimate',{detail:window.LocalFiftyShift.plan({start:s.value,hours:Number(d.value),apps})}));};
    window.addEventListener('local-fifty:shift-change',answer); answer();
  }

  // ---- Running two or three apps at once (Zack 2026-10-05; model v0.6, data/multi_app.json). How it pays: offers from each app
  // arrive separately, so with more apps you can skip poor offers and, at quiet times, wait less. ----
  const MD=D.multi_app;
  if(MD){
    const li=()=>['en','es','pt'].indexOf(language), pick=(en,es,pt)=>[en,es,pt][li()];
    const keyOf=apps=>MD.apps.filter(a=>(apps||[]).includes(a)).join('+');
    const nameList=apps=>{const n=MD.apps.filter(a=>(apps||[]).includes(a)).map(a=>A[a].name);
      const and=pick(' and ',' y ',' e '); return n.length<2?(n[0]||''):n.slice(0,-1).join(', ')+and+n[n.length-1];};
    const q25=x=>Math.round(x*4)/4, q05=x=>Math.round(x*20)/20, fa_=MD.featured_app, bs=MD.best_second_app, bsKey=keyOf([fa_,bs]);
    Object.assign(copy,{
      multiTitle:['Can I run two apps at once?','¿Puedo usar dos apps a la vez?','Posso usar dois apps ao mesmo tempo?'],
      multiIntro:[`Yes, you can keep two or three apps on. Take the first good offer, then pause the other apps while you deliver. Pick your apps to see what an hour earns you in ${TOWN}.`,
                  `Sí, puedes tener dos o tres apps encendidas. Acepta la primera buena oferta y pausa las demás mientras haces la entrega. Elige tus apps para ver cuánto ganas por hora en ${TOWN}.`,
                  `Sim, você pode deixar dois ou três apps ligados. Aceite a primeira boa oferta e pause os outros enquanto faz a entrega. Escolha seus apps para ver quanto você ganha por hora em ${TOWN}.`],
      multiAppsLabel:['Apps you run','Apps que usas','Apps que você usa'],
      appsOnLabel:['Apps on','Apps encendidas','Apps ligados'],
      multiTabDinner:['Weekend dinner','Cena de fin de semana','Jantar no fim de semana'], multiTabAny:['Any hour','Cualquier hora','Qualquer hora'],
      multiUnit:['an hour after gas and taxes','por hora después de gasolina e impuestos','por hora após gasolina e impostos'],
      multiHowTitle:['How to run two apps','Cómo usar dos apps','Como usar dois apps'],
      multiStep1:['Go online on both apps','Conéctate en las dos apps','Fique online nos dois apps'],
      multiStep1p:[`Mount your phone. Massachusetts bans using apps while driving, even at a red light. Pull out of traffic to accept an offer.`,`Pon el teléfono en un soporte. En Massachusetts está prohibido usar apps al manejar, incluso en un semáforo en rojo. Sal del tráfico para aceptar una oferta.`,`Coloque o celular num suporte. Em Massachusetts é proibido usar apps dirigindo, até no sinal vermelho. Saia do trânsito para aceitar uma oferta.`],
      multiStep2:['Take the first good offer','Acepta la primera buena oferta','Aceite a primeira boa oferta'],
      multiStep2p:['From whichever app sends it. Skip offers below your line; another one comes soon.','De la app que la envíe. Rechaza las que estén por debajo de tu mínimo; pronto llega otra.','Do app que mandar. Recuse as que estiverem abaixo do seu mínimo; logo vem outra.'],
      multiStep3:['Pause the other app','Pausa la otra app','Pause o outro app'],
      multiStep3p:[`So it doesn't send offers while you deliver. DoorDash: Pause orders. Uber Eats: Go offline. Grubhub: Pause, once you've been online 2 hours. Going unavailable often during a Grubhub block can cost you future blocks.`,`Para que no te envíe ofertas mientras entregas. DoorDash: Pause orders. Uber Eats: Go offline. Grubhub: Pause, después de 2 horas conectado. Ponerte no disponible a menudo durante un bloque de Grubhub puede costarte bloques futuros.`,`Para ele não mandar ofertas enquanto você entrega. DoorDash: Pause orders. Uber Eats: Go offline. Grubhub: Pause, depois de 2 horas online. Ficar indisponível com frequência durante um bloco do Grubhub pode custar blocos futuros.`],
      multiStep4:['Turn it back on after the drop-off','Vuelve a encenderla después de entregar','Ligue de novo depois da entrega'],
      multiStep4p:['Then wait for the next good offer from any app.','Luego espera la próxima buena oferta de cualquier app.','Depois espere a próxima boa oferta de qualquer app.'],
      multiKnowTitle:['Know before you try','Antes de probar','Antes de tentar'],
      multiKnow1:[`Perks depend on how many offers you accept. Uber Eats Pro needs 30% for Gold and 50% for Platinum. DoorDash's reward tiers and Grubhub's levels also count it. Those perks include first pick of better-paying orders, so skipping more offers can cost you them.`,`Los beneficios dependen de cuántas ofertas aceptas. Uber Eats Pro pide 30% para Gold y 50% para Platinum. Los niveles de DoorDash y de Grubhub también lo cuentan. Esos beneficios incluyen prioridad en pedidos mejor pagados, así que rechazar más puede hacerte perderlos.`,`Os benefícios dependem de quantas ofertas você aceita. O Uber Eats Pro pede 30% para Gold e 50% para Platinum. Os níveis do DoorDash e do Grubhub também contam isso. Esses benefícios incluem prioridade em pedidos que pagam mais, então recusar mais pode fazer você perdê-los.`],
      multiKnow2:[`DoorDash's Earn by Time mode allows one declined offer an hour; a second ends that mode for the dash. It doesn't fit with skipping offers on two apps.`,`El modo Earn by Time de DoorDash permite rechazar una oferta por hora; una segunda termina ese modo en tu turno. No combina con rechazar ofertas en dos apps.`,`O modo Earn by Time do DoorDash permite recusar uma oferta por hora; uma segunda encerra esse modo no seu turno. Não combina com recusar ofertas em dois apps.`],
      multiKnow3:['Each app may send you a tax form. Count each mile once for the 72.5-cent deduction.','Cada app puede enviarte un formulario de impuestos. Cuenta cada milla una sola vez para la deducción de 72.5 centavos.','Cada app pode mandar um formulário de impostos. Conte cada milha uma vez só para a dedução de 72,5 centavos.'],
      multiKnow4:[`All three apps let you work for other apps at the same time. Each one requires on-time delivery, so take only offers you can deliver on time.`,`Las tres apps te permiten trabajar con otras apps al mismo tiempo. Cada una exige entregar a tiempo, así que acepta solo lo que puedas entregar a tiempo.`,`Os três apps permitem trabalhar com outros apps ao mesmo tempo. Cada um exige entrega no prazo, então aceite só o que puder entregar no prazo.`],
      multiStackTitle:['Advanced: two orders at once','Avanzado: dos pedidos a la vez','Avançado: dois pedidos ao mesmo tempo'],
      multiStackWarning:[`Food arrives later, which can cost tips and ratings. All three apps require on-time delivery, and late deliveries can cost you your account. Uber advises against holding orders from two apps at once. We do not suggest it for new drivers.`,`La comida llega más tarde, lo que puede costar propinas y calificaciones. Las tres apps exigen entregar a tiempo, y las entregas tarde pueden costarte la cuenta. Uber aconseja no llevar pedidos de dos apps a la vez. No lo recomendamos a conductores nuevos.`,`A comida chega mais tarde, o que pode custar gorjetas e avaliações. Os três apps exigem entrega no prazo, e atrasos podem custar sua conta. A Uber recomenda não levar pedidos de dois apps ao mesmo tempo. Não recomendamos para entregadores novos.`],
      multiHowWeGotThis:[`We start from each app's pay and waits in ${TOWN} (the app cards above). Offers from different apps arrive separately. With more apps, the next good offer comes sooner, so you can skip poor ones. We assume you still catch most offers, lose about a minute per order pausing apps, and take an offer when it pays at least your usual rate for its time. In New York City, more than half of delivery workers used more than one app, and drivers accepted about 1 in 3 offers (city data, 2021). This is our estimate, not yet measured in ${TOWN}. One driver in central Massachusetts reported about $${Math.round(MD.check_reports?.s21?.pay_per_logged_in_hour||0)} an hour before costs running ${A.doordash.name} and ${A.ubereats.name}; our weekend dinner estimate for that pair is about ${usd0(MD.combos['doordash+ubereats'].dinner.pay)} before costs.`,
                          `Partimos del pago y la espera de cada app en ${TOWN} (las tarjetas de arriba). Las ofertas de distintas apps llegan por separado. Con más apps, la próxima buena oferta llega antes, así que puedes rechazar las malas. Suponemos que aún recibes la mayoría de las ofertas, que pierdes un minuto por pedido pausando apps y que aceptas una oferta cuando paga al menos tu tarifa habitual por su tiempo. En Nueva York, más de la mitad de los repartidores usaban más de una app y aceptaban cerca de 1 de cada 3 ofertas (datos de la ciudad, 2021). Es nuestra estimación, aún sin medir en ${TOWN}. Un conductor del centro de Massachusetts reportó unos $${Math.round(MD.check_reports?.s21?.pay_per_logged_in_hour||0)} por hora antes de gastos usando ${A.doordash.name} y ${A.ubereats.name}; nuestra estimación de cena de fin de semana para ese par es de unos ${usd0(MD.combos['doordash+ubereats'].dinner.pay)} antes de gastos.`,
                          `Partimos do ganho e da espera de cada app em ${TOWN} (os cartões acima). As ofertas de apps diferentes chegam separadas. Com mais apps, a próxima boa oferta chega antes, então você pode recusar as ruins. Supomos que você ainda recebe a maioria das ofertas, perde um minuto por pedido pausando apps e aceita uma oferta quando ela paga pelo menos sua taxa habitual pelo tempo. Em Nova York, mais da metade dos entregadores usava mais de um app e aceitava cerca de 1 em cada 3 ofertas (dados da cidade, 2021). É nossa estimativa, ainda sem medição em ${TOWN}. Um entregador do centro de Massachusetts relatou cerca de $${Math.round(MD.check_reports?.s21?.pay_per_logged_in_hour||0)} por hora antes dos custos usando ${A.doordash.name} e ${A.ubereats.name}; nossa estimativa de jantar no fim de semana para esse par é de cerca de ${usd0(MD.combos['doordash+ubereats'].dinner.pay)} antes dos custos.`],
      whenMultiOverlay:['With all 3 apps','Con las 3 apps','Com os 3 apps'],
      appBestSecond:[`Running a second app? Add ${A[bs].name}. With ${A[fa_].name}, that keeps about ${usd(MD.combos[bsKey].dinner.kept)} an hour on a weekend dinner shift.`,
                     `¿Vas a usar una segunda app? Suma ${A[bs].name}. Con ${A[fa_].name}, te quedan unos ${usd(MD.combos[bsKey].dinner.kept)} por hora en un turno de cena de fin de semana.`,
                     `Vai usar um segundo app? Some o ${A[bs].name}. Com o ${A[fa_].name}, sobram cerca de ${usd(MD.combos[bsKey].dinner.kept)} por hora num turno de jantar no fim de semana.`],
    });
    window.LocalFiftyMulti={
      apps:MD.apps.slice(), featured:fa_, best_second:bs,
      key:keyOf, names:nameList,
      // result(apps, 'dinner'|'all_hours') -> {kept, low, high, gain, best_single_app, wait, deliveries, pay_per_order, mix, accept_at_least_per_order, accept_at_least_per_mile, stack}
      result(apps,scenario='dinner'){ const c=MD.combos[keyOf(apps)]; return c?c[scenario]:null; },
      // words(apps, scenario) -> text in the reader's language for the section (one number per headline; ranges stay in details)
      words(apps,scenario='dinner'){ const r=this.result(apps,scenario); if(!r) return null; const multi=keyOf(apps).includes('+');
        const best=r.best_single_app, featKept=MD.combos[fa_][scenario].kept, n=r.deliveries.toFixed(1), w=Math.round(r.wait);
        const nloc=li()===2?n.replace('.',','):n;
        const fromWait=multi&&r.gain>0.05?Math.max(0,Math.min(1,(r.same_pickiness_kept-MD.combos[best][scenario].kept)/r.gain)):null;
        const why=fromWait==null?'':fromWait>=0.6?pick('Most of the gain is less waiting: offers come sooner.','La mayor parte de la ganancia es esperar menos: las ofertas llegan antes.','A maior parte do ganho é esperar menos: as ofertas chegam antes.')
                 :fromWait<=0.4?pick('Most of the gain is better orders: with more offers, you can skip poor ones.','La mayor parte de la ganancia son mejores pedidos: con más ofertas, puedes rechazar las malas.','A maior parte do ganho são pedidos melhores: com mais ofertas, você pode recusar as ruins.')
                 :pick('The gain is about half less waiting, half better orders.','La ganancia es mitad esperar menos, mitad mejores pedidos.','O ganho é metade esperar menos, metade pedidos melhores.');
        const st=r.stack;
        return {
          value:usd(r.kept), unit:copy.multiUnit[li()], apps:nameList(apps),
          gainLine:!multi?pick(`${A[best].name} alone`,`Solo ${A[best].name}`,`Só o ${A[best].name}`)
                   :pick(`${r.gain>=0?'+':'−'}${usd(Math.abs(r.gain))} an hour compared with ${A[best].name} alone`,`${r.gain>=0?'+':'−'}${usd(Math.abs(r.gain))} por hora frente a solo ${A[best].name}`,`${r.gain>=0?'+':'−'}${usd(Math.abs(r.gain))} por hora comparado com só o ${A[best].name}`),
          belowFeatured:(multi&&!keyOf(apps).includes(fa_)&&r.kept<featKept)?pick(`Still less than ${A[fa_].name} alone (${usd(featKept)}).`,`Aún menos que solo ${A[fa_].name} (${usd(featKept)}).`,`Ainda menos que só o ${A[fa_].name} (${usd(featKept)}).`):'',
          ordersLine:pick(`About ${n} deliveries an hour, about ${usd(r.pay_per_order)} each`,`Unas ${n} entregas por hora, unos ${usd(r.pay_per_order)} cada una`,`Cerca de ${nloc} entregas por hora, cerca de ${usd(r.pay_per_order)} cada`),
          waitLine:pick(`About ${w} minutes between orders`,`Unos ${w} minutos entre pedidos`,`Cerca de ${w} minutos entre pedidos`),
          whyLine:why,
          tip:!multi?'':pick(`Take offers that pay at least about ${usd(q25(r.accept_at_least_per_order))} for a typical order, about ${usd(q05(r.accept_at_least_per_mile))} a mile. Skip the rest; another offer comes soon.`,
                             `Acepta ofertas que paguen al menos unos ${usd(q25(r.accept_at_least_per_order))} por un pedido típico, unos ${usd(q05(r.accept_at_least_per_mile))} por milla. Rechaza las demás; pronto llega otra.`,
                             `Aceite ofertas que paguem pelo menos cerca de ${usd(q25(r.accept_at_least_per_order))} por um pedido típico, cerca de ${usd(q05(r.accept_at_least_per_mile))} por milha. Recuse o resto; logo vem outra.`),
          stack:!st?null:{title:copy.multiStackTitle[li()], value:usd(st.kept), unit:copy.multiUnit[li()], warning:copy.multiStackWarning[li()],
            text:pick(`If you add an order from another app to your current trip, it needs to be from the same area and going the same way. In our estimate that works for about ${Math.round(st.paired_share*100)}% of orders and adds about ${usd(st.gain)} an hour.`,
                      `Si añades un pedido de otra app a tu viaje actual, debe ser de la misma zona e ir en la misma dirección. Según nuestra estimación, eso funciona en un ${Math.round(st.paired_share*100)}% de los pedidos y suma unos ${usd(st.gain)} por hora.`,
                      `Se você adicionar um pedido de outro app à sua viagem atual, ele precisa ser da mesma área e ir na mesma direção. Pela nossa estimativa, isso funciona em cerca de ${Math.round(st.paired_share*100)}% dos pedidos e soma cerca de ${usd(st.gain)} por hora.`)},
        }; },
      // one hour of the week (day 0 = Mon) for these apps: {kept, pay, busy, minutes, wait_minutes, deliveries_per_hour, few_open}
      hour(apps,day,hour){ const k=keyOf(apps), G=MD.hourly[k]; if(!G) return null; const u=G.busy[day][hour], t=G.minutes[day][hour];
        return {kept:G.kept[day][hour], pay:G.pay[day][hour], busy:u, minutes:t, wait_minutes:Math.round(t*(1-u)/Math.max(u,1e-3)), deliveries_per_hour:Math.round(600*u/t)/10,
                few_open:D.shift?D.shift.few_open[day][hour]:false}; },
      // 24 kept values for 'weekday' or 'weekend' (null = few restaurants open), for the hourly chart's overlay
      profile(apps,which='weekend'){ const G=MD.hourly[keyOf(apps)]; return G?G[which+'_profile']:null; },
      // goal calculator with these apps (keeps a selection made in the hourly picker)
      toGoal(apps){ window.LOCAL_FIFTY_GOAL_APPS=apps&&apps.length?apps.slice():null;
        if(window.LOCAL_FIFTY_GOAL_SEL&&window.LocalFiftyHourly){ return window.LocalFiftyHourly.toGoal(window.LOCAL_FIFTY_GOAL_SEL); }
        const r=this.result(apps||[fa_],'dinner'); window.LOCAL_FIFTY_GOAL_KEEP=r?r.kept:null; window.LOCAL_FIFTY_GOAL_DPH=r?r.deliveries:null; goalCalc(); return r; },
    };
  }

  // ---- Headline copy when the page leads with several apps (Zack 2026-10-05: all three apps, weekend dinner). Replaces the
  // presentation snapshot Codex kept in app.js (configureWeekendExample); numbers come from pay.json.headline. ----
  if(HMULTI){
    const N=l=>appNames(HD.apps,l), k3=HD.apps.length, nw=[{2:'Two',3:'Three'},{2:'Dos',3:'Tres'},{2:'Dois',3:'Três'}];
    const hk=HD.apps.join('+'), allH=(D.multi_app&&D.multi_app.combos[hk])?D.multi_app.combos[hk].all_hours.kept:null;
    const rep_=F.repairs_per_hour&&F.miles_per_hour?HD.miles*F.repairs_per_hour.value/F.miles_per_hour.value:0, mi1=Math.round(HD.miles*10)/10;
    const evTax=(ev.tax_set_aside_low+ev.tax_set_aside_high)/2, evN=l=>appNames(ev.apps||HD.apps,l);
    const notes={pay:['Your combined app pay, including tips and waiting time.','Tu pago combinado de las apps, incluidas propinas y espera.','Seu ganho combinado dos apps, incluindo gorjetas e espera.'],
                 gas:['Gas only. Repairs, insurance and wear cost extra.','Solo gasolina. Las reparaciones, el seguro y el desgaste cuestan más.','Só combustível. Reparos, seguro e desgaste custam mais.'],
                 tax:['Money set aside for taxes after the mileage deduction. Your actual taxes may differ.','Dinero reservado para impuestos tras la deducción por millas. Tus impuestos reales pueden variar.','Valor reservado para impostos após a dedução por milha. Seus impostos reais podem variar.'],
                 keep:['What you keep after gas and tax money, before repairs, insurance and wear.','Lo que te queda después de gasolina e impuestos, antes de reparaciones, seguro y desgaste.','O que sobra depois de combustível e impostos, antes de reparos, seguro e desgaste.']};
    Object.assign(copy,{
      payVisualIntro:[`One hour with ${N(0)} on a Friday or Saturday dinner shift, 5–9 pm, in ${TOWN}, waiting included. Accept one order at a time and pause the other apps while you deliver.`,
                      `Una hora con ${N(1)} en un turno de cena de viernes o sábado, de 5 a 9 pm, en ${TOWN}, con la espera incluida. Acepta un pedido a la vez y pausa las otras apps mientras entregas.`,
                      `Uma hora com ${N(2)} num turno de jantar de sexta ou sábado, das 17h às 21h, em ${TOWN}, com a espera incluída. Aceite um pedido por vez e pause os outros apps enquanto entrega.`],
      moneyTag:[`${nw[0][k3]} apps · weekend dinner · per hour`,`${nw[1][k3]} apps · cena de fin de semana · por hora`,`${nw[2][k3]} apps · jantar de fim de semana · por hora`],
      moneyPayNote:notes.pay, moneyPayWhy:notes.pay, moneyGasNote:notes.gas, moneyGasWhy:notes.gas,
      moneyTaxNote:notes.tax, moneyTaxWhy:notes.tax, moneyKeepNote:notes.keep, moneyKeepWhy:notes.keep,
      heroKeepLine:[`About ${usd0(HD.kept)} an hour stays after gas and taxes with ${N(0)}. Our estimate for ${TOWN}.`,`Quedan unos ${usd0(HD.kept)} por hora después de gasolina e impuestos con ${N(1)}. Nuestra estimación para ${TOWN}.`,`Sobram cerca de ${usd0(HD.kept)} por hora após gasolina e impostos com ${N(2)}. Nossa estimativa para ${TOWN}.`],
      heroNumberDetail:[`This is ${N(0)} on at once, on a Friday or Saturday dinner shift, 5 to 9 pm, per hour logged in, waiting included. You take one order at a time and pause the other apps while you deliver. It pays about ${usd(HD.pay)} before costs. Take off ${usd(HD.gas)} for gas and ${usd(HD.tax)} for taxes. Taxes are low because you can deduct 72.5 cents for each work mile. ${A[fa].name} alone keeps about ${usd(F.keep_per_hour.value)}. ${allH?`Across all hours of the week, the three apps keep about ${usd0(allH)} an hour. `:''}${R?`${R.n} ${METRO}-area drivers who counted waiting time report ${usd0(R.low)} to ${usd0(R.high)} an hour on one app, before costs. `:''}In your first weeks, expect less. This is our estimate, built from app pay in ${P.model?P.model.n_metros:85} U.S. metros and local shift logs. No one has measured ${TOWN} yet.`,
                        `Esto es ${N(1)} a la vez, en un turno de cena de viernes o sábado, de 5 a 9 pm, por hora conectado, con la espera incluida. Aceptas un pedido a la vez y pausas las otras apps mientras entregas. Paga unos ${usd(HD.pay)} antes de gastos. Resta ${usd(HD.gas)} de gasolina y ${usd(HD.tax)} de impuestos. Los impuestos son bajos porque puedes deducir 72.5 centavos por cada milla de trabajo. Solo ${A[fa].name} deja unos ${usd(F.keep_per_hour.value)}. ${allH?`En todas las horas de la semana, las tres apps dejan unos ${usd0(allH)} por hora. `:''}${R?`${R.n} conductores del área de ${METRO} que contaron la espera reportan de ${usd0(R.low)} a ${usd0(R.high)} por hora con una app, antes de gastos. `:''}En tus primeras semanas, espera menos. Es nuestra estimación, hecha con el pago de las apps en ${P.model?P.model.n_metros:85} áreas de EE. UU. y registros de turnos locales. Nadie ha medido ${TOWN} todavía.`,
                        `Isto é ${N(2)} ao mesmo tempo, num turno de jantar de sexta ou sábado, das 17h às 21h, por hora conectado, com a espera incluída. Você aceita um pedido por vez e pausa os outros apps enquanto entrega. Paga cerca de ${usd(HD.pay)} antes dos custos. Tire ${usd(HD.gas)} de gasolina e ${usd(HD.tax)} de impostos. Os impostos são baixos porque você pode deduzir 72,5 centavos por milha de trabalho. Só o ${A[fa].name} deixa cerca de ${usd(F.keep_per_hour.value)}. ${allH?`Em todas as horas da semana, os três apps deixam cerca de ${usd0(allH)} por hora. `:''}${R?`${R.n} entregadores da região de ${METRO} que contaram a espera relatam de ${usd0(R.low)} a ${usd0(R.high)} por hora com um app, antes dos custos. `:''}Nas primeiras semanas, espere menos. É nossa estimativa, feita com o ganho dos apps em ${P.model?P.model.n_metros:85} regiões dos EUA e registros de turnos locais. Ninguém mediu ${TOWN} ainda.`],
      calcSource:[`Starting numbers: ${usd(HD.pay)} pay, ${usd(HD.gas)} gas and ${usd(HD.tax)} for taxes per hour, with ${N(0)} on a weekend dinner shift, waiting included (our ${TOWN} estimate). About ${mi1} miles an hour at ${HD.mpg} mpg and ${usd(HD.gas_price)} a gallon. Taxes: ${HD.tax_rate_on_taxable}% of pay minus 72.5 cents a mile. 4 hours. Repairs and tires add about ${usd(rep_)} an hour. No ${TOWN} earnings have been measured yet.`,
                  `Valores iniciales: ${usd(HD.pay)} de pago, ${usd(HD.gas)} de gasolina y ${usd(HD.tax)} para impuestos por hora, con ${N(1)} en un turno de cena de fin de semana, con la espera incluida (nuestra estimación para ${TOWN}). Unas ${mi1} millas por hora a ${HD.mpg} mpg y ${usd(HD.gas_price)} el galón. Impuestos: el ${HD.tax_rate_on_taxable}% del pago menos 72.5 centavos por milla. 4 horas. Reparaciones y llantas suman unos ${usd(rep_)} por hora. Aún no se han medido ganancias en ${TOWN}.`,
                  `Valores iniciais: ${usd(HD.pay)} de ganho, ${usd(HD.gas)} de gasolina e ${usd(HD.tax)} para impostos por hora, com ${N(2)} num turno de jantar no fim de semana, com a espera incluída (nossa estimativa para ${TOWN}). Cerca de ${String(mi1).replace('.',',')} milhas por hora a ${HD.mpg} mpg e ${usd(HD.gas_price)} o galão. Impostos: ${HD.tax_rate_on_taxable}% do ganho menos 72,5 centavos por milha. 4 horas. Reparos e pneus somam cerca de ${usd(rep_)} por hora. Nenhum ganho em ${TOWN} foi medido ainda.`],
      eveningIntro:[`A Saturday evening with ${evN(0)}. ${ev.hours} hours. ${ev.deliveries} deliveries. About ${usd0(ev.gross)} pay. About ${usd0(ev.gas)} gas. About ${usd0(ev.after_gas)} after gas. About ${usd0(evTax)} goes to taxes, after the mileage deduction. A built example from our ${TOWN} estimate, waiting included.`,
                    `Un sábado por la tarde con ${evN(1)}. ${ev.hours} horas. ${ev.deliveries} entregas. Unos ${usd0(ev.gross)} de pago. Unos ${usd0(ev.gas)} de gasolina. Unos ${usd0(ev.after_gas)} después de gasolina. Unos ${usd0(evTax)} van a impuestos, tras la deducción por millas. Un ejemplo hecho con nuestra estimación para ${TOWN}, con la espera incluida.`,
                    `Um sábado à noite com ${evN(2)}. ${ev.hours} horas. ${ev.deliveries} entregas. Cerca de ${usd0(ev.gross)} de ganho. Cerca de ${usd0(ev.gas)} de gasolina. Cerca de ${usd0(ev.after_gas)} após gasolina. Cerca de ${usd0(evTax)} vão para impostos, depois da dedução por milha. Um exemplo feito com nossa estimativa para ${TOWN}, com a espera incluída.`],
    });
  }
  // ---- UI strings Codex wrote in app.js (2026-10-05), now in the copy layer. Codex: use t(key) instead of the inline arrays. ----
  Object.assign(copy,{
    heroLocationLabel:['Delivery driving','Reparto de comida','Entrega de comida'],
    heroSecondaryCta:['Plan my earnings','Planear mis ganancias','Planejar meus ganhos'],
    langLabel:['Language','Idioma','Idioma'], navSectionsLabel:['Sections','Secciones','Seções'],
    multiNavLabel:['Two apps','Dos apps','Dois apps'],
    sourcesLabel:['Sources','Fuentes','Fontes'],
    checklistStartWith:['Start with {app}. It pays the most of these three apps in our estimates.','Empieza con {app}. Según nuestras estimaciones, paga más que las otras dos apps.','Comece pelo {app}. Pelas nossas estimativas, ele paga mais que os outros dois apps.'],
    checklistDoneTitle:['You’ve got everything you need to start driving!','¡Tienes todo lo que necesitas para empezar a repartir!','Você tem tudo de que precisa para começar a fazer entregas!'],
    shiftWaitAbout:['About this wait','Sobre esta espera','Sobre esta espera'],
    shiftStatAbout:['About','Unos','Cerca de'],
    shiftStatDeliveries:['Deliveries','Entregas','Entregas'], shiftStatPay:['App pay','Pago de las apps','Pagamento dos apps'], shiftStatKept:['You keep','Te queda','Sobra para você'],
    shiftStatKeptNote:['After gas and taxes','Después de gasolina e impuestos','Após combustível e impostos'],
    durationLess:['Drive one hour less','Conducir una hora menos','Dirigir uma hora a menos'], durationMore:['Drive one hour more','Conducir una hora más','Dirigir uma hora a mais'],
    goalTimesLabel:['Times I drive each week','Veces que manejo por semana','Vezes que dirijo por semana'],
    calcAboutTitle:['About this example','Sobre este ejemplo','Sobre este exemplo'],
    multiBenefit1:['Skip low-paying deliveries','Evita entregas que pagan poco','Recuse entregas que pagam pouco'],
    multiBenefit2:['Accept higher-paying deliveries','Acepta entregas mejor pagadas','Aceite entregas que pagam mais'],
    multiBenefit3:['Less wait time','Menos tiempo de espera','Menos tempo de espera'],
    multiExplainTitle:['More apps. More offers to choose from.','Más apps. Más ofertas para elegir.','Mais apps. Mais ofertas para escolher.'],
    multiExplainBody:['Skip a low-paying offer and take a better one from another app. Pause the other apps while you deliver, then turn them back on.','Deja pasar una oferta de poco pago y acepta una mejor en otra app. Pausa las demás mientras entregas y vuelve a activarlas al terminar.','Recuse uma oferta que paga pouco e aceite uma melhor em outro app. Pause os outros enquanto faz a entrega e ligue-os novamente ao terminar.'],
    multiExplainQuiet:['When it’s quiet, more apps can also help you find the next order sooner.','Cuando hay poca actividad, más apps también pueden ayudarte a encontrar el siguiente pedido antes.','Quando o movimento está fraco, mais apps também podem ajudar a encontrar o próximo pedido mais cedo.'],
    multiCompareLabel:['Pay per delivery','Pago por entrega','Pagamento por entrega'],
    multiCompareUnit:['per delivery, before gas and taxes','por entrega, antes de gasolina e impuestos','por entrega, antes de gasolina e impostos'],
    multiCompareSingle:['Turn on a second app above to compare.','Activa otra app arriba para comparar.','Ative outro app acima para comparar.'],
    multiCompareNote:['These are model estimates, not guaranteed offers.','Son estimaciones del modelo, no ofertas garantizadas.','São estimativas do modelo, não ofertas garantidas.'],
    multiRuleTitle1:['App rewards','Recompensas de las apps','Recompensas dos apps'], multiRuleTitle2:['Pay by time','Pago por tiempo','Pagamento por tempo'],
    multiRuleTitle3:['Taxes','Impuestos','Impostos'], multiRuleTitle4:['Deliver on time','Entregas a tiempo','Entregas no prazo'],
    mapEyebrow:['Pickup areas','Áreas de recogida','Áreas de retirada'], mapChoose:['Choose a numbered area','Elige un área numerada','Escolha uma área numerada'],
    mapCreditOsm:['Map: OpenStreetMap. Highlighted areas and restaurant counts: our area guide.','Mapa: OpenStreetMap. Áreas destacadas y restaurantes: nuestra guía de áreas.','Mapa: OpenStreetMap. Áreas destacadas e restaurantes: nosso guia de áreas.'],
    mapCreditGoogle:['Map: Google. Highlighted areas and restaurant counts: our area guide.','Mapa: Google. Áreas destacadas y restaurantes: nuestra guía de áreas.','Mapa: Google. Áreas destacadas e restaurantes: nosso guia de áreas.'],
  });

  // per-app values rendered through data-t so language switching keeps them
  const appKeys=['doordash','ubereats','grubhub'];
  appKeys.forEach(k=>{const a=A[k];
    copy['appCount_'+k]=[`${a.restaurants_in_town.value} · counted Oct 2026`,`${a.restaurants_in_town.value} · conteo de oct 2026`,`${a.restaurants_in_town.value} · contagem de out 2026`];
    copy['appKeep_'+k]=[`${usd(a.keep_per_hour.value)} an hour`,`${usd(a.keep_per_hour.value)} por hora`,`${usd(a.keep_per_hour.value)} por hora`];
    const ph=P.per_hour[k];
    if(ph&&ph.wait_between_orders_minutes){const w=Math.round(ph.wait_between_orders_minutes.value), dv=ph.deliveries_per_hour.value.toFixed(1);
      copy['appWait_'+k]=[`About ${w} minutes`,`Unos ${w} minutos`,`Cerca de ${w} minutos`];
      copy['appDeliveries_'+k]=[`About ${dv} an hour`,`Unas ${dv} por hora`,`Cerca de ${dv.replace('.',',')} por hora`];}
  });
  Object.assign(copy,{
    appWaitLabel:['Wait between orders','Espera entre pedidos','Espera entre pedidos'],
    appDeliveriesLabel:['Deliveries','Entregas','Entregas'],
    appWaitNote:(()=>{const w=k=>P.per_hour[k].wait_between_orders_minutes?P.per_hour[k].wait_between_orders_minutes.value:Infinity;
      const why=appKeys.every(k=>w(byKeep[0])<=w(k));
      return [`On a weekend dinner shift.${why?` Shorter waits are why ${A[byKeep[0]].name} keeps the most per hour.`:''} Our estimate, not yet measured in ${TOWN}.`,
              `En un turno de cena de fin de semana.${why?` Por esperar menos, ${A[byKeep[0]].name} deja más por hora.`:''} Es nuestra estimación, aún sin medir en ${TOWN}.`,
              `Num turno de jantar no fim de semana.${why?` Por esperar menos, o ${A[byKeep[0]].name} rende mais por hora.`:''} É nossa estimativa, ainda sem medição em ${TOWN}.`];})(),
    calcTaxRate:['Tax rate','Tasa de impuestos','Taxa de impostos'],
    calcTaxHint:[`On pay minus 72.5 cents a mile. We count ${cdMiles1} miles an hour.`,`Sobre el pago menos 72.5 centavos por milla. Contamos ${cdMiles1} millas por hora.`,`Sobre o ganho menos 72,5 centavos por milha. Contamos ${String(cdMiles1).replace('.',',')} milhas por hora.`],
  });
  // Money strip formulas, from the same numbers as the strip (Codex renders them under each line)
  window.LocalFiftyMoney={formulas(){ const l=['en','es','pt'].indexOf(language), nf=x=>x.toLocaleString(['en-US','es-US','pt-BR'][l],{maximumFractionDigits:2});
    const mi=HF.miles_per_hour?HF.miles_per_hour.value:P.assumptions.miles_per_active_hour.value, as=P.assumptions, rate=P.calculator_defaults.tax_rate_on_taxable||30;
    return ['', `${nf(mi)} mi ÷ ${nf(as.mpg.value)} mpg × ${usd(as.gas_price.value)}/gal`,
            `${rate}% × (${usd(HF.pay_per_hour.value)} − ${nf(mi)} mi × $${(P.calculator_defaults.mileage_rate||0.725).toFixed(3)})`,
            `${usd(HF.pay_per_hour.value)} − ${usd(HF.gas_per_hour.value)} − ${usd(HF.tax_set_aside_per_hour.value)}`]; }};
  // Calculator tax that follows the pay a reader types: rate% x max(0, pay - 72.5 cents x miles an hour)
  window.LocalFiftyCalc={miles_per_hour:cdMiles, mileage_rate:P.calculator_defaults.mileage_rate||0.725, default_rate:P.calculator_defaults.tax_rate_on_taxable||30,
    tax(pay,ratePct){ return Math.max(0,pay-this.mileage_rate*this.miles_per_hour)*(ratePct==null?this.default_rate:ratePct)/100; }};

  // ---- fill existing nodes (no template changes) ----
  const money=document.querySelectorAll('.money-flow .money-item strong');
  if(money.length===4){const parts=[HF.pay_per_hour,HF.gas_per_hour,HF.tax_set_aside_per_hour,HF.keep_per_hour];
    parts.forEach((x,i)=>{const [d,c]=x.value.toFixed(2).split('.');money[i].innerHTML=`$${d}<span>.${c}</span>`;
      // Bar length = share of app pay. Codex's CSS sizes .money-fill from --share.
      money[i].parentElement.style.setProperty('--share',(x.value/parts[0].value*100).toFixed(1)+'%');});}
  const ms=document.querySelector('.money-story'); if(ms)ms.dataset.evidence='estimate';
  const cd=P.calculator_defaults;
  const taxIn=document.getElementById('tax-input'), taxDefault=(taxIn&&taxIn.dataset.taxBasis==='taxable'&&cd.tax_rate_on_taxable)?cd.tax_rate_on_taxable:cd.tax_rate;
  [['pay-input',cd.pay],['car-input',cd.car_costs],['tax-input',taxDefault],['hours-input',cd.hours]].forEach(([id,val])=>{const el=document.getElementById(id);if(el){el.value=val;el.defaultValue=val;}});
  const calc=document.getElementById('calculator'); if(calc)calc.dataset.evidence='estimate';
  document.querySelectorAll('.app-card').forEach((card,i)=>{const k=appKeys[i];const dds=card.querySelectorAll('dd[data-t]');
    dds.forEach(el=>{if(el.dataset.t==='needsSource'){el.dataset.t='appCount_'+k;el.classList.remove('pending');el.dataset.evidence='verified';}
      else if(el.dataset.t==='notVerified'){el.dataset.t='appKeep_'+k;el.dataset.evidence='estimate';}
      else if(el.dataset.t==='checkOffer'){el.dataset.evidence='unknown';}});
    card.dataset.evidence='mixed';});
  // Plain-word evidence labels (Zack: no symbol legend). Codex renders t(el.dataset.evidenceLabel) beside the number.
  const lab=(sel,key)=>document.querySelectorAll(sel).forEach(el=>el.dataset.evidenceLabel=key);
  lab('.hero-lede','evidenceLabelMetroApp'); lab('.money-story','evidenceLabelMetroApp'); lab('#calculator','evidenceLabelMetroApp');
  lab('#heatmap','evidenceLabelCounted'); lab('#map-detail','evidenceLabelCounted'); lab('#evening .shift-kicker','evidenceLabelExample');
  document.querySelectorAll('.app-card dd[data-t]').forEach(el=>{const k=el.dataset.t;
    el.dataset.evidenceLabel=k.startsWith('appCount_')?'evidenceLabelCounted':k.startsWith('appKeep_')?'evidenceLabelMetroApp':k==='checkOffer'?'evidenceLabelUnknown':el.dataset.evidenceLabel||'';});
  const hero=document.querySelector('.hero-lede'); if(hero)hero.dataset.evidence=R?'mixed':'estimate'; // Boston estimate + drivers' reports (the span carries "reported")
  const detail=document.getElementById('map-detail'); if(detail)detail.dataset.evidence='verified';
  const ev2=document.querySelector('#evening .shift-kicker'); if(ev2)ev2.dataset.evidence='illustrative';

  // ---- heatmap: paint open-restaurant counts after the template builds the cells ----
  const dayKeys=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  // mixed: open-restaurant counts are verified, orders per hour are unknown.
  const paint=()=>{const grid=document.getElementById('heatmap'); if(!grid)return; grid.dataset.evidence='mixed';
    const cells=grid.querySelectorAll('.heat-cell'); if(cells.length!==56)return;
    const mx=AV.max_open||1;
    cells.forEach((cell,i)=>{const d=dayKeys[Math.floor(i/8)],b=i%8,n=AV.by_block_3h[d][b];const a=n/mx;
      cell.dataset.open=n; cell.dataset.level=a>=.85?'high':a>=.5?'mid':a>=.2?'low':'none';
      const day=[['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],['Seg','Ter','Qua','Qui','Sex','Sáb','Dom']][ix()][Math.floor(i/8)];
      const label=`${day} ${AV.blocks[b]}: ${n} ${t('cellOpen')}`; cell.title=label; cell.removeAttribute('aria-hidden');cell.setAttribute('aria-label',label);});
    grid.setAttribute('aria-label',t('weekView')+'. '+t('threeHours')+' '+t('unknownDemand'));};
  const baseHeat=updateHeatmap; updateHeatmap=function(){baseHeat();paint();};

  setLanguage(language);
  document.documentElement.dataset.localFiftyData=D.meta.last_updated;
})();
