'use strict';
// Copy is intentionally separate from presentation. All strings are trusted local content.
// Language order: English, Spanish, Portuguese. Local pay and demand are NOT verified.
const copy = {
skip:['Skip to content','Ir al contenido','Ir para o conteúdo'],tagline:['Local facts. Clear choices.','Datos locales. Decisiones claras.','Dados locais. Escolhas claras.'],location:['DELIVERY DRIVING · WALTHAM, MA','REPARTO DE COMIDA · WALTHAM, MA','ENTREGA DE COMIDA · WALTHAM, MA'],heroTitle:['Does delivery<br> driving in<br> Waltham <em>pay?</em>','¿Conviene hacer<br> entregas en<br> <em>Waltham?</em>','Vale a pena<br> fazer entregas em<br> <em>Waltham?</em>'],heroLede:['Start with what you keep.<br> Then choose an app and plan a shift.','Primero, mira cuánto te queda.<br> Luego elige una app y planea un turno.','Primeiro, veja quanto sobra.<br> Depois escolha um app e planeje um turno.'],seePay:['See pay after costs','Ver pago después de gastos','Ver ganho após os custos'],compare:['Compare the three apps','Comparar las tres apps','Comparar os três apps'],verdictLabel:['THE PAY CHECK','REVISA EL PAGO','CONFIRA O GANHO'],verdictTitle:['App pay is not<br> take-home pay.','Lo que paga la app<br> no es lo que te queda.','O pagamento do app<br> não é o que sobra.'],appPay:['App pay','Pago de la app','Pagamento do app'],carCosts:['Car costs','Gastos del auto','Custos do carro'],taxMoney:['Money for taxes','Dinero para impuestos','Dinheiro para impostos'],keep:['What you keep','Lo que te queda','O que sobra'],verdictNote:['We still need verified Waltham pay data. Use the example below to see how costs change pay.','Aún faltan datos de pago verificados de Waltham. El ejemplo muestra cómo los gastos cambian tu pago.','Ainda faltam dados verificados de ganhos em Waltham. O exemplo mostra como os custos mudam seu ganho.'],dataPending:['LOCAL PAY DATA · NOT YET VERIFIED','PAGO LOCAL · AÚN SIN VERIFICAR','GANHOS LOCAIS · AINDA NÃO VERIFICADOS'],navPay:['01 Pay','01 Pago','01 Ganho'],navShift:['02 A shift','02 Un turno','02 Um turno'],navNeeds:['03 What you need','03 Requisitos','03 Requisitos'],navApps:['04 Apps','04 Apps','04 Apps'],navWhen:['05 When','05 Cuándo','05 Quando'],navWhere:['06 Where','06 Dónde','06 Onde'],navMore:['07 Keep more','07 Que te quede más','07 Faça sobrar mais'],footer:['A local guide. Not a promise of pay.','Una guía local. No es una promesa de pago.','Um guia local. Não é uma promessa de ganho.'],sourceLink:['Sources and open questions','Fuentes y datos pendientes','Fontes e dados pendentes'],
payTitle:['How much do I really keep?','¿Cuánto me queda de verdad?','Quanto sobra de verdade?'],payIntro:['The app shows one number. Your car and taxes change it. See the full picture here.','La app muestra un número. Tu auto y los impuestos lo cambian. Aquí ves el total.','O app mostra um número. Seu carro e os impostos mudam esse valor. Veja o resultado aqui.'],example:['Example only','Solo un ejemplo','Apenas um exemplo'],yourNumbers:['Try different numbers','Prueba otros números','Teste outros valores'],hourlyPay:['App pay per hour','Pago por hora de la app','Pagamento por hora do app'],payHint:['Include tips. Count waiting time.','Incluye propinas. Cuenta el tiempo de espera.','Inclua gorjetas. Conte o tempo de espera.'],hourlyCar:['Car costs per hour','Gastos del auto por hora','Custos do carro por hora'],carHint:['Gas, repairs, insurance, and wear.','Gasolina, reparaciones, seguro y desgaste.','Combustível, reparos, seguro e desgaste.'],taxRate:['Share kept for taxes','Parte para impuestos','Parte para impostos'],taxHint:['Applied to pay after car costs.','Sobre el pago después de gastos del auto.','Sobre o ganho após os custos do carro.'],hours:['Hours in your shift','Horas de tu turno','Horas do seu turno'],hoursHint:['Count all your time, including waits.','Cuenta todo el tiempo, incluso las esperas.','Conte todo o tempo, incluindo esperas.'],reset:['Reset the example','Restablecer el ejemplo','Restaurar o exemplo'],resultLabel:['EXAMPLE · AFTER COSTS AND TAX MONEY','EJEMPLO · TRAS GASTOS Y DINERO PARA IMPUESTOS','EXEMPLO · APÓS CUSTOS E DINHEIRO PARA IMPOSTOS'],perHour:['/ hour','/ hora','/ hora'],shiftResult:['for your whole shift','por todo el turno','pelo turno inteiro'],beforeCosts:['Before costs','Antes de gastos','Antes dos custos'],forTaxes:['Kept for taxes','Guardado para impuestos','Guardado para impostos'],afterCosts:['Left for you','Te queda','Sobra para você'],calcNote:['This is simple math, not a pay forecast or a tax estimate.','Es un cálculo simple, no una previsión de pago ni de impuestos.','É uma conta simples, não uma previsão de ganhos ou impostos.'],calcSource:['Example inputs: $24 app pay, $6 car costs, 25% for taxes, 4 hours. These are chosen examples, not measured Waltham figures. Your actual taxes and costs will differ.','Ejemplo: $24 de pago, $6 de gastos, 25% para impuestos, 4 horas. Son valores de ejemplo, no datos medidos en Waltham. Tus impuestos y gastos serán distintos.','Exemplo: $24 de ganho, $6 de custos, 25% para impostos, 4 horas. São valores de exemplo, não dados medidos em Waltham. Seus impostos e custos serão diferentes.'],calcError:['Enter valid numbers. Use 0–100 for the tax share and more than 0 hours.','Ingresa números válidos. Usa 0–100 para impuestos y más de 0 horas.','Insira valores válidos. Use 0–100 para impostos e mais de 0 horas.'],
eveningTitle:['What is a delivery shift like?','¿Cómo es un turno de reparto?','Como é um turno de entregas?'],eveningIntro:['A simple shift, step by step. The number of orders and the time will vary.','Un turno sencillo, paso a paso. La cantidad de pedidos y el tiempo varían.','Um turno simples, passo a passo. A quantidade de pedidos e o tempo variam.'],step1:['Open the app','Abre la app','Abra o app'],step1p:['Check the pay, miles, and drop-off point before you accept.','Revisa el pago, las millas y el destino antes de aceptar.','Confira o ganho, as milhas e o destino antes de aceitar.'],step2:['Pick up the food','Recoge la comida','Retire a comida'],step2p:['Find a legal place to park. Check the name on the order.','Busca un lugar permitido para estacionar. Revisa el nombre del pedido.','Estacione em um local permitido. Confira o nome no pedido.'],step3:['Make the delivery','Entrega el pedido','Faça a entrega'],step3p:['Follow the drop-off notes. Count the drive back in your time.','Sigue las notas de entrega. Cuenta el regreso como tiempo de trabajo.','Siga as instruções da entrega. Conte o tempo da volta.'],step4:['Check what you kept','Revisa cuánto te quedó','Confira quanto sobrou'],step4p:['Write down your pay, hours, miles, and costs. Compare the whole shift.','Anota tu pago, horas, millas y gastos. Compara el turno completo.','Anote o ganho, as horas, as milhas e os custos. Compare o turno inteiro.'],radius:['Want to stay near Waltham? Check each drop-off before you accept. A nearby pickup can still lead to a long trip.','¿Quieres quedarte cerca de Waltham? Revisa el destino antes de aceptar. Recoger cerca no significa entregar cerca.','Quer ficar perto de Waltham? Confira o destino antes de aceitar. Uma retirada próxima pode ter uma entrega distante.'],
needsTitle:['What do I need?','¿Qué necesito?','O que preciso ter?'],needsIntro:['Use this list to get ready. Confirm the current rules with your chosen app.','Usa esta lista para prepararte. Confirma las reglas actuales con la app elegida.','Use esta lista para se preparar. Confirme as regras atuais com o app escolhido.'],req1:['A valid driver’s license','Licencia de conducir vigente','Carteira de motorista válida'],req2:['Social Security number for the background check','Número de Seguro Social para revisar antecedentes','Número do Social Security para a verificação de antecedentes'],req3:['Car insurance in your name','Seguro del auto a tu nombre','Seguro do carro em seu nome'],req4:['Current car registration','Registro vigente del auto','Registro atualizado do carro'],req5:['A phone that runs the app','Un teléfono compatible con la app','Um celular compatível com o app'],req6:['Check your age and vehicle meet the app’s rules','Verifica la edad y el vehículo que exige la app','Confira a idade e o veículo exigidos pelo app'],checked:['items checked','elementos marcados','itens marcados'],insuranceTitle:['Ask about insurance first.','Pregunta primero por el seguro.','Pergunte primeiro sobre o seguro.'],insuranceText:['Ask your insurer: “Does my policy cover food delivery?” Get an answer before your first shift.','Pregunta a tu aseguradora: “¿Mi póliza cubre el reparto de comida?” Confírmalo antes del primer turno.','Pergunte à seguradora: “Minha apólice cobre entregas de comida?” Confirme antes do primeiro turno.'],reqNote:['Checklist from the supplied brief. App rules, age limits, and vehicle rules still need local verification.','Lista basada en el documento original. Falta verificar las reglas locales, la edad y los vehículos.','Lista baseada no documento original. As regras locais, a idade e os veículos ainda precisam de verificação.'],checkRules:['See each app’s rules','Ver las reglas de cada app','Ver as regras de cada app'],
appsTitle:['Which app should I use first?','¿Qué app uso primero?','Qual app devo usar primeiro?'],appsIntro:['Compare the same things: local orders, pay after costs, and how far you drive.','Compara lo mismo: pedidos locales, pago después de gastos y distancia.','Compare as mesmas coisas: pedidos locais, ganho após custos e distância.'],recommendTitle:['Start with one app.','Empieza con una app.','Comece com um app.'],recommendText:['Track a few shifts before adding another. We need local data before naming a Waltham winner.','Anota varios turnos antes de agregar otra. Faltan datos locales para elegir la mejor en Waltham.','Anote alguns turnos antes de adicionar outro. Faltam dados locais para escolher o melhor em Waltham.'],appOption:['APP OPTION','OPCIÓN DE APP','OPÇÃO DE APP'],localOrders:['Orders in Waltham','Pedidos en Waltham','Pedidos em Waltham'],needsSource:['Needs a source','Falta una fuente','Falta uma fonte'],netPay:['Pay after costs','Pago después de gastos','Ganho após custos'],notVerified:['Not yet verified','Aún sin verificar','Ainda não verificado'],bonus:['New-driver bonus','Bono para nuevos conductores','Bônus para novos entregadores'],checkOffer:['Check your own offer','Revisa tu propia oferta','Confira sua própria oferta'],rules:['Age and vehicle rules','Reglas de edad y vehículo','Regras de idade e veículo'],officialRules:['Read official requirements','Leer requisitos oficiales','Ler requisitos oficiais'],signup:['Sign up for','Registrarse en','Cadastrar-se no'],appNote:['Links go directly to the apps. No referral codes are used. Bonuses and openings can change.','Los enlaces van a las apps, sin códigos de referido. Los bonos y cupos pueden cambiar.','Os links vão direto aos apps, sem códigos de indicação. Bônus e vagas podem mudar.'],
whenTitle:['When should I drive?','¿Cuándo debo hacer entregas?','Quando devo fazer entregas?'],whenIntro:['Match a short shift to your free time. We do not yet have verified busy hours.','Elige un turno corto que te convenga. Aún no tenemos horarios de demanda verificados.','Escolha um turno curto no seu tempo livre. Ainda não temos horários de demanda verificados.'],weekView:['A week in Waltham','Una semana en Waltham','Uma semana em Waltham'],threeHours:['Each square is 3 hours.','Cada cuadro representa 3 horas.','Cada quadrado representa 3 horas.'],unknownDemand:['No verified demand data yet','Todavía no hay datos de demanda verificados','Ainda não há dados de demanda verificados'],lunch:['Lunch','Almuerzo','Almoço'],lunchP:['A window to test if your afternoons are free.','Una opción para probar si tienes las tardes libres.','Uma opção para testar se suas tardes estão livres.'],dinner:['Dinner','Cena','Jantar'],dinnerP:['The draft suggests evenings. Local demand still needs checking.','El borrador sugiere las tardes. Falta comprobar la demanda local.','O rascunho sugere a noite. A demanda local ainda precisa ser verificada.'],late:['Late night','De noche','Madrugada'],lateP:['Check which places are open before you make the trip.','Comprueba qué lugares están abiertos antes de salir.','Confira quais locais estão abertos antes de sair.'],
whereTitle:['Where do I pick up?','¿Dónde recojo los pedidos?','Onde retiro os pedidos?'],whereIntro:['Three areas from the rough guide. Tap an area to see what needs checking.','Tres zonas de la guía original. Toca una zona para ver qué falta verificar.','Três áreas do guia original. Toque em uma área para ver o que falta verificar.'],schematic:['AREA GUIDE · NOT TO SCALE','GUÍA DE ZONAS · SIN ESCALA','GUIA DE ÁREAS · SEM ESCALA'],mapCaption:['Draft geography · not for navigation','Mapa de borrador · no sirve para navegar','Mapa de rascunho · não use para navegação'],areaLabel:['PICKUP AREA','ZONA DE RECOGIDA','ÁREA DE RETIRADA'],area1:['Moody Street','Moody Street','Moody Street'],area2:['Main Street & the Common','Main Street y el Common','Main Street e o Common'],area3:['Route 20 & Lexington Street','Route 20 y Lexington Street','Route 20 e Lexington Street'],area2short:['Main St & Common','Main St y Common','Main St e Common'],area3short:['Route 20 & Lexington','Route 20 y Lexington','Route 20 e Lexington'],area1p:['The rough guide marks Moody Street as a pickup area. Restaurant counts and wait times need checking.','La guía original marca Moody Street como zona de recogida. Falta verificar restaurantes y tiempos de espera.','O guia original marca Moody Street como área de retirada. Faltam dados de restaurantes e tempos de espera.'],area2p:['The rough guide groups pickups near Main Street and the Common. Confirm pickup locations and legal parking.','La guía agrupa recogidas cerca de Main Street y el Common. Verifica los lugares de recogida y estacionamiento.','O guia agrupa retiradas perto de Main Street e do Common. Confira os locais de retirada e estacionamento.'],area3p:['The rough guide marks the Route 20 and Lexington Street area. App coverage and restaurant counts need checking.','La guía marca la zona de Route 20 y Lexington Street. Falta verificar las apps y los restaurantes.','O guia marca a área de Route 20 e Lexington Street. Faltam dados dos apps e restaurantes.'],areaStatus:['Demand not yet verified','Demanda aún sin verificar','Demanda ainda não verificada'],mapSource:['Source: supplied rough site design. This is a simplified diagram, not a live demand map.','Fuente: diseño original del sitio. Es un diagrama simple, no un mapa de demanda en vivo.','Fonte: design original do site. É um diagrama simples, não um mapa de demanda ao vivo.'],
improveTitle:['How do I keep more?','¿Cómo hago para que me quede más?','Como faço para sobrar mais?'],improveIntro:['Watch the full shift, not just the pay on one order.','Mira el turno completo, no solo el pago de un pedido.','Veja o turno inteiro, não apenas o pagamento de um pedido.'],more1:['Count all the miles.','Cuenta todas las millas.','Conte todas as milhas.'],more1p:['Include the drive back. A longer trip means more car costs.','Incluye el regreso. Un viaje largo implica más gastos del auto.','Inclua a volta. Uma viagem longa traz mais custos com o carro.'],more2:['Compare full shifts.','Compara turnos completos.','Compare turnos inteiros.'],more2p:['Write down pay, costs, and total time. Use the same method each night.','Anota pago, gastos y tiempo total. Usa el mismo método cada noche.','Anote ganho, custos e tempo total. Use o mesmo método a cada noite.'],more3:['Try a second app later.','Prueba otra app después.','Teste outro app depois.'],more3p:['Learn one app first. Check each app’s rules before using two.','Aprende a usar una primero. Revisa las reglas antes de usar dos.','Aprenda a usar um primeiro. Confira as regras antes de usar dois.'],
sourcesTitle:['Sources and what still needs checking','Fuentes y datos por verificar','Fontes e dados a verificar'],sourcesIntro:['This edition follows the supplied Local Fifty design and Driver Personas brief. Luis is the main reader. Dana is the second reader.','Esta edición sigue el diseño Local Fifty y el documento de perfiles recibidos. Luis es el lector principal. Dana es la segunda lectora.','Esta edição segue o design Local Fifty e o documento de perfis recebidos. Luis é o leitor principal. Dana é a segunda leitora.'],sourcesPay:['Pay: calculator figures are examples only. No local pay estimate is verified.','Pago: los valores de la calculadora son ejemplos. No hay estimaciones locales verificadas.','Ganho: os valores da calculadora são exemplos. Não há estimativas locais verificadas.'],sourcesDemand:['Demand: restaurant totals, hourly demand, and app rankings need dated local sources.','Demanda: faltan fuentes locales con fecha para restaurantes, horarios y comparación de apps.','Demanda: faltam fontes locais com data para restaurantes, horários e comparação de apps.'],sourcesRules:['Rules: confirm Massachusetts delivery rules and each app’s requirements before publishing them as facts.','Reglas: confirma las reglas de reparto de Massachusetts y cada app antes de publicarlas.','Regras: confirme as regras de entrega de Massachusetts e de cada app antes de publicá-las.'],sourcesLinks:['Official app pages · checked October 3, 2026','Páginas oficiales · revisadas el 3 de octubre de 2026','Páginas oficiais · consultadas em 3 de outubro de 2026'],sourcesTranslation:['Spanish and Portuguese are draft translations. Native-language review is still needed.','Las traducciones al español y portugués necesitan revisión de hablantes nativos.','As traduções em espanhol e português precisam de revisão por falantes nativos.'],
};

