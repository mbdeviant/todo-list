(()=>{"use strict";function e(e,t){const n=document.createElement("div");n.classList.add("note-item"),n.style.backgroundColor=t;const o=document.createElement("textarea");o.classList.add("note-text"),o.spellcheck=!1,o.value=e;const a=document.createElement("button");return a.setAttribute("id","remove-button"),a.classList.add("remove-button"),a.innerHTML="X",n.appendChild(o),n.appendChild(a),n}const t=(()=>{let e=parseInt(localStorage.getItem("projectId"),10)||0,t=parseInt(localStorage.getItem("taskId"),10)||0;function n(){localStorage.setItem("projectId",e),localStorage.setItem("taskId",t)}return{get projectId(){return e},set projectId(t){e=t,n()},get taskId(){return t},set taskId(e){t=e,n()},incrementProjectId(){e+=1,n()},incrementTaskId(){t+=1,n()}}})(),n=(()=>{const e=document.createElement("div");e.classList.add("new-item-display");const t=document.createElement("input");t.classList.add("new-project-title"),t.placeholder="Give a name to your project.";const n=document.createElement("button");n.textContent="Save",n.classList.add("save-project-button");const o=document.createElement("button");return o.textContent="Cancel",o.classList.add("cancel-project-button"),t.addEventListener("input",(()=>{t.style.borderColor="black",t.placeholder="Give a name to your project."})),e.appendChild(t),e.appendChild(n),e.appendChild(o),{newItem:e,titlePreview:t,saveButton:n,cancelButton:o,isEmpty:function(){const e=""===t.value.trim();return t.style.borderColor="red",t.placeholder="Title can't be empty.",e},reset:function(){t.value="",t.style.borderColor="black",t.placeholder="Give a name to your project."}}})();function o(e){const n=document.createElement("div");n.classList.add("project-item");const o=document.createElement("div");o.classList.add("project-item-header"),n.addEventListener("click",(()=>{d()}));const c=document.createElement("p");c.classList.add("project-title"),c.textContent=e;const s=document.createElement("button");s.setAttribute("id","remove-button"),s.classList.add("remove-button"),s.innerHTML="X";const r=document.createElement("div");r.classList.add("expand-menu-container");const i=document.createElement("div");i.classList.add("expand-menu-top");const l=document.createElement("button");return l.classList.add("expand-menu-add-button"),l.textContent="+",l.addEventListener("click",(()=>{const e=JSON.parse(localStorage.getItem("projects"))||[],n=a("");n.dataset.taskId=t.taskId,r.appendChild(n);const{projectId:o}=r.parentNode.dataset;e.find((e=>parseInt(e.id,10)===parseInt(o,10))).tasks.push({title:"",id:n.dataset.taskId}),localStorage.setItem("projects",JSON.stringify(e)),t.incrementTaskId()})),n.expandMenu=r,i.appendChild(l),r.appendChild(i),o.addEventListener("click",(()=>{r.classList.toggle("hidden")})),o.appendChild(c),o.appendChild(s),n.appendChild(o),n.appendChild(r),n}function a(e){const t=document.createElement("div");t.classList.add("project-task-container");const n=document.createElement("div");n.classList.add("task-container-left");const o=document.createElement("p");o.classList.add("project-task-mark"),o.textContent="●";const a=document.createElement("p");a.textContent=e,a.classList.add("project-task-title"),a.contentEditable="true",a.spellcheck=!1,a.addEventListener("input",(e=>{const n=JSON.parse(localStorage.getItem("projects"))||[],{taskId:o}=t.dataset,{projectId:a}=e.target.parentNode.parentNode.parentNode.parentNode.dataset,d=e.target.textContent;n.find((e=>parseInt(e.id,10)===parseInt(a,10))).tasks.find((e=>parseInt(e.id,10)===parseInt(o,10))).title=d,localStorage.setItem("projects",JSON.stringify(n))}));const d=document.createElement("button");return d.classList.add("project-task-remove-button"),d.textContent="x",n.appendChild(o),n.appendChild(a),t.appendChild(n),t.appendChild(d),d.addEventListener("click",(e=>{const t=JSON.parse(localStorage.getItem("projects"))||[],{taskId:n}=e.target.parentNode.dataset,{projectId:o}=e.target.parentNode.parentNode.parentNode.dataset,a=t.findIndex((e=>parseInt(e.id,10)===parseInt(o,10))),d=t[a].tasks.findIndex((e=>parseInt(e.id,10)===parseInt(n,10)));t[a].tasks.splice(d,1),localStorage.setItem("projects",JSON.stringify(t)),e.target.parentNode.remove()})),t}function d(){const e=document.getElementById("project-container");e.querySelector(".new-item-display")&&e.removeChild(n.newItem),n.reset()}n.saveButton.addEventListener("click",(()=>{const e=document.getElementById("project-container"),a=JSON.parse(localStorage.getItem("projects"))||[];if(n.isEmpty())return;const d=n.titlePreview.value.trim(),c=o(d);c.dataset.projectId=t.projectId,a.push({title:d,id:t.projectId,tasks:[]}),localStorage.setItem("projects",JSON.stringify(a)),t.incrementProjectId(),e.appendChild(c),e.removeChild(n.newItem),n.reset()})),n.cancelButton.addEventListener("click",(()=>{d()}));const c=(()=>{const e=document.getElementById("task-form-overlay");return e.addEventListener("click",(t=>{t.target===e&&(e.style.display="none")})),{close:function(){e.style.display="none"},show:function(){e.style.display="block"}}})(),s=(()=>{const e=document.getElementById("task-form-container"),t=document.getElementById("task-form"),n=document.getElementById("task-desc"),o=document.getElementById("task-due-date"),a=document.getElementById("task-priority-dropdown"),d=document.createElement("p"),c=document.getElementById("add-task-button");d.setAttribute("id","form-warning");let s=!0;return n.addEventListener("keydown",(()=>{e.querySelector("#form-warning")&&e.removeChild(d)})),o.addEventListener("click",(()=>{e.querySelector("#form-warning")&&e.removeChild(d)})),{reset:function(){t.reset()},showWarning:function(){e.querySelector("#form-warning")||(d.textContent="Please fill all the blanks.",e.appendChild(d))},isEmpty:function(){return""!==n.value&&""!==o.value||(s=!0),""!==n.value&&""!==o.value&&(s=!1),s},removeWarning:function(){e.querySelector("#form-warning")&&e.removeChild(d)},focus:function(){n.focus()},description:n,date:o,priority:a,addTaskButton:c}})();function r(){const e=document.getElementById("content-container"),t=document.createElement("div");t.setAttribute("id","task-item-container");const n=document.createElement("button");return n.textContent="+New task",n.classList.add("new-task-button"),e.appendChild(n),n.addEventListener("click",(()=>{c.show(),s.reset(),s.removeWarning(),s.focus()})),t.addEventListener("click",(e=>{const n=JSON.parse(localStorage.getItem("tasks"))||[],o=Array.from(t.childNodes).indexOf(e.target.parentNode.parentNode.parentNode);e.target.matches(".remove-button")&&(t.removeChild(e.target.parentNode.parentNode.parentNode),n.splice(o,1)),e.target.matches(".checkbox")&&(n[o].check=!n[o].check),localStorage.setItem("tasks",JSON.stringify(n))})),function(){const e=JSON.parse(localStorage.getItem("tasks"))||[];for(const n of e){const e=i(n.desc,n.date,n.priority,n.check);t.appendChild(e)}}(),t}function i(e,t,n,o){const a=document.createElement("div");a.classList.add("task-item");const d=document.createElement("div");d.classList.add("task-info");const c=document.createElement("div");c.classList.add("right");const s=document.createElement("div");s.classList.add("left");const r=document.createElement("input");r.setAttribute("type","checkbox"),r.classList.add("checkbox"),r.checked=o;const i=document.createElement("p");i.classList.add("task-desc-preview"),i.textContent=e;const l=new Date(t),p=l.getFullYear();let m=l.getMonth()+1,u=l.getDate();u<10&&(u=`0${u}`),m<10&&(m=`0${m}`);const g=`Due Date: ${u}/${m}/${p}`,h=document.createElement("p");h.classList.add("task-date-preview"),h.textContent=g;const v=document.createElement("p");v.classList.add("task-priority-preview"),v.textContent=`Priority: ${n}`,"High"===n&&(v.style.color="maroon"),"Medium"===n&&(v.style.color="peru"),"Low"===n&&(v.style.color="green");const k=document.createElement("button");return k.setAttribute("id","remove-button"),k.classList.add("remove-button"),k.innerHTML="X",r.addEventListener("click",(()=>{s.classList.toggle("completed"),a.classList.toggle("completed")})),o&&(s.classList.add("completed"),a.classList.add("completed")),s.appendChild(r),s.appendChild(i),c.appendChild(h),c.appendChild(v),c.appendChild(k),d.appendChild(s),d.appendChild(c),a.appendChild(d),a}function l(e){for(;e.firstChild;)e.removeChild(e.firstChild)}s.addTaskButton.addEventListener("click",(e=>{const t=document.getElementById("task-item-container");if(e.preventDefault(),s.isEmpty())return void s.showWarning();const n=i(s.description.value,s.date.value,s.priority.value,!1),o=JSON.parse(localStorage.getItem("tasks"))||[];o.push({desc:s.description.value,date:s.date.value,priority:s.priority.value,check:!1}),localStorage.setItem("tasks",JSON.stringify(o)),t.appendChild(n),c.close()})),function(){const e=document.getElementById("content-container"),t=document.querySelectorAll(".nav-button"),n=document.getElementById("tasks-button"),o=document.getElementById("main-title");n.addEventListener("click",(()=>{e.querySelector("#task-item-container")||(t.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),l(e),e.appendChild(r()))})),o.addEventListener("click",(()=>{e.querySelector("#task-item-container")||(t.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),l(e),e.appendChild(r()))}))}(),function(){const e=document.getElementById("content-container"),t=document.querySelectorAll(".nav-button"),n=document.getElementById("today-button");n.addEventListener("click",(()=>{e.querySelector("#task-today-container")||(t.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(e),e.appendChild(function(){const e=document.getElementById("content-container"),t=document.createElement("div");t.setAttribute("id","task-today-container");const n=document.createElement("p");n.textContent="Today's tasks",n.classList.add("task-today-title"),e.appendChild(n);const o=new Date,a=o.getFullYear();let d=o.getMonth()+1,c=o.getDate();c<10&&(c=`0${c}`),d<10&&(d=`0${d}`);const s=`${a}-${d}-${c}`,r=JSON.parse(localStorage.getItem("tasks"))||[],l=r.filter((e=>e.date===s)),p=document.createElement("p");return p.classList.add("empty-task-message"),p.innerHTML='Nothing to do today. Click <button class="new-today-task-button">here</button> to view all tasks.',document.addEventListener("click",(e=>{e.target.matches(".new-today-task-button")&&document.getElementById("tasks-button").click()})),0===l.length&&t.appendChild(p),l.forEach((e=>{const n=r.findIndex((t=>t===e)),o=i(e.desc,e.date,e.priority,e.check);o.dataset.id=n,t.appendChild(o)})),t.addEventListener("click",(e=>{const n=e.target.parentNode.parentNode.parentNode.dataset.id;e.target.matches(".remove-button")&&(t.removeChild(e.target.parentNode.parentNode.parentNode),r.splice(n,1)),e.target.matches(".checkbox")&&(r[n].check=!r[n].check),localStorage.setItem("tasks",JSON.stringify(r))})),t}()))}))}(),function(){const e=document.getElementById("content-container"),t=document.querySelectorAll(".nav-button"),d=document.getElementById("projects-button");d.addEventListener("click",(()=>{e.querySelector("#project-container")||(t.forEach((e=>e.classList.remove("selected"))),d.classList.add("selected"),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(e),e.appendChild(function(){const e=document.getElementById("content-container"),t=document.createElement("div");t.setAttribute("id","project-container");const d=document.createElement("button");return d.textContent="+New project",d.classList.add("new-project-button"),e.appendChild(d),d.addEventListener("click",(()=>{t.appendChild(n.newItem),n.titlePreview.focus()})),t.addEventListener("click",(e=>{if(e.target.matches(".remove-button")){const n=JSON.parse(localStorage.getItem("projects"))||[],{projectId:o}=e.target.parentNode.parentNode.dataset,a=n.findIndex((e=>parseInt(e.id,10)===parseInt(o,10)));n.splice(a,1),t.removeChild(e.target.parentNode.parentNode),localStorage.setItem("projects",JSON.stringify(n))}})),function(){const e=JSON.parse(localStorage.getItem("projects"))||[];e&&e.forEach((e=>{const n=o(e.title);n.dataset.projectId=e.id,e.tasks.forEach((e=>{const t=a(e.title);t.dataset.taskId=e.id,n.expandMenu.appendChild(t)})),t.appendChild(n)}))}(),t}()))}))}(),function(){const t=document.getElementById("content-container"),n=document.querySelectorAll(".nav-button"),o=document.getElementById("notes-button");o.addEventListener("click",(()=>{t.querySelector("#note-container")||(n.forEach((e=>e.classList.remove("selected"))),o.classList.add("selected"),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(t),t.appendChild(function(){const t=document.getElementById("content-container"),n=document.createElement("div");n.setAttribute("id","note-container");const o=document.createElement("button");return o.classList.add("new-note-button"),o.setAttribute("id","new-note-button"),o.innerHTML="+New note",t.appendChild(o),o.addEventListener("click",(()=>{const t=e("",`hsl(${360*Math.random()},${25+70*Math.random()}%,${85+10*Math.random()}%)`),o=JSON.parse(localStorage.getItem("notes"))||[];o.push({text:"",color:t.style.backgroundColor}),localStorage.setItem("notes",JSON.stringify(o)),n.appendChild(t)})),n.addEventListener("click",(e=>{if(e.target.matches(".remove-button")){const t=e.target.parentNode;n.removeChild(t),function(e){const t=JSON.parse(localStorage.getItem("notes"))||[],n=t.findIndex((t=>t.color===e.style.backgroundColor));-1!==n&&(t.splice(n,1),localStorage.setItem("notes",JSON.stringify(t)))}(t)}})),n.addEventListener("input",(e=>{e.target.matches("textarea")&&function(e){const t=JSON.parse(localStorage.getItem("notes"))||[],n=t.findIndex((t=>t.color===e.style.backgroundColor));-1!==n&&(t[n].text=e.querySelector("textarea").value,localStorage.setItem("notes",JSON.stringify(t)))}(e.target.parentNode)})),function(){const t=JSON.parse(localStorage.getItem("notes"))||[];for(const o of t){const t=e(o.text,o.color);n.appendChild(t)}}(),n}()))}))}();const p=document.getElementById("today-button");window.onload=p.click()})();