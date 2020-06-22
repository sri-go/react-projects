(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{12:function(e,a,t){e.exports=t(26)},17:function(e,a,t){},24:function(e,a,t){},26:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(8),o=t.n(l),r=(t(17),t(5)),s=t.n(r),i=t(9),m=t(2),u=t(6);function d(e){return c.a.createElement("div",{className:"control"},c.a.createElement("button",{className:"button",onClick:function(){e.onClick[1]()}},c.a.createElement(u.a,{icon:["fas","location-arrow"]})),c.a.createElement("input",{style:{width:"50%"},className:"input",placeholder:"Enter Location",value:e.location,onChange:function(a){e.onChange(a)},name:"location"}),c.a.createElement("button",{className:"button",onClick:function(){e.onClick[0]()}},c.a.createElement(u.a,{icon:["fas","search"]})))}function p(e){var a=e.weather;return void 0===typeof a?c.a.createElement("div",null,"Loading"):c.a.createElement("div",{className:"detailsWrapper"},c.a.createElement("div",{className:"details"},c.a.createElement("div",{className:"wind"},c.a.createElement("span",{className:"label"},"Wind:"),c.a.createElement("span",null,a.wind_speed.value," ",a.wind_speed.units)),c.a.createElement("div",{className:"humidity"},c.a.createElement("span",{className:"label"},"Humidity:"),c.a.createElement("span",null,a.humidity.value," ",a.humidity.units)),c.a.createElement("div",{className:"dew_point"},c.a.createElement("span",{className:"label"},"Dew Point:"),c.a.createElement("span",null,a.dewpoint.value," ",a.dewpoint.units)),c.a.createElement("div",{className:"visibility"},c.a.createElement("span",{className:"label"},"Visibility:"),c.a.createElement("span",null,a.weather_code.value)),c.a.createElement("div",{className:"pressure"},c.a.createElement("span",{className:"label"},"Pressure:"),c.a.createElement("span",null,a.baro_pressure.value," ",a.baro_pressure.units))))}function v(e){var a,t=e.weather,n=void 0;n=void 0===typeof t,a=e.date.getHours()>18?"_night":"_day";var l;return n?c.a.createElement("div",null," Loading "):(l=l=["partly_cloudy","mostly_clear","clear"].includes(t.weather_code.value)?"".concat("Assets/color","/").concat(t.weather_code.value).concat(a,".svg"):"".concat("Assets/color","/").concat(t.weather_code.value,".svg"),c.a.createElement("div",{className:"center"},c.a.createElement("div",{className:"title"},c.a.createElement("span",{className:"currently"},c.a.createElement("span",{className:"icon"},c.a.createElement("img",{src:l,alt:"product"})),c.a.createElement("span",{className:"description"},c.a.createElement("span",{className:"summary"},c.a.createElement("span",{className:"label"},"Temperature:"),c.a.createElement("span",null,t.temp.value," \xb0",t.temp.units)),c.a.createElement("span",{className:"summary-high-low"},c.a.createElement("span",{className:"label"},"Feels Like:"),c.a.createElement("span",null,t.feels_like.value," \xb0",t.feels_like.units)))))))}function f(e){console.log("Assets/color");var a,t=e.data;a=a=["partly_cloudy","mostly_clear","clear"].includes(t.weather_code.value)?"".concat("Assets/color","/").concat(t.weather_code.value,"_day.svg"):"".concat("Assets/color","/").concat(t.weather_code.value,".svg");var n=new Date(Date.parse(t.observation_time.value)).toDateString().split(" ")[0];return c.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",margin:".5em 0em"}},c.a.createElement("div",null,n),c.a.createElement("div",null,c.a.createElement("span",{className:"icon"},c.a.createElement("img",{src:a,alt:"product"}))),c.a.createElement("div",null,"Min: ",t.temp[0].min.value," \xb0",t.temp[0].min.units,c.a.createElement("br",null),"Max: ",t.temp[1].max.value," \xb0",t.temp[1].max.units))}function E(e){var a=e.weather.map((function(e,a){return c.a.createElement(f,{data:e,key:a,id:a})}));return void 0===typeof e.weather?c.a.createElement("div",null,"1 "):a}var h=t(10),w=t.n(h);function g(e){return console.log("x",e.location[1]),console.log("y",e.location[0]),c.a.createElement(w.a,{lat:e.location[1],lng:e.location[0],zoom:10,mapField:"precip"})}var y=t(3),b=t(11);t(24),t(25);function N(){var e=Object(n.useState)(void 0),a=Object(m.a)(e,2),t=a[0],l=a[1],o=Object(n.useState)(""),r=Object(m.a)(o,2),u=r[0],f=r[1],h=Object(n.useState)(void 0),w=Object(m.a)(h,2),y=w[0],b=w[1],N=Object(n.useState)([40.741621,-73.99353]),_=Object(m.a)(N,2),k=_[0],j=_[1],D=Object(n.useState)(),O=Object(m.a)(D,2),A=O[0],x=O[1];return Object(n.useEffect)((function(){var e,a;console.log(k),e=k[0],a=k[1],function(){var t=Object(i.a)(s.a.mark((function t(){var n,c,o;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=new Date,x(n),n.setDate(n.getDate()+7),n=n.toISOString(),t.next=6,fetch("https://api.climacell.co/v3/weather/realtime?lat=".concat(e,"&lon=").concat(a,"&unit_system=us&fields%5B%5D=temp&fields%5B%5D=feels_like&fields%5B%5D=baro_pressure&fields%5B%5D=wind_speed&fields%5B%5D=dewpoint&fields%5B%5D=humidity&fields%5B%5D=weather_code&apikey=WgGx8VA8VQUANapmJ6AkIEmObMfbWt9d")).then((function(e){return e.json()})).catch((function(e){return console.log(e)}));case 6:return c=t.sent,t.next=9,fetch("https://api.climacell.co/v3/weather/forecast/daily?lat=".concat(e,"&lon=").concat(a,"&end_time=").concat(n,"&fields%5B%5D=temp&fields%5B%5D=weather_code&unit_system=us&apikey=WgGx8VA8VQUANapmJ6AkIEmObMfbWt9d")).then((function(e){return e.json()})).catch((function(e){return console.log(e)}));case 9:o=t.sent,b({day:c,week:o}),l(!0);case 13:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[k]),c.a.createElement("div",{className:"App"},c.a.createElement(d,{location:u,onChange:function(e){f(e.target.value)},onClick:[function(){l(!1),fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(u,".json?access_token=pk.eyJ1Ijoic3JpLWdvIiwiYSI6ImNrODUyeHp1YjAyb2wzZXA4b21veGhqdjgifQ.wprAUOeXWkoWy1-nbUd1NQ")).then((function(e){return e.json()})).then((function(e){var a=e.features[0].center[1],t=e.features[0].center[0];j([a,t])})).catch((function(e){return console.log(e)}))},function(){l(!1),navigator.geolocation.getCurrentPosition((function(e){var a=e.coords.latitude,t=e.coords.longitude;j([a,t]),console.log(a,t)}))}]}),t?c.a.createElement("div",null,c.a.createElement("div",{className:"main-info"},c.a.createElement(p,{weather:y.day}),c.a.createElement(v,{weather:y.day,date:A})),c.a.createElement("div",{className:"map"},c.a.createElement(g,{location:k})),c.a.createElement("div",{className:"week-info"},c.a.createElement(E,{weather:y.week}))):c.a.createElement("div",{div:!0,style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}},"Loading"))}y.b.add(b.a);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));console.log("public url: ","Assets/color"),o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.ab75b61b.chunk.js.map