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


export removerCaracteres = (str, strArr) =>
    caracs = strArr.split ""
    arr = (str.split "").map (c) =>
        res = caracs.filter (c2) => c == c2
        if res.length == 1 then " " else c
    arr.join("").toLowerCase().split(" ")
