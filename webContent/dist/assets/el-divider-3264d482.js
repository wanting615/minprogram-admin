import{b as c,d as p,u,_ as m,e as v}from"./base-295e6725.js";import{d as n,m as f,o as s,c as o,q as i,b as r,h as y,s as S,U as _}from"./index-8e5c6ca0.js";const b=c({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:p(String),default:"solid"}}),h=n({name:"ElDivider"}),g=n({...h,props:b,setup(a){const l=a,e=u("divider"),d=f(()=>e.cssVar({"border-style":l.borderStyle}));return(t,P)=>(s(),o("div",{class:i([r(e).b(),r(e).m(t.direction)]),style:_(r(d)),role:"separator"},[t.$slots.default&&t.direction!=="vertical"?(s(),o("div",{key:0,class:i([r(e).e("text"),r(e).is(t.contentPosition)])},[y(t.$slots,"default")],2)):S("v-if",!0)],6))}});var k=m(g,[["__file","/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);const E=v(k);export{E};
