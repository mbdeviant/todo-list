(()=>{"use strict";function e(e,t){const n=document.createElement("div");n.classList.add("note-item"),n.style.backgroundColor=t;const o=document.createElement("textarea");o.classList.add("note-text"),o.spellcheck=!1,o.value=e;const a=document.createElement("button");return a.setAttribute("id","remove-button"),a.classList.add("remove-button"),a.innerHTML="X",n.appendChild(o),n.appendChild(a),n}function t(){const e=document.createElement("p");return e.classList.add("empty-data-message"),e.setAttribute("id","empty-data-message-notes"),e.innerHTML="You don't have any notes yet. You can create a new note from button above.",e}const n=(()=>{let e=parseInt(localStorage.getItem("projectId"),10)||0,t=parseInt(localStorage.getItem("taskId"),10)||0;function n(){localStorage.setItem("projectId",e),localStorage.setItem("taskId",t)}return{get projectId(){return e},set projectId(t){e=t,n()},get taskId(){return t},set taskId(e){t=e,n()},incrementProjectId(){e+=1,n()},incrementTaskId(){t+=1,n()}}})(),o=(()=>{const e=document.createElement("div");e.classList.add("new-item-display");const t=document.createElement("input");t.classList.add("new-project-title"),t.placeholder="Give a name to your project.";const n=document.createElement("button");n.textContent="Save",n.classList.add("save-project-button");const o=document.createElement("button");return o.textContent="Cancel",o.classList.add("cancel-project-button"),t.addEventListener("input",(()=>{t.style.borderColor="black",t.placeholder="Give a name to your project."})),e.appendChild(t),e.appendChild(n),e.appendChild(o),{newItem:e,titlePreview:t,saveButton:n,cancelButton:o,isEmpty:function(){const e=""===t.value.trim();return t.style.borderColor="red",t.placeholder="Title can't be empty.",e},reset:function(){t.value="",t.style.borderColor="black",t.placeholder="Give a name to your project."}}})();function a(e){const t=document.createElement("div");t.classList.add("project-item");const o=document.createElement("div");o.classList.add("project-item-header"),t.addEventListener("click",(()=>{c()}));const a=document.createElement("p");a.classList.add("project-title"),a.textContent=e;const s=document.createElement("button");s.setAttribute("id","remove-button"),s.classList.add("remove-button"),s.innerHTML="X";const r=document.createElement("div");r.classList.add("expand-menu-container");const i=document.createElement("div");i.classList.add("expand-menu-top");const l=document.createElement("button");return l.classList.add("expand-menu-add-button"),l.textContent="+",l.addEventListener("click",(()=>{const e=JSON.parse(localStorage.getItem("projects"))||[],t=d("");t.dataset.taskId=n.taskId,r.appendChild(t);const{projectId:o}=r.parentNode.dataset;e.find((e=>parseInt(e.id,10)===parseInt(o,10))).tasks.push({title:"",id:t.dataset.taskId}),localStorage.setItem("projects",JSON.stringify(e)),n.incrementTaskId()})),t.expandMenu=r,i.appendChild(l),r.appendChild(i),o.addEventListener("click",(()=>{r.classList.toggle("hidden")})),o.appendChild(a),o.appendChild(s),t.appendChild(o),t.appendChild(r),t}function d(e){const t=document.createElement("div");t.classList.add("project-task-container");const n=document.createElement("div");n.classList.add("task-container-left");const o=document.createElement("p");o.classList.add("project-task-mark"),o.textContent="●";const a=document.createElement("p");a.textContent=e,a.classList.add("project-task-title"),a.contentEditable="true",a.spellcheck=!1,a.addEventListener("input",(e=>{const n=JSON.parse(localStorage.getItem("projects"))||[],{taskId:o}=t.dataset,{projectId:a}=e.target.parentNode.parentNode.parentNode.parentNode.dataset,d=e.target.textContent;n.find((e=>parseInt(e.id,10)===parseInt(a,10))).tasks.find((e=>parseInt(e.id,10)===parseInt(o,10))).title=d,localStorage.setItem("projects",JSON.stringify(n))}));const d=document.createElement("button");return d.classList.add("project-task-remove-button"),d.textContent="x",n.appendChild(o),n.appendChild(a),t.appendChild(n),t.appendChild(d),d.addEventListener("click",(e=>{const t=JSON.parse(localStorage.getItem("projects"))||[],{taskId:n}=e.target.parentNode.dataset,{projectId:o}=e.target.parentNode.parentNode.parentNode.dataset,a=t.findIndex((e=>parseInt(e.id,10)===parseInt(o,10))),d=t[a].tasks.findIndex((e=>parseInt(e.id,10)===parseInt(n,10)));t[a].tasks.splice(d,1),localStorage.setItem("projects",JSON.stringify(t)),e.target.parentNode.remove()})),t}function c(){const e=document.getElementById("project-container");e.querySelector(".new-item-display")&&e.removeChild(o.newItem),o.reset()}function s(){const e=document.createElement("p");return e.classList.add("empty-data-message"),e.setAttribute("id","empty-data-message"),e.innerHTML="You don't have any projects yet. You can create a new project from button above.",e}o.saveButton.addEventListener("click",(()=>{const e=document.getElementById("project-container"),t=JSON.parse(localStorage.getItem("projects"))||[];if(o.isEmpty())return;const d=o.titlePreview.value.trim(),c=a(d);c.dataset.projectId=n.projectId,t.push({title:d,id:n.projectId,tasks:[]}),localStorage.setItem("projects",JSON.stringify(t)),n.incrementProjectId(),e.appendChild(c),e.removeChild(o.newItem),o.reset()}));const r=(()=>{const e=document.getElementById("task-form-overlay");return e.addEventListener("click",(t=>{t.target===e&&(e.style.display="none")})),{close:function(){e.style.display="none"},show:function(){e.style.display="block"}}})();document.addEventListener("keydown",(e=>{const t=document.getElementById("task-form-overlay");"Escape"===e.key&&"block"===t.style.display&&(t.style.display="none")}));const i=(()=>{const e=document.getElementById("task-form-container"),t=document.getElementById("task-form"),n=document.getElementById("task-desc"),o=document.getElementById("task-due-date"),a=document.getElementById("task-priority-dropdown"),d=document.createElement("p"),c=document.getElementById("add-task-button");d.setAttribute("id","form-warning");let s=!0;return n.addEventListener("keydown",(()=>{e.querySelector("#form-warning")&&e.removeChild(d)})),o.addEventListener("click",(()=>{e.querySelector("#form-warning")&&e.removeChild(d)})),{reset:function(){t.reset()},showWarning:function(){e.querySelector("#form-warning")||(d.textContent="Please fill all the blanks.",e.appendChild(d))},isEmpty:function(){return""!==n.value&&""!==o.value||(s=!0),""!==n.value&&""!==o.value&&(s=!1),s},removeWarning:function(){e.querySelector("#form-warning")&&e.removeChild(d)},focus:function(){n.focus()},description:n,date:o,priority:a,addTaskButton:c}})();function l(){const e=document.getElementById("content-container"),t=document.createElement("div");t.setAttribute("id","task-item-container");const n=document.createElement("button");return n.textContent="+New task",n.setAttribute("id","new-task-button"),n.classList.add("new-task-button"),e.appendChild(n),n.addEventListener("click",(()=>{r.show(),i.reset(),i.removeWarning(),i.focus()})),t.addEventListener("click",(e=>{const n=JSON.parse(localStorage.getItem("tasks"))||[],o=Array.from(t.childNodes).indexOf(e.target.parentNode.parentNode.parentNode);e.target.matches(".remove-button")&&(t.removeChild(e.target.parentNode.parentNode.parentNode),n.splice(o,1),0===n.length&&t.appendChild(p())),e.target.matches(".checkbox")&&(n[o].check=!n[o].check),localStorage.setItem("tasks",JSON.stringify(n))})),function(){const e=JSON.parse(localStorage.getItem("tasks"))||[];0===e.length&&t.appendChild(p());for(const n of e){const e=m(n.desc,n.date,n.priority,n.check);t.appendChild(e)}}(),t}function m(e,t,n,o){const a=document.createElement("div");a.classList.add("task-item");const d=document.createElement("div");d.classList.add("task-info");const c=document.createElement("div");c.classList.add("right");const s=document.createElement("div");s.classList.add("left");const r=document.createElement("input");r.setAttribute("type","checkbox"),r.classList.add("checkbox"),r.checked=o;const i=document.createElement("p");i.classList.add("task-desc-preview"),i.textContent=e;const l=new Date(t),m=l.getFullYear();let p=l.getMonth()+1,u=l.getDate();u<10&&(u=`0${u}`),p<10&&(p=`0${p}`);const g=`Due Date: ${u}/${p}/${m}`,h=document.createElement("p");h.classList.add("task-date-preview"),h.textContent=g;const y=document.createElement("p");y.classList.add("task-priority-preview"),y.textContent=`Priority: ${n}`,"High"===n&&(y.style.color="maroon"),"Medium"===n&&(y.style.color="peru"),"Low"===n&&(y.style.color="green");const v=document.createElement("button");return v.setAttribute("id","remove-button"),v.classList.add("remove-button"),v.innerHTML="X",r.addEventListener("click",(()=>{s.classList.toggle("completed"),a.classList.toggle("completed")})),o&&(s.classList.add("completed"),a.classList.add("completed")),s.appendChild(r),s.appendChild(i),c.appendChild(h),c.appendChild(y),c.appendChild(v),d.appendChild(s),d.appendChild(c),a.appendChild(d),a}function p(){const e=document.createElement("p");return e.classList.add("empty-data-message"),e.setAttribute("id","empty-data-message"),e.innerHTML="You don't have any tasks yet. You can create a new task from button above.",e}function u(e){for(;e.firstChild;)e.removeChild(e.firstChild)}i.addTaskButton.addEventListener("click",(e=>{const t=document.getElementById("task-item-container"),n=document.getElementById("empty-data-message");if(e.preventDefault(),i.isEmpty())return void i.showWarning();const o=m(i.description.value,i.date.value,i.priority.value,!1),a=JSON.parse(localStorage.getItem("tasks"))||[];a.push({desc:i.description.value,date:i.date.value,priority:i.priority.value,check:!1}),n&&t.removeChild(n),localStorage.setItem("tasks",JSON.stringify(a)),t.appendChild(o),r.close()})),function(){const e=document.getElementById("content-container"),t=document.querySelectorAll(".nav-button"),n=document.getElementById("tasks-button"),o=document.getElementById("main-title");n.addEventListener("click",(()=>{e.querySelector("#task-item-container")||(t.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),u(e),e.appendChild(l()))})),o.addEventListener("click",(()=>{e.querySelector("#task-item-container")||(t.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),u(e),e.appendChild(l()))}))}(),function(){const e=document.getElementById("content-container"),t=document.querySelectorAll(".nav-button"),n=document.getElementById("today-button");n.addEventListener("click",(()=>{e.querySelector("#task-today-container")||(t.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(e),e.appendChild(function(){const e=document.getElementById("content-container"),t=document.createElement("div");t.setAttribute("id","task-today-container");const n=document.createElement("p");n.textContent="Today's tasks",n.classList.add("task-today-title"),e.appendChild(n);const o=new Date,a=o.getFullYear();let d=o.getMonth()+1,c=o.getDate();c<10&&(c=`0${c}`),d<10&&(d=`0${d}`);const s=`${a}-${d}-${c}`,r=JSON.parse(localStorage.getItem("tasks"))||[],i=r.filter((e=>e.date===s)),l=document.createElement("p");return l.classList.add("empty-data-message"),l.innerHTML='You have nothing to do today. Create a <button class="new-today-task-button">new task</button>.',document.addEventListener("click",(e=>{e.target.matches(".new-today-task-button")&&(document.getElementById("tasks-button").click(),document.getElementById("new-task-button").click())})),0===i.length&&t.appendChild(l),i.forEach((e=>{const n=r.findIndex((t=>t===e)),o=m(e.desc,e.date,e.priority,e.check);o.dataset.id=n,t.appendChild(o)})),t.addEventListener("click",(e=>{const n=e.target.parentNode.parentNode.parentNode.dataset.id;e.target.matches(".remove-button")&&(t.removeChild(e.target.parentNode.parentNode.parentNode),r.splice(n,1),0===r.length&&t.appendChild(l)),e.target.matches(".checkbox")&&(r[n].check=!r[n].check),localStorage.setItem("tasks",JSON.stringify(r))})),t}()))}))}(),function(){const e=document.getElementById("content-container"),t=document.querySelectorAll(".nav-button"),n=document.getElementById("projects-button");n.addEventListener("click",(()=>{e.querySelector("#project-container")||(t.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(e),e.appendChild(function(){const e=document.getElementById("content-container"),t=document.createElement("div");t.setAttribute("id","project-container");const n=document.createElement("button");return n.textContent="+New project",n.classList.add("new-project-button"),e.appendChild(n),n.addEventListener("click",(()=>{const e=document.getElementById("empty-data-message");e&&t.removeChild(e),t.appendChild(o.newItem),o.titlePreview.focus()})),t.addEventListener("click",(e=>{if(e.target.matches(".remove-button")){const n=JSON.parse(localStorage.getItem("projects"))||[],{projectId:o}=e.target.parentNode.parentNode.dataset,a=n.findIndex((e=>parseInt(e.id,10)===parseInt(o,10)));n.splice(a,1),t.removeChild(e.target.parentNode.parentNode),localStorage.setItem("projects",JSON.stringify(n)),0===n.length&&t.appendChild(s())}})),o.cancelButton.addEventListener("click",(()=>{0===(JSON.parse(localStorage.getItem("projects"))||[]).length&&t.appendChild(s()),c()})),function(){const e=JSON.parse(localStorage.getItem("projects"))||[];0===e.length&&t.appendChild(s()),e.forEach((e=>{const n=a(e.title);n.dataset.projectId=e.id,e.tasks.forEach((e=>{const t=d(e.title);t.dataset.taskId=e.id,n.expandMenu.appendChild(t)})),t.appendChild(n)}))}(),t}()))}))}(),function(){const n=document.getElementById("content-container"),o=document.querySelectorAll(".nav-button"),a=document.getElementById("notes-button");a.addEventListener("click",(()=>{n.querySelector("#note-container")||(o.forEach((e=>e.classList.remove("selected"))),a.classList.add("selected"),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(n),n.appendChild(function(){const n=document.getElementById("content-container"),o=document.createElement("div");o.setAttribute("id","note-container");const a=document.createElement("button");return a.classList.add("new-note-button"),a.setAttribute("id","new-note-button"),a.innerHTML="+New note",n.appendChild(a),a.addEventListener("click",(()=>{const t=e("",`hsl(${360*Math.random()},${25+70*Math.random()}%,${85+10*Math.random()}%)`),n=JSON.parse(localStorage.getItem("notes"))||[];n.push({text:"",color:t.style.backgroundColor}),localStorage.setItem("notes",JSON.stringify(n)),o.appendChild(t);const a=document.getElementById("empty-data-message-notes");a&&o.removeChild(a)})),o.addEventListener("click",(e=>{if(e.target.matches(".remove-button")){const n=e.target.parentNode;o.removeChild(n),function(e){const t=JSON.parse(localStorage.getItem("notes"))||[],n=t.findIndex((t=>t.color===e.style.backgroundColor));-1!==n&&(t.splice(n,1),localStorage.setItem("notes",JSON.stringify(t)))}(n),0===(JSON.parse(localStorage.getItem("notes"))||[]).length&&o.appendChild(t())}})),o.addEventListener("input",(e=>{e.target.matches("textarea")&&function(e){const t=JSON.parse(localStorage.getItem("notes"))||[],n=t.findIndex((t=>t.color===e.style.backgroundColor));-1!==n&&(t[n].text=e.querySelector("textarea").value,localStorage.setItem("notes",JSON.stringify(t)))}(e.target.parentNode)})),function(){const n=JSON.parse(localStorage.getItem("notes"))||[];0===n.length&&o.appendChild(t());for(const t of n){const n=e(t.text,t.color);o.appendChild(n)}}(),o}()))}))}();const g=document.getElementById("today-button");window.onload=g.click()})();