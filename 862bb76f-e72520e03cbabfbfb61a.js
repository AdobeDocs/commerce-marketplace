"use strict";(self.webpackChunkcommerce_marketplace=self.webpackChunkcommerce_marketplace||[]).push([[1233],{65480:function(e,s,t){t.d(s,{Z:function(){return U}});var a=t(35776),l=t(67293),o=t(94184),r=t.n(o),n=t(77503),i=t(68457),c=t(55733),d=t.n(c),p=t(80925),m=t.n(p),u=t(93162),g=t(53971);var v={name:"1a50hjl",styles:"border:none;padding:0;font-family:'adobe-clean';background:transparent;color:var(--spectrum-global-color-gray-800);text-decoration:underline;cursor:pointer;&:hover{color:var(--spectrum-global-color-gray-900);}"},y={name:"181f1kw",styles:"font-weight:700;color:var(--spectrum-global-color-gray-900)"},f={name:"wwrf8h",styles:"display:flex;flex-direction:column;gap:8px;width:80%"},x={name:"zjik7",styles:"display:flex"},w={name:"1gznmyj",styles:"color:var(--spectrum-global-color-gray-800);margin:2px 0;&:hover{color:var(--spectrum-global-color-gray-900);}"},h={name:"17fjgey",styles:"width:fit-content;margin-top:10px"},b={name:"omfma2",styles:"position:absolute;bottom:25px;top:unset;white-space:nowrap"},Z={name:"17jxmzm",styles:"border:1px solid var(--spectrum-global-color-gray-400);border-radius:3px;padding:3px 6px"},k={name:"5uruvs",styles:"font-family:Source Code Pro,Monaco,monospace;white-space:normal;overflow-wrap:anywhere;max-width:300px"},C={name:"1llzu2n",styles:"display:flex;align-items:center;gap:24px"},z={name:"3w0yoi",styles:"display:flex;flex-direction:column;gap:8px"},N={name:"43cxha",styles:"display:flex;flex-direction:column;gap:32px"},S={name:"znjkts",styles:"margin:0;border:none;border-top:1px solid #D0D0D0!important"},B={name:"zwbqmk",styles:"display:flex;gap:20px;align-items:center"},j={name:"1xr24iu",styles:"padding:5%;display:flex;flex-direction:column;gap:24px;border:1px solid var(--spectrum-global-color-gray-200);border-radius:8px"},D={name:"1swkvfk",styles:"padding:0;font-family:'adobe-clean';border:none;background:transparent;margin-left:10px;cursor:pointer;text-decoration:underline;color:rgb(0, 84, 182);&:hover{color:rgb(2, 101, 220);}"},I={name:"1f2v555",styles:"color:var(--spectrum-global-color-gray-900)"},P={name:"1f2v555",styles:"color:var(--spectrum-global-color-gray-900)"},A={name:"ti75j2",styles:"margin:0"},M={name:"a29rn1",styles:"display:flex;text-align:center;align-items:center;gap:10px"},E={name:"181f1kw",styles:"font-weight:700;color:var(--spectrum-global-color-gray-900)"},H={name:"1xg43bt",styles:"display:flex;gap:20px;align-items:baseline"},T={name:"budh8k",styles:"display:flex;flex-direction:column;gap:16px"};const U=e=>{var s,t;let{credentialProps:o,formData:c,setShowCreateForm:p,setShowCredential:$,organizationName:F,response:O,orgID:_}=e;const{0:L,1:R}=(0,a.useState)(null),{0:J,1:K}=(0,a.useState)({}),{0:X,1:q}=(0,a.useState)(),{0:G,1:W}=(0,a.useState)(""),Q=[{key:"API Key",value:O.apiKey},{key:"Allowed domains",value:c.AllowedOrigins},{key:"Organization",value:F}];(0,a.useEffect)((()=>{var e;const s=null===(e=localStorage)||void 0===e?void 0:e.getItem("OrgInfo");s?K(JSON.parse(s)):(0,i.Xu)(K),c.Downloads&&se(`/console/api/organizations/${_}/projects/${O.projectId}/workspaces/${O.workspaceId}/download`,c.Download,c.zipUrl)}),[]);const V=null==o?void 0:o[U],Y=`/console/projects/${null==J?void 0:J.id}/${O.projectId}/overview`,ee=()=>{R(null)},se=async function(e,s,t){void 0===s&&(s="download");try{var a,l,o,r,n;const i=await m().getBinaryContent(t),c=new Uint8Array(i).buffer,p=new(d());q(!0),await p.loadAsync(c);const g={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+(null===(a=window.adobeIMS)||void 0===a||null===(l=a.getTokenFromStorage())||void 0===l?void 0:l.token),"x-api-key":null===(o=window)||void 0===o||null===(r=o.adobeIMS)||void 0===r||null===(n=r.adobeIdData)||void 0===n?void 0:n.client_id}},v=await fetch(e,g);if(200===v.status){const e=await v.json();p.file("credential.json",JSON.stringify(e));const t=await p.generateAsync({type:"blob"});(0,u.saveAs)(t,`${s}.zip`)}else console.error("Failed to fetch additional data. Response status:",v.status)}catch(i){console.error("An error occurred:",i)}finally{q(!1)}};return(0,l.tZ)("div",{className:r()(null==V?void 0:V.className),css:T},(0,l.tZ)("div",{className:r()(null==V?void 0:V.className),css:(0,l.iv)("display:flex;flex-direction:column;gap:16px;color:var(--spectrum-global-color-gray-800);width:100%;height:100%;text-align:left;@media screen and (min-width:",i.xU,") and (max-width:",i.Ey,"){padding:0;width:100%;}","")},(0,l.tZ)("div",{css:H},(null==V?void 0:V.title)&&(0,l.tZ)("h2",{className:"spectrum-Heading spectrum-Heading--sizeL",css:E},null==V?void 0:V.title),X&&(0,l.tZ)("div",{css:M},(0,l.tZ)("div",{class:"spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--small"},(0,l.tZ)("div",{class:"spectrum-ProgressCircle-track"}),(0,l.tZ)("div",{class:"spectrum-ProgressCircle-fills"},(0,l.tZ)("div",{class:"spectrum-ProgressCircle-fillMask1"},(0,l.tZ)("div",{class:"spectrum-ProgressCircle-fillSubMask1"},(0,l.tZ)("div",{class:"spectrum-ProgressCircle-fill"}))),(0,l.tZ)("div",{class:"spectrum-ProgressCircle-fillMask2"},(0,l.tZ)("div",{class:"spectrum-ProgressCircle-fillSubMask2"},(0,l.tZ)("div",{class:"spectrum-ProgressCircle-fill"}))))),(0,l.tZ)("p",{css:A},"Downloading..."))),c.Downloads&&(null==V?void 0:V.paragraph)&&(0,l.tZ)("p",{className:"spectrum-Body spectrum-Body--sizeL",css:P},null==V?void 0:V.paragraph),c.Downloads&&(0,l.tZ)("p",{className:"spectrum-Body spectrum-Body--sizeS",css:I},"Download not working?",(0,l.tZ)("button",{css:D,onClick:()=>se(`/console/api/organizations/${null==J?void 0:J.id}/projects/${O.projectId}/workspaces/${O.workspaceId}/download`,c.Download,c.zipUrl)},"Restart download"))),(0,l.tZ)("div",{css:(0,l.iv)("display:flex;gap:35px;@media screen and (min-width:",i.xU,") and (max-width:",i.Ey,"){flex-direction:column;padding-left:0;}","")},(0,l.tZ)("div",{css:(0,l.iv)("display:flex;flex-direction:column;gap:35px;width:50%;@media screen and (min-width:",i.xU,") and (max-width:",i.Ey,"){width:100%;}","")},(0,l.tZ)("div",{css:(0,l.iv)("background:white;border-radius:8px;width:90%;@media screen and (min-width:",i.xU,") and (max-width:",i.Ey,"){width:100%;}","")},(0,l.tZ)("div",{css:j},(0,l.tZ)("div",{css:B},(0,l.tZ)(i._m,null),(0,l.tZ)("h3",{className:"spectrum-Heading spectrum-Heading--sizeM"},c.CredentialName)),(0,l.tZ)("hr",{css:S}),(0,l.tZ)("div",{css:N},null==Q?void 0:Q.map(((e,s)=>{let{key:t,value:o}=e;return(0,l.tZ)(a.default.Fragment,null,o&&(0,l.tZ)(a.default.Fragment,null,(0,l.tZ)("div",{css:z},(0,l.tZ)("h4",{className:"spectrum-Heading spectrum-Heading--sizeS"},t),(0,l.tZ)("div",{css:C},(0,l.tZ)("p",{className:"spectrum-Body spectrum-Body--sizeS",css:k},o),(0,l.tZ)("div",{css:(0,l.iv)("position:relative;display:","Organization"===t?"none":"block",";","")},(0,l.tZ)("button",{className:"spectrum-ActionButton spectrum-ActionButton--sizeM",onMouseEnter:()=>R(s),onMouseLeave:ee,onClick:()=>(e=>{navigator.clipboard.writeText(e),W(!0)})(o),css:Z},(0,l.tZ)("span",{className:"spectrum-ActionButton-label"},(0,l.tZ)(i.TI,null))),L===s&&(0,l.tZ)("span",{className:"spectrum-Tooltip spectrum-Tooltip--top is-open",css:b},(0,l.tZ)("span",{className:"spectrum-Tooltip-label"},"Copy"),(0,l.tZ)("span",{className:"spectrum-Tooltip-tip"})))))))})),(0,l.tZ)("div",{css:(0,l.iv)("display:flex;gap:24px;align-items:end;@media screen and (min-width:",i.xU,") and (max-width:",i.Ey,"){flex-direction:column;align-items:start;}","")},(0,l.tZ)("a",{href:null==V?void 0:V.nextStepsHref,target:"_blank",rel:"noreferrer"},(0,l.tZ)("button",{className:"spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM",css:h},(0,l.tZ)("span",{className:"spectrum-Button-label"},null==V?void 0:V.nextStepsLabel))),(0,l.tZ)("a",{href:Y,target:"_blank",rel:"noreferrer",css:w},(0,l.tZ)("div",{css:x},(0,l.tZ)("div",null,null==V?void 0:V.developerConsoleManage),(0,l.tZ)("div",{css:(0,l.iv)("margin-left:10px;@media screen and (min-width:",i.xU,") and (max-width:",i.Ey,"){display:none;}","")},(0,l.tZ)(i.AW,null)))))))),(0,l.tZ)("div",{css:f},(0,l.tZ)("h4",{className:"spectrum-Heading spectrum-Heading--sizeXS",css:y},"Need another credential"),(0,l.tZ)("p",{className:"spectrum-Body spectrum-Body--sizeS"},(0,l.tZ)("button",{onClick:()=>{p(!0),$(!1)},css:v},"Restart and create a new credential")))),null!=V&&V.children?(0,l.tZ)(n.cI,{sideContent:null==V||null===(s=V.children)||void 0===s||null===(t=s.props)||void 0===t?void 0:t.children}):null),G&&(0,l.tZ)(g.F,{variant:"success",message:"Copied to clipboard",disable:1e3,customDisableFunction:W}))}}}]);
//# sourceMappingURL=862bb76f-e72520e03cbabfbfb61a.js.map