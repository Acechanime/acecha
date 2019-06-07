export manejarError = (err, codigo, vm) ->
    console.error "Error al cargar los ultimos episodios.\n#{err}"
    vm.cargaFallida = yes
    vm.codigoDeError = codigo
