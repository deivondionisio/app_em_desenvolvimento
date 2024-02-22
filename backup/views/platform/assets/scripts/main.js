document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/auth/signin', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    .then(response => {
      if (!response.ok) {
        // Se a resposta do servidor não for um sucesso, lança um erro
        throw new Error('Falha na comunicação com o servidor, status: ' + response.status);
      }
      // Verifica se o conteúdo da resposta é JSON antes de tentar processá-lo
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        // Salva o token recebido para uso futuro
        localStorage.setItem('token', data.token);
        // Redireciona para a página "requisition-manager"
        window.location.href = '/requisition-manager.html'; 
      } else {
        // Se a resposta não contém um token, assume que o login falhou
        alert('Login falhou!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Erro de login: ' + error.message);
    });
  });
});
