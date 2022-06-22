let registro = [];

//4.FUNCIONES  
        //4.1 Calcula el promedio de las notas del alumno en todas las materias
function Promedio(nota){
    let cantidad = materias.length;
    return nota / cantidad;
}
     //4.2 Funcion que verifica si el modo dia esta encendido.
function lightOnOff(){
    if($('body').hasClass('light')){
        return 'light'
    }
}
         //4.3 Funcion que crea el modal con el form para registrar a un alumno en la pagina 'alumnos'
function Modal(){
    $('body').prepend(`<div class="modalContainer">
                           <div class='modal ${lightOnOff()}'>
                               <form>
                                    <p class='tituloModal'>INGRESE LOS SIGUIENTES DATOS</p>
                                    <div class = 'datos'>
                                        <input placeholder='Nombre del Alumno' class='datosAlumno' type="text" id="fname" name="fname" required><br>
                                        <input placeholder='Apellido del Alumno' class='datosAlumno' type="text" id="lname" name="lname" required><br>
                                        <input placeholder='Edad del Alumno' class='datosAlumno' type="text" id="age" name="age" required><br>
                                    </div>
                                    <p class='tituloModal'>CALIFICACION DEL ALUMNO</p>
                                    <div class='grupoDeMaterias'>
                                        <div class='materiasGrupo1'>
                                            <label class='materia' for="matematica">Calificacion en Matematica:</label>
                                            <input type="number" class='${lightOnOff()}' id="matematica" name="matematica"
                                            min="1" max="10"><br>
                                            <label class='materia' for="biologia">Calificación en Biología:</label>
                                            <input type="number" class='${lightOnOff()}' id="biologia" name="biologia"
                                             min="1" max="10">
                                        </div>
                                        <div class='materiasGrupo2'>
                                            <label class='materia' for="quimica">Calificación en Quimica:</label>
                                            <input type="number" class='${lightOnOff()}' id="quimica" name="quimica"
                                            min="1" max="10"><br>
                                            <label class='materia' for="fisica">Calificación en Física:</label>
                                            <input type="number" class='${lightOnOff()}' id="fisica" name="fisica"
                                            min="1" max="10">
                                        </div>
                                        <div class='materiasGrupo3'>
                                            <label class='materia dekstop' for="historia">Calificación en Historia:</label>
                                            <input type="number" class='${lightOnOff()} dekstop' id="historia" name="historia"
                                            min="1" max="10"><br>
                                            <label class='materia dekstop' for="geografia">Calificación en Geografía:</label>
                                            <input type="number" class='${lightOnOff()} dekstop' id="geografia" name="geografia"
                                            min="1" max="10">
                                        </div>
                                    </div>
                                        <div class='grupoDeMaterias2'>
                                            <div class='mobile1'>
                                                <label class='materia' for="historia">Calificación en Historia:</label>
                                                <input type="number" class='${lightOnOff()}' id="historia" name="historia"
                                                min="1" max="10"><br>
                                            </div>
                                            <div class='mobile2'>
                                                <label class='materia' id='geo-label' for="geografia">Calificación en Geografía:</label>
                                                <input type="number" class='${lightOnOff()}' id="geografia" name="geografia"
                                                min="1" max="10">
                                            </div>
                                        </div>
                                    <div class='modalBtnGroup'>
                                        <button type="button"  onclick='deleteModal()' class='btn-type2'>CANCELAR</button>
                                        <button type="button" onclick='almacenarValores()' class='btn-type1'>CALCULAR PROMEDIO</button>
                                    </div>
                                </form>
                            </div>
                        </div>`);
            
}
        // 4.4 Función que elimina el modal
        
function deleteModal(){
     $('.modalContainer').remove();
}
        //4.5 Funcion que almacena los valores de los inputs, y agrega una vista previa de los resultados del alumno a la pagina principal.
 