Object.assign(copy, {
heroArtCaption:['MOODY STREET · WALTHAM, MASSACHUSETTS','MOODY STREET · WALTHAM, MASSACHUSETTS','MOODY STREET · WALTHAM, MASSACHUSETTS'],
illustrative:['ILLUSTRATIVE EXAMPLE','EJEMPLO ILUSTRATIVO','EXEMPLO ILUSTRATIVO'],
payVisualIntro:['One hour. Here is where the money goes.','Una hora. Así se reparte el dinero.','Uma hora. Veja para onde vai o dinheiro.'],
changeNumbers:['Change the example numbers','Cambiar los valores del ejemplo','Alterar os valores do exemplo'],
perHourShort:['per hour','por hora','por hora'],
exampleShift:['EXAMPLE SHIFT · TIMES WILL VARY','TURNO DE EJEMPLO · LOS TIEMPOS VARÍAN','TURNO DE EXEMPLO · OS TEMPOS VARIAM'],
step3:['Drive to the drop-off','Ve al lugar de entrega','Vá até o local da entrega'],
step3p:['Check the route. Count the miles and the drive back.','Revisa la ruta. Cuenta las millas y el viaje de regreso.','Confira o trajeto. Conte as milhas e a viagem de volta.'],
step4:['Drop off the food','Entrega la comida','Entregue a comida'],
step4p:['Follow the drop-off notes. Confirm the delivery in the app.','Sigue las notas de entrega. Confirma la entrega en la app.','Siga as instruções. Confirme a entrega no app.'],
areaGuide:['YOUR WALTHAM AREA GUIDE','TU GUÍA DE ZONAS DE WALTHAM','SEU GUIA DE ÁREAS DE WALTHAM'],
mapCaption:['Illustrated area guide · not for navigation','Guía ilustrada · no sirve para navegar','Guia ilustrado · não use para navegação'],
whereIntro:['Get to know the streets before your first shift. Choose an area below.','Conoce las calles antes del primer turno. Elige una zona abajo.','Conheça as ruas antes do primeiro turno. Escolha uma área abaixo.'],
mapSource:['Street layout references the City of Waltham GIS map. Watercolor artwork is an illustration. Demand and restaurant counts are not yet verified.','Calles basadas en el mapa GIS de Waltham. La acuarela es una ilustración. La demanda y los restaurantes aún no están verificados.','Ruas baseadas no mapa GIS de Waltham. A aquarela é uma ilustração. A demanda e os restaurantes ainda não foram verificados.'],
artNote:['Local illustrations. Real questions.','Ilustraciones locales. Preguntas reales.','Ilustrações locais. Perguntas reais.'],
});

let language = 'en';
try {const saved=localStorage.getItem('local-fifty-language'); if(['en','es','pt'].includes(saved)) language=saved;} catch {}
const ix=()=>({en:0,es:1,pt:2})[language];
const t=k=>copy[k]?.[ix()] ?? k;
const text=(key,tag='span',cls='')=>`<${tag} ${cls?`class="${cls}"`:''} data-t="${key}">${t(key)}</${tag}>`;
// Presentation only: dedicated localized hooks keep ranges and notes in reading order.
function renderHeroNumbers(){
 const location=document.querySelector('[data-t=location]');if(location){const meta=window.LOCAL_FIFTY_DATA?.meta;location.textContent=['Delivery driving','Reparto de comida','Entrega de comida'][ix()]+' · '+(meta?.town??'Waltham')+', '+(meta?.state??'MA');}
 const lede=document.querySelector('.hero-lede');if(lede){lede.hidden=true;lede.replaceChildren();}
 const method=document.querySelector('.hero-method');
 if(method&&copy.heroNumberDetail)method.innerHTML='<summary>'+text('heroNumberToggle')+'</summary>'+text('heroNumberDetail','p');
}

const heading=(n,key,intro)=>`<div class="section-heading"><span class="section-number">${n}</span><div>${text(key,'h2')}${intro?text(intro,'p','section-intro'):''}</div></div>`;
const appLinks=['https://dasher.doordash.com/en-us','https://www.uber.com/us/en/deliver/','https://driver.grubhub.com/'];
const appNames=['DoorDash','Uber Eats','Grubhub'];
const logo=(i)=>`<img class="app-logo" src="assets/logos/${['doordash','ubereats','grubhub'][i]}.svg" alt="${appNames[i]}" width="160" height="48">`;
const appHTML=appNames.map((name,i)=>`<article class="app-card" data-app="${['doordash','ubereats','grubhub'][i]}" style="--app:var(--${['dd','ue','gh'][i]})"><div class="app-kicker">0${i+1} · ${text('appOption')}</div><h3>${logo(i)}</h3><dl>${[['localOrders','needsSource'],['netPay','notVerified'],['bonus','checkOffer']].map(([a,b])=>`<div class="app-stat">${text(a,'dt')}${text(b,'dd',b==='needsSource'?'pending':'')}</div>`).join('')}<div class="app-stat">${text('rules','dt')}<dd><a href="${appLinks[i]}">${text('officialRules')}</a></dd></div></dl><a class="button" href="${appLinks[i]}">${text('signup')}<span>${name}</span></a><p class="link-disclosure" data-t="disclosure_${['doordash','ubereats','grubhub'][i]}" hidden></p></article>`).join('');
const field=(id,key,hint,value,prefix,min,max,step)=>`<div class="input-row"><label for="${id}">${text(key)}${text(hint,'small')}</label><div class="input-box"><span aria-hidden="true">${prefix}</span><input ${id==='tax-input'?'data-tax-basis="taxable"':''} id="${id}" name="${id}" type="number" inputmode="decimal" min="${min}" max="${max}" step="${step}" value="${value}" required></div></div>`;
document.getElementById('sections').innerHTML=`
<section id="pay" class="section wrap">${heading('01','payTitle','payVisualIntro')}<div class="money-story"><div class="money-story-label">${text('illustrative')}<span class="small-rule"></span>${text('perHourShort')}</div><div class="money-flow"><div class="money-item"><strong>$24<span>.00</span></strong>${text('appPay')}<div class="money-fill gross"></div></div><span class="math-sign">−</span><div class="money-item"><strong>$6<span>.00</span></strong>${text('carCosts')}<div class="money-fill costs"></div></div><span class="math-sign">−</span><div class="money-item"><strong>$4<span>.50</span></strong>${text('taxMoney')}<div class="money-fill taxes"></div></div><span class="math-sign">=</span><div class="money-item kept"><strong>$13<span>.50</span></strong>${text('keep')}<div class="money-fill remaining"></div></div></div></div><details class="calculator-details"><summary>${text('changeNumbers')}</summary><div class="calc"><form class="calc-controls" id="calculator" novalidate><div class="calc-label">${text('yourNumbers','h3')}${text('example','span','badge')}</div>${field('pay-input','hourlyPay','payHint',24,'$',0,10000,.01)}${field('car-input','hourlyCar','carHint',6,'$',0,10000,.01)}${field('tax-input','calcTaxRate','calcTaxHint',30,'%',0,100,.1)}${field('hours-input','hours','hoursHint',4,'h',.1,168,.1)}<button type="reset" class="text-button" data-t="reset">${t('reset')}</button></form><div class="calc-result"><div class="eyebrow" data-t="resultLabel">${t('resultLabel')}</div><div aria-live="polite" aria-atomic="true"><div class="result-number"><span id="hourly-result">$13.50</span> <small data-t="perHour">${t('perHour')}</small></div><p class="result-sub"><strong id="shift-result">$54.00</strong> ${text('shiftResult')}</p></div><div class="result-breakdown"><div>${text('beforeCosts')}<b id="gross-total">$96.00</b></div><div>${text('carCosts')}<b id="car-total">−$24.00</b></div><div>${text('forTaxes')}<b id="tax-total">−$18.00</b></div><div>${text('afterCosts')}<b id="net-total">$54.00</b></div></div><div class="pay-bar" aria-hidden="true"><span id="net-bar"></span><span id="car-bar"></span><span id="tax-bar"></span></div><p class="error" id="calc-error" role="alert" hidden></p>${text('calcNote','p','calc-note')}</div></div></details>${text('calcSource','p','source-note')}</section>
<section id="evening" class="section wrap">${heading('02','eveningTitle','eveningIntro')}<div class="shift-kicker">${text('exampleShift')}</div><div class="illustrated-timeline">${[1,2,3,4].map(n=>`<article class="illustrated-step"><div class="step-art" style="--scene:${n-1}" role="img" aria-label="${['Phone with a delivery order','Restaurant pickup','Delivery car','Food at a doorstep'][n-1]}"><img src="assets/evening.webp" srcset="assets/evening-1086.webp 1086w, assets/evening.webp 2172w" sizes="(max-width:650px) 210vw, 1100px" width="2172" height="724" alt="" loading="lazy" decoding="async"></div><div class="step-caption"><span class="story-number">${n}</span><div>${text('step'+n,'h3')}${text('step'+n+'p','p')}</div></div></article>`).join('')}</div>${text('radius','p','notice')}</section>
<section id="requirements" class="section wrap">${heading('03','needsTitle','needsIntro')}<div class="requirements"><div><ul class="checklist">${[1,2,3,4,5,6].map(n=>`<li><label><input type="checkbox" name="requirement-${n}">${text('req'+n)}</label></li>`).join('')}</ul><p class="check-progress" aria-live="polite"><span id="checked-count">0 / 6</span> ${text('checked')}</p></div></div></section>
<section id="apps" class="section wrap">${heading('04','appsTitle','appsIntro')}<div class="recommendation">${text('recommendTitle','strong')}${text('recommendText','p')}</div><div class="app-grid">${appHTML}</div><p class="paid-note source-note" data-t="paidNote" hidden></p>${text('appNote','p','source-note')}</section>
<section id="when" class="section wrap">${heading('05','whenTitle','whenIntro')}<div class="schedule"><div class="schedule-top"><h3 data-t="weekView">${t('weekView')}</h3>${text('threeHours','p')}</div><div id="heatmap" class="heatmap" role="img"></div><div class="heat-key"><span aria-hidden="true"></span>${text('unknownDemand')}</div></div><div class="when-notes">${['lunch','dinner','late'].map(k=>`<div>${text(k,'h3')}${text(k+'P','p')}</div>`).join('')}</div></section>
<section id="where" class="section wrap">${heading('06','whereTitle','whereIntro')}<div class="watercolor-map"><div class="map-topline">${text('areaGuide','span','eyebrow')}<span class="north" aria-label="North">N ↑</span></div><div class="map-image"><img src="assets/waltham-map.webp" srcset="assets/waltham-map-768.webp 768w, assets/waltham-map.webp 1536w" sizes="(max-width:650px) 150vw, (max-width:1000px) calc(100vw - 48px), 1100px" width="1536" height="1024" alt="Watercolor street map" loading="lazy" decoding="async"><svg class="map-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#b54129" stroke-width=".16"><path d="M53 69 L49 69"/><path d="M39 36 L55 34"/><path d="M64 22 L50 25"/></g><g fill="#b54129" stroke="#faf8f3" stroke-width=".2"><circle cx="49" cy="69" r=".65"/><circle cx="55" cy="34" r=".65"/><circle cx="50" cy="25" r=".65"/></g></svg><span class="river-name"></span><button class="map-place moody" data-area="1" aria-pressed="true" aria-controls="map-detail">${text('area1')}<span>01</span></button><button class="map-place common" data-area="2" aria-pressed="false" aria-controls="map-detail">${text('area2short')}<span>02</span></button><button class="map-place lexington" data-area="3" aria-pressed="false" aria-controls="map-detail">${text('area3short')}<span>03</span></button></div>${text('mapCaption','p','map-art-caption')}</div><div class="map-areas">${[1,2,3].map(n=>`<button class="area-tab" data-area="${n}" aria-pressed="${n===1}" aria-controls="map-detail"><span class="story-number">${n}</span>${text('area'+n)}</button>`).join('')}</div><div class="map-detail illustrated-map-detail" id="map-detail" aria-live="polite"><div><div class="eyebrow">${text('areaLabel')} <span id="area-num">01</span></div><h3 id="area-title">${t('area1')}</h3></div><p id="area-description">${t('area1p')}</p>${text('areaStatus','span','badge')}</div>${text('mapSource','p','source-note')}<a class="map-source-link" href="#sources"></a></section>
<section id="improve" class="section wrap">${heading('07','improveTitle','improveIntro')}<div class="improve-grid">${[1,2,3].map(n=>`<article class="improve-card"><div class="display">${n}</div>${text('more'+n,'h3')}${text('more'+n+'p','p')}</article>`).join('')}</div></section>
<section id="sources" class="source-section wrap"><details><summary data-t="sourcesTitle">${t('sourcesTitle')}</summary><div class="source-content">${text('sourcesIntro','p')}<ul>${['sourcesPay','sourcesDemand','sourcesRules'].map(k=>text(k,'li')).join('')}</ul><p><strong data-t="sourcesLinks">${t('sourcesLinks')}</strong></p><ul>${appLinks.map((link,i)=>`<li><a href="${link}">${appNames[i]}</a></li>`).join('')}</ul>${text('sourcesTranslation','p')}</div></details></section>`;
// Round 6 presentation structure, before event binding. Words remain Claude-owned.
const hero=document.querySelector('.hero>div');
if(!document.querySelector('.site-intro'))hero.insertAdjacentHTML('afterbegin',text('siteIntro','p','site-intro'));
document.querySelector('.hero-lede').removeAttribute('data-t');
if(!document.querySelector('.hero-method'))document.querySelector('.hero-lede').insertAdjacentHTML('afterend','<details class="hero-method"></details>');
document.querySelectorAll('.evidence-key').forEach(e=>e.remove());
const nav=document.querySelector('.section-nav');
const menu=document.querySelector('.section-menu')??document.createElement('details');menu.className='section-menu';
menu.innerHTML='<summary aria-label="Sections">☰</summary>';menu.append(nav);
document.querySelector('.masthead').append(menu);
if(!nav.querySelector('a[href="#goal"]'))nav.querySelector('.wrap').insertAdjacentHTML('beforeend','<a href="#goal" data-t="goalTitle"></a><a href="#testimonials" data-t="testiTitle" hidden></a>');
nav.addEventListener('click',e=>{if(e.target.closest('a'))menu.open=false;});
document.querySelectorAll('.money-item').forEach((el,i)=>el.insertAdjacentHTML('beforeend',text(['moneyPayNote','moneyGasNote','moneyTaxNote','moneyKeepNote'][i],'p','money-note')));
document.querySelector('.money-story-label').innerHTML=text('moneyTag');
document.querySelector('.money-story').insertAdjacentHTML('beforeend',text('moneyAside','aside','money-aside'));
document.querySelectorAll('.step-caption>div').forEach((el,i)=>el.insertAdjacentHTML('afterbegin',text('stepTime'+(i+1),'p','step-time')));
document.querySelector('.shift-kicker').insertAdjacentHTML('afterend',text('eveningTimesNote','p','source-note'));
document.querySelector('.step-caption>div').insertAdjacentHTML('beforeend','<div class="step-logos">'+appNames.map((_,i)=>logo(i)).join('')+'</div>');
const when=document.querySelector('#when');when.querySelector('.section-intro').dataset.t='whenLead';
when.querySelector('.when-notes').innerHTML=[1,2,3].map(i=>'<div>'+text('whenWindow'+i+'Title','h3')+text('whenWindow'+i+'Text','p')+'</div>').join('');
const daily=document.createElement('details');daily.className='daily-details';daily.innerHTML='<summary>'+text('whenSeeEveryDay')+'</summary>';daily.append(when.querySelector('.schedule'));when.append(daily);
when.insertAdjacentHTML('beforeend',text('whenHonest','p','notice'));
document.querySelector('.map-image').innerHTML='<img src="assets/waltham-townwide.webp?v=7" width="1536" height="1024" alt="" loading="lazy"><div class="zone-overlay"></div><span class="river-name"></span>';
document.querySelector('.map-topline .eyebrow').dataset.t='evidenceLabelSimplifiedMap';
document.querySelector('#sources').insertAdjacentHTML('beforebegin',`<section id="goal" class="section wrap">${heading('08','goalTitle','goalIntro')}<div class="goal-layout"><div>${text('goalTryOwn','h3')}<div class="goal-presets">${['2000','9000','custom'].map((v,i)=>`<button type="button" data-goal-preset="${v}" aria-pressed="${i===0}">${text('goalPreset'+(i+1))}</button>`).join('')}</div>${[['amount','goalAmountLabel',2000,1,1000000,100],['times','goalTimesLabel',3,1,7,1],['hours','goalHoursLabel',4,1,24,1]].map(([id,k,v,min,max,step])=>`<label class="goal-field" for="goal-${id}">${text(k)}<div class="goal-control">${id==='amount'?'<span aria-hidden="true">$</span>':`<button type="button" data-step="-1" data-input="goal-${id}" aria-label="− ${t(k)}">−</button>`}<input id="goal-${id}" type="number" inputmode="decimal" min="${min}" max="${max}" step="${step}" value="${v}">${id==='amount'?'':`<button type="button" data-step="1" data-input="goal-${id}" aria-label="+ ${t(k)}">+</button>`}</div></label>`).join('')}</div><div class="goal-result" aria-live="polite" aria-atomic="true">${text('goalResultLabel','p')}<strong id="goal-months">—</strong><p id="goal-weekly"></p><p id="goal-slower"></p><p id="goal-error" role="alert" hidden></p>${text('goalBasis','p','source-note')}</div></div></section><section id="testimonials" class="section wrap" hidden>${heading('09','testiTitle','')}<div class="carousel-controls"><button data-slide="-1" aria-label="←">←</button><span class="carousel-position" aria-live="polite"></span><button data-slide="1" aria-label="→">→</button></div><!-- Claude copy slot: testimonial selection method; add a localized hook before supplying live posts. --><div class="testimonial-track" tabindex="0"></div></section>`);
if(!document.querySelector('.logo-disclaimer'))document.querySelector('.footer').insertAdjacentHTML('beforeend',text('notAffiliated','p','logo-disclaimer'));
document.querySelector('.section-nav').addEventListener('click',e=>{if(e.target.closest('a'))document.querySelector('.section-menu').open=false;});
document.addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(!b)return;const input=document.getElementById(b.dataset.input);b.dataset.step==='1'?input.stepUp():input.stepDown();input.dispatchEvent(new Event('input',{bubbles:true}));});
// Zack's round 7 layout: direct navigation and no duplicated pay headline.
menu.after(nav);menu.hidden=true;
document.querySelector('.money-story').after(document.querySelector('.hero-method'));
document.querySelector('.hero-art figcaption')?.remove();
for(const id of ['improve','sources'])document.getElementById(id)?.remove();
document.querySelectorAll('a[href="#improve"],a[href="#sources"]:not(.map-source-link)').forEach(el=>el.remove());
document.querySelector('.recommendation').hidden=true; // Claude will supply the pay-first recommendation.

