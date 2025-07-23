   // Este é o conteúdo para o seu arquivo script.js

// 2️⃣ Inicializa EmailJS com sua Public Key - ESTA LINHA VAI PARA O SEU script.js
emailjs.init('ZhtqLCwT209exfxYP'); 

// --- 1. MELHORIA NO FEEDBACK DO FORMULÁRIO DE CONTATO ---
document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    const feedbackDiv = document.getElementById('feedback-message');
    const submitButton = e.target.querySelector('button[type="submit"]');

    // --- Validações Frontend ---
    const nameInput = e.target.querySelector('input[name="user_name"]');
    const emailInput = e.target.querySelector('input[name="user_email"]');
    const messageInput = e.target.querySelector('textarea[name="user_message"]');

    // Validação de campos vazios
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        feedbackDiv.textContent = 'Por favor, preencha todos os campos.';
        feedbackDiv.style.color = 'orange';
        return; // Para a execução da função se houver campos vazios
    }

    // Validação de formato de e-mail (básica)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        feedbackDiv.textContent = 'Por favor, insira um e-mail válido.';
        feedbackDiv.style.color = 'orange';
        return; // Para a execução da função se o e-mail for inválido
    }

    // Se as validações passarem, exibe mensagem de envio e desabilita o botão
    feedbackDiv.textContent = 'Enviando...';
    feedbackDiv.style.color = '#1E3A8A'; // Cor azul para "enviando"
    submitButton.disabled = true; // Desabilita o botão para evitar múltiplos cliques

    // Envio do e-mail via EmailJS
    emailjs.sendForm(
        'service_qclqx6x',    // ID do serviço
        'template_gboq5qe',   // ID do template
        e.target              // O formulário em si
    ).then(
        () => {
            feedbackDiv.textContent = 'E-mail enviado com sucesso! 🎉';
            feedbackDiv.style.color = 'green';
            e.target.reset(); // Limpa o formulário após o envio bem-sucedido
        },
        (error) => {
            feedbackDiv.textContent = 'Erro ao enviar e-mail. Tente novamente. 😞';
            feedbackDiv.style.color = 'red';
            console.error('Erro no EmailJS:', error); // Para depuração no console do navegador
        }
    ).finally(() => {
        submitButton.disabled = false; // Habilita o botão de volta, seja sucesso ou erro
    });
});

// --- 2. INTERATIVIDADE NOS BOTÕES "COMPRAR" ---
document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.dataset.nomeProduto; // Pega o nome do data-attribute
        const productPrice = parseFloat(this.dataset.precoProduto); // Pega o preço e converte para número

        // Exemplo simples: um alerta. Em um app real, aqui adicionaria ao carrinho.
        alert(`"${productName}" adicionado ao seu carrinho por R$ ${productPrice.toFixed(2)}/kg!`);
    });
});

// --- 3. BOTÃO "PEÇA AGORA" NO BANNER ---
document.querySelector('.btn-primario').addEventListener('click', function() {
    // Faz a página rolar suavemente para a seção de produtos
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
});