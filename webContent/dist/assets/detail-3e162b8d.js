import{b as K,d as Q,C as X,a as q,u as Z,D as ee,F as M,c as te,t as oe,G as ae,_ as se,e as le}from"./base-295e6725.js";import{e as ne}from"./el-popper-5757448a.js";import{a as ie,E as re}from"./el-form-item-aaab0f09.js";import{C as de,E as D,b as ue,a as ce}from"./el-input-c1d1c214.js";import"./el-scrollbar-555f0517.js";import{E as pe,a as fe}from"./el-select-148a9d71.js";import{d as A,$ as U,a as S,m as O,I as me,j as W,O as _e,o as i,c as p,A as h,h as j,q as R,b as B,U as L,t as V,e as n,w as r,x as ve,u as ge,r as P,z as he,F,g as H,s as c,n as T,E as ye,C as Ee,D as be}from"./index-8e5c6ca0.js";import{g as xe}from"./scroll-c996a468.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";import{g as we,b as ke,u as Te,c as Ve}from"./doc-a460a9ac.js";import"./index-3223a3e0.js";const Se=K({zIndex:{type:Q([Number,String]),default:100},target:{type:String,default:""},offset:{type:Number,default:0},position:{type:String,values:["top","bottom"],default:"top"}}),Ce={scroll:({scrollTop:u,fixed:f})=>X(u)&&q(f),[de]:u=>q(u)},Y="ElAffix",$e=A({name:Y}),Ne=A({...$e,props:Se,emits:Ce,setup(u,{expose:f,emit:b}){const e=u,t=Z("affix"),v=U(),y=U(),_=U(),{height:E}=ee(),{height:g,width:x,top:C,bottom:$,update:a}=M(y,{windowScroll:!1}),o=M(v),l=S(!1),w=S(0),m=S(0),k=O(()=>({height:l.value?`${g.value}px`:"",width:l.value?`${x.value}px`:""})),N=O(()=>{if(!l.value)return{};const s=e.offset?te(e.offset):0;return{height:`${g.value}px`,width:`${x.value}px`,top:e.position==="top"?s:"",bottom:e.position==="bottom"?s:"",transform:m.value?`translateY(${m.value}px)`:"",zIndex:e.zIndex}}),I=()=>{if(_.value)if(w.value=_.value instanceof Window?document.documentElement.scrollTop:_.value.scrollTop||0,e.position==="top")if(e.target){const s=o.bottom.value-e.offset-g.value;l.value=e.offset>C.value&&o.bottom.value>0,m.value=s<0?s:0}else l.value=e.offset>C.value;else if(e.target){const s=E.value-o.top.value-e.offset-g.value;l.value=E.value-e.offset<$.value&&E.value>o.top.value,m.value=s<0?-s:0}else l.value=E.value-e.offset<$.value},z=()=>{a(),b("scroll",{scrollTop:w.value,fixed:l.value})};return me(l,s=>b("change",s)),W(()=>{var s;e.target?(v.value=(s=document.querySelector(e.target))!=null?s:void 0,v.value||oe(Y,`Target is not existed: ${e.target}`)):v.value=document.documentElement,_.value=xe(y.value,!0),a()}),ae(_,"scroll",z),_e(I),f({update:I,updateRoot:a}),(s,d)=>(i(),p("div",{ref_key:"root",ref:y,class:R(B(t).b()),style:L(B(k))},[h("div",{class:R({[B(t).m("fixed")]:l.value}),style:L(B(N))},[j(s.$slots,"default")],6)],6))}});var Ie=se(Ne,[["__file","/home/runner/work/element-plus/element-plus/packages/components/affix/src/affix.vue"]]);const De=le(Ie);const Be={class:"app-header"},Fe={class:"header-title"},He={class:"detail-btn"},Ae=A({__name:"app-header",props:{headerTitle:{}},setup(u){return(f,b)=>{const e=De;return i(),p("div",Be,[h("span",Fe,V(f.headerTitle),1),n(e,{offset:56},{default:r(()=>[h("div",He,[j(f.$slots,"default",{},void 0,!0)])]),_:3})])}}});const ze=G(Ae,[["__scopeId","data-v-d1e65571"]]),J=u=>(Ee("data-v-65aa94d6"),u=u(),be(),u),Ue={class:"warp-block"},qe=J(()=>h("div",{class:"warp-block-title"},"文档基本信息",-1)),Me={key:1},Oe={key:1},Re={key:1},Le={key:1},Pe={class:"warp-block"},We=J(()=>h("div",{class:"warp-block-title"},"文档内容",-1)),je=A({__name:"detail",setup(u){const f=ve(),b=ge(),e=P({title:"",type:void 0,contentType:"",content:"",autor:""}),t=P({id:f.params.id,isEdit:!1,editorHeight:"auto"}),v=S([]);we().then(a=>{v.value=a.data}),W(()=>{t.id!=="new"?y():_()});const y=()=>{ke(Number(f.params.id)).then(a=>{a.status&&$(a.data)})},_=()=>{t.editorHeight=window.innerHeight-345+"px",t.isEdit=!0},E=()=>{if(t.id==="new")return g();t.editorHeight="auto",y(),t.isEdit=!1},g=()=>{b.back()},x=S(),C=()=>{x.value.validate(a=>{a&&(t.id!=="new"?Te(Object.assign(e,{id:t.id})).then(o=>{o.status?(t.isEdit=!1,D({message:o.message,type:"success"})):D({message:o.message,type:"warning"})}):Ve(e).then(o=>{o.status?(t.id=String(o.data.id),t.isEdit=!1,D({message:o.message,type:"success"})):D({message:o.message,type:"warning"})}))})},$=a=>{e.title=a.title,e.type=a.type,e.contentType=a.contentType,e.content=a.content,e.autor=a.autor};return(a,o)=>{const l=ue,w=ce,m=ie,k=pe,N=fe,I=re,z=he("v-md-editor"),s=ne;return i(),p(F,null,[n(ze,{"header-title":t.id==="new"?"新建文档":t.isEdit?"编辑文档":"文档详情"},{default:r(()=>[t.isEdit?c("",!0):(i(),p(F,{key:0},[n(l,{round:"",onClick:g},{default:r(()=>[H("返回")]),_:1}),n(l,{type:"primary",round:"",onClick:_},{default:r(()=>[H("编辑")]),_:1})],64)),t.isEdit?(i(),p(F,{key:1},[n(l,{round:"",onClick:E},{default:r(()=>[H("取消")]),_:1}),n(l,{type:"primary",round:"",onClick:C},{default:r(()=>[H("提交")]),_:1})],64)):c("",!0)]),_:1},8,["header-title"]),n(s,{style:{padding:"0","margin-top":"10px"}},{default:r(()=>[h("div",Ue,[qe,n(I,{model:e,"label-width":"80px",ref_key:"dataFormEl",ref:x,inline:!0},{default:r(()=>[n(m,{label:"文档名称",prop:"title",placeholder:"请输入",rules:[{required:!0,message:"文档名称不能为空"}]},{default:r(()=>[t.isEdit?(i(),T(w,{key:0,modelValue:e.title,"onUpdate:modelValue":o[0]||(o[0]=d=>e.title=d)},null,8,["modelValue"])):c("",!0),t.isEdit?c("",!0):(i(),p("span",Me,V(e.title),1))]),_:1}),n(m,{label:"文档类型",prop:"type",rules:[{required:!0,message:"请选择文档类型"}]},{default:r(()=>[t.isEdit?(i(),T(N,{key:0,modelValue:e.type,"onUpdate:modelValue":o[1]||(o[1]=d=>e.type=d),placeholder:"请选择文档类型"},{default:r(()=>[(i(!0),p(F,null,ye(v.value,d=>(i(),T(k,{label:d.name,value:d.type},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])):c("",!0),t.isEdit?c("",!0):(i(),p("span",Oe,V(e.title),1))]),_:1}),n(m,{label:"内容类型",prop:"contentType",rules:[{required:!0,message:"请选择文档内容类型"}]},{default:r(()=>[t.isEdit?(i(),T(N,{key:0,modelValue:e.contentType,"onUpdate:modelValue":o[2]||(o[2]=d=>e.contentType=d),placeholder:"请选择文档内容类型"},{default:r(()=>[n(k,{label:"知识点",value:"知识点"}),n(k,{label:"问答题",value:"问答题"})]),_:1},8,["modelValue"])):c("",!0),t.isEdit?c("",!0):(i(),p("span",Re,V(e.title),1))]),_:1}),n(m,{label:"文档作者"},{default:r(()=>[t.isEdit?(i(),T(w,{key:0,modelValue:e.autor,"onUpdate:modelValue":o[3]||(o[3]=d=>e.autor=d),placeholder:"请输入"},null,8,["modelValue"])):c("",!0),t.isEdit?c("",!0):(i(),p("span",Le,V(e.title),1))]),_:1})]),_:1},8,["model"])]),h("div",Pe,[We,n(z,{modelValue:e.content,"onUpdate:modelValue":o[4]||(o[4]=d=>e.content=d),height:t.editorHeight,mode:t.isEdit?"edit":"preview"},null,8,["modelValue","height","mode"])])]),_:1})],64)}}});const st=G(je,[["__scopeId","data-v-65aa94d6"]]);export{st as default};
