document.addEventListener("DOMContentLoaded", function() {
    const messageTextarea = document.getElementById("mensagem");
    const characterCount = document.querySelector(".character-count");

    messageTextarea.addEventListener("input", function() {
        const currentLength = messageTextarea.value.length;
        characterCount.textContent = `${currentLength}/300`;

        if (currentLength > 300) {
            messageTextarea.setCustomValidity("Máximo de 300 caracteres atingido.");
        } else {
            messageTextarea.setCustomValidity("");
        }
    });
});
//////////////////////////////////////


document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.querySelector(".success-message");
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const titulo = document.getElementById("titulo").value;
        const mensagem = document.getElementById("mensagem").value;

        const data = {
            nome: nome,
            email: email,
            titulo: titulo,
            mensagem: mensagem
        };
        fetch('https://contatemeapiportifolio.azurewebsites.net/api/PostEmail?code=cG9zdGVtYWls', {

        //fetch('http://localhost:7164/api/PostEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                successMessage.classList.remove('hidden');
                return response.json();
            } else if (response.status === 400) {
                return response.text(); // Receber a mensagem de erro como texto
            } else {
                throw new Error('Erro ao enviar mensagem');
            }
        })
        .then(data => {
            if (typeof data === 'string') {
                // Exibe a mensagem de erro em um prompt
                alert('Erro: ' + data);
            } else {
                // Ação a ser tomada em caso de sucesso, como exibir uma mensagem de confirmação
                console.log('Mensagem enviada com sucesso', data);
            }
        })
        .catch(error => {
            // Ação a ser tomada em caso de erro, como exibir uma mensagem de erro
            if (error.message === 'Erro ao enviar mensagem') {
                alert('Erro ao enviar mensagem. Verifique os dados inseridos.');
            } else if(error.menssage === 'Inseridos na base de dados!') {
                alert('Dados inseridos na base de dados');
                console.error(error)
            }
        });
    });
});