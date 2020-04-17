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
        [0.001, "you-kei"]
        [0.01, "gate"]
        [0.05, "ichigo-maybe"]
        [0.09, "kabaneri"]
        [0.12, "loli-random"]
        [0.15, "random-girl"]
        [0.18, "random-girl-2"]
        [0.21, "random-girl-3"]
        [0.24, "random-girl-4"]
        [0.30, "re-zero"]
        [0.31, "tsuki-ga-kirei"]
        [0.40, "brand-new-animal"]
        [0.41, "hatsune-miku"]
        [0.45, "kimi-no-na-wa"]
        [0.50, "kimi-no-na-wa-2"]
        [0.52, "random-girl-5"]
        [0.55, "sao"]
        [0.60, "shingeki"]
        [0.63, "tokyo-ghoul"]
        [0.66, "uan-pis"]
        [0.80, "tamako_mainVisual_edit"]
        [1, "k-on_cover"]
    ]
    comparar valores