let testimonials=[];
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderTestimonials(){
 const bundled=window.LOCAL_FIFTY_DATA?.testimonials;if(bundled)testimonials=Array.isArray(bundled)?bundled:bundled.items??[];
 const visibleTestimonials=testimonials.filter(x=>x.display===true);
 const section=document.getElementById('testimonials');section.hidden=!visibleTestimonials.length;document.querySelector('a[href="#testimonials"]').hidden=!visibleTestimonials.length;if(!visibleTestimonials.length)return;
 section.querySelector('.testimonial-intro')?.remove();
 const local=v=>typeof v==='string'?v:v?.[language]??v?.en??'';
 section.querySelector('.testimonial-track').innerHTML=visibleTestimonials.map(x=>{const sentiment=x.display_label??x.sentiment;const i=['doordash','ubereats','grubhub'].indexOf(String(x.app).toLowerCase().replace(/[^a-z]/g,''));const quote=typeof x.quote==='string'?x.quote:x.quote?.en;const translation=language!=='en'?(x['quote_'+language]??(typeof x.quote==='object'?x.quote[language]:null)):null;const url=/^https?:\/\//.test(x.url)?x.url:'#';return `<article class="testimonial-card" data-testimonial-id="${escapeHTML(x.id)}" data-sentiment="${sentiment}">${i>=0?logo(i):escapeHTML(x.app_label??x.app)}<p class="sentiment">${escapeHTML(copy[{positive:'testiPositive',neutral:'testiMixed',mixed:'testiMixed',negative:'testiNegative'}[sentiment]]?.[ix()]??'')}</p><blockquote lang="en">${escapeHTML(quote)}</blockquote>${translation?`<p>${escapeHTML(translation)}</p><small>${t('testiTranslated')}</small>`:''}<p>${escapeHTML(x.place)} · ${escapeHTML(x.date)}</p><details><summary>${t('testiReadMore')}</summary><p>${escapeHTML(language==='en'?local(x.summary):(x['summary_'+language]??local(x.summary)))}</p><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${t('testiOriginal')} · ${escapeHTML(x.source)} ↗</a></details></article>`;}).join('');updateCarousel();
}
function updateCarousel(){const track=document.querySelector('.testimonial-track');const cards=[...track.children];if(!cards.length)return;const index=cards.reduce((best,c,i)=>Math.abs(c.offsetLeft-track.offsetLeft-track.scrollLeft)<Math.abs(cards[best].offsetLeft-track.offsetLeft-track.scrollLeft)?i:best,0);document.querySelector('.carousel-position').textContent=`${index+1} ${t('testiOf')} ${cards.length}`;document.querySelectorAll('[data-slide]').forEach(b=>b.disabled=+b.dataset.slide<0?track.scrollLeft<2:track.scrollLeft+track.clientWidth>=track.scrollWidth-2);}

document.querySelector('.testimonial-track').addEventListener('scroll',updateCarousel,{passive:true});
document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{const track=document.querySelector('.testimonial-track');track.scrollBy({left:+b.dataset.slide*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}));
document.addEventListener('DOMContentLoaded',()=>{if(window.LOCAL_FIFTY_DATA?.testimonials){renderTestimonials();return;}fetch('data/testimonials.json').then(r=>r.ok?r.json():null).then(d=>{testimonials=Array.isArray(d)?d:d?.items??[];renderTestimonials();}).catch(()=>{});});
// Round 6c: every street vertex and feature anchor shares the zone projection.
function projectMapPoint(lat,lng,v){const frame={lat_min:42.346,lat_max:42.431,lng_min:-71.30,lng_max:-71.19};const town=window.LOCAL_FIFTY_DATA?.meta?.town;v=town==='Waltham'?frame:v;return [(lng-v.lng_min)/(v.lng_max-v.lng_min)*100,(v.lat_max-lat)/(v.lat_max-v.lat_min)*100];}
function alignMapStreetLabels(){
 const image=document.querySelector('.map-image'),box=image.getBoundingClientRect();
 for(const key of ['moody_st','lexington_st']){
  const line=image.querySelector(`[data-feature="${key}"]`),label=image.querySelector(`[data-feature-label="${key}"]`);
  if(!line||!label)continue;
  const [a,b]=line.points;const angle=Math.atan2((b.y-a.y)*box.height,(b.x-a.x)*box.width)*180/Math.PI;
  label.style.setProperty('--street-angle',`${angle}deg`);
 }
}
function renderMapFeatures(areas){
 const image=document.querySelector('.map-image');
 image.querySelector('.map-features')?.remove();image.querySelector('.map-feature-labels')?.remove();
 if(!areas.map_features?.length)return;
 const features=areas.map_features.map(f=>({...f,xy:f.points.map(([lat,lng])=>projectMapPoint(lat,lng,areas.map_view))}));
 const anchor=f=>{if(f.xy.length===1)return f.xy[0];const a=f.xy[f.key==='main_st'?1:0],b=f.xy[f.key==='main_st'?2:1],ratio=f.key==='main_st'?.55:.5;return [a[0]+(b[0]-a[0])*ratio,a[1]+(b[1]-a[1])*ratio];};
 image.insertAdjacentHTML('beforeend',`<svg class="map-features" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${features.map(f=>f.kind==='street'?`<polyline data-feature="${f.key}" class="feature-road-edge" points="${f.xy.map(p=>p.join(',')).join(' ')}"/><polyline class="feature-road" points="${f.xy.map(p=>p.join(',')).join(' ')}"/>`:`<circle data-feature="${f.key}" class="feature-${f.kind}" cx="${f.xy[0][0]}" cy="${f.xy[0][1]}" r=".65"/>`).join('')}</svg><div class="map-feature-labels">${features.map(f=>{const [x,y]=anchor(f);return `<span class="map-feature-label feature-label-${f.key}" data-feature-label="${f.key}" data-anchor-x="${x}" data-anchor-y="${y}" style="left:${x}%;top:${y}%">${escapeHTML(copy['mapFeature_'+f.key]?t('mapFeature_'+f.key):f.label[language]??f.label.en)}</span>`;}).join('')}</div>`);
 alignMapStreetLabels();
}
if('ResizeObserver' in window)new ResizeObserver(alignMapStreetLabels).observe(document.querySelector('.map-image'));
function renderRound6(){
 const defaults=window.LOCAL_FIFTY_GOAL_DEFAULTS;if(defaults&&!document.getElementById('goal').dataset.initialized){['amount','times','hours'].forEach(k=>document.getElementById('goal-'+k).value=defaults[k]);document.getElementById('goal').dataset.initialized='true';}
 document.querySelectorAll('[data-evidence-label]').forEach(el=>{let label=el.querySelector(':scope > .evidence-label');if(!label){label=document.createElement('span');label.className='evidence-label';el.append(label);}label.textContent=copy[el.dataset.evidenceLabel]?t(el.dataset.evidenceLabel):'';});
 const AR=window.LOCAL_FIFTY_DATA?.areas;
 if(AR?.zones){
  const v=AR.map_view;renderMapFeatures(AR);
  document.querySelector('.zone-overlay').innerHTML=AR.zones.map((z,i)=>{const [x,y]=projectMapPoint(z.center.lat,z.center.lng,v),id=i+1;const radius=z.radius_m/((window.LOCAL_FIFTY_DATA?.meta?.town==='Waltham'?.085:v.lat_max-v.lat_min)*111320)*100;
   return `<button type="button" data-area="${id}" aria-label="${escapeHTML(zoneName(z,i))}" aria-pressed="${id===selectedArea}" aria-controls="map-detail" class="map-zone" style="left:${x}%;top:${y}%;--zone-radius:${radius*2}%;--zone-weight:${Math.sqrt(z.restaurants/43)}"><span class="zone-wash"></span><span class="zone-number">${id}</span></button>`;
  }).join('');
  let list=document.querySelector('.zone-list');if(!list){list=document.createElement('div');list.className='zone-list';document.querySelector('.watercolor-map').after(list);}
  list.innerHTML=AR.zones.map((z,i)=>`<button type="button" class="zone-label" data-area="${i+1}" aria-pressed="${i+1===selectedArea}" aria-controls="map-detail"><b>${i+1}</b><span><strong>${escapeHTML(zoneName(z,i))}</strong>${text('zoneFact'+i,'small')}</span></button>`).join('');
  list.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>selectArea(+b.dataset.area)));
  selectArea(selectedArea);
 }
 document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-label',(b.dataset.step==='1'?'+ ':'− ')+t(b.dataset.input==='goal-times'?'goalTimesLabel':'goalHoursLabel')));
 renderTestimonials();
}
if('IntersectionObserver' in window){const nudge=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('goal-ready');nudge.unobserve(e.target);}}));nudge.observe(document.getElementById('goal'));}
let selectedArea=1;
function zoneName(zone,index){
 const label=zone.label?.[language]??zone.label?.en;
 return label??(index<2?t('area'+zone.area_id):zone.cluster??zone.name??t('zoneName'+index));
}
function selectArea(n){
 const zones=window.LOCAL_FIFTY_DATA?.areas?.zones;
 if(zones&&(!Number.isInteger(n)||n<1||n>zones.length))return;
 selectedArea=n;
 document.querySelectorAll('[data-area]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.area===n)));
 document.getElementById('area-num').textContent=String(n).padStart(2,'0');
 const zone=zones?.[n-1];
 document.getElementById('area-title').textContent=zone?zoneName(zone,n-1):t('area'+n);
 document.getElementById('area-description').textContent=zone&&n>2?t('zoneFact'+(n-1)):t('area'+n+'p');
 syncStreetMapSelection();
}
function updateHeatmap(){const days=[['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],['Seg','Ter','Qua','Qui','Sex','Sáb','Dom']][ix()];const times=[0,3,6,9,12,15,18,21];const grid=document.getElementById('heatmap');grid.setAttribute('aria-label',t('weekView')+'. '+t('threeHours')+' '+t('unknownDemand'));grid.innerHTML='<span></span>'+times.map(h=>`<span class="heat-head">${hourlyClockLabel(h)}<br> –${hourlyClockLabel(h+3)}</span>`).join('')+days.map(day=>`<span class="heat-day">${day}</span>`+times.map(()=>'<span class="heat-cell" aria-hidden="true"></span>').join('')).join('');}
function money(value){return new Intl.NumberFormat({en:'en-US',es:'es-US',pt:'pt-BR'}[language],{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(Object.is(value,-0)?0:value);}
function calculate(){const inputs=['pay-input','car-input','tax-input','hours-input'].map(id=>document.getElementById(id));const invalid=inputs.some(e=>e.value===''||!e.validity.valid||!Number.isFinite(e.valueAsNumber));inputs.forEach(e=>e.setAttribute('aria-invalid',String(e.value===''||!e.validity.valid)));const err=document.getElementById('calc-error');err.hidden=!invalid;err.textContent=invalid?t('calcError'):'';if(invalid){['hourly-result','shift-result','gross-total','car-total','tax-total','net-total'].forEach(id=>document.getElementById(id).textContent='—');['net-bar','car-bar','tax-bar'].forEach(id=>document.getElementById(id).style.width='0');return;}const [gross,car,rate,hours]=inputs.map(e=>e.valueAsNumber);const tax=window.LocalFiftyCalc?window.LocalFiftyCalc.tax(gross,rate):Math.max(0,gross-car)*rate/100;const net=gross-car-tax;const values={'hourly-result':net,'shift-result':net*hours,'gross-total':gross*hours,'car-total':-car*hours,'tax-total':-tax*hours,'net-total':net*hours};for(const [id,val] of Object.entries(values))document.getElementById(id).textContent=money(val);const total=Math.max(gross,car,1);[['net-bar',Math.max(0,net)],['car-bar',car],['tax-bar',tax]].forEach(([id,val])=>document.getElementById(id).style.width=val/total*100+'%');}
// Read at render time: the town bundle loads after this file.
function renderTownPresentation(){
  const D=window.LOCAL_FIFTY_DATA;
  const meta=D?.meta??{};
  const town=meta.town??'Waltham';
  const state=meta.state_name??'Massachusetts';
  const localized=value=>typeof value==='string'?value:value?.[language]??value?.en;
  const river=localized(meta.river_label)??['Charles River','Río Charles','Rio Charles'][ix()];
  const source=meta.map_source??{};
  document.title=['Local Fifty — Delivery driving in ','Local Fifty — Reparto de comida en ','Local Fifty — Entregas de comida em '][ix()]+town;
  document.querySelector('.hero-art img').alt=localized(meta.hero_art_alt)??[
    `Watercolor delivery route across a bridge in ${town}, ${state}`,
    `Ruta de reparto en acuarela por un puente en ${town}, ${state}`,
    `Rota de entrega em aquarela por uma ponte em ${town}, ${state}`][ix()];
  document.querySelector('.map-image img').alt=localized(meta.map_art_alt)??[
    `Watercolor street map of ${town}, ${state}, and ${river}`,
    `Mapa en acuarela de ${town}, ${state}, y ${river}`,
    `Mapa em aquarela de ${town}, ${state}, e ${river}`][ix()];
  document.querySelector('.river-name').textContent=river;
  const link=document.querySelector('.map-source-link');
  link.textContent=((language==='pt'?(source.pt??source.pt_in??source.en):localized(source))??`City of ${town} GIS`)+(source.year?' · '+source.year:'');
  link.href=meta.map_source_link??'https://walthamtourism.com/wp-content/uploads/2016/01/20150611-For-Print-Use-TROLLEY-MAP.pdf';
}
function setLanguage(lang){language=lang;configureWeekendExample();renderLanguageSelector();document.documentElement.lang=lang;document.querySelectorAll('[data-t]').forEach(el=>el.innerHTML=copy[el.dataset.t]?t(el.dataset.t):'');renderHeroNumbers();document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));document.querySelector('.languages').setAttribute('aria-label',['Language','Idioma','Idioma'][ix()]);document.querySelector('.section-nav').setAttribute('aria-label',['Sections','Secciones','Seções'][ix()]);document.querySelector('.section-menu summary').setAttribute('aria-label',['Sections','Secciones','Seções'][ix()]);renderTownPresentation();selectArea(selectedArea);updateHeatmap();calculate();
const artAlt=[['Phone with a delivery order','Restaurant pickup','Delivery car','Food at a doorstep'],['Teléfono con un pedido','Recogida en un restaurante','Auto de reparto','Comida en la puerta'],['Celular com um pedido','Retirada no restaurante','Carro de entrega','Comida na porta']][ix()];
document.querySelectorAll('.step-art').forEach((el,i)=>el.setAttribute('aria-label',window.LOCAL_FIFTY_DATA?.meta?.step_art_alt?.[language]?.[i]??artAlt[i]));
renderRound6();renderRound7();
try{localStorage.setItem('local-fifty-language',lang);}catch{}}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
// Decorative cloth flags keep the language names as the accessible button labels.
document.querySelectorAll('[data-lang]').forEach(b=>{if(!b.querySelector('.language-flag'))b.insertAdjacentHTML('afterbegin',`<img class="language-flag" src="assets/flag-${b.dataset.lang}.svg" width="32" height="23" alt="" aria-hidden="true">`);});
document.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>selectArea(+b.dataset.area)));
document.querySelector('.zone-overlay').addEventListener('click',e=>{const b=e.target.closest('[data-area]');if(b)selectArea(+b.dataset.area);});
document.querySelectorAll('.checklist input').forEach(b=>b.addEventListener('change',()=>document.getElementById('checked-count').textContent=document.querySelectorAll('.checklist input:checked').length+' / 6'));
document.querySelectorAll('.checklist input').forEach(b=>b.addEventListener('change',renderChecklistCTA));
document.getElementById('calculator').addEventListener('input',calculate);
document.getElementById('calculator').addEventListener('submit',event=>event.preventDefault());
document.getElementById('calculator').addEventListener('reset',()=>setTimeout(calculate,0));
document.querySelectorAll('a[href="#sources"]').forEach(a=>a.addEventListener('click',()=>document.querySelector('#sources details').open=true));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.section-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}});},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('section[id]').forEach(s=>observer.observe(s));}
setLanguage(language);


