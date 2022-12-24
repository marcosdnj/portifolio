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



window.addEventListener('resize', changeExEContato);



function changeExEContato(){
    console.log(window.innerWidth)
    if(windowUserWidth<850){
        experienciaEContato.innerText = 'Experiência'
        contatoHide.classList.toggle('hidden')
    }
    else{
        experienciaEContato.innerText = 'Experiência & Contato'
        contatoHide.classList.toggle('hidden')
    }
}
window.addEventListener('resize', changeExEContato);