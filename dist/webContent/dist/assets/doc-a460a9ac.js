import{aa as t,a6 as o}from"./index-8e5c6ca0.js";const r=()=>t.get(o.docTypeList),p=e=>t.post(o.addDocType,{...e}),n=e=>t.post(o.updateDocType,{...e}),d=(e,c)=>t.get(o.enableDocType,{id:e,disabled:c}),D=e=>t.post(o.addDoc,e),u=e=>t.post(o.updateDoc,e),y=e=>t.get(o.delDoc,{id:e}),g=e=>t.get(o.getDocById,{id:e}),T=(e,c,s)=>t.get(o.getDocByType,{type:e,contentType:c,page:s});export{T as a,g as b,D as c,y as d,d as e,n as f,r as g,p as h,u};