// Presentation-only symbols; all explanatory wording and pay inputs remain data-owned.
function lineIcon(kind){
 const paths={trophy:'<path d="M20 9h24v15c0 10-5 16-12 16S20 34 20 24Z" fill="#eee0b7"/><path d="M20 15H10v8c0 8 6 12 13 12m21-20h10v8c0 8-6 12-13 12M32 40v11m-10 7v-7h20v7M17 58h30"/><path d="m32 15 2 5 5 1-4 4 1 5-4-3-4 3 1-5-4-4 5-1Z" fill="#bd7952" stroke="#bd7952"/>',clock:'<circle cx="32" cy="32" r="23" fill="#f5efdf"/><path d="M32 17v16l11 7"/>',bag:'<path d="M15 22h34l4 34H11Z" fill="#f5efdf"/><path d="M23 25V16a9 9 0 0118 0v9M24 39l6 6 12-13"/>',start:'<ellipse cx="32" cy="54" rx="20" ry="5" fill="#e3e8d7"/><path d="M49 23c0 14-17 28-17 28S15 37 15 23a17 17 0 0134 0Z" fill="#f9f3e3"/><path d="m28 16 12 8-12 8Z" fill="#b35c42" stroke="#b35c42"/>',sun:'<circle cx="32" cy="32" r="11"/><path d="M32 4v9m0 38v9M4 32h9m38 0h9M12 12l6 6m28 28 6 6M12 52l6-6m28-28 6-6"/>',moon:'<path d="M48 44A25 25 0 0120 8a25 25 0 1028 36Z"/><path d="m46 8 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/>',rise:'<path d="M6 43h52M12 51h40M20 43a12 12 0 0124 0M32 7v15m-7-8 7-7 7 7M9 27l6 5m40-5-6 5"/>',shield:'<path d="m32 5 23 9v18c0 13-16 23-23 27C25 55 9 45 9 32V14Z"/><path d="m21 31 8 8 15-18"/>',savings:'<path d="M7 45c8-5 21-5 29 0v10c-8 5-21 5-29 0Z" fill="#e9d5a5"/><ellipse cx="21.5" cy="45" rx="14.5" ry="5" fill="#f8edcf"/><path d="M7 50c8 5 21 5 29 0M39 54V7"/><path d="M39 9c7-5 11 5 18 0v16c-7 5-11-5-18 0Z" fill="#bb684f"/><circle cx="23" cy="28" r="10" fill="#f8edcf"/><path d="m19 28 3 3 5-6"/>',flag:'<path d="M14 58V7m0 2c14-11 22 12 38 0v25c-16 12-24-11-38 0"/>',car:'<path d="m8 32 7-17h32l9 17v20H8ZM8 32h48M16 52v6m32-6v6M17 42h5m20 0h5"/>',fuel:'<path d="M10 58V10h30v48M16 17h18v14H16zM40 35h6v13c0 8 10 8 10 0V24l-9-9M6 58h38"/>',tax:'<path d="M14 5h36v54l-6-4-6 4-6-4-6 4-6-4-6 4ZM23 18h18M23 26h18M24 45l16-12"/><circle cx="25" cy="34" r="2"/><circle cx="40" cy="45" r="2"/>'};
 return `<svg class="line-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[kind]??paths.flag}</svg>`;
}
// Vehicle symbols mirror the supplied requirements; text labels stay visible.
function vehicleIcon(kind){
 const pos={car:[0,0],motorcycle:[1,0],scooter:[0,1],bike:[1,1]}[kind];
 return `<span class="vehicle-watercolor" aria-hidden="true" style="--art-x:${pos[0]*100}%;--art-y:${pos[1]*100}%"></span>`;
}
function requirementIllustration(index){
 return `<span class="requirement-art watercolor-requirement" aria-hidden="true" style="--art-x:${index%3*50}%;--art-y:${Math.floor(index/3)*100}%"></span>`;
}
function renderChecklistCTA(){
 const boxes=[...document.querySelectorAll('.checklist input')];
 document.getElementById('checked-count').textContent=boxes.filter(b=>b.checked).length+' / '+boxes.length;
 let holder=document.querySelector('.checklist-next');
 if(!holder){holder=document.createElement('div');holder.className='checklist-next';holder.setAttribute('aria-live','polite');document.querySelector('#requirements .requirements').append(holder);}
 const best=document.querySelector('.app-card.top-app .button');
 holder.replaceChildren();
 if(boxes.length&&boxes.every(b=>b.checked)&&best){
  const card=best.closest('.app-card'),app=card.querySelector('.app-logo')?.alt??card.dataset.app;
  const note=document.createElement('p');note.className='checklist-ready';note.textContent=[`Start with ${app}. It pays the most of these three apps in our estimates.`,`Empieza con ${app}. Según nuestras estimaciones, paga más que las otras dos apps.`,`Comece pelo ${app}. Pelas nossas estimativas, ele paga mais que os outros dois apps.`][ix()];
  const link=best.cloneNode(true);link.className='button primary checklist-apply';link.setAttribute('aria-label',best.textContent.trim());
  const mark=card.querySelector('.app-logo')?.cloneNode(true);if(mark){mark.alt=app;const badge=document.createElement('span');badge.className='checklist-app-logo';badge.append(mark);link.replaceChildren(document.createTextNode(['Sign up for','Regístrate en','Cadastre-se no'][ix()]),badge);}
  const celebration=document.createElement('span');celebration.className='checklist-celebration';celebration.setAttribute('aria-hidden','true');celebration.innerHTML=lineIcon('trophy');const title=document.createElement('h3');title.className='checklist-complete-title';title.textContent=['You’ve got everything you need to start driving!','¡Tienes todo lo que necesitas para empezar a repartir!','Você tem tudo de que precisa para começar a fazer entregas!'][ix()];holder.append(celebration,title,note,link);
 }
}
function renderTimeChoices(){
 const input=document.getElementById('shift-start');if(!input)return;
 let choices=document.querySelector('.shift-time-choices');
 if(!choices){choices=document.createElement('div');choices.className='shift-time-choices';document.querySelector('.shift-control').append(choices);}
 document.querySelector('.time-input-row .time-stepper')?.remove();
 choices.innerHTML=`<div class="time-stepper"><button type="button" data-time-step="-60" aria-label="${['One hour earlier','Una hora antes','Uma hora antes'][ix()]}">−</button><button type="button" data-time-step="60" aria-label="${['One hour later','Una hora después','Uma hora depois'][ix()]}">+</button></div>`;
 choices.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{const [h,m]=input.value.split(':').map(Number);const minutes=b.dataset.timePreset?Number(b.dataset.timePreset)*60:((h||0)*60+(m||0)+Number(b.dataset.timeStep)+1440)%1440;input.value=String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');renderShiftLight();}));
}
function renderShiftDuration(){
 const control=document.querySelector('.shift-control');
 let label=control.querySelector('.shift-duration');
 if(!label){label=document.createElement('label');label.className='shift-duration';label.htmlFor='shift-duration';label.innerHTML='<span></span><select id="shift-duration"></select>';control.querySelector('label').after(label);const select=label.querySelector('select');const hours=window.LOCAL_FIFTY_DATA?.pay?.example_evening?.hours??4;[...new Set([1,2,3,4,5,6,8,hours])].sort((a,b)=>a-b).forEach(h=>select.add(new Option('',h)));select.value=String(hours);select.addEventListener('change',()=>{const goal=document.getElementById('goal-hours');goal.value=select.value;goal.dispatchEvent(new Event('input',{bubbles:true}));});}
 label.querySelector('span').textContent=['How long will you drive?','¿Cuánto tiempo vas a repartir?','Por quanto tempo vai entregar?'][ix()];
 const locale={en:'en-US',es:'es-US',pt:'pt-BR'}[language];
 for(const option of label.querySelector('select').options)option.textContent=new Intl.NumberFormat(locale,{style:'unit',unit:'hour',unitDisplay:'long'}).format(Number(option.value));
 // The final pair uses independent art, so the retired clock scene is never displayed.
 const timeline=document.querySelector('.illustrated-timeline');
 if(!timeline.querySelector('.wait-delivery'))timeline.insertAdjacentHTML('beforeend',`<article class="illustrated-step wait-delivery"><div class="wait-art" aria-hidden="true"><img src="assets/wait-delivery-day.webp" width="480" height="480" alt="" loading="lazy"><img class="night-art" src="assets/wait-delivery-night.webp" width="480" height="480" alt="" loading="lazy"></div><div class="step-caption"><p class="step-time"></p><div><h3></h3><strong class="wait-value"></strong><p class="wait-note"></p></div></div></article>`);
 if(!timeline.querySelector('.repeat-deliveries'))timeline.insertAdjacentHTML('beforeend',`<article class="illustrated-step repeat-deliveries"><div class="repeat-art" aria-hidden="true"><img src="assets/repeat-deliveries.webp" width="480" height="480" alt="" loading="lazy"><strong class="repeat-count" hidden></strong></div><div class="step-caption"><p class="step-time"></p><div><h3></h3><p class="repeat-note"></p></div></div></article>`);
 renderDeliveryEstimate();
}
function renderDeliveryEstimate(){
 const step=document.querySelector('.repeat-deliveries');if(!step)return;
 if(window.LocalFiftyShift){renderShiftLight();return;}
 step.querySelector('.repeat-count').hidden=true;
 step.querySelector('h3').textContent=['Do more deliveries','Haz más entregas','Faça mais entregas'][ix()];
 step.querySelector('.repeat-note').textContent=['Delivery estimate coming soon.','La estimación de entregas estará disponible pronto.','A estimativa de entregas estará disponível em breve.'][ix()];
 const wait=document.querySelector('.wait-delivery');wait.querySelector('h3').textContent=copy.shiftWaitTitle?.[ix()]||'';wait.querySelector('.wait-value').textContent='';wait.querySelector('.wait-note').textContent=copy.shiftWaitNote?.[ix()]||'';
}
function shiftClock(hm){const [h,m]=hm.split(':').map(Number);return new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',hour12:true}).format(new Date(2000,0,1,h,m)).replace(/\s+/g,'').toLowerCase();}
function paintShiftPlan(plan){
 const api=window.LocalFiftyShift;if(!api)return;const w=api.words(plan);
 document.querySelectorAll('.illustrated-step').forEach((el,i)=>{
  const step=plan.steps[i];if(!step)return;
  const [hour,minute]=step.time.split(':').map(Number),h=hour+minute/60;
  const night=h<6||h>=20?1:h>=17?(h-17)/3:h<8?(8-h)/2:0;
  el.style.setProperty('--night',night.toFixed(2));el.classList.toggle('after-shift-end',step.after_end);
  const time=el.querySelector('.step-time');time.textContent=step.after_end?(i===5?w.afterEndLabel:shiftClock(step.time)+' · '+w.afterEndLabel):shiftClock(step.time)+(i===5?' – '+shiftClock(plan.end_time):'');time.setAttribute('datetime',step.time);
 });
 const first=document.querySelector('.illustrated-step .step-caption>div');let open=first.querySelector('.open-app-note');if(!open){open=document.createElement('p');open.className='open-app-note';first.append(open);}open.textContent=w.openAppNote;
 const wait=document.querySelector('.wait-delivery');wait.querySelector('h3').textContent=w.waitTitle;wait.querySelector('.wait-value').textContent=w.waitValue;wait.querySelector('.wait-note').textContent=w.waitNote;let waitDetails=wait.querySelector('.wait-details');if(!waitDetails){waitDetails=document.createElement('details');waitDetails.className='wait-details';const note=wait.querySelector('.wait-note');note.before(waitDetails);waitDetails.innerHTML='<summary></summary>';waitDetails.append(note);}waitDetails.querySelector('summary').textContent=['About this wait','Sobre esta espera','Sobre esta espera'][ix()];
 const more=document.querySelector('.repeat-deliveries');more.querySelector('.repeat-count').textContent=plan.additional_deliveries;more.querySelector('.repeat-count').hidden=false;more.querySelector('h3').textContent=w.moreTitle;more.querySelector('.repeat-note').textContent=w.moreNote;
 let summary=document.querySelector('.shift-summary');if(!summary){summary=document.createElement('p');summary.className='shift-summary';summary.setAttribute('aria-live','polite');document.querySelector('.shift-control [data-t="eveningTimesNote"]').before(summary);}summary.textContent=w.summary??'';
 summary.classList.add('sr-only');
 let stats=document.querySelector('.shift-stats');if(!stats){stats=document.createElement('div');stats.className='shift-stats';summary.after(stats);}
 const about=['About','Unos','Cerca de'][ix()],labels=[['Deliveries','App pay','You keep'],['Entregas','Pago de las apps','Te queda'],['Entregas','Pagamento dos apps','Sobra para você']][ix()];
 stats.innerHTML=`<div class="shift-stat-tiles">${[plan.deliveries,plan.pay,plan.kept].map((value,i)=>`<div class="shift-stat ${i===2?'shift-stat-kept':''}"><span>${labels[i]}</span><strong><small>${about}</small> ${value==null?'—':i===0?Math.round(value):money(Math.round(value))}</strong>${i===2?`<p>${['After gas and taxes','Después de gasolina e impuestos','Após combustível e impostos'][ix()]}</p>`:''}</div>`).join('')}</div>`;

 const note=document.querySelector('.shift-control [data-t="eveningTimesNote"]');note.hidden=false;note.textContent=w.timesNote;note.classList.add('shift-times-note');
 let quiet=document.querySelector('.shift-quiet-notice');if(!quiet){quiet=document.createElement('p');quiet.className='shift-quiet-notice';quiet.setAttribute('role','status');document.querySelector('.shift-control').after(quiet);}quiet.hidden=!w.quietNote;quiet.textContent=w.quietNote;
}
window.addEventListener('local-fifty:shift-estimate',event=>{
 const plan=event.detail;if(!plan||plan.start_time!==document.getElementById('shift-start')?.value||plan.duration_hours!==Number(document.getElementById('shift-duration')?.value))return;
 if(window.LocalFiftyShift&&plan.steps&&document.querySelector('.wait-delivery'))paintShiftPlan(plan);
});
function renderShiftLight(){
 renderDurationStepper();
 const input=document.getElementById('shift-start'),duration=Number(document.getElementById('shift-duration')?.value);
 if(!input?.value||!(duration>0)){document.querySelectorAll('.step-time').forEach(el=>el.textContent='—');document.querySelectorAll('.wait-value,.repeat-count').forEach(el=>el.textContent='');document.querySelector('.shift-quiet-notice')?.setAttribute('hidden','');return;}
 if(window.LocalFiftyShift&&document.querySelector('.wait-delivery')){paintShiftPlan(window.LocalFiftyShift.plan({start:input.value,hours:duration,apps:window.LocalFiftyMulti?multiState().shift:undefined}));return;}
 // Missing model: preserve the coming-soon message, with no invented step offsets.
 document.querySelectorAll('.step-time').forEach((el,i)=>el.textContent=i===0?shiftClock(input.value):'—');
 const note=document.querySelector('.shift-control [data-t="eveningTimesNote"]');if(note)note.hidden=true;
 // No planner means no estimate request; stale data-layer listeners may still exist.
}

function renderRound7(){
 const D=window.LOCAL_FIFTY_DATA;
 const map=document.querySelector('.watercolor-map'),zones=document.querySelector('.zone-list');
 if(map&&zones&&!document.querySelector('.map-explorer')){const explorer=document.createElement('div');explorer.className='map-explorer';map.before(explorer);explorer.append(map,zones);}
 document.querySelectorAll('.app-stat').forEach(el=>{if(el.querySelector('[data-t="bonus"]'))el.hidden=true;});
 document.querySelector('#goal [data-t="goalTitle"]').textContent=['How long to reach my savings goal?','¿Cuánto tardaré en alcanzar mi meta de ahorro?','Quanto tempo para alcançar minha meta de economia?'][ix()];
 document.querySelectorAll('.checklist label').forEach((label,i)=>{if(!label.querySelector('.requirement-art'))label.querySelector('input').insertAdjacentHTML('afterend',requirementIllustration(i));});
 // Zack requested Waltham-specific ages; verified against official MA/Waltham pages.
 if(D?.meta?.town==='Waltham')document.querySelector('[data-t="req6"]').textContent=['In Waltham: 18+ for DoorDash and Grubhub. Uber Eats: 19+ by car, 18+ by bike.','En Waltham: 18+ para DoorDash y Grubhub. Uber Eats: 19+ en auto, 18+ en bicicleta.','Em Waltham: 18+ para DoorDash e Grubhub. Uber Eats: 19+ de carro, 18+ de bicicleta.'][ix()];
 document.querySelector('.watercolor-map').classList.toggle('map-large-type',parseFloat(getComputedStyle(document.documentElement).fontSize)>=24);
 document.querySelectorAll('.section-number').forEach(el=>el.remove());
 document.querySelectorAll('.section-nav a').forEach(el=>{
  const key=el.dataset.t,compact=copy[key+'Compact'];
  el.textContent=compact?t(key+'Compact'):t(key).replace(/^\d+\s*/, '');
  if(el.hash==='#goal')el.textContent=t('goalAmountLabel');
 });
 // All three cards retain their original data hooks; only their display order changes.
 if(D?.pay?.per_hour){
  const cards=[...document.querySelectorAll('.app-card')];
  cards.sort((a,b)=>(D.pay.per_hour[b.dataset.app]?.keep_per_hour?.value??-Infinity)-(D.pay.per_hour[a.dataset.app]?.keep_per_hour?.value??-Infinity));
  cards.forEach((card,i)=>{document.querySelector('.app-grid').append(card);card.classList.toggle('top-app',i===0);card.querySelector('.button').classList.toggle('primary',i===0);card.querySelector('.app-kicker').textContent=t('appOption');});
 }
 if(D?.apps?.apps){
  const apps=D.apps.apps,max=Math.max(1,...Object.values(apps).map(a=>a.restaurants_in_town?.value??0));
  document.querySelectorAll('.app-card').forEach(card=>{
   const count=apps[card.dataset.app]?.restaurants_in_town?.value;
   if(!Number.isFinite(count))return;
   const stat=card.querySelector('.app-stat'),dd=stat.querySelector('dd');stat.classList.add('restaurant-stat');
   const supplied=t(dd.dataset.t),note=supplied.includes('·')?supplied.slice(supplied.indexOf('·')+1).trim():'';
   dd.innerHTML=`<div class="restaurant-count"><svg class="line-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 29v27h46V29M6 27l6-17h40l6 17M6 27q6 11 13 0 6 11 13 0 6 11 13 0 6 11 13 0M22 27l3-17m17 17-3-17M28 56V39h15v17M14 37h8v9h-8z"/></svg><strong>${count}</strong></div><div class="restaurant-bar" aria-hidden="true"><span style="width:${count/max*100}%"></span></div><small>${escapeHTML(note)}</small>`;
  });
 }
 if(!document.querySelector('.shift-control')){
  const control=document.createElement('div');control.className='shift-control';
  control.innerHTML=`${lineIcon('rise')}<label for="shift-start">${text('step1')}<input id="shift-start" type="time" value="17:00" step="900"></label><div>${text('exampleShift','strong')}${text('eveningTimesNote','p')}</div>`;
  document.querySelector('.illustrated-timeline').before(control);
  document.getElementById('shift-start').addEventListener('input',renderShiftLight);
  document.querySelectorAll('.step-art').forEach(el=>el.insertAdjacentHTML('beforeend','<img class="night-art" src="assets/evening-night.webp" width="2172" height="724" loading="lazy" alt="">'));
 }
 renderShiftDuration();
 renderTimeChoices();
 groupShiftControls();
 renderShiftLight();
 renderChecklistCTA();
 if(D?.pay){
  const formulas=window.LocalFiftyMoney?.formulas()??['','','',''];
  document.querySelectorAll('.money-item').forEach((el,i)=>{
   let formula=el.querySelector('.expense-formula');if(!formula){formula=document.createElement('div');formula.className='expense-formula';el.append(formula);}formula.textContent=formulas[i];formula.hidden=i===0;
   let why=el.querySelector('.expense-why');if(!why){why=document.createElement('details');why.className='expense-why';el.append(why);}
   const key=['moneyPayWhy','moneyGasWhy','moneyTaxWhy','moneyKeepWhy'][i];
   const supplied=copy[key]?t(key):t(['moneyPayNote','carHint','moneyTaxNote','moneyKeepNote'][i]);
   const source=D.sources?.[i===1?'aaa_gas':i===2?'irs_se_tax':'solo_metro'];
   why.innerHTML=`<summary>${t('heroNumberToggle')}</summary><p>${escapeHTML(supplied)}</p>${source?.url?`<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.publisher??source.title)} ↗</a>`:''}`;
   const note=el.querySelector('.money-note');
   if(note){if(note.textContent.trim()===why.querySelector('p')?.textContent.trim())why.querySelector('p').remove();why.querySelector('summary').after(note);}
   if(i>0)(note??why.querySelector('summary')).after(formula);
   if(i===0&&copy.heroNumberDetail)why.insertAdjacentHTML('beforeend',text('heroNumberDetail','p'));
  });
 }
 if(D?.requirements?.per_app){
  let comparison=document.querySelector('.requirements-apps');if(!comparison){comparison=document.createElement('div');comparison.className='requirements-apps';document.querySelector('#requirements .requirements').after(comparison);}
  const labels={car:['Car','Auto','Carro'],scooter:['Scooter','Scooter','Scooter'],bike:['Bike','Bicicleta','Bicicleta'],motorcycle:['Motorcycle','Moto','Moto']};
  const vehicles={doordash:['car','scooter','bike'],ubereats:['car','scooter','bike'],grubhub:['car','motorcycle','scooter','bike']};
  const notes={doordash:['Waltham bike and scooter signup: not confirmed.','Registro en Waltham con bicicleta o scooter: sin confirmar.','Cadastro em Waltham com bicicleta ou scooter: não confirmado.'],grubhub:['Waltham bike and scooter signup: not confirmed. Cars and motorcycles are accepted in all delivery areas.','Registro en Waltham con bicicleta o scooter: sin confirmar. Autos y motos se aceptan en todas las zonas.','Cadastro em Waltham com bicicleta ou scooter: não confirmado. Carros e motos são aceitos em todas as áreas.']};
  comparison.innerHTML=[...document.querySelectorAll('.app-card')].map(card=>card.dataset.app).map(key=>{
   const i=['doordash','ubereats','grubhub'].indexOf(key);
   const r=D.requirements.per_app[key],official=key==='ubereats'&&D.meta?.town==='Waltham'?'https://www.uber.com/us/en/e/deliver/waltham-ma-us/':key==='grubhub'?'https://driver-support.grubhub.com/hc/en-us/articles/360042375572-Can-I-sign-up-to-deliver-using-my-bicycle':D.sources?.[r.source_id]?.url??appLinks[i];
   return `<article data-requirements-app="${key}"><header class="vehicle-summary-header">${logo(i)}${key!=='ubereats'?`<span class="vehicle-common-age">${['Age','Edad','Idade'][ix()]} ${r.min_age}+</span>`:''}</header><div class="vehicle-options">${vehicles[key].map(kind=>{
    const age=kind==='bike'?(r.min_age_bike??r.min_age):r.min_age;
    const conditional=(key==='grubhub'&&['bike','scooter'].includes(kind))||(key==='doordash'&&['bike','scooter'].includes(kind));
    return `<div class="vehicle-option${conditional?' conditional':''}">${vehicleIcon(kind)}<span class="vehicle-name">${labels[kind][ix()]}${conditional?' *':''}</span>${key==='ubereats'?`<strong class="vehicle-age">${['Age','Edad','Idade'][ix()]} ${age}+</strong>`:''}${key==='ubereats'&&kind==='scooter'?'<small>&lt; 50 cc</small>':''}${key==='ubereats'&&kind==='car'?'<small>2 / 4 '+['doors','puertas','portas'][ix()]+'</small>':''}</div>`;
   }).join('')}</div>${notes[key]?`<small class="vehicle-caveat">* ${notes[key][ix()]}</small>`:''}${r.min_age_note&&D.meta?.town!=='Waltham'?`<small class="vehicle-caveat" lang="en">${escapeHTML(r.min_age_note)}</small>`:''}<p class="sr-only" lang="en">${escapeHTML(r.vehicles)}</p><a href="${escapeHTML(official)}">${t('officialRules')} ↗</a></article>`;
  }).join('');
 }
 if(D?.availability?.typical_day_by_hour){
  let chart=document.querySelector('.day-chart');if(!chart){chart=document.createElement('figure');chart.className='day-chart';document.querySelector('.when-notes').before(chart);}
  const values=D.availability.typical_day_by_hour,max=Math.max(...values,1);
  chart.innerHTML=`<figcaption>${t('whenTypicalDayLabel')}</figcaption><div class="day-sky">${lineIcon('moon')}${lineIcon('rise')}${lineIcon('sun')}${lineIcon('moon')}</div><div class="day-bars">${values.map((v,h)=>`<div class="day-column" title="${hourlyClockLabel(h)} · ${v}"><span class="day-value">${Math.round(v)}</span><i style="height:${v/max*100}%"></i><small>${h%3===0?hourlyClockLabel(h):''}</small></div>`).join('')}</div>`;
 }
 document.querySelectorAll('.when-notes>div').forEach((el,i)=>{if(!el.querySelector('svg'))el.insertAdjacentHTML('afterbegin',lineIcon(['sun','moon','rise'][i]));});
 document.querySelectorAll('[data-goal-preset]').forEach((el,i)=>{
  const icon=['shield','savings','flag'][i];
  // Neutral amount preset until Claude supplies broader goal wording.
  const label=i===1?new Intl.NumberFormat({en:'en-US',es:'es-US',pt:'pt-BR'}[language],{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(el.dataset.goalPreset)):t('goalPreset'+(i+1));
  el.innerHTML=lineIcon(icon)+`<span>${escapeHTML(label).replace(/(\$[\d,.]+)/,'<strong>$1</strong>')}</span>`;
 });
 renderGoalJourney();
 renderGoalControls();
 renderHourly();
 renderAppModelStats();
 renderModelDetails();
 renderMulti();
 renderStreetMap();
 organizeGoalLayout();
 renderHeroCTA();
 organizeExampleCalculator();
}

// Text and container size determine whether labels fit; tabs remain the single flow list.
function fitMapLabels(){
 // Claude 2026-10-04: nudge a label that overhangs the art back inside (phones put "Main St & Common" 2px from the edge),
 // and fall back to the area tabs only if labels still clip vertically or overlap each other.
 const map=document.querySelector('.watercolor-map'),image=map.querySelector('.map-image');
 const places=[...map.querySelectorAll('.map-place')];
 places.forEach(el=>el.style.translate='');
 const bounds=image.getBoundingClientRect(),pad=6;
 places.forEach(el=>{const r=el.getBoundingClientRect();let dx=0;
  if(r.left<bounds.left+pad)dx=bounds.left+pad-r.left;else if(r.right>bounds.right-pad)dx=bounds.right-pad-r.right;
  if(dx)el.style.translate=`${Math.round(dx)}px 0`;});
 const labels=places.map(el=>el.getBoundingClientRect());
 const clipped=labels.some(r=>r.left<bounds.left||r.right>bounds.right||r.top<bounds.top||r.bottom>bounds.bottom)||labels.some((r,i)=>labels.slice(i+1).some(b=>r.left<b.right+8&&r.right+8>b.left&&r.top<b.bottom+8&&r.bottom+8>b.top));
 map.classList.toggle('map-labels-clipped',clipped);
}
if('ResizeObserver' in window)new ResizeObserver(fitMapLabels).observe(document.querySelector('.watercolor-map'));
new MutationObserver(fitMapLabels).observe(document.querySelector('.map-image'),{subtree:true,childList:true,characterData:true});
document.fonts.ready.then(fitMapLabels);
fitMapLabels();

 document.addEventListener('error',e=>{if(e.target.matches?.('img.app-logo')){const fallback=document.createElement('span');fallback.className='app-logo logo-fallback';fallback.textContent=e.target.alt;e.target.replaceWith(fallback);}},true);
// Animate presentation of Claude's result; do not change its calculation or accessible text.
const monthOutput=document.getElementById('goal-months');
let previousMonth=null,monthFrame;
new MutationObserver(()=>{const final=monthOutput.textContent,match=final.match(/\d+(?:[.,]\d+)?/);if(!match){previousMonth=null;return;}const next=Number(match[0].replace(',','.'));cancelAnimationFrame(monthFrame);monthOutput.classList.remove('counting');if(previousMonth===null||matchMedia('(prefers-reduced-motion: reduce)').matches){previousMonth=next;return;}const from=previousMonth;previousMonth=next;const start=performance.now();monthOutput.classList.add('counting');const frame=now=>{const progress=Math.min(1,(now-start)/300),n=from+(next-from)*(1-Math.pow(1-progress,3));monthOutput.dataset.display=final.replace(match[0],n.toFixed(1).replace('.',language==='en'?'.':','));if(progress<1)monthFrame=requestAnimationFrame(frame);else monthOutput.classList.remove('counting');};monthFrame=requestAnimationFrame(frame);}).observe(monthOutput,{childList:true,characterData:true,subtree:true});

 document.querySelector('.testimonial-track').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();document.querySelector(`[data-slide="${e.key==='ArrowLeft'?-1:1}"]`).click();});
 document.querySelector('.testimonial-track').addEventListener('toggle',e=>{if(e.target.tagName==='DETAILS')e.target.querySelector('summary').textContent=t(e.target.open?'testiReadLess':'testiReadMore');},true);
 document.addEventListener('input',e=>{if(e.target.id?.startsWith('goal-'))e.target.setAttribute('aria-invalid',String(!(Number(e.target.value)>0)));});

