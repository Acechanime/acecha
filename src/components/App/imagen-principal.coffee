#: [(Num, Txt)] -> Txt
comparar = (valores) =>
    num = Math.random()
    nuevaImg = "/img/portada/you-kei.webp"
    for [valor, img] in valores
        if num <= valor
            nuevaImg = "/img/portada/" + img + ".webp"
            break

    nuevaImg


export escogerImg = =>
    num = Math.random()
    valores = [
        [0.01, "you-kei"]
        [0.04, "gate"]
        [0.08, "ichigo-maybe"]
        [0.12, "kabaneri"]
        [0.16, "loli-random"]
        [0.20, "random-girl"]
        [0.24, "random-girl-2"]
        [0.28, "random-girl-3"]
        [0.32, "random-girl-4"]
        [0.36, "re-zero"]
        [0.40, "tsuki-ga-kirei"]
        [0.44, "brand-new-animal"]
        [0.48, "hatsune-miku"]
        [0.52, "kimi-no-na-wa"]
        [0.56, "kimi-no-na-wa-2"]
        [0.60, "random-girl-5"]
        [0.64, "sao"]
        [0.68, "shingeki"]
        [0.72, "tokyo-ghoul"]
        [0.76, "uan-pis"]
        [0.87, "tamako_mainVisual_edit"]
        [1, "k-on_cover"]
    ]
    comparar valores
