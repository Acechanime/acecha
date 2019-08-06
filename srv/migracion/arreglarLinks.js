const con = require("../db").con;

let query = "";

const elems = [
    {
        "anime_id": 34,
        "sinopsis": "/tate-no-Yuusha-no-Nariagari/"
    },
    {
        "anime_id": 35,
        "sinopsis": "/my-roommate-is-a-cat/"
    },
    {
        "anime_id": 36,
        "sinopsis": "/yakusoku-no-neverland-online/"
    },
    {
        "anime_id": 37,
        "sinopsis": "/pastel-memories/"
    },
    {
        "anime_id": 38,
        "sinopsis": "/mob-psycho-100/"
    },
    {
        "anime_id": 61,
        "sinopsis": "/persona-5-the-animation/"
    },
    {
        "anime_id": 54,
        "sinopsis": "https://acechanime.com/Kaguya-sama-wa-Kokurasetai:-Tensai-tachi-no-Renai-Zunousen"
    },
    {
        "anime_id": 55,
        "sinopsis": "/domestic-na-kanojo/"
    },
    {
        "anime_id": 56,
        "sinopsis": "/ueno-san-wa-bukiyou/"
    },
    {
        "anime_id": 57,
        "sinopsis": "/overlord/"
    },
    {
        "anime_id": 58,
        "sinopsis": "/overlord-especiales/"
    },
    {
        "anime_id": 59,
        "sinopsis": "/kakegurui/"
    },
    {
        "anime_id": 66,
        "sinopsis": "/goblin-slayer/"
    },
    {
        "anime_id": 63,
        "sinopsis": "/boku-no-hero-academia-two-heroes/"
    },
    {
        "anime_id": 64,
        "sinopsis": "/comic-girls/"
    },
    {
        "anime_id": 65,
        "sinopsis": "/seishun-buta-yarou-wa-bunny-girl-senpai-no-yume-wo-minai/"
    },
    {
        "anime_id": 67,
        "sinopsis": "/blend-s/"
    },
    {
        "anime_id": 68,
        "sinopsis": "/black-bullet/"
    },
    {
        "anime_id": 69,
        "sinopsis": "/hanebado/"
    },
    {
        "anime_id": 70,
        "sinopsis": "/kishuku-gakkou-no-juliet/"
    },
    {
        "anime_id": 71,
        "sinopsis": "/zombieland-saga/"
    },
    {
        "anime_id": 72,
        "sinopsis": "/inou-battle-wa-nichijou-kei-no-naka-de/"
    },
    {
        "anime_id": 73,
        "sinopsis": "/hundred/"
    },
    {
        "anime_id": 74,
        "sinopsis": "/gabriel-dropout/"
    },
    {
        "anime_id": 75,
        "sinopsis": "/yosuga-no-sora/"
    },
    {
        "anime_id": 76,
        "sinopsis": "/yosuga-no-sora-especiales/"
    },
    {
        "anime_id": 77,
        "sinopsis": "/saijaku-muhai-no-bahamut/"
    },
    {
        "anime_id": 78,
        "sinopsis": "/aura-maryuuin-kouga-saigo-no-tatakai/"
    },
    {
        "anime_id": 79,
        "sinopsis": "/rakudai-kishi-no-cavalry/"
    },
    {
        "anime_id": 80,
        "sinopsis": "/kissxsis/"
    },
    {
        "anime_id": 81,
        "sinopsis": "/sankarea/"
    },
    {
        "anime_id": 82,
        "sinopsis": "/elfen-lied/"
    },
    {
        "anime_id": 85,
        "sinopsis": "/kimi-no-na-wa/"
    },
    {
        "anime_id": 84,
        "sinopsis": "/noragami/"
    },
    {
        "anime_id": 92,
        "sinopsis": "/kobayashi-san-chi-no-maid-dragon/"
    },
    {
        "anime_id": 98,
        "sinopsis": "/astarotte-no-omocha/"
    },
    {
        "anime_id": 99,
        "sinopsis": "/no-game-no-life/"
    },
    {
        "anime_id": 100,
        "sinopsis": "/gamers/"
    },
    {
        "anime_id": 101,
        "sinopsis": "/prison-school/"
    },
    {
        "anime_id": 106,
        "sinopsis": "/koe-no-katachi/"
    },
    {
        "anime_id": 107,
        "sinopsis": "/no-game-no-life-especiales/"
    },
    {
        "anime_id": 1,
        "sinopsis": "/high-school-dxd-hero/"
    },
    {
        "anime_id": 2,
        "sinopsis": "/megalo-box/"
    },
    {
        "anime_id": 3,
        "sinopsis": "/yuragi-sou-no-yuuna-san/"
    },
    {
        "anime_id": 4,
        "sinopsis": "/island/"
    },
    {
        "anime_id": 5,
        "sinopsis": "/yuru-camp/"
    },
    {
        "anime_id": 6,
        "sinopsis": "/koi-wa-ameagari-no-you-ni/"
    },
    {
        "anime_id": 7,
        "sinopsis": "/high-score-girl/"
    },
    {
        "anime_id": 8,
        "sinopsis": "/sanrio-danshi/"
    },
    {
        "anime_id": 9,
        "sinopsis": "/citrus/"
    },
    {
        "anime_id": 10,
        "sinopsis": "/overlord-2/"
    },
    {
        "anime_id": 11,
        "sinopsis": "/ryuuou-no-oshigoto/"
    },
    {
        "anime_id": 12,
        "sinopsis": "/ramen-daisuki-koizumi-san/"
    },
    {
        "anime_id": 13,
        "sinopsis": "/gakuen-babysitters/"
    },
    {
        "anime_id": 14,
        "sinopsis": "/miira-no-kaikata/"
    },
    {
        "anime_id": 15,
        "sinopsis": "/junji-ito-collection/"
    },
    {
        "anime_id": 16,
        "sinopsis": "/darling-in-the-franxx/"
    },
    {
        "anime_id": 17,
        "sinopsis": "/death-march-kara-hajimaru-isekai-kyousoukyoku/"
    },
    {
        "anime_id": 18,
        "sinopsis": "/ore-no-kanojo-to-osananajimi-ga-shuraba-sugiru/"
    },
    {
        "anime_id": 19,
        "sinopsis": "/slow-start/"
    },
    {
        "anime_id": 20,
        "sinopsis": "/uma-musume-pretty-derby/"
    },
    {
        "anime_id": 21,
        "sinopsis": "/sao-alternative-gun-gale-online/"
    },
    {
        "anime_id": 22,
        "sinopsis": "/tokyo-ghoul-re/"
    },
    {
        "anime_id": 62,
        "sinopsis": "/boku-no-hero-academia-3/"
    },
    {
        "anime_id": 23,
        "sinopsis": "/karakai-jouzu-no-takagi-san/"
    },
    {
        "anime_id": 24,
        "sinopsis": "/violet-evergarden/"
    },
    {
        "anime_id": 25,
        "sinopsis": "/hataraku-saibou-tv/"
    },
    {
        "anime_id": 26,
        "sinopsis": "/harukana-receive/"
    },
    {
        "anime_id": 27,
        "sinopsis": "/overlord-3/"
    },
    {
        "anime_id": 28,
        "sinopsis": "/grand-blue/"
    },
    {
        "anime_id": 29,
        "sinopsis": "/shingeki-no-kyojin-3/"
    },
    {
        "anime_id": 30,
        "sinopsis": "/happy-sugar-life/"
    },
    {
        "anime_id": 31,
        "sinopsis": "/dororo/"
    },
    {
        "anime_id": 32,
        "sinopsis": "/kakegurui-xx/"
    },
    {
        "anime_id": 33,
        "sinopsis": "/mob-psycho-100-2/"
    },
    {
        "anime_id": 109,
        "sinopsis": "/juuou-mujin-no-fafnir/"
    },
    {
        "anime_id": 110,
        "sinopsis": "/taimadou-gakuen-35-shiken-shoutai/"
    },
    {
        "anime_id": 112,
        "sinopsis": "/gotoubun-no-hanayome/"
    },
    {
        "anime_id": 113,
        "sinopsis": "/date-a-live-III/"
    },
    {
        "anime_id": 114,
        "sinopsis": "/haiyore-nyaruko-san/"
    },
    {
        "anime_id": 115,
        "sinopsis": "/fullmetal-alchemist-brotherhood/"
    },
    {
        "anime_id": 116,
        "sinopsis": "/one-punch-man/"
    },
    {
        "anime_id": 117,
        "sinopsis": "/a-i-c-o-incarnation/"
    },
    {
        "anime_id": 118,
        "sinopsis": "https://acechanime.com/Diamond-no-Ace:-Act-II"
    },
    {
        "anime_id": 119,
        "sinopsis": "/kono-yo-no-hate-de-koi-wo-utau-shoujo-yu-no/"
    },
    {
        "anime_id": 120,
        "sinopsis": "/one-punch-man-2/"
    },
    {
        "anime_id": 121,
        "sinopsis": "https://acechanime.com/Bakumatsu:-Crisis"
    },
    {
        "anime_id": 122,
        "sinopsis": "/senryuu-shoujo/"
    },
    {
        "anime_id": 123,
        "sinopsis": "/kimetsu-no-yaiba/"
    },
    {
        "anime_id": 124,
        "sinopsis": "/Hitoribocchi-no-Marumaru-Seikatsu/"
    },
    {
        "anime_id": 125,
        "sinopsis": "/boku-tachi-wa-benkyou-ga-dekinai/"
    },
    {
        "anime_id": 127,
        "sinopsis": "/joshikausei/"
    },
    {
        "anime_id": 129,
        "sinopsis": "/nobunaga-sensei-no-osanazuma/"
    },
    {
        "anime_id": 130,
        "sinopsis": "/midara-na-ao-chan-wa-benkyou-ga-dekinai/"
    },
    {
        "anime_id": 133,
        "sinopsis": "/fruits-basket/"
    },
    {
        "anime_id": 132,
        "sinopsis": "/chou-kadou-girl-1-6-amazing-stranger/"
    },
    {
        "anime_id": 134,
        "sinopsis": "/mix-meisei-story/"
    },
    {
        "anime_id": 135,
        "sinopsis": "/kono-oto-tomare/"
    },
    {
        "anime_id": 151,
        "sinopsis": "/Isekai-Quartet/"
    },
    {
        "anime_id": 141,
        "sinopsis": "/shoumetsu-toshi/"
    },
    {
        "anime_id": 143,
        "sinopsis": "/hachigatsu-no-cinderella-nine/"
    },
    {
        "anime_id": 152,
        "sinopsis": "/kenja-no-mago/"
    },
    {
        "anime_id": 138,
        "sinopsis": "/yatogame-chan-kansatsu-nikki/"
    },
    {
        "anime_id": 137,
        "sinopsis": "https://acechanime.com/mayonaka-no-occult-koumuin "
    },
    {
        "anime_id": 145,
        "sinopsis": "/namu-amida-butsu-rendai-utena/"
    },
    {
        "anime_id": 149,
        "sinopsis": "/strike-witches-501-butai-hasshin-shimasu/"
    },
    {
        "anime_id": 148,
        "sinopsis": "/sewayaki-kitsune-no-senko-san/"
    },
    {
        "anime_id": 146,
        "sinopsis": "/robihachi/"
    },
    {
        "anime_id": 144,
        "sinopsis": "/gunjou-no-magmel/"
    },
    {
        "anime_id": 142,
        "sinopsis": "/nande-koko-ni-sensei-ga/"
    },
    {
        "anime_id": 136,
        "sinopsis": "/fairy-gone/"
    },
    {
        "anime_id": 153,
        "sinopsis": "/carole-tuesday/"
    },
    {
        "anime_id": 154,
        "sinopsis": "/sarazanmai/"
    },
    {
        "anime_id": 155,
        "sinopsis": "/han-gyaku-sei-million-arthur-2nd-season/"
    },
    {
        "anime_id": 156,
        "sinopsis": "/bungou-stray-dogs-3rd-season/"
    },
    {
        "anime_id": 157,
        "sinopsis": "/shingeki-no-kyojin-3-parte-2/"
    },
    {
        "anime_id": 158,
        "sinopsis": "/miru-tights/"
    },
    {
        "anime_id": 159,
        "sinopsis": "/one-piece/"
    },
    {
        "anime_id": 160,
        "sinopsis": "/choujigen-game-neptune-the-animation/"
    },
    {
        "anime_id": 161,
        "sinopsis": "/katsute-kami-datta-kemono-tachi-e/"
    },
    {
        "anime_id": 162,
        "sinopsis": "/tejina-senpai/"
    },
    {
        "anime_id": 164,
        "sinopsis": "/sounan-desu-ka/"
    },
    {
        "anime_id": 165,
        "sinopsis": "/araburu-kisetsu-no-otome-domo-yo/"
    },
    {
        "anime_id": 166,
        "sinopsis": "/enen-no-shouboutai/"
    },
    {
        "anime_id": 167,
        "sinopsis": "/11547-2/"
    },
    {
        "anime_id": 168,
        "sinopsis": "/maou-sama-retry/"
    },
    {
        "anime_id": 169,
        "sinopsis": "/dungeon-ni-deai-wo-motomeru-no-wa-machigatteiru-darou-ka-ii/"
    },
    {
        "anime_id": 180,
        "sinopsis": "/arifureta-shokugyou-de-sekai-saikyou/"
    },
    {
        "anime_id": 171,
        "sinopsis": "/kanata-no-astra/"
    },
    {
        "anime_id": 170,
        "sinopsis": "/granbelm/"
    },
    {
        "anime_id": 172,
        "sinopsis": "/katsute-kami-datta-kemono-tachi-e/"
    },
    {
        "anime_id": 173,
        "sinopsis": "/dr-stone/"
    },
    {
        "anime_id": 174,
        "sinopsis": "/tensei-shitara-slime-datta-ken-ova/"
    },
    {
        "anime_id": 175,
        "sinopsis": "/lord-el-melloi-ii-sei-no-jikenbo-rail-zeppelin-grace-note/"
    },
    {
        "anime_id": 176,
        "sinopsis": "/uchi-no-ko-no-tame-naraba-ore-wa-moshikashitara-maou-mo-taoseru-kamo-shirenai/"
    },
    {
        "anime_id": 177,
        "sinopsis": "/lord-el-melloi-ii-sei-no-jikenbo-rail-zeppelin-grace-note/"
    },
    {
        "anime_id": 178,
        "sinopsis": "/majimoji-rurumo-kanketsu-hen-ova/"
    },
    {
        "anime_id": 179,
        "sinopsis": "/senki-zesshou-symphogear-xv/"
    },
    {
        "anime_id": 181,
        "sinopsis": "/kawaikereba-hentai-demo-suki-ni-natte-kuremasu-ka/"
    },
    {
        "anime_id": 182,
        "sinopsis": "/karakai-jouzu-no-takagi-san-2/"
    },
    {
        "anime_id": 183,
        "sinopsis": "/tsuujou-kougeki-ga-zentai-kougeki-de-ni-kai-kougeki-no-okaasan-wa-suki-desu-ka/"
    },
    {
        "anime_id": 184,
        "sinopsis": "/kochouki-wakaki-nobunaga/"
    }
];

elems.forEach(a => {
    query += `UPDATE animes SET ruta='${ a.sinopsis }' WHERE anime_id=${a.anime_id};`;
});

con.query(query)
    .then(() => console.log("Nice!"))
    .catch(err => {
        console.log(err);
    });