function groupShiftControls(){
 const control=document.querySelector('.shift-control');
 let group=control.querySelector('.shift-start-group');
 if(!group){group=document.createElement('div');group.className='shift-start-group';control.prepend(group);group.append(control.querySelector('label[for="shift-start"]'));control.querySelector(':scope>.line-icon')?.remove();const note=control.querySelector(':scope>div:not(.shift-start-group):not(.shift-time-choices)');if(note)note.classList.add('shift-example-note');}
 control.querySelector('.shift-example-note>[data-t=exampleShift]')?.remove();
 const label=group.querySelector('label');label.querySelector('[data-t="step1"]').textContent=['When will you start?','¿A qué hora empiezas?','A que horas vai começar?'][ix()];
 group.append(control.querySelector('.shift-time-choices')??group.querySelector('.shift-time-choices'));
 const stepper=group.querySelector('.time-stepper');let row=group.querySelector('.time-input-row');if(!row){row=document.createElement('div');row.className='time-input-row';label.after(row);row.append(document.getElementById('shift-start'));}row.append(stepper);
}
function renderGoalJourney(result){
 let path=document.querySelector('.goal-path');if(!path){path=document.createElement('div');path.className='goal-path';document.querySelector('.goal-result').prepend(path);}
 const today=new Date();today.setHours(12,0,0,0);
 const fmt=d=>new Intl.DateTimeFormat({en:'en-US',es:'es-US',pt:'pt-BR'}[language],{month:'short',day:'numeric',year:'numeric'}).format(d);
 const valid=result&&Number.isFinite(result.months)&&result.months>0;
 const finish=new Date(today);if(valid)finish.setDate(finish.getDate()+Math.ceil(result.months*4.33*7));
 document.getElementById('goal-weekly').after(path);
 path.innerHTML=`<div class="journey-endpoint">${lineIcon('start')}<span>${['Start today','Empieza hoy','Comece hoje'][ix()]}</span><strong>${fmt(today)}</strong></div><div class="journey-track" aria-hidden="true"><i></i><i></i><i></i></div><div class="journey-endpoint">${lineIcon('flag')}<span>${['Estimated finish','Fecha estimada','Data estimada'][ix()]}</span><strong>${valid?fmt(finish):'—'}</strong></div>`;
}
// Present the existing calculator's exact result as a calendar date, without duplicating its pay model.
document.addEventListener('DOMContentLoaded',()=>{
 if(typeof window.goalCalc==='function'){const base=window.goalCalc;window.goalCalc=function(){const result=base.apply(this,arguments);renderGoalJourney(result);return result;};window.goalCalc();}
});

