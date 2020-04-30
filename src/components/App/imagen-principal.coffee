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
        [0.005, "gate"]
        [0.025, "ichigo-maybe"]
        [0.05, "kabaneri"]
        [0.06, "loli-random"]
        [0.061, "random-girl"]
        [0.062, "random-girl-2"]
        [0.063, "random-girl-3"]
        [0.064, "random-girl-4"]
        [0.10, "re-zero"]
        [0.11, "tsuki-ga-kirei"]
        [0.20, "brand-new-animal"]
        [0.21, "hatsune-miku"]
        [0.25, "kimi-no-na-wa"]
        [0.30, "kimi-no-na-wa-2"]
        [0.31, "random-girl-5"]
        [0.35, "sao"]
        [0.45, "shingeki"]
        [0.50, "tokyo-ghoul"]
        [0.51, "uan-pis"]
        [0.75, "tamako_mainVisual_edit"]
        [1, "k-on_cover"]
    ]
    comparar valores
