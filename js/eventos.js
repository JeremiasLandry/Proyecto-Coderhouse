//5.EVENTOS
 //5.1 AGREGAMOS FUNCIONALIDAD AL BOTON 'ELIMINAR REGISTRO'
$('.Eliminar-Button').click(addDeleteClass);
//5.2 AGREGAMOS FUNCIONALIDAD AL BOTON 'AÑADIR ALUMNO'.
$('.buttonGroup-Add').click(Modal)
//5.3 AGREGAMOS FUNCIONALIDAD AL BOTON 'MODO DIA/NOCHE'
$('.switch').click(()=>{
    $('body').toggleClass('light');
    $('h1').toggleClass('light');
    $('.buttonGroup-Add').toggleClass('light');
    $('.Eliminar-Button').toggleClass('light');
    $('.navbar').toggleClass('light');
    $('.navbar-nav').toggleClass('light');
    $('.logo').toggleClass('light');
    $('.nav-link').toggleClass('light');
    $('.card').toggleClass('light');
    $('.modal').toggleClass('light');
    $('.app').toggleClass('light');
    $('.registroAlumnos').toggleClass('light');
    $('.info-container').toggleClass('light');
    $('.todays-subject').toggleClass('light');
    $('.acordionTitulo').toggleClass('light');
    $('.nav-mobile').toggleClass('light');
    $('.nav-ul').toggleClass('light');
    $('.nav-item').toggleClass('light');
    localStorage.setItem('luz','true');
    

    if ($('body').hasClass('light')){
        $('.switch').children('.link-text').text('Modo Noche');
        $('.switch').children('i').removeClass('fas fa-sun');
        $('.switch').children('i').addClass('fas fa-moon');
    }else{
        localStorage.removeItem('luz');
        $('.switch').children('.link-text').text('Modo Día');
        $('.switch').children('i').removeClass('fas fa-moon');
        $('.switch').children('i').addClass('fas fa-sun');
    }
})