function renderGoalControls(){
 document.querySelector('[data-t=goalTimesLabel]').textContent=['Times I drive each week','Veces que manejo por semana','Vezes que dirijo por semana'][ix()];
 const amount=document.querySelector('#goal-amount').closest('.goal-field');amount.classList.add('goal-amount-card');
 if(!amount.querySelector('.goal-amount-art')){const art=document.createElement('span');art.className='goal-amount-art';art.innerHTML=lineIcon('trophy');amount.prepend(art);}
 const art={times:'<rect x="10" y="13" width="44" height="42" rx="4" fill="#faf4e4"/><path d="M10 25h44M22 7v12m20-12v12M20 34h4m8 0h4m8 0h2M20 44h4m8 0h4"/>',hours:'<circle cx="32" cy="32" r="24" fill="#faf4e4"/><path d="M32 16v17l11 6M32 8v4m24 20h-4M32 56v-4M8 32h4"/><circle cx="32" cy="32" r="2" fill="#b55e43"/>'};
 for(const id of ['times','hours']){const field=document.getElementById('goal-'+id).closest('.goal-field');const control=field.querySelector('.goal-control');control.append(control.querySelector('[data-step="-1"]'),control.querySelector('[data-step="1"]'));field.classList.add('goal-icon-field');if(!field.querySelector('.goal-field-art')){const icon=document.createElement('span');icon.className='goal-field-art';icon.innerHTML=`<svg viewBox="0 0 64 64" fill="none" stroke="#315d49" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art[id]}</svg>`;field.prepend(icon);}if(id==='times')field.querySelector('.goal-field-art').innerHTML=lineIcon('car');}
}

// One duration control in two places; all pay calculations remain with goalCalc.
document.addEventListener('input',event=>{
 if(event.target.id!=='goal-hours')return;
 const select=document.getElementById('shift-duration'),value=event.target.value;if(!select)return;
 if(![...select.options].some(o=>o.value===value)){const n=Number(value);select.add(new Option(n>0?new Intl.NumberFormat({en:'en-US',es:'es-US',pt:'pt-BR'}[language],{style:'unit',unit:'hour',unitDisplay:'long'}).format(n):'—',value));}
 select.value=value;renderShiftLight();
});

