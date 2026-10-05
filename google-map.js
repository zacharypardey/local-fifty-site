'use strict';
// Google Maps is optional; keep the area guide usable if configuration or loading fails.
window.LocalFiftyGoogleMap = (() => {
 let loading, map, layers=[], latest, selected, observer, host;
 const api={active:false,failed:false,render,select};
 const styles=[
  {elementType:'geometry',stylers:[{color:'#f3f1e8'}]},
  {elementType:'labels.text.fill',stylers:[{color:'#596451'}]},
  {elementType:'labels.text.stroke',stylers:[{color:'#fffdf7'}]},
  {featureType:'poi',elementType:'labels',stylers:[{visibility:'off'}]},
  {featureType:'poi.park',elementType:'geometry',stylers:[{color:'#dce8d0'}]},
  {featureType:'road',elementType:'geometry',stylers:[{color:'#fffdf7'}]},
  {featureType:'road',elementType:'geometry.stroke',stylers:[{color:'#dedccf'}]},
  {featureType:'road.highway',elementType:'geometry',stylers:[{color:'#e8d8b6'}]},
  {featureType:'transit',stylers:[{visibility:'off'}]},
  {featureType:'water',elementType:'geometry',stylers:[{color:'#c4dce0'}]}
 ];
 function fail(){
  if(api.failed)return;api.failed=true;api.active=false;
  observer?.disconnect();layers.forEach(({circle,marker})=>{circle.setMap(null);marker.setMap(null);});layers=[];
  if(map)google.maps.event.clearInstanceListeners(map);
  host?.remove();host=null;map=null;latest?.onFailure();
 }
 function load(){
  if(loading)return loading;
  loading=new Promise((resolve,reject)=>{
   if(window.google?.maps?.Map){resolve();return;}
   window.gm_authFailure=()=>{fail();reject(new Error('Google Maps authorization failed'));};
   window.localFiftyGoogleReady=()=>resolve();
   const script=document.createElement('script');
   const params=new URLSearchParams({key:LOCAL_FIFTY_MAPS_CONFIG.googleMapsApiKey,loading:'async',callback:'localFiftyGoogleReady',v:'quarterly',language:latest.language,region:'US'});
   script.src='https://maps.googleapis.com/maps/api/js?'+params;script.async=true;
   script.onerror=()=>reject(new Error('Google Maps could not load'));document.head.append(script);
  });return loading;
 }
 function fit(){
  if(!map||!layers.length)return;
  const bounds=new google.maps.LatLngBounds();layers.forEach(({circle})=>bounds.union(circle.getBounds()));map.fitBounds(bounds,36);
 }
 function createMarker(position,index){
  class AreaMarker extends google.maps.OverlayView {
   onAdd(){
    this.button=document.createElement('button');this.button.type='button';this.button.className='google-area-marker';this.button.textContent=String(index+1);
    this.button.setAttribute('aria-controls','map-detail');this.button.addEventListener('click',()=>latest.onSelect(index+1));
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.button);this.getPanes().overlayMouseTarget.append(this.button);
   }
   draw(){const point=this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(position));if(point){this.button.style.left=point.x+'px';this.button.style.top=point.y+'px';}}
   onRemove(){this.button?.remove();}
  }
  const marker=new AreaMarker();marker.setMap(map);return marker;
 }
 function updateLabels(){
  const language=latest.language,ix={en:0,es:1,pt:2}[language]??0,frame=document.querySelector('.watercolor-map');
  frame.classList.add('street-map-frame');frame.querySelector('.map-topline .eyebrow').textContent=t('mapEyebrow');
  frame.querySelector('.map-art-caption').textContent=t('mapChoose');
  document.querySelector('[data-t="mapSource"]').textContent=t('mapCreditGoogle');
  const link=document.querySelector('.map-source-link');link.href='https://maps.google.com/?q='+latest.zones[0].center.lat+','+latest.zones[0].center.lng;link.textContent=['Open in Google Maps ↗','Abrir en Google Maps ↗','Abrir no Google Maps ↗'][ix];
  host.setAttribute('aria-label',['Map of pickup areas','Mapa de áreas de recogida','Mapa de áreas de retirada'][ix]);
  layers.forEach(({marker},i)=>{if(marker.button){marker.button.title=latest.labels[i];marker.button.setAttribute('aria-label',(i+1)+'. '+latest.labels[i]);}});
 }
 async function render(options){
  latest=options;
  try{
   await load();if(api.failed)return;
   if(!map){
    host=document.createElement('div');host.id='pickup-street-map';host.className='google-pickup-map';
    const frame=document.querySelector('.watercolor-map');frame.classList.add('street-map-frame');frame.querySelector('.map-topline').after(host);
    map=new google.maps.Map(host,{center:latest.zones[0].center,zoom:13,isFractionalZoomEnabled:true,styles,cameraControl:false,gestureHandling:'cooperative',mapTypeControl:false,streetViewControl:false,fullscreenControl:false,zoomControl:true,clickableIcons:false});
    layers=latest.zones.map((zone,i)=>{
     const circle=new google.maps.Circle({map,center:zone.center,radius:zone.radius_m,clickable:true});circle.addListener('click',()=>latest.onSelect(i+1));
     return {circle,marker:createMarker(zone.center,i)};
    });
    fit();observer=new ResizeObserver(fit);observer.observe(host);
    google.maps.event.addListenerOnce(map,'idle',()=>{updateLabels();select(latest.selected);});
   }
   api.active=true;updateLabels();select(latest.selected);
  }catch{fail();}
 }
 function select(id){
  if(!map)return;
  layers.forEach(({circle,marker},i)=>{
   const active=i+1===id;circle.setOptions({strokeColor:active?'#285a46':'#a17d44',fillColor:active?'#789766':'#c9a569',fillOpacity:active?.28:.14,strokeWeight:active?3:2});
   if(marker.button){marker.button.classList.toggle('selected',active);marker.button.setAttribute('aria-pressed',String(active));}
  });
  const position=latest.zones[id-1]?.center;if(selected!==id&&position&&map.getBounds()&&!map.getBounds().contains(position))map.panTo(position);
  selected=id;
 }
 return api;
})();
