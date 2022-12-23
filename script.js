const section = document.querySelectorAll('.js-scroll')
console.log(section)
const windowMetade = window.innerHeight * 0.6;

function animaScroll(){
    section.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top - windowMetade;
        if(sectionTop < 0){
            section.classList.add('ativo');
        }
    });

}
animaScroll();

window.addEventListener('scroll', animaScroll);
//////////////////////////////////////////////



let experienciaEContato = document.getElementById('experiencia-contato')
let contatoHide = document.getElementById('experiencia-contato-function')
let windowUserWidth = window.innerWidth


function changeExEContato(){
    if(windowUserWidth<=900){
        experienciaEContato.innerText = 'Experiência'
        contatoHide.classList.toggle('hidden')
    }     
}
changeExEContato()