// Hourly presentation only. Claude owns all pay calculations, copy and windows.
const hourlyView={profile:'weekend',hour:18,selection:new Set()};
function hourlyCopy(key,values={}){let value=copy[key]?.[ix()]||'';for(const [k,v] of Object.entries(values))value=value.replaceAll('{'+k+'}',v);return escapeHTML(clockText(value));}
function hourlyDay(day){return new Intl.DateTimeFormat(['en-US','es-US','pt-BR'][ix()],{weekday:'short',timeZone:'UTC'}).format(new Date(Date.UTC(2026,9,5+day)));}
function hourlyTime(hour){return hourlyClockLabel(hour);}
function hourlyClockLabel(hour){const h=((hour%24)+24)%24;return `${h%12||12}${h<12?'am':'pm'}`;}
function clockText(value){return String(value).replace(/\b([01]?\d|2[0-3]):([0-5]\d)(?:\s*(AM|PM))?\b/gi,(_,h,m,period)=>{const hour=period?Number(h)%12+(/pm/i.test(period)?12:0):Number(h);return clockLabel(hour,Number(m));}).replace(/\b([01]?\d|2[0-3])h\b/g,(_,h)=>hourlyClockLabel(Number(h))).replace(/\b(1[0-2]|[1-9])\s+(am|pm)\b/gi,(_,h,p)=>h+p.toLowerCase());}
function clockLabel(hour,minute=0){const label=hourlyClockLabel(hour);return minute?label.replace(/(am|pm)$/,':'+String(minute).padStart(2,'0')+'$1'):label;}
function hourlySelection(){return [...hourlyView.selection].map(k=>{const [day,hour]=k.split(':').map(Number);return {day,hour};});}
function hourlyGroups(values){const groups=[];values.forEach((value,hour)=>{const last=groups.at(-1);if(value==null&&last?.value==null&&last)last.end=hour+1;else groups.push({start:hour,end:hour+1,value});});return groups;}
function renderHourly(){
 const section=document.getElementById('when'),H=window.LOCAL_FIFTY_DATA?.hourly,api=window.LocalFiftyHourly;
 const ready=H?.kept?.length===7&&H?.weekday_profile?.length===24&&api?.weekly&&api?.toGoal&&api?.windowLabel;
 section?.classList.toggle('has-hourly',!!ready);
 if(!ready){section?.querySelector('.hourly-experience')?.remove();return;}
 let host=section.querySelector('.hourly-experience');if(!host){host=document.createElement('div');host.className='hourly-experience';section.append(host);}
 const pickerOpen=host.querySelector('.hourly-picker')?.open??false;
 const selected=window.LocalFiftyMulti?multiState().hourly:null;
 const values=selected?LocalFiftyMulti.profile(selected,hourlyView.profile):H[hourlyView.profile+'_profile'];
 const overlay=window.LocalFiftyMulti?.profile(LocalFiftyMulti.apps,hourlyView.profile)??[];
 const chartLabel=selected?t('whenChartLabel').replace(LocalFiftyMulti.names([H.app]),LocalFiftyMulti.names(selected)):t('whenChartLabel');
 const max=Math.max(...H.weekday_profile.filter(Number.isFinite),...H.weekend_profile.filter(Number.isFinite),...overlay.filter(Number.isFinite),...values.filter(Number.isFinite),1);
 const best=H.windows.find(w=>w.rank==='best'),groups=hourlyGroups(values);
 const skyIcons=[[2,'moon'],[7,'rise'],[12,'sun'],[21,'moon']].filter(([hour],i,all)=>all.findIndex(([other])=>groups.findIndex(g=>other>=g.start&&other<g.end)===groups.findIndex(g=>hour>=g.start&&hour<g.end))===i);
 host.innerHTML=`<p class="hourly-lead" ${selected&&selected.join()!==H.app?'hidden':''}>${hourlyCopy('whenLead')}</p><div class="hourly-chart-card"><h3 id="hourly-chart-title">${escapeHTML(chartLabel)}</h3><div class="selection-toolbar">${selected?`<div class="hourly-app-controls">${appChips(selected,'hourly','multiAppsLabel')}</div>`:''}<div class="hourly-tabs" role="group" aria-labelledby="hourly-chart-title">${['weekend','weekday'].map(p=>`<button type="button" data-hourly-profile="${p}" aria-pressed="${hourlyView.profile===p}">${hourlyCopy(p==='weekday'?'whenTabWeekdays':'whenTabWeekends')}</button>`).join('')}</div></div><div class="hourly-chart-scroll"><div class="hourly-chart-canvas" style="--hour-columns:${groups.length}"><div class="hourly-sky" aria-hidden="true">${skyIcons.map(([hour,icon])=>`<span style="grid-column:${groups.findIndex(g=>hour>=g.start&&hour<g.end)+1}">${lineIcon(icon)}</span>`).join('')}</div><div class="hourly-bars">${groups.map(({start:h,end,value:v})=>`<button type="button" class="hourly-bar ${v==null?'unknown':''} ${best&&h>=best.start&&h<best.end?'best':''}" data-chart-hour="${h}" data-chart-end="${end}" aria-pressed="${hourlyView.hour>=h&&hourlyView.hour<end}" aria-label="${escapeHTML(hourlyTime(h)+(end-h>1?' – '+hourlyTime(end):''))}: ${v==null?hourlyCopy('whenNoEstimate'):escapeHTML(money(v))}"><span class="hourly-bar-track"><i style="height:${v==null?5:Math.max(0,v/max*100)}%"></i></span><span>${hourlyClockLabel(h)}${end-h>1?`<br>–${hourlyClockLabel(end-1)}`:''}</span></button>`).join('')}</div></div></div><div class="hourly-detail" aria-live="polite"></div></div><div class="hourly-windows">${['best','good','worst'].map(rank=>{const w=H.windows.find(x=>x.rank===rank);return w?`<article class="hourly-window ${rank}"><span>${hourlyCopy('whenWindow'+rank[0].toUpperCase()+rank.slice(1))}</span><strong>${escapeHTML(money(w.kept))}</strong><h3>${escapeHTML(clockText(api.windowLabel(w)))}</h3><p>${hourlyCopy('whenChartLabel')}</p></article>`:'';}).join('')}</div><details class="hourly-picker" ${pickerOpen?'open':''}><summary id="hourly-picker-title">${hourlyCopy('whenPickerTitle')}</summary><div class="hourly-picker-content"><p>${hourlyCopy('whenPickerHint')}</p><div class="hourly-grid-scroll"><div class="hourly-grid" role="grid" aria-labelledby="hourly-picker-title"></div></div><div class="hourly-result" aria-live="polite"></div><button type="button" class="button hourly-to-goal">${hourlyCopy('whenUseInGoal')} <span aria-hidden="true">→</span></button></div></details><details class="hourly-method"><summary>${hourlyCopy('whenHowWeGotThis')}</summary><p>${hourlyCopy('whenHowWeGotThisText')}</p><div class="hourly-method-range"></div></details>`;
 const method=host.querySelector('.hourly-method');method.querySelector('summary').insertAdjacentHTML('afterend','<div class="hourly-day-breakdown"></div>');host.querySelector('.hourly-chart-card').append(method);
 if(selected)bindAppChips(host,()=>renderHourly());
 host.querySelectorAll('[data-hourly-profile]').forEach(b=>b.addEventListener('click',()=>{hourlyView.profile=b.dataset.hourlyProfile;renderHourly();host.querySelector(`[data-hourly-profile="${hourlyView.profile}"]`).focus();}));
 host.querySelectorAll('[data-chart-hour]').forEach(b=>{const show=()=>{hourlyView.hour=Number(b.dataset.chartHour);renderHourlyDetail();};b.addEventListener('click',show);b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')show();});});
 host.querySelector('.hourly-to-goal').addEventListener('click',()=>{if(window.LocalFiftyMulti){multiState().goal=multiState().hourly.slice();LocalFiftyMulti.toGoal(multiState().goal);renderMultiControls();}api.toGoal(hourlySelection());document.getElementById('goal-hours')?.dispatchEvent(new Event('input',{bubbles:true}));renderShiftDuration();renderTimeChoices();renderShiftLight();document.getElementById('goal-amount')?.focus({preventScroll:true});document.getElementById('goal-amount')?.closest('section')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
 renderHourlyDetail();renderHourlyGrid();
 const scroller=host.querySelector('.hourly-chart-scroll');if(scroller.scrollWidth>scroller.clientWidth)scroller.scrollLeft=Math.max(0,(groups.findIndex(g=>hourlyView.hour>=g.start&&hourlyView.hour<g.end)-2)*host.querySelector('[data-chart-hour]').getBoundingClientRect().width);
}
function renderHourlyDetail(){
 const H=window.LOCAL_FIFTY_DATA?.hourly,host=document.querySelector('.hourly-experience');if(!H||!host)return;
 const selected=window.LocalFiftyMulti?multiState().hourly:null;
 const days=hourlyView.profile==='weekday'?[0,1,2,3,4]:[5,6],profile=selected?LocalFiftyMulti.profile(selected,hourlyView.profile):H[hourlyView.profile+'_profile'];
 const group=hourlyGroups(profile).find(g=>hourlyView.hour>=g.start&&hourlyView.hour<g.end),h=group.start,end=group.end,value=group.value;
 host.querySelectorAll('[data-chart-hour]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.chartHour===h)));
 const detail=d=>{const hours=Array.from({length:end-h},(_,i)=>h+i);return hours.map(hour=>{
  if(H.kept[d][hour]==null)return hourlyCopy('whenNoEstimate');
  const r=window.LocalFiftyHourly.weekly([{day:d,hour}],selected??undefined);
  const orders=!selected||selected.join()===H.app?window.LocalFiftyHourly.ordersText?.(d,hour):'';
  return `${hours.length>1?escapeHTML(hourlyTime(hour))+': ':''}${hourlyCopy('whenTapDetail',{kept:money(r.weekly),low:money(r.low),high:money(r.high)})}${orders?`<small class="hourly-orders">${escapeHTML(orders)}</small>`:''}`;
 }).join('<br>');};
 host.querySelector('.hourly-detail').innerHTML=`<div><span>${escapeHTML(hourlyTime(h))} – ${escapeHTML(hourlyTime(end))}</span><strong>${value==null?'—':escapeHTML(money(value))}</strong></div>`;
 host.querySelector('.hourly-day-breakdown').innerHTML=`<ul>${days.map(d=>`<li><b>${escapeHTML(hourlyDay(d))}</b><span>${detail(d)}</span></li>`).join('')}</ul>`;
}
function pickerHours(button){return button.dataset.pickHours.split(',').map(Number);}
function renderHourlyGrid(){
 const host=document.querySelector('.hourly-experience'),H=window.LOCAL_FIFTY_DATA?.hourly;if(!host||!H)return;
 // Only model-estimated earning hours belong in this picker; no invented busy-hour cutoff.
 const available=(d,h)=>Number.isFinite(H.kept[d]?.[h])&&H.kept[d][h]>0;
 for(const key of hourlyView.selection){const [d,h]=key.split(':').map(Number);if(!available(d,h))hourlyView.selection.delete(key);}
 const mobile=matchMedia('(max-width: 899px)').matches,grid=host.querySelector('.hourly-grid');
 const columns=Array.from({length:24},(_,h)=>h).filter(h=>H.days.some((_,d)=>available(d,h)));
 grid.style.setProperty('--picker-columns',Math.max(1,columns.length));
 grid.innerHTML=H.days.map((_,d)=>{
  const blocks=[];
  for(const h of columns){if(!available(d,h)){if(!mobile)blocks.push([]);continue;}const last=blocks.at(-1);if(mobile&&last?.length<3&&last.at(-1)===h-1)last.push(h);else blocks.push([h]);}
  return `<div class="hourly-day-row" role="row"><strong role="rowheader">${escapeHTML(hourlyDay(d))}</strong>${blocks.map(hours=>{if(!hours.length)return '<div role="gridcell"></div>';const h=hours[0],end=hours.at(-1)+1;return `<div role="gridcell"><button type="button" data-pick-day="${d}" data-pick-hour="${h}" data-pick-hours="${hours.join(',')}" tabindex="-1" aria-label="${escapeHTML(hourlyDay(d)+' '+hourlyTime(h)+' – '+hourlyTime(end))}" aria-pressed="false">${!mobile?hourlyClockLabel(h):`<span>${hourlyClockLabel(h)}</span><span aria-hidden="true">–</span><span>${hourlyClockLabel(end)}</span>`}</button></div>`;}).join('')}</div>`;
 }).join('');
 grid.querySelector('button')?.setAttribute('tabindex','0');
 grid.querySelectorAll('button').forEach(b=>{
 b.addEventListener('click',()=>{const keys=pickerHours(b).map(h=>`${b.dataset.pickDay}:${h}`),remove=keys.every(k=>hourlyView.selection.has(k));keys.forEach(k=>remove?hourlyView.selection.delete(k):hourlyView.selection.add(k));grid.querySelector('[tabindex="0"]')?.setAttribute('tabindex','-1');b.tabIndex=0;updateHourlyResult();});
 b.addEventListener('keydown',e=>{
  const row=[...b.closest('.hourly-day-row').querySelectorAll('button')],i=row.indexOf(b);let next;
  if(e.key==='ArrowRight')next=row[Math.min(row.length-1,i+1)];else if(e.key==='ArrowLeft')next=row[Math.max(0,i-1)];else if(e.key==='Home')next=row[0];else if(e.key==='End')next=row.at(-1);
  else if(e.key==='ArrowDown'||e.key==='ArrowUp'){const dir=e.key==='ArrowDown'?1:-1;for(let d=+b.dataset.pickDay+dir;d>=0&&d<7;d+=dir){const options=[...grid.querySelectorAll(`[data-pick-day="${d}"]`)];if(options.length){next=options.reduce((best,x)=>Math.abs(+x.dataset.pickHour-b.dataset.pickHour)<Math.abs(+best.dataset.pickHour-b.dataset.pickHour)?x:best);break;}}}else return;
  e.preventDefault();if(next){b.tabIndex=-1;next.tabIndex=0;next.focus();}
 });
 });updateHourlyResult();
}
function updateHourlyResult(){
 const host=document.querySelector('.hourly-experience');if(!host)return;const api=window.LocalFiftyHourly;
 host.querySelectorAll('[data-pick-day]').forEach(b=>{const hours=pickerHours(b),n=hours.filter(h=>hourlyView.selection.has(`${b.dataset.pickDay}:${h}`)).length;b.setAttribute('aria-pressed',n===hours.length?'true':n?'mixed':'false');});
 const selection=hourlySelection(),r=api.weekly(selection,window.LocalFiftyMulti?multiState().hourly:undefined);
 host.querySelector('.hourly-result').innerHTML=`<strong>${hourlyCopy('whenPickerResult',{weekly:money(r.weekly)})}</strong><p>${hourlyCopy('whenPickerHours',{hours:r.hours})}</p><p>${r.deliveries==null?'':hourlyCopy('whenPickerDeliveries',{deliveries:new Intl.NumberFormat(['en-US','es-US','pt-BR'][ix()]).format(r.deliveries)})}</p>${r.hours>r.hours_with_estimate?`<p>${hourlyCopy('whenNoEstimate')}: ${selection.filter(({day,hour})=>window.LOCAL_FIFTY_DATA.hourly.kept[day][hour]==null).map(({day,hour})=>escapeHTML(hourlyDay(day)+' '+hourlyTime(hour))).join(', ')}</p>`:''}`;
 host.querySelector('.hourly-to-goal').disabled=!r.hours_with_estimate;
 host.querySelector('.hourly-method-range').textContent=r.hours?`${money(r.low)} – ${money(r.high)}`:'';
}
matchMedia('(max-width: 899px)').addEventListener('change',()=>renderHourlyGrid());


function renderAppModelStats(){
 if(!window.LOCAL_FIFTY_DATA?.pay)return;
 document.querySelectorAll('.app-card').forEach(card=>{
  const key=card.dataset.app;
  for(const [kind,label] of [['Wait','appWaitLabel'],['Deliveries','appDeliveriesLabel']]){
   let row=card.querySelector('[data-model-stat="'+kind+'"]');if(!row){row=document.createElement('div');row.className='app-stat';row.dataset.modelStat=kind;card.querySelector('dl').lastElementChild.before(row);}
   const value='app'+kind+'_'+key;row.innerHTML=`<dt>${lineIcon(kind==='Wait'?'clock':'bag')}<span data-t="${label}">${escapeHTML(copy[label]?.[ix()]??'')}</span></dt><dd data-t="${value}">${escapeHTML(copy[value]?.[ix()]??'')}</dd>`;
  }
 });
 let note=document.querySelector('[data-t="appWaitNote"]');if(!note){note=document.createElement('p');note.className='source-note app-wait-note';note.dataset.t='appWaitNote';document.querySelector('#apps [data-t="appNote"]').before(note);}note.textContent=copy.appWaitNote?.[ix()]??'';
}
function renderModelDetails(){
 // Ranges remain in methodology disclosures, never in headline figures.
 for(const [id,key] of [['goal-slower','whenHowWeGotThis']]){const el=document.getElementById(id);if(el&&!el.closest('details')){const details=document.createElement('details');details.className='goal-method';el.before(details);details.innerHTML=`<summary data-t="${key}">${escapeHTML(copy[key]?.[ix()]??'')}</summary>`;details.append(el);}}
 document.querySelector('.hero-method')?.remove();
 const source=document.querySelector('#pay [data-t="calcSource"]'),old=source?.closest('.pay-method');if(source)document.querySelector('#pay .calc-result').append(source);old?.remove();
}
// All app controls share one selection, initially all three apps.
var multiView;
function multiState(){return multiView??= {apps:LocalFiftyMulti.apps.slice(),scenario:'dinner',shift:LocalFiftyMulti.apps.slice(),goal:LocalFiftyMulti.apps.slice(),hourly:LocalFiftyMulti.apps.slice()};}
function appChips(apps,scope,label){return `<div class="app-chip-group" role="group" aria-label="${escapeHTML(t(label))}"><span class="app-chip-label">${hourlyCopy(label)}</span>${LocalFiftyMulti.apps.map(k=>`<button type="button" class="app-chip" data-multi-scope="${scope}" data-multi-app="${k}" aria-pressed="${apps.includes(k)}" aria-label="${escapeHTML(LocalFiftyMulti.names([k]))}"><img src="assets/logos/${k}.svg" alt="" width="100" height="28"><span aria-hidden="true">${apps.includes(k)?'✓':'+'}</span></button>`).join('')}</div>`;}
function bindAppChips(host,callback){host.querySelectorAll('[data-multi-app]').forEach(b=>b.addEventListener('click',()=>{const state=multiState(),scope=b.dataset.multiScope,k=b.dataset.multiApp,apps=state[scope];if(apps.includes(k)){if(apps.length===1)return;state[scope]=apps.filter(a=>a!==k);}else state[scope]=LocalFiftyMulti.apps.filter(a=>apps.includes(a)||a===k);for(const key of ['apps','shift','goal','hourly'])state[key]=state[scope].slice();LocalFiftyMulti.toGoal(state.apps);renderMulti();renderHourly();renderShiftLight();renderGoalJourney();document.querySelector(`[data-multi-scope="${scope}"][data-multi-app="${k}"]`)?.focus({preventScroll:true});}));}
// Zack requested this plain-language explanation; Claude can migrate it to copy.
function multiExplainCopy(){return [
 {benefits:['Skip low paying deliveries','Accept higher-paying deliveries','Less wait time'],title:'More apps. More offers to choose from.',body:'Skip a low-paying offer and take a better one from another app. Pause the other apps while you deliver, then turn them back on.',quiet:'When it’s quiet, more apps can also help you find the next order sooner.',comparison:'Pay per delivery',unit:'per delivery, before gas and taxes',single:'Turn on a second app above to compare.',note:'These are model estimates, not guaranteed offers.'},
 {benefits:['Evita entregas que pagan poco','Acepta entregas mejor pagadas','Menos tiempo de espera'],title:'Más apps. Más ofertas para elegir.',body:'Deja pasar una oferta de poco pago y acepta una mejor en otra app. Pausa las demás mientras entregas y vuelve a activarlas al terminar.',quiet:'Cuando hay poca actividad, más apps también pueden ayudarte a encontrar el siguiente pedido antes.',comparison:'Pago por entrega',unit:'por entrega, antes de gasolina e impuestos',single:'Activa otra app arriba para comparar.',note:'Son estimaciones del modelo, no ofertas garantizadas.'},
 {benefits:['Recuse entregas que pagam pouco','Aceite entregas que pagam mais','Menos tempo de espera'],title:'Mais apps. Mais ofertas para escolher.',body:'Recuse uma oferta que paga pouco e aceite uma melhor em outro app. Pause os outros enquanto faz a entrega e ligue-os novamente ao terminar.',quiet:'Quando o movimento está fraco, mais apps também podem ajudar a encontrar o próximo pedido mais cedo.',comparison:'Pagamento por entrega',unit:'por entrega, antes de gasolina e impostos',single:'Ative outro app acima para comparar.',note:'São estimativas do modelo, não ofertas garantidas.'}
 ][ix()];}
function multiOrderComparison(apps,scenario,label){
 const r=LocalFiftyMulti.result(apps,scenario),c=multiExplainCopy();
 return `<article class="multi-order-card"><h4>${escapeHTML(label)}</h4><div class="comparison-logos">${apps.map(app=>`<img src="assets/logos/${app}.svg" alt="" width="100" height="28">`).join('')}</div><strong>${escapeHTML(money(r.pay_per_order))}</strong><p>${escapeHTML(c.unit)}</p></article>`;
}
function multiStepIcon(i){return `<span class="multi-step-watercolor" aria-hidden="true" style="--art-x:${i%2*100}%;--art-y:${Math.floor(i/2)*100}%"></span>`;}
// User-requested voice refinements; keep model numbers and source reporting intact.
function directDriverCopy(){
 const before=["Many drivers keep two or three apps on. They take the first good offer and pause the others.","Muchos conductores tienen dos o tres apps encendidas. Aceptan la primera buena oferta y pausan las demás.","Muitos entregadores deixam dois ou três apps ligados. Aceitam a primeira boa oferta e pausam os outros."];
 const after=["Yes, you can keep two or three apps on. Take the first good offer, then pause the other apps while you deliver.","Sí, puedes tener dos o tres apps encendidas. Acepta la primera buena oferta y pausa las demás mientras haces la entrega.","Sim, você pode deixar dois ou três apps ligados. Aceite a primeira boa oferta e pause os outros enquanto faz a entrega."];
 if(copy.multiIntro)copy.multiIntro=copy.multiIntro.map((v,i)=>v.replace(before[i],after[i]).replace(['what an hour keeps','cuánto te queda por hora','quanto sobra por hora'][i],['what an hour earns you','cuánto ganas por hora','quanto você ganha por hora'][i]));
}
function renderMulti(){
 directDriverCopy();
 const api=window.LocalFiftyMulti;if(!api)return;const state=multiState();let section=document.getElementById('multi');
 if(!section){section=document.createElement('section');section.id='multi';section.className='section wrap';document.getElementById('apps').after(section);const link=document.createElement('a');link.href='#multi';link.dataset.t='multiTitle';document.querySelector('.section-nav a[href="#apps"]').after(link);if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))document.querySelectorAll('.section-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#multi'));},{rootMargin:'-10% 0px -65% 0px'}).observe(section);}
 document.querySelector('.section-nav a[href="#multi"]').textContent=t('multiTitle');
 // Preserve the earlier no-visible-section-numbers design, but update ordered section metadata.
 [...document.querySelectorAll('#sections>section')].forEach((s,i)=>s.dataset.section=String(i+1).padStart(2,'0'));
 const c=multiExplainCopy(),w=api.words(state.apps,state.scenario),r=api.result(state.apps,state.scenario),stackOpen=section.querySelector('.multi-stack')?.open;
 if(w.stack){
  const openings=["Some drivers add a second app's order to the trip they are on, when it is from the same area and going the same way.","Algunos conductores suman un pedido de otra app al viaje que ya hacen, si es de la misma zona y va en la misma dirección.","Alguns entregadores somam um pedido de outro app à viagem que já fazem, quando é da mesma área e vai na mesma direção."];
  const direct=["If you add an order from another app to your current trip, it needs to be from the same area and going the same way.","Si añades un pedido de otra app a tu viaje actual, debe ser de la misma zona e ir en la misma dirección.","Se você adicionar um pedido de outro app à sua viagem atual, ele precisa ser da mesma área e ir na mesma direção."];
  w.stack.text=w.stack.text.replace(openings[ix()],direct[ix()]);
  w.stack.warning=w.stack.warning.replace("We do not suggest it for new drivers.","If you are new to delivery, we do not recommend trying this.").replace("No lo recomendamos a conductores nuevos.","Si estás empezando a hacer entregas, no te recomendamos intentarlo.").replace("Não recomendamos para entregadores novos.","Se você está começando a fazer entregas, não recomendamos tentar isso.");
 }

 section.innerHTML=`<div class="section-heading"><div>${text('multiTitle','h2')}${text('multiIntro','p','section-intro')}</div></div><div class="multi-workbench"><div class="multi-controls">${appChips(state.apps,'apps','multiAppsLabel')}<div class="hourly-tabs" role="group" aria-label="${escapeHTML(t('multiTitle'))}">${[['dinner','multiTabDinner'],['all_hours','multiTabAny']].map(([s,k])=>`<button type="button" data-multi-scenario="${s}" aria-pressed="${s===state.scenario}">${hourlyCopy(k)}</button>`).join('')}</div></div><div class="multi-result" aria-live="polite"><span class="multi-evidence">${hourlyCopy('evidenceEstimate')}</span><strong class="multi-value">${escapeHTML(w.value)}</strong><span>${escapeHTML(w.unit)}</span><p class="multi-gain">${escapeHTML(w.gainLine)}</p>${w.belowFeatured?`<p class="multi-caution">${escapeHTML(w.belowFeatured)}</p>`:''}<div class="multi-explanation"><h3>${escapeHTML(c.title)}</h3><ul class="multi-benefits">${c.benefits.map(item=>`<li><span aria-hidden="true">✓</span>${escapeHTML(item)}</li>`).join('')}</ul></div></div>${state.apps.length>1?`<div class="multi-comparison"><h3>${escapeHTML(c.comparison)}</h3><div class="multi-order-cards">${multiOrderComparison([api.featured],state.scenario,api.words([api.featured],state.scenario).gainLine)}${multiOrderComparison(state.apps,state.scenario,w.apps)}</div><p class="comparison-note">${escapeHTML(c.note)}</p></div>`:`<p class="comparison-note">${escapeHTML(c.single)}</p>`}</div>${w.tip?`<p class="multi-tip">${escapeHTML(w.tip)}</p>`:''}<div class="multi-how">${text('multiHowTitle','h3')}<ol>${[1,2,3,4].map((n)=>`<li>${multiStepIcon(n-1)}<div><div class="multi-step-heading"><span class="multi-step-number">${n}</span>${text('multiStep'+n,'h4')}</div>${text('multiStep'+n+'p','p')}${[1,3].includes(n)?`<details class="multi-step-sources"><summary>${['Sources','Fuentes','Fontes'][ix()]}</summary>${multiSources(['multiStep'+n+'p'])}</details>`:''}</div></li>`).join('')}</ol></div><div class="multi-bottom"><div class="multi-know">${text('multiKnowTitle','h3')}<div class="multi-rule-list">${[1,2,3,4].map(n=>`<details class="multi-rule"><summary>${[['App rewards','Pay by time','Taxes','Deliver on time'],['Recompensas de las apps','Pago por tiempo','Impuestos','Entregas a tiempo'],['Recompensas dos apps','Pagamento por tempo','Impostos','Entregas no prazo']][ix()][n-1]}</summary><div><p>${hourlyCopy('multiKnow'+n)}</p>${multiSources(['multiKnow'+n])}</div></details>`).join('')}</div></div>${w.stack?`<details class="multi-stack" ${stackOpen?'open':''}><summary>${escapeHTML(w.stack.title)}</summary><div class="stack-content"><div class="stack-estimate"><span class="multi-evidence">${hourlyCopy('evidenceEstimate')}</span><strong class="stack-value">${escapeHTML(w.stack.value)}</strong><span>${escapeHTML(w.stack.unit)}</span></div><div class="stack-explanation"><p>${escapeHTML(w.stack.text)}</p><p class="multi-caution">${escapeHTML(w.stack.warning)}</p></div></div></details>`:''}</div><details class="multi-method"><summary>${hourlyCopy('whenHowWeGotThis')}</summary><p>${hourlyCopy('multiHowWeGotThis')}</p><p>${escapeHTML(w.ordersLine)}</p><p>${escapeHTML(w.waitLine)}</p><p>${escapeHTML(money(r.low))} – ${escapeHTML(money(r.high))}</p></details>`;
 bindAppChips(section,()=>renderMulti());section.querySelectorAll('[data-multi-scenario]').forEach(b=>b.addEventListener('click',()=>{state.scenario=b.dataset.multiScenario;renderMulti();section.querySelector(`[data-multi-scenario="${state.scenario}"]`).focus({preventScroll:true});}));
 renderMultiControls();
 if(!section.dataset.goalInitialized){section.dataset.goalInitialized='true';api.toGoal(state.apps);renderShiftLight();}
}
function renderMultiControls(){
 if(!window.LocalFiftyMulti)return;const state=multiState();
 for(const [scope,parent,label] of [['shift',document.querySelector('.shift-control'),'appsOnLabel'],['goal',document.querySelector('.goal-layout'),'multiAppsLabel']]){
  if(!parent)continue;let el=parent.querySelector('.multi-'+scope+'-controls');if(!el){el=document.createElement('div');el.className='multi-'+scope+'-controls';parent.prepend(el);}el.innerHTML=appChips(state[scope],scope,label);bindAppChips(el,()=>{if(scope==='shift')renderShiftLight();else{LocalFiftyMulti.toGoal(state.goal);renderGoalJourney();}renderMultiControls();});
 }
 let note=document.querySelector('#apps [data-t="appBestSecond"]');if(!note){note=document.createElement('p');note.className='source-note';note.dataset.t='appBestSecond';document.querySelector('#apps [data-t="appWaitNote"]').after(note);}note.textContent=t('appBestSecond');
}

