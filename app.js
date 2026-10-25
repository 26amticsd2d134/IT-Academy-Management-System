
const demoStudents=[
 {name:'Aarav Shah',email:'aarav@example.com',course:'Web Development'},
 {name:'Diya Patel',email:'diya@example.com',course:'Java Programming'},
 {name:'Rohan Desai',email:'rohan@example.com',course:'Python & Data Science'}
];
function getStudents(){try{return JSON.parse(localStorage.getItem('academyStudents'))||demoStudents}catch(e){return demoStudents}}
function setStudents(s){localStorage.setItem('academyStudents',JSON.stringify(s))}
const loginForm=document.getElementById('loginForm');
if(loginForm){loginForm.addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('email').value;const role=document.getElementById('role').value;localStorage.setItem('academyUser',JSON.stringify({email,role}));location.href='dashboard.html'})}
const welcomeTitle=document.getElementById('welcomeTitle');
if(welcomeTitle){let u={};try{u=JSON.parse(localStorage.getItem('academyUser'))||{role:'Administrator'}}catch(e){}welcomeTitle.textContent='Good to see you'+(u.role?' · '+u.role:'')+'.';const s=getStudents();document.getElementById('studentCount').textContent=248+s.length-demoStudents.length;document.getElementById('recentStudents').innerHTML=s.slice(-4).reverse().map(x=>`<p><strong>${escapeHTML(x.name)}</strong><br><span class="muted">${escapeHTML(x.course)}</span></p>`).join('')||'No students added yet.'}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const studentForm=document.getElementById('studentForm');
function renderStudents(){const tbody=document.getElementById('studentTable');if(!tbody)return;const q=(document.getElementById('studentSearch')?.value||'').toLowerCase();const rows=getStudents().filter(s=>(s.name+' '+s.email+' '+s.course).toLowerCase().includes(q));tbody.innerHTML=rows.map(s=>`<tr><td><strong>${escapeHTML(s.name)}</strong></td><td>${escapeHTML(s.email)}</td><td>${escapeHTML(s.course)}</td><td><span class="status">Active</span></td></tr>`).join('')||'<tr><td colspan="4">No matching students.</td></tr>'}
if(studentForm){renderStudents();studentForm.addEventListener('submit',e=>{e.preventDefault();const s=getStudents();s.push({name:document.getElementById('studentName').value.trim(),email:document.getElementById('studentEmail').value.trim(),course:document.getElementById('studentCourse').value});setStudents(s);studentForm.reset();document.getElementById('studentMsg').textContent='Student saved in this browser.';renderStudents()});document.getElementById('studentSearch').addEventListener('input',renderStudents)}
const reqSearch=document.getElementById('reqSearch');if(reqSearch){reqSearch.addEventListener('input',()=>{let count=0;document.querySelectorAll('.req').forEach(c=>{c.classList.toggle('hidden',!c.textContent.toLowerCase().includes(reqSearch.value.toLowerCase()));if(!c.classList.contains('hidden'))count++});document.getElementById('noReq').classList.toggle('hidden',count>0)})}
