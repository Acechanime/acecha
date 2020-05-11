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
    valores = [
        [0.001, "you-kei"]
        [0.01, "gate"]
        [0.05, "ichigo-maybe"]
        [0.09, "kabaneri"]
        [0.10, "loli-random"]
        [0.101, "random-girl"]
        [0.102, "random-girl-2"]
        [0.103, "random-girl-3"]
        [0.104, "random-girl-4"]
        [0.15, "re-zero"]
        [0.151, "tsuki-ga-kirei"]
        [0.25, "brand-new-animal"]
        [0.26, "hatsune-miku"]
        [0.35, "kimi-no-na-wa"]
        [0.45, "kimi-no-na-wa-2"]
        [0.46, "random-girl-5"]
        [0.50, "sao"]
        [0.55, "shingeki"]
        [0.58, "tokyo-ghoul"]
        [0.60, "uan-pis"]
        [0.80, "tamako_mainVisual_edit"]
        [1, "k-on_cover"]
    ]
    comparar valores