function multiSources(keys){
 const D=window.LOCAL_FIFTY_DATA,ids=[...new Set((D?.multi_app?.rules??[]).filter(r=>keys.includes(r.copy_key)).flatMap(r=>r.sources??[]))];
 const links=ids.map(id=>{const source=D.sources?.[id];if(!source?.url||!/^https?:\/\//.test(source.url))return '';return `<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)} ↗</a>`;}).filter(Boolean);
 return links.length?`<div class="multi-sources">${links.join('')}</div>`:'';
}

// Anchor alignment follows the actual sticky header, including wrapped translations.
function alignSectionAnchor(hash){
 const section=document.getElementById(hash.replace(/^#/,''));if(!section)return;
 const heading=section.querySelector('.section-heading'),target=heading?.getBoundingClientRect().height?heading:section.querySelector('.headline-equation')??section;
 const header=document.querySelector('.masthead');
 const top=window.scrollY+target.getBoundingClientRect().top-header.getBoundingClientRect().height-16;
 window.scrollTo({top:Math.max(0,top),behavior:'instant'});
 document.querySelectorAll('.section-nav a').forEach(a=>a.classList.toggle('active',a.hash===hash));
}
document.querySelector('.section-nav').addEventListener('click',event=>{
 const link=event.target.closest('a[href^="#"]');if(!link||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 if(!document.getElementById(link.hash.slice(1)))return;
 event.preventDefault();history.pushState(null,'',link.hash);alignSectionAnchor(link.hash);
});
const headerOffsets=new ResizeObserver(()=>document.documentElement.style.setProperty('--section-header-offset',document.querySelector('.masthead').getBoundingClientRect().height+16+'px'));
headerOffsets.observe(document.querySelector('.masthead'));
window.addEventListener('hashchange',()=>alignSectionAnchor(location.hash));
window.addEventListener('load',()=>{if(location.hash)requestAnimationFrame(()=>alignSectionAnchor(location.hash));});


var streetMap,streetMapLayers=[];
function syncStreetMapSelection(){
 if(window.LocalFiftyGoogleMap?.active){LocalFiftyGoogleMap.select(selectedArea);return;}
 if(!streetMap)return;
 if(streetMap._selectedArea!==selectedArea&&streetMapLayers[selectedArea-1]){streetMap.panInside(streetMapLayers[selectedArea-1].marker.getLatLng(),{padding:[48,48],animate:false});streetMap._selectedArea=selectedArea;}
 streetMapLayers.forEach(({circle,marker},i)=>{const active=i+1===selectedArea;circle.setStyle({color:active?'#285947':'#a17d44',fillColor:active?'#789766':'#c9a569',fillOpacity:active?.28:.14,weight:active?3:2});const el=marker.getElement();if(el){el.classList.toggle('selected',active);el.setAttribute('aria-pressed',String(active));el.setAttribute('aria-controls','map-detail');}});
}
function renderStreetMap(){
 const zones=window.LOCAL_FIFTY_DATA?.areas?.zones;
 if(window.LOCAL_FIFTY_MAPS_CONFIG?.googleMapsApiKey&&window.LocalFiftyGoogleMap&&!LocalFiftyGoogleMap.failed&&zones?.length){
  LocalFiftyGoogleMap.render({zones,labels:zones.map(zoneName),language,selected:selectedArea,onSelect:selectArea,onFailure:renderStreetMap});return;
 }
 renderLeafletStreetMap();
}
function renderLeafletStreetMap(){
 const zones=window.LOCAL_FIFTY_DATA?.areas?.zones;if(!window.L||!zones?.length)return;
 const frame=document.querySelector('.watercolor-map');frame.classList.add('street-map-frame');
 frame.querySelector('.map-topline .eyebrow').textContent=['Pickup areas','Áreas de recogida','Áreas de retirada'][ix()];
 frame.querySelector('.map-art-caption').textContent=['Choose a numbered area','Elige un área numerada','Escolha uma área numerada'][ix()];
 const source=document.querySelector('[data-t="mapSource"]');if(source)source.textContent=['Map: OpenStreetMap. Highlighted areas and restaurant counts: our area guide.','Mapa: OpenStreetMap. Áreas destacadas y restaurantes: nuestra guía de áreas.','Mapa: OpenStreetMap. Áreas destacadas e restaurantes: nosso guia de áreas.'][ix()];
 const sourceLink=document.querySelector('.map-source-link');sourceLink.href='https://www.openstreetmap.org/copyright';sourceLink.textContent='© OpenStreetMap contributors';
 if(!streetMap){
  const el=document.createElement('div');el.id='pickup-street-map';frame.querySelector('.map-topline').after(el);
  streetMap=L.map(el,{scrollWheelZoom:false,zoomSnap:.25,zoomAnimation:false,fadeAnimation:false,markerZoomAnimation:false}).setView([zones[0].center.lat,zones[0].center.lng],13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}).addTo(streetMap);
  new ResizeObserver(()=>{streetMap.invalidateSize({pan:false});if(streetMapLayers.length)streetMap.fitBounds(L.featureGroup(streetMapLayers.map(x=>x.circle)).getBounds(),{padding:[30,30],animate:false});}).observe(el);
 }
 streetMap.getContainer().setAttribute('aria-label',t('whereTitle'));
 streetMapLayers.forEach(({circle,marker})=>{circle.remove();marker.remove();});
 streetMapLayers=zones.map((z,i)=>{
  const latlng=[z.center.lat,z.center.lng],label=zoneName(z,i);
  const circle=L.circle(latlng,{radius:z.radius_m}).addTo(streetMap).on('click',()=>selectArea(i+1));
  const marker=L.marker(latlng,{icon:L.divIcon({className:'pickup-map-marker',html:String(i+1),iconSize:[48,48],iconAnchor:[24,24]}),title:label,alt:label,keyboard:true}).addTo(streetMap).on('click',()=>selectArea(i+1));
  marker.bindTooltip(escapeHTML(label),{direction:'top',offset:[0,-24]});return {circle,marker};
 });
 if(!streetMap._localFiftyFitted){streetMap.fitBounds(L.featureGroup(streetMapLayers.map(x=>x.circle)).getBounds(),{padding:[30,30]});streetMap._localFiftyFitted=true;}
 syncStreetMapSelection();
 const zoomLabels=[['Zoom in','Zoom out'],['Acercar','Alejar'],['Aproximar','Afastar']][ix()];['in','out'].forEach((v,i)=>{const b=frame.querySelector('.leaflet-control-zoom-'+v);b.title=zoomLabels[i];b.setAttribute('aria-label',zoomLabels[i]);});
}

function organizeGoalLayout(){
 const layout=document.querySelector('.goal-layout'),setup=layout.querySelector(':scope>div:not(.goal-result):not(.multi-goal-controls)');if(!setup)return;
 setup.classList.add('goal-setup');
 let schedule=setup.querySelector('.goal-schedule');if(!schedule){schedule=document.createElement('div');schedule.className='goal-schedule';setup.append(schedule);for(const id of ['goal-times','goal-hours'])schedule.append(document.getElementById(id).closest('.goal-field'));}
 const result=layout.querySelector('.goal-result'),method=result.querySelector('.goal-method'),basis=result.querySelector('.source-note');if(method&&basis)method.append(basis);
 const path=result.querySelector('.goal-path');if(path)document.getElementById('goal-weekly').after(path);
}

function renderHeroCTA(){
 const actions=document.querySelector('.hero .actions'),best=document.querySelector('.app-card.top-app .button');if(!actions||!best)return;
 const primary=actions.querySelector('.primary'),secondary=actions.querySelector('a:not(.primary)'),card=best.closest('.app-card');
 if(primary){primary.removeAttribute('data-t');primary.href=best.href;primary.textContent=t('signup')+' '+(card.querySelector('.app-logo')?.alt??card.dataset.app);}
 if(secondary){secondary.removeAttribute('data-t');secondary.href='#goal';secondary.textContent=['Plan my earnings','Planear mis ganancias','Planejar meus ganhos'][ix()];secondary.onclick=event=>{event.preventDefault();history.pushState(null,'','#goal');alignSectionAnchor('#goal');};}
}

function organizeExampleCalculator(){
 for(const [id,kind] of [['pay-input','savings'],['car-input','car'],['tax-input','tax'],['hours-input','clock']]){
  const label=document.getElementById(id).closest('.input-row').querySelector('label');if(!label.querySelector('.line-icon'))label.insertAdjacentHTML('afterbegin',lineIcon(kind));
 }
 const result=document.querySelector('.calc-result'),source=result.querySelector('[data-t="calcSource"]');
 let method=result.querySelector('.calc-method');if(!method){method=document.createElement('details');method.className='calc-method';method.innerHTML='<summary></summary>';result.append(method);}
 method.querySelector('summary').textContent=['About this example','Sobre este ejemplo','Sobre este exemplo'][ix()];if(source)method.append(source);
}

function renderLanguageSelector(){
 const host=document.querySelector('.languages');let select=host.querySelector('.language-select');
 if(!select){select=document.createElement('select');select.className='language-select';select.innerHTML='<option value="en">English</option><option value="es">Español</option><option value="pt">Português</option>';select.addEventListener('change',()=>setLanguage(select.value));host.append(select);}
 select.value=language;select.setAttribute('aria-label',['Language','Idioma','Idioma'][ix()]);
}
renderLanguageSelector();

function renderDurationStepper(){
 const select=document.getElementById('shift-duration');if(!select)return;
 const label=select.closest('.shift-duration');select.hidden=true;label.htmlFor='shift-duration-display';
 let row=label.querySelector('.duration-input-row');
 if(!row){
  row=document.createElement('div');row.className='time-input-row duration-input-row';row.innerHTML='<output id="shift-duration-display" aria-live="polite"></output><div class="time-stepper"><button type="button" data-duration-step="-1">−</button><button type="button" data-duration-step="1">+</button></div>';label.append(row);
  row.querySelectorAll('button').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();const next=Math.max(1,Math.min(24,(Number(select.value)||1)+Number(button.dataset.durationStep)));if(![...select.options].some(o=>Number(o.value)===next))select.add(new Option('',String(next)));select.value=String(next);select.dispatchEvent(new Event('change',{bubbles:true}));}));
 }
 const value=Number(select.value),locale=['en-US','es-US','pt-BR'][ix()];row.querySelector('output').textContent=value>0?new Intl.NumberFormat(locale,{style:'unit',unit:'hour',unitDisplay:'long'}).format(value):'—';
 row.querySelectorAll('button').forEach(button=>{const minus=button.dataset.durationStep==='-1';button.disabled=minus?value<=1:value>=24;button.setAttribute('aria-label',(minus?['Drive one hour less','Conducir una hora menos','Dirigir uma hora a menos']:['Drive one hour more','Conducir una hora más','Dirigir uma hora a mais'])[ix()]);});
}

// Presentation snapshot: model/output/ma-waltham.json, all three apps, dinner,
// median miles. Pay/kept remain sourced from the live multi-app result. Migrate
// this mileage field into the public scenario payload when the model exports it.
function configureWeekendExample(){
 const D=window.LOCAL_FIFTY_DATA, r=window.LocalFiftyMulti?.result(['doordash','ubereats','grubhub'],'dinner');
 if(!r||!window.LocalFiftyCalc)return;
 const miles=17.59, a=D.pay.assumptions, mpg=a.mpg.value, price=a.gas_price.value;
 const rate=window.LocalFiftyCalc.default_rate, deduction=window.LocalFiftyCalc.mileage_rate;
 const gas=Math.round(miles/mpg*price*100)/100, tax=Math.max(0,r.pay-miles*deduction)*rate/100;
 window.LocalFiftyCalc.miles_per_hour=miles;
 const locales=['en-US','es-US','pt-BR'], usd=(v,l)=>new Intl.NumberFormat(locales[l],{style:'currency',currency:'USD'}).format(v), nf=(v,l)=>new Intl.NumberFormat(locales[l],{maximumFractionDigits:3}).format(v);
 const intro=['One hour with DoorDash, Uber Eats and Grubhub on a Friday or Saturday dinner shift, 5–9 pm, in Waltham, waiting included. Accept one order at a time and pause the other apps while you deliver.','Una hora con DoorDash, Uber Eats y Grubhub en un turno de cena de viernes o sábado, de 5 a 9 pm, en Waltham, incluida la espera. Acepta un pedido a la vez y pausa las otras apps mientras entregas.','Uma hora com DoorDash, Uber Eats e Grubhub num turno de jantar de sexta ou sábado, das 17h às 21h, em Waltham, incluindo a espera. Aceite um pedido por vez e pause os outros apps enquanto entrega.'];
 const notes=[['Your combined app pay, including tips and waiting time.','Tu pago combinado de las apps, incluidas propinas y espera.','Seu ganho combinado dos apps, incluindo gorjetas e espera.'],['Gas only. Repairs, insurance and wear cost extra.','Solo gasolina. Las reparaciones, el seguro y el desgaste cuestan más.','Só combustível. Reparos, seguro e desgaste custam mais.'],['Money set aside using the example tax rate after the mileage deduction; your actual taxes may differ.','Dinero reservado con la tasa de ejemplo tras deducir las millas; tus impuestos reales pueden variar.','Valor reservado com a taxa do exemplo após a dedução por milhas; seus impostos reais podem variar.'],['What you keep after gas and tax money, before repairs, insurance and wear.','Lo que te queda después de gasolina y dinero para impuestos, antes de reparaciones, seguro y desgaste.','O que sobra após combustível e reserva para impostos, antes de reparos, seguro e desgaste.']];
 Object.assign(copy,{payVisualIntro:intro,moneyTag:['Three apps · weekend dinner · per hour','Tres apps · cena de fin de semana · por hora','Três apps · jantar de fim de semana · por hora'],heroNumberDetail:['Our three-app model combines offers from all three apps and accounts for waiting and switching between them. This is an estimate, not measured Waltham earnings.','Nuestro modelo combina ofertas de las tres apps y cuenta la espera y el cambio entre ellas. Es una estimación, no ganancias medidas en Waltham.','Nosso modelo combina ofertas dos três apps e considera a espera e a troca entre eles. É uma estimativa, não ganhos medidos em Waltham.'],calcSource:intro.map((x,l)=>x+' '+[
 `Starting numbers: ${usd(r.pay,l)} pay, ${usd(gas,l)} gas, and ${usd(tax,l)} for taxes per hour; ${nf(miles,l)} miles per hour, ${mpg} mpg and ${usd(price,l)} per gallon. Taxes use ${rate}% of pay after the $${deduction}-per-mile deduction. Four hours to start. This is a modeled estimate, not measured Waltham earnings.`,
 `Valores iniciales: ${usd(r.pay,l)} de pago, ${usd(gas,l)} de gasolina y ${usd(tax,l)} para impuestos por hora; ${nf(miles,l)} millas por hora, ${mpg} mpg y ${usd(price,l)} por galón. Impuestos: ${rate}% del pago tras deducir $${deduction} por milla. Cuatro horas al inicio. Es una estimación del modelo, no ganancias medidas en Waltham.`,
 `Valores iniciais: ${usd(r.pay,l)} de ganho, ${usd(gas,l)} de combustível e ${usd(tax,l)} para impostos por hora; ${nf(miles,l)} milhas por hora, ${mpg} mpg e ${usd(price,l)} por galão. Impostos: ${rate}% do ganho após deduzir $${nf(deduction,l)} por milha. Quatro horas inicialmente. É uma estimativa do modelo, não ganhos medidos em Waltham.`][l]),calcTaxHint:[`On pay minus $${deduction} per mile, at ${miles} miles an hour.`,`Sobre el pago menos $${deduction} por milla, a ${miles} millas por hora.`,`Sobre o ganho menos $${String(deduction).replace('.',',')} por milha, a ${String(miles).replace('.',',')} milhas por hora.`]});
 ['Pay','Gas','Tax','Keep'].forEach((key,i)=>{copy['money'+key+'Note']=notes[i];copy['money'+key+'Why']=notes[i];});
 window.LocalFiftyMoney={formulas(){const l=ix();return ['',`${nf(miles,l)} mi ÷ ${mpg} mpg × ${usd(price,l)}/gal`,`${rate}% × max(0, ${usd(r.pay,l)} − ${nf(miles,l)} mi × $${nf(deduction,l)})`,`${usd(r.pay,l)} − ${usd(gas,l)} − ${usd(tax,l)}`];}};
 document.querySelectorAll('.money-item').forEach((el,i)=>{const v=[r.pay,gas,tax,r.kept][i];el.querySelector('strong').textContent=usd(v,ix());el.style.setProperty('--share',(v/r.pay*100)+'%');});
 const form=document.getElementById('calculator');
 if(!form.dataset.weekendExample){[['pay-input',r.pay],['car-input',gas],['tax-input',rate],['hours-input',4]].forEach(([id,v])=>{const e=document.getElementById(id);e.value=v;e.defaultValue=v;});form.dataset.weekendExample='three-apps';}
}
