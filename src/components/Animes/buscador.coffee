###: [(a -> Bool)] -> a -> Bool ###
export comp = (fs) => (elem) =>
    estado = true
    fs.forEach (f) =>
        estado =
            if estado
                f elem
            else
                false
    estado


#:    ([(Contexto, Anime) -> Bool], (Contexto, Anime) -> Prioridad)
#: -> (Contexto, Anime)
#: -> Prioridad
export comp2 = (funciones, funcionPrioridad) => (vm, a) =>
    if comp(funciones)(a)
        funcionPrioridad vm, a
    else
        1



export removerCaracteres = (str, strArr) =>
    caracs = strArr.split ""
    arr = (str.split "").map (c) =>
        res = caracs.filter (c2) => c == c2
        if res.length == 1 then " " else c

    arr.join("").toLowerCase().split(" ")



#: def Prioridad = Num
#: (Contexto, Anime) -> Prioridad
export filtroNombre = (vm, a) ->
    if vm.nombre.length is 0 then return 1

    palabras = removerCaracteres a.info.nombre, "-:"
    nombre = removerCaracteres vm.nombre, "-:"

    if nombre.length is 0 then return 1

    # strDebug = "/-----------------------\nProbando #{a.info.nombre}\n"

    prioridad = 0
    for p2 in nombre
        if p2.length is 1 then continue

        for p1 in palabras
            if (p1.search p2) != -1
                prioridadNueva = Math.pow(p2.length, 2)
                prioridad += prioridadNueva
                # strDebug += "Encontrado ´#{p2}´ en ´#{p1}´ con p=#{prioridadNueva}\n"
                break

    # console.log (strDebug + "Res: Prioridad #{prioridad}")
    prioridad



#: (Contexto, Anime) -> Bool
export filtroEstado = (vm, a) ->
    # Cualquier estado
    if vm.estado is -1 then true
    # Finalizado
    else if vm.estado is 0
        a.emision.en_emision is false or a.emision.en_emision is null
    # En emision
    else if vm.estado is 1
        a.emision.en_emision is true
    # Edge case (?)
    else true



#: (Contexto, Anime) -> Bool
export filtroGenero = (vm, a) ->
    if vm.genero is -1 then true
    else
        res = a.info.generos?.find (g) -> g == vm.genero
        res?



#: (Contexto, [Anime], ((Contexto, Anime) -> Prioridad)) -> [Anime]
export filtrar = (vm, elementos, filtro, limite) ->
    #: [(Anime, Num)]
    resultado = []
    for anime in elementos
        resultadoLocal = filtro vm, anime
        if resultadoLocal > 0
            resultado.push [anime, resultadoLocal]

    elems = resultado.sort (elem1, elem2) =>
        if elem1[1] > elem2[1] then - 1
        else 1

    # console.log elems

    if limite?
        i = 0
        for [anime, prioridad] in elems
            i++
            if i > limite then break
            anime
    else
        for [anime, prioridad] in elems
            anime



