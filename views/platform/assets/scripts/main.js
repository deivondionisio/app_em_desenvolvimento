let loginForm = document.querySelector(".my-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username").value; 
  let password = document.getElementById("password").value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }) 
  })
  .then(response => response.json())
  .then(data => {
    if (data.auth) {
      // Login bem-sucedido, redirecionar ou exibir mensagem
      console.log('Login bem-sucedido!', data.token);
      // Armazenar token no armazenamento local (opcional)
      localStorage.setItem('token', data.token);
      window.location.href = "/requisition-manager.html";
    } else {
      // Login falhou, exibir mensagem de erro
      console.error('Login falhou:', data.message);
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Erro ao enviar requisição:', error);
    alert('Ocorreu um erro, tente novamente mais tarde.');
  });
});
