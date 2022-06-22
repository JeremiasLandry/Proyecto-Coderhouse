'use strict';
//1. Aplicacion que evalua el promedio de alumnos

const app = $('.app');

$(document).ready(function(){
	if(localStorage.getItem('luz') !== null){
		$('.switch').click();
	}
})


window.addEventListener('hashchange',()=>{
	if(location.hash === "#/pages/materias.html"){
		//1.1 ESTA ES LA SECCION EN LA QUE SE MUESTRA LA LISTA DE MATERIAS DE LA ESCUELA
			app.html(`
			<h1 class='week-day ${lightOnOff()}'>Materias</h1>
			<div class='cardsContainer-parent'>
			</div>	`);
		
		//EN ESTE JSON SE ENCUENTRA INFORMACION SOBRE LAS MATERIAS (Nombre,foto,alt) PARA RELLENAR LAS CARDS
		const URLGET = "../data/materias.json";
		//IMPRIMIMOS LAS CARDS QUE NOS MOSTRARAN LAS MATERIAS DE LA ESCUELA.
		$(document).ready(() => { 
			$.get(URLGET, function (respuesta, estado) {
				if(estado === "success"){
					let misDatos = respuesta;
					for (const dato of misDatos) {
							$(".cardsContainer-parent").append(`<div class="cardsContainer">
							<div class="card ${lightOnOff()} h-100">
								<img src="${dato.imagen}" class="card-img-top" alt="${dato.alt}">
								<div class="card-body">
									<h5 class="card-title">${dato.materia}</h5>
								</div>
							</div>
						</div>`);
					}  
				}
			});
		});

	}else if(location.hash === "#/pages/profesores.html"){
		//1.2 EN ESTA SECCION SE MUESTRAN LOS PROFESORES DE LA ESCUELA
			app.html(`
					  <h1 class='week-day ${lightOnOff()}'>CONÓCE A LOS PROFESORES</h1>
					  <div class='cardsContainer-parent'>
					  </div>`)
		const URLGET = "../data/profesores.json";
		//IMPRIMIMOS LA INFORMACION EN FORMATO DE CARD
		$(document).ready(() => { 
			$.get(URLGET, function (respuesta, estado) {
				if(estado === "success"){
				let misDatos = respuesta;
				for (const dato of misDatos) {
					
						$(".cardsContainer-parent").append(`
						<div class="cardsContainer">
							  <div class="card ${lightOnOff()} h-100">
								<img src="${dato.fotoUrl}" class="card-img-top" alt="...">
								<div class="card-body">
									  <h5 class="card-title">${dato.nombre}</h5>
									  <p class="card-text">${dato.materia}</p>
								   </div>
							  </div>
							</div>
						`);
							  }  
						  }
					  });
				  });
	}else if (location.hash === "#/pages/alumnos.html"){
		if (localStorage.getItem("listaAlumnos") === null){
			$('.app').html(`
							<div>
								<div>
									<p class='week-day'>NO HAY ALUMNOS EN EL REGISTRO</p>
									<p class='todays-subject'>Prueba a añadir alumnos en el Inicio.</p>
								</div>
							</div>
							`)
		}else{
			    $('.registroAlumnos').html(``)
			//SI EL LOCALSTORAGE TIENE KEYS (ALUMNOS) GUARDADAS, LAS MOSTRAMOS EN PANTALLA
				let student = localStorage.getItem('listaAlumnos');
				let alumnoParse = JSON.parse(student);
				$('.registroAlumnos').prepend(`<div class="accordion accordion-flush" id="accordionFlushExample"></div>`);

				for (let alumno of alumnoParse){
					$('.accordion').append(
												`
														<div class='accordion-item main rounded'>
															<h2 class="accordion-header" id="flush-heading${alumno.apellido}">
																<button class="accordion-button collapsed acordionTitulo ${lightOnOff()}" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${alumno.apellido}" aria-expanded="false" aria-controls="flush-collapse${alumno.apellido}">
																	${alumno.nombre} ${alumno.apellido}
																</button>
															</h2>
															<div id="flush-collapse${alumno.apellido}" class="accordion-collapse collapse" aria-labelledby="flush-heading${alumno.apellido}" data-bs-parent="#accordionFlushExample">
																<div class="accordion-body">
																	<p class="previewUser ${lightOnOff()}">Edad: <span>${alumno.edad}</span></p>
																	<p class="previewUser ${lightOnOff()}">Promedio Final: <span>${alumno.promedioFinal}</span></p>
																</div>
															</div>
														</div><br>
												 `
												);
				}
			
		}
		
	}
})

//Lista que usaremos para almacenar a los alumnos
let listaAlumnos = [];

//PAGINA 'ALUMNOS' (MAIN PAGE)

// 1.3. IMPRIMIMOS LO QUE TENEMOS GUARDADO EN EL LOCALSTORAGE (OBJETIVO: IMPRIMIR EL REGISTRO DE ALUMNOS EN PANTALLA)
if (localStorage.getItem("listaAlumnos") === null){
	$('.registroAlumnos').append(`
								<div class='main'>
									<div>
										<p class='previewUser'>NINGÚN ALUMNO FUE AÑADIDO RECIENTEMENTE</p>
										<p class='previewResult'>Prueba a añadir alumnos en el boton de arriba.</p>
									</div>
								</div>
								`)
}else{
	//SI EL LOCALSTORAGE TIENE KEYS (ALUMNOS) GUARDADAS, LAS MOSTRAMOS EN PANTALLA
		let student = localStorage.getItem('listaAlumnos');
		let alumnoParse = JSON.parse(student)
		for (let alumno of alumnoParse){
			$('.main').html(
							`
							<p class='previewUser'>${alumno.nombre} ${alumno.apellido}</p>
							<p class='previewResult'>HA SIDO AÑADIDO AL REGISTRO DE ALUMNOS <a href='#'>Ver más.</a></p>
							`
							);
		}
	
}

//Contenedor INFO de la derecha.
  //Obtenemos el dia de la semana
const date = new Date();

const dayOfWeek = date.toLocaleDateString('es-MX', {
    weekday: 'long',
})
 //Obtenemos las materias del día
let todaysSubject;

switch (dayOfWeek) {
	case 'lunes':
	  todaysSubject = 'Historia y Geografía';
	  break;
	case 'martes':
	  todaysSubject = 'Matematica y Biología';
	  break;
	case 'miércoles':
	  todaysSubject = 'Geografía y Química';
	  break;
	case 'jueves':
	  todaysSubject = 'Historia y Matematica';
	  break;
	case 'viernes':
		todaysSubject = 'Física y Biología'
		break
	default:
	  todaysSubject = 'Hoy no hay Clases.'
  }


//Inyectamos el codigo a el contendor derecho
$('.info-container').prepend(`
							 <h2 class='week-day'>${dayOfWeek}</h2>
							 <h3 class='todays-subject'>Clases de hoy:<span> ${todaysSubject}</span></h3>
  							 <h4>Mensaje de hoy:</h4>
							 <span>SE SUSPENDE EL EVENTO DEPORTIVO DEL VIERNES QUE VIENE, POR FALTA DE JUGADORES.</span>
							`)