const almacenarValores = () =>{
    filledInput = 0; //se resetea el valor de filledInput
    //se suma la cantidad de inputs rellenados
    $('#fname, #lname, #age, #matematica, #historia, #geografia, #fisica, #quimica, #biologia').each(function() {
        if ($(this).val() != '') {
            filledInput++;
        }
    });
    //si todos los inputs fueron llenados, le da funcionalidad al botón 
    if (filledInput >= 9){
     // Sumamos todas las calificaciones (NOTAS) y dividimos esa suma por la cantidad  de materias.
        let nota = parseInt($('#matematica').val()) + parseInt($('#biologia').val()) + parseInt($('#quimica').val()) + parseInt($('#historia').val()) + parseInt($('#fisica').val()) + parseInt($('#geografia').val());
        notaFinal += nota;
        let promedioFinal = parseInt(Promedio(notaFinal));
        // Comparacion para saber si el alumno aprobó o desaprobó. Se mostrara el resultado en un bloque de codigo en la pagina principal.
        
        $('.main').html(`           
                        <p class='previewUser'>${$('#fname').val()} ${$('#lname').val()}</p>
                        <p class='previewResult'>HA SIDO AÑADIDO AL REGISTRO DE ALUMNOS</p>
                       `);
         
        // Crea un objeto alumno con los datos entregados por el usuario
        const alumno1 = new Alumno($('#fname').val().toUpperCase(),$('#lname').val().toUpperCase(),$('#age').val(),promedioFinal);
            
        // Agrega el alumno al Storage, para poder ver el registro cuando recargues la página.
        //Si en LocalStorage hay algo guardado, entonces actualizamos la lista con el nuevo alumno
        if (localStorage.getItem("listaAlumnos") !== null){
            const oldInfo = JSON.parse(localStorage.getItem('listaAlumnos'));
            oldInfo.push(alumno1);
            localStorage.setItem(`listaAlumnos`, JSON.stringify(oldInfo));
        }else{
        //Si no hay nada guardado, almacenamos la lista en localStorage por primera vez
            listaAlumnos.push(alumno1);
            localStorage.setItem(`listaAlumnos`, JSON.stringify(listaAlumnos));
        }
        //Por ultimo, el modal se elimina, para poder volver a la pagina principal y ver los resultados.
        deleteModal();
        notaFinal = 0;
    }
}
        //4.6 Función que le da funcionalidad al boton 'Eliminar registro'.
let filesToDelete = [];

const deleteFile = (event) =>{
    let nombre =  $(event.target).siblings('.previewUser').text().toUpperCase();
    const [first, last] = nombre.split(' ');
    console.log(first + ' ' + last);
    filesToDelete.push(last);
    $(event.target).parent().remove()
    if ( $('.delete-files-filesContainer').children().length <= 0 ) {
        $('.delete-files-filesContainer').html(`<p class='todaysSubject'>No hay registros que eliminar.</p>`)
    }
}

const acceptDeletion = ()=>{
    let prev_items = JSON.parse(localStorage.getItem('listaAlumnos'));
    let nuevaLista = [];
    for (const i of filesToDelete) {
        nuevaLista = prev_items.filter((prod) => prod.apellido !== i);
        if(nuevaLista.length === 0){
            localStorage.removeItem('listaAlumnos');
            break
        }else{
            localStorage.setItem(`listaAlumnos`, JSON.stringify(nuevaLista));
        }
    }
    deleteModal();
}

const dynamicFiles = () => {
    let student = localStorage.getItem('listaAlumnos');
    let alumnoParse = JSON.parse(student)
    let filesHTML = '';
    for (let alumno of alumnoParse){
        filesHTML += `
                        <div class='main ${lightOnOff()}'>
                           <p class='previewUser ${lightOnOff()}'>${alumno.nombre} ${alumno.apellido}</p>
                           <button type='button' onclick='deleteFile(event)' class='btn-type3'>Eliminar</button>
                        </div>
                     `
    }
    return filesHTML;
}

const addDeleteClass = ()=>{
    if(localStorage.getItem("listaAlumnos") !== null){
        if(localStorage.getItem('listaAlumnos') === []){
            localStorage.removeItem('listaAlumnos')
        }else{
            $('body').prepend(`<div class="modalContainer delete-files ${lightOnOff()}">
                                <div class='modal ${lightOnOff()}'>
                                    <h1 class='week-day'>ELIMINA UN REGISTRO</h1>
                                    <div class='delete-files-filesContainer ${lightOnOff()}'>
                                        ${dynamicFiles()}
                                    </div>
                                    <div class='d-flex mb-2'>
                                        <button type='button' onclick='deleteModal()' class='btn-type2'>CANCELAR CAMBIOS</button>
                                        <button type='button' onclick='acceptDeletion()' class='btn-type1'>ACEPTAR</button>
                                    </div>
                                </div>
                               </div> 
                              `);
            if ( $('.delete-files-filesContainer').children().length <= 0 ) {
                $('.delete-files-filesContainer').html(`<p class='todaysSubject'>No hay registros que eliminar.</p>`)
            }
        }
    }
}