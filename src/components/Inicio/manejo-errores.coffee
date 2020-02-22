export manejarError = (err, codigo, vm) ->
    console.error "Error al cargar recurso.\n#{err}"
    vm.cargaFallida = yes
    vm.codigoDeError = codigo
