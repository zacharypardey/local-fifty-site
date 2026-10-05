'use strict';
// Base and presentation copy. The data layer supplies scenario-specific copy.
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


Object.assign(copy, {
  "riverFallback": [
    "Charles River",
    "Río Charles",
    "Rio Charles"
  ],
  "documentTitlePrefix": [
    "Local Fifty — Delivery driving in ",
    "Local Fifty — Reparto de comida en ",
    "Local Fifty — Entregas de comida em "
  ],
  "timeEarlier": [
    "One hour earlier",
    "Una hora antes",
    "Uma hora antes"
  ],
  "timeLater": [
    "One hour later",
    "Una hora después",
    "Uma hora depois"
  ],
  "shiftDurationLabel": [
    "How long will you drive?",
    "¿Cuánto tiempo vas a repartir?",
    "Por quanto tempo vai entregar?"
  ],
  "shiftMoreTitle": [
    "Do more deliveries",
    "Haz más entregas",
    "Faça mais entregas"
  ],
  "shiftEstimatePending": [
    "Delivery estimate coming soon.",
    "La estimación de entregas estará disponible pronto.",
    "A estimativa de entregas estará disponível em breve."
  ],
  "goalSavingsTitle": [
    "How long to reach my savings goal?",
    "¿Cuánto tardaré en alcanzar mi meta de ahorro?",
    "Quanto tempo para alcançar minha meta de economia?"
  ],
  "walthamRequirementsSummary": [
    "In Waltham: 18+ for DoorDash and Grubhub. Uber Eats: 19+ by car, 18+ by bike.",
    "En Waltham: 18+ para DoorDash y Grubhub. Uber Eats: 19+ en auto, 18+ en bicicleta.",
    "Em Waltham: 18+ para DoorDash e Grubhub. Uber Eats: 19+ de carro, 18+ de bicicleta."
  ],
  "vehicleAgeLabel": [
    "Age",
    "Edad",
    "Idade"
  ],
  "vehicleDoorsLabel": [
    "doors",
    "puertas",
    "portas"
  ],
  "shiftStartLabel": [
    "When will you start?",
    "¿A qué hora empiezas?",
    "A que horas vai começar?"
  ],
  "goalStartToday": [
    "Start today",
    "Empieza hoy",
    "Comece hoje"
  ],
  "goalEstimatedFinish": [
    "Estimated finish",
    "Fecha estimada",
    "Data estimada"
  ],
  "compareAppsCta": [
    "Compare apps",
    "Comparar apps",
    "Comparar apps"
  ],
  "stepArtAlt1": [
    "Phone with a delivery order",
    "Teléfono con un pedido",
    "Celular com um pedido"
  ],
  "stepArtAlt2": [
    "Restaurant pickup",
    "Recogida en un restaurante",
    "Retirada no restaurante"
  ],
  "stepArtAlt3": [
    "Delivery car",
    "Auto de reparto",
    "Carro de entrega"
  ],
  "stepArtAlt4": [
    "Food at a doorstep",
    "Comida en la puerta",
    "Comida na porta"
  ],
  "mapZoom1": [
    "Zoom in",
    "Acercar",
    "Aproximar"
  ],
  "mapZoom2": [
    "Zoom out",
    "Alejar",
    "Afastar"
  ],
  "heroArtFallback": [
    "Watercolor delivery route across a bridge in {town}, {state}",
    "Ruta de reparto en acuarela por un puente en {town}, {state}",
    "Rota de entrega em aquarela por uma ponte em {town}, {state}"
  ],
  "mapArtFallback": [
    "Watercolor street map of {town}, {state}, and {river}",
    "Mapa en acuarela de {town}, {state}, y {river}",
    "Mapa em aquarela de {town}, {state}, e {river}"
  ],
  "vehicleNameCar": [
    "Car",
    "Auto",
    "Carro"
  ],
  "vehicleNameScooter": [
    "Scooter",
    "Scooter",
    "Scooter"
  ],
  "vehicleNameBike": [
    "Bike",
    "Bicicleta",
    "Bicicleta"
  ],
  "vehicleNameMotorcycle": [
    "Motorcycle",
    "Moto",
    "Moto"
  ],
  "vehicleNoteDoordash": [
    "Waltham bike and scooter signup: not confirmed.",
    "Registro en Waltham con bicicleta o scooter: sin confirmar.",
    "Cadastro em Waltham com bicicleta ou scooter: não confirmado."
  ],
  "vehicleNoteGrubhub": [
    "Waltham bike and scooter signup: not confirmed. Cars and motorcycles are accepted in all delivery areas.",
    "Registro en Waltham con bicicleta o scooter: sin confirmar. Autos y motos se aceptan en todas las zonas.",
    "Cadastro em Waltham com bicicleta ou scooter: não confirmado. Carros e motos são aceitos em todas as áreas."
  ]
});

Object.assign(copy, {
 navScrollBack: ['Show earlier sections', 'Ver secciones anteriores', 'Ver seções anteriores'],
 navScrollForward: ['Show more sections', 'Ver más secciones', 'Ver mais seções']
});
