export manejarError =
    methods:
        manejarError: (err, codigo) ->
            vm = this
            console.error "Error al cargar los ultimos episodios.\n#{err}"
            vm.cargaFallida = yes
            vm.codigoDeError = codigo
#
