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

    const contactForm = document.getElementById("contactForm");
    const successMessage = document.querySelector(".success-message");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const lastSentTime = localStorage.getItem("lastSentTime");
        const currentTime = new Date().getTime();

        // Verifica se pode enviar a mensagem
        if (!lastSentTime || currentTime - parseInt(lastSentTime) >= 30000) {
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

           // fetch('https://contatemeapiportifolio.azurewebsites.net/api/PostEmail?code=cG9zdGVtYWls', {
            fetch('http://localhost:7164/api/PostEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status === 200) {
                    successMessage.textContent = "Mensagem enviada com sucesso!";
                    successMessage.classList.remove('hidden');
                    localStorage.setItem("lastSentTime", currentTime.toString());
                    return response.json();
                } else if (response.status === 400) {
                    return response.text();
                } else {
                    throw new Error('Erro ao enviar mensagem');
                }
            })
            .then(data => {
                if (typeof data === 'string') {
                    alert('Erro: ' + data);
                } else {
                    console.log('Mensagem enviada com sucesso', data);
                }
            })
            .catch(error => {
                if (error.message === 'Erro ao enviar mensagem') {
                    alert('Erro ao enviar mensagem. Verifique os dados inseridos.');
                } else {
                    console.error('Erro ao se comunicar com o servidor:', error);

                    // Tente converter a resposta para JSON
                    try {
                        const jsonResponse = error.response.json();
                        console.error('Resposta JSON inválida:', jsonResponse);
                    } catch (jsonError) {
                        console.error('Erro ao analisar resposta JSON:', jsonError);
                    }

                }
            });
        } else {
            // Calcula o tempo restante até que a pessoa possa enviar outra mensagem
            const elapsedTime = currentTime - parseInt(lastSentTime);
            const timeRemaining = Math.max(0, 30000 - elapsedTime);
            const secondsRemaining = Math.ceil(timeRemaining / 1000);

            // Exibe uma mensagem indicando quanto tempo falta para enviar outra mensagem
            successMessage.textContent = `Você poderá enviar uma nova mensagem em ${secondsRemaining}s.`;
            successMessage.classList.remove('hidden');
            successMessage.classList.add('error-message'); // Adiciona a classe "error-message"
        }

        // Oculta a mensagem de sucesso após 3 segundos
        setTimeout(function() {
            successMessage.classList.add('hidden');
            successMessage.classList.remove('error-message'); // Remove a classe "error-message"
        }, 5000);
    });
});
