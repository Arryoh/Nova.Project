// Canvas background particles
const canvas = document.getElementById('loginBg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for(let i=0;i<80;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*3+2,
      dx: (Math.random()-0.5)*1.5,
      dy: (Math.random()-0.5)*1.5
    });
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0 || p.x>canvas.width)p.dx*=-1;
      if(p.y<0 || p.y>canvas.height)p.dy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(0,255,224,0.4)';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Password validation
function validPassword(pwd) {
  const hasLetters = /[a-zA-Z]/.test(pwd);
  const hasNumbers = /[0-9]/.test(pwd);
  return pwd.length >= 8 && hasLetters && hasNumbers;
}

// Show inline message
function showMessage(container, message, type='error') {
  let msg = container.querySelector('.msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'msg';
    container.appendChild(msg);
  }
  msg.textContent = message;
  msg.className = type==='error' ? 'msg' : 'msg success';
}

// Toggle password visibility
function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.textContent = "🙈";
  } else {
    input.type = "password";
    el.textContent = "👁️";
  }
}

// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const container = loginForm;

    if (!email || !password) {
      showMessage(container, "Please fill in both fields.");
      return;
    }

    if (!validPassword(password)) {
      showMessage(container, "Password must be 8+ chars with letters & numbers.");
      return;
    }

    showMessage(container, "Logging in...", "success");
    setTimeout(()=> {
      window.location.href = '../pages/portfolio.html';
    }, 1000);
  });
}

// Signup form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const container = signupForm;

    if (!username || !email || !password) {
      showMessage(container, "Please fill in all fields.");
      return;
    }

    if (!validPassword(password)) {
      showMessage(container, "Password must be 8+ chars with letters & numbers.");
      return;
    }

    showMessage(container, "Signup successful!", "success");
    setTimeout(()=> {
      window.location.href = '/pages/portfolio.html';
    }, 1000);
  });
}