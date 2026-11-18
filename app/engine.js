// Fichier généré par tools/build_app.py à partir de tools/atelier.html. Ne pas modifier à la main.

// ---------- Données ----------
// nom, latin, type, expo(s=soleil,m=mi-ombre,o=ombre), sol(a=argileux,c=calcaire,s=sableux/caillouteux,h=humifère), eau(d=sec,f=frais,w=humide),
// rusticité °C, supporte la chaleur (1/0), hauteur cm, floraison [début,fin] ou null, famille couleur, teinte, note
const RAW = [
["Lavandin 'Grosso'","Lavandula × intermedia","arbuste","s","cs","d",-15,1,70,[6,8],"froid","#8A73C4","Parfumé, mellifère. Taille après floraison."],
["Romarin","Salvia rosmarinus","aromatique","s","cs","d",-10,1,100,[2,5],"froid","#9DB6E0","Persistant, fleurit dès la fin de l'hiver."],
["Ciste pourpre","Cistus × purpureus","arbuste","s","csa","d",-10,1,100,[5,6],"rose","#D46A9A","Très résistant à la sécheresse."],
["Sauge d'Afghanistan","Salvia yangii (Perovskia)","arbuste","s","csa","df",-20,1,120,[7,10],"froid","#8EA0D8","Feuillage argenté, floraison longue."],
["Abélia","Abelia × grandiflora","arbuste","sm","ach","f",-12,1,150,[6,10],"blanc","#F1E4EA","Semi-persistant, fleurit tout l'été."],
["Hortensia","Hydrangea macrophylla","arbuste","mo","ha","fw",-15,0,120,[6,9],"froid","#7E9BD6","Bleu en sol acide, rose en sol neutre. Craint le calcaire."],
["Hortensia paniculé 'Limelight'","Hydrangea paniculata","arbuste","sm","ahc","f",-25,1,180,[7,10],"blanc","#E8F0C8","Plus robuste au soleil que l'hortensia classique."],
["Céanothe 'Concha'","Ceanothus","arbuste","s","sh","d",-12,1,200,[4,5],"froid","#3E5BC2","Persistant, bleu intense au printemps."],
["Laurier-tin","Viburnum tinus","arbuste","smo","acsh","df",-15,1,250,[11,3],"blanc","#F4F1F1","Fleurit en hiver. Bonne base persistante."],
["Oranger du Mexique","Choisya ternata","arbuste","sm","ahc","f",-12,1,180,[4,5],"blanc","#FAFAF2","Fleurs parfumées, feuillage aromatique."],
["Sarcococca","Sarcococca confusa","arbuste","mo","ach","f",-15,1,80,[12,2],"blanc","#F6F3E8","Parfum puissant en plein hiver."],
["Myrte","Myrtus communis","arbuste","s","sh","d",-8,1,200,[6,8],"blanc","#FBFBF4","Persistant méditerranéen, fleurs étoilées."],
["Pittosporum nain","Pittosporum tobira 'Nana'","arbuste","sm","csh","df",-8,1,80,[5,6],"blanc","#F7F4E2","Boule persistante sans taille."],
["Germandrée arbustive","Teucrium fruticans","arbuste","s","cs","d",-8,1,150,[3,6],"froid","#B5C6E8","Feuillage argenté, supporte le vent."],
["Spirée du Japon","Spiraea japonica","arbuste","sm","acsh","f",-25,1,60,[6,8],"rose","#E07AA7","Petit arbuste facile."],
["Cornouiller 'Midwinter Fire'","Cornus sanguinea","arbuste","sm","acsh","fw",-25,1,200,[5,6],"chaud","#E8853A","Bois orange flamboyant en hiver."],
["Stipa cheveux d'ange","Nassella tenuissima","graminee","s","csa","d",-10,1,50,[6,8],"chaud","#D8C48A","Mouvement au moindre souffle."],
["Miscanthus 'Morning Light'","Miscanthus sinensis","graminee","sm","ahc","f",-25,1,150,[9,11],"vert","#C9CDB8","Graphique, tient tout l'hiver."],
["Herbe aux écouvillons 'Hameln'","Pennisetum alopecuroides","graminee","s","ach","fd",-15,1,60,[8,10],"blanc","#E6DCC4","Épis duveteux en fin d'été."],
["Calamagrostis 'Karl Foerster'","Calamagrostis × acutiflora","graminee","sm","ahc","fw",-25,1,180,[6,9],"chaud","#D2B36E","Port vertical, verticalité au massif."],
["Laîche 'Ice Dance'","Carex morrowii","graminee","mo","ah","fw",-15,1,30,[4,5],"vert","#C8D8A8","Feuillage panaché persistant."],
["Fétuque bleue","Festuca glauca","graminee","s","sc","d",-25,1,25,[6,7],"froid","#9DB7C4","Touffe bleutée pour la bordure."],
["Herbe du Japon","Hakonechloa macra","graminee","mo","h","f",-20,0,40,[8,9],"chaud","#D9C255","Cascade dorée à l'ombre."],
["Muhlenbergia","Muhlenbergia capillaris","graminee","s","sca","d",-12,1,80,[9,11],"rose","#D86FA3","Nuage rose en automne."],
["Gaura","Oenothera lindheimeri","vivace","s","cs","df",-15,1,80,[5,10],"blanc","#F6EEF0","Floraison continue, papillons blancs."],
["Achillée 'Terracotta'","Achillea millefolium","vivace","s","csa","d",-25,1,70,[6,9],"chaud","#D27A3A","Ombelles plates, couleur qui évolue."],
["Échinacée pourpre","Echinacea purpurea","vivace","s","ach","fd",-20,1,90,[7,9],"rose","#C9558A","Têtes séchées décoratives en hiver."],
["Rudbeckia 'Goldsturm'","Rudbeckia fulgida","vivace","sm","ahc","f",-25,1,60,[7,10],"chaud","#F0B21C","Jaune lumineux jusqu'en automne."],
["Népéta","Nepeta × faassenii","vivace","s","csa","df",-25,1,40,[5,9],"froid","#8F8BD0","Remonte si on la rabat après la 1re floraison."],
["Sauge des bois 'Caradonna'","Salvia nemorosa","vivace","s","cs","df",-20,1,50,[5,9],"froid","#5C3FA3","Épis violet foncé sur tiges noires."],
["Euphorbe des garrigues","Euphorbia characias","vivace","sm","cs","d",-12,1,100,[3,5],"vert","#C2D44A","Persistante. Sève irritante."],
["Verveine de Buenos Aires","Verbena bonariensis","vivace","s","cs","df",-8,1,150,[6,10],"froid","#8A5BC7","Transparente, se ressème."],
["Géranium 'Rozanne'","Geranium","vivace","sm","ahc","f",-20,1,50,[5,10],"froid","#6F78D6","Une des floraisons les plus longues."],
["Heuchère","Heuchera","vivace","mo","ha","f",-20,1,35,[5,7],"rose","#7A3A55","Cultivée pour son feuillage pourpre."],
["Hellébore d'Orient","Helleborus × hybridus","vivace","mo","ach","f",-15,1,40,[1,3],"blanc","#EBD9DF","Fleurit au cœur de l'hiver."],
["Fougère mâle","Dryopteris filix-mas","vivace","mo","hac","fw",-30,1,100,null,"vert","#6E8F4E","Feuillage seul, très rustique."],
["Hosta","Hosta","vivace","mo","ha","fw",-30,0,50,[7,8],"froid","#B8A9D8","Grandes feuilles. Attention aux limaces."],
["Anémone du Japon 'Honorine Jobert'","Anemone × hybrida","vivace","sm","ahc","f",-25,1,100,[8,10],"blanc","#FFFFFF","Prend le relais en fin de saison."],
["Astilbe","Astilbe","vivace","mo","h","wf",-25,0,60,[6,8],"rose","#E58AB0","Aime les sols toujours frais."],
["Orpin d'automne","Hylotelephium 'Herbstfreude'","vivace","s","csa","d",-25,1,50,[8,10],"rose","#B85A6A","Succulent, adoré des abeilles."],
["Tritoma","Kniphofia","vivace","s","sac","df",-12,1,100,[6,9],"chaud","#EE7B2B","Torches verticales."],
["Valériane rouge","Centranthus ruber","vivace","s","cs","d",-15,1,70,[5,9],"rose","#C84455","Pousse même dans les murs."],
["Agapanthe","Agapanthus","vivace","s","sh","f",-10,1,80,[7,8],"froid","#6C8FE0","Boules bleues en plein été."],
["Hémérocalle","Hemerocallis","vivace","sm","ach","fd",-25,1,70,[6,9],"chaud","#E8822C","Increvable, une fleur par jour."],
["Iris des jardins","Iris germanica","vivace","s","cs","d",-20,1,80,[4,5],"froid","#6A4BB0","Rhizomes à fleur de terre."],
["Vergerette","Erigeron karvinskianus","couvre-sol","sm","csa","df",-10,1,30,[5,10],"blanc","#F4E1E6","Petites marguerites d'avril à novembre."],
["Brunnera 'Jack Frost'","Brunnera macrophylla","vivace","mo","ha","f",-25,0,40,[4,5],"froid","#7EA3E6","Feuilles argentées, fleurs type myosotis."],
["Alchémille","Alchemilla mollis","vivace","sm","ach","f",-25,1,40,[6,7],"vert","#D6DC6A","Retient les gouttes de rosée."],
["Digitale","Digitalis purpurea","vivace","sm","hsa","f",-25,0,120,[5,7],"rose","#C46CA4","Bisannuelle qui se ressème. Toxique."],
["Thym serpolet","Thymus serpyllum","couvre-sol","s","cs","d",-25,1,8,[6,7],"rose","#D88EC0","Tapis aromatique, supporte le piétinement léger."],
["Petite pervenche","Vinca minor","couvre-sol","mo","ach","fd",-25,1,15,[3,5],"froid","#7F86D6","Couvre-sol persistant pour l'ombre sèche."],
["Géranium à grosses racines","Geranium macrorrhizum","couvre-sol","mos","ach","df",-25,1,30,[5,6],"rose","#D477A2","Feuillage parfumé, supporte l'ombre sèche."],
["Épimède","Epimedium × perralchicum","couvre-sol","mo","hac","df",-20,1,30,[4,5],"chaud","#E8CC3A","Résiste aux racines des arbres."],
["Lamier 'White Nancy'","Lamium maculatum","couvre-sol","mo","ha","f",-20,0,20,[5,7],"blanc","#F5F5F0","Éclaire les coins sombres."],
["Herbe aux turquoises","Ophiopogon japonicus","couvre-sol","mos","ah","f",-12,1,20,[7,8],"vert","#4F7A4A","Tapis persistant très dense."],
["Oreille d'ours","Stachys byzantina","couvre-sol","s","cs","d",-15,1,30,[6,7],"blanc","#D9DCD4","Feuillage argenté et duveteux."],
["Bugle rampante","Ajuga reptans","couvre-sol","mo","ah","fw",-25,1,15,[4,6],"froid","#4C5BC0","Feuillage bronze selon variétés."],
["Ail d'ornement 'Purple Sensation'","Allium hollandicum","bulbe","s","csa","df",-25,1,80,[5,6],"froid","#7A4CC0","Sphères violettes au-dessus des vivaces."],
["Narcisse 'Thalia'","Narcissus","bulbe","sm","ach","f",-25,1,35,[3,4],"blanc","#FBFBEF","Se naturalise. À planter en automne."],
["Camassia","Camassia leichtlinii","bulbe","sm","ah","fw",-25,0,70,[5,6],"froid","#7B95E0","Aime les sols frais, même humides."],
["Crocosmia 'Lucifer'","Crocosmia","bulbe","sm","sh","f",-12,1,100,[7,9],"chaud","#D63A2A","Rouge vif, feuillage en lame."],
["Muscari","Muscari armeniacum","bulbe","sm","csa","df",-25,1,15,[3,4],"froid","#3E55B8","Tapis bleu au printemps."],
["Cyclamen de Naples","Cyclamen hederifolium","bulbe","mo","ch","df",-15,1,12,[9,10],"rose","#E08AB4","Feuilles marbrées tout l'hiver."],
["Jasmin étoilé","Trachelospermum jasminoides","grimpante","sm","ach","df",-12,1,400,[6,7],"blanc","#FFFFFF","Persistant, parfum intense."],
["Clématite 'Étoile Violette'","Clematis viticella","grimpante","sm","ach","f",-20,1,300,[7,9],"froid","#5B3A9A","Pied à l'ombre, tête au soleil."],
["Rosier grimpant 'New Dawn'","Rosa","grimpante","sm","ahc","f",-20,1,400,[6,10],"rose","#F2C9CF","Remontant, résistant aux maladies."],
["Chèvrefeuille des bois","Lonicera periclymenum","grimpante","ms","ahc","f",-20,1,400,[6,9],"blanc","#F1E2B8","Parfum en soirée."],
["Rosier de Banks","Rosa banksiae 'Lutea'","grimpante","sm","acs","df",-12,1,600,[4,5],"chaud","#EED36A","Sans épines, très résistant à la sécheresse une fois installé. Floraison massive au printemps."],
["Bignone 'Madame Galen'","Campsis × tagliabuana","grimpante","s","acsh","df",-15,1,600,[7,9],"chaud","#E0662A","Trompettes orange tout l'été. Vigoureuse et drageonnante : à contenir."],
["Hortensia grimpant","Hydrangea anomala petiolaris","grimpante","om","ha","f",-25,0,600,[6,7],"blanc","#F6F6EC","Pour un mur au nord."],
["Pin des montagnes","Pinus mugo","arbuste","s","acs","df",-30,0,150,null,"vert","#4A6B35","Conifère nain persistant, structure toute l'année."],
["Thuya boule 'Danica'","Thuja occidentalis","arbuste","sm","ach","f",-30,1,100,null,"vert","#6E9455","Boule persistante compacte, sans taille."],
["Photinia 'Red Robin'","Photinia × fraseri","arbuste","sm","ash","df",-12,1,300,[4,5],"blanc","#F3EFE6","Jeunes pousses rouge vif. Jaunit en sol calcaire."],
["Éléagnus","Elaeagnus × ebbingei","arbuste","smo","acsh","df",-15,1,400,[10,11],"blanc","#EFEBDD","Pousse vite, supporte vent et sécheresse. Fleurs parfumées en automne."],
["Laurier du Portugal","Prunus lusitanica","arbuste","smo","ach","df",-15,1,400,[5,6],"blanc","#F8F6EE","Persistant brillant, très opaque."],
["Osmanthe","Osmanthus × burkwoodii","arbuste","sm","ach","f",-15,1,250,[4,5],"blanc","#FBF8EE","Parfum de jasmin au printemps."],
["Filaire","Phillyrea angustifolia","arbuste","s","cs","d",-15,1,300,[3,4],"blanc","#EEF0DA","Persistant local, résiste à la sécheresse."],
["Arbousier","Arbutus unedo","arbuste","sm","ash","df",-12,1,400,[10,12],"blanc","#F4ECD8","Fleurs et fruits rouges à l'automne. Préfère les sols non calcaires."],
["Escallonia","Escallonia","arbuste","s","ash","df",-10,1,250,[6,9],"rose","#D86A8C","Floraison estivale longue."],
["Bambou non traçant","Fargesia murielae","arbuste","sm","ah","f",-20,1,300,null,"vert","#7BA05B","Pousse en touffe, ne drageonne pas, contrairement aux bambous traçants."],
["Savonnier","Koelreuteria paniculata","arbre","s","acs","df",-15,1,800,[7,8],"chaud","#E8C33A","Petit arbre, grappes jaunes en été puis lanternes en automne."],
["Lilas des Indes","Lagerstroemia indica","arbre","s","ach","df",-15,1,500,[7,9],"rose","#D9468C","Floraison spectaculaire en plein été, écorce décorative."],
["Arbre de Judée","Cercis siliquastrum","arbre","s","cs","d",-15,1,600,[4,5],"rose","#C8559C","Fleurs roses sur le bois nu au printemps. Aime le calcaire."],
["Laurier-sauce","Laurus nobilis","arbuste","smo","acs","df",-10,1,600,[3,4],"chaud","#E6D88A","Persistant aromatique, forme un grand écran."],
["Chêne vert","Quercus ilex","arbuste","s","acs","d",-15,1,800,null,"vert","#4B5E3A","Persistant méditerranéen très résistant à la sécheresse. Se taille en haie haute."],
["Pittosporum à petites feuilles","Pittosporum tenuifolium","arbuste","sm","acsh","df",-8,1,500,[4,5],"vert","#6C8F55","Feuillage léger et persistant, croissance rapide."],
["Agastache 'Tutti Frutti'","Agastache","vivace","s","csa","d",-15,1,80,[7,10],"rose","#D97AA8","Épis roses parfumés, très mellifère, aime la chaleur."],
["Sauge arbustive 'Hot Lips'","Salvia microphylla","vivace","s","csa","d",-12,1,100,[5,11],"chaud","#D23B46","Fleurs rouges et blanches de mai aux gelées."],
["Échinops","Echinops ritro","vivace","s","csa","d",-20,1,80,[7,9],"froid","#6F8BD8","Boules bleu acier, adorées des abeilles."],
["Acanthe","Acanthus mollis","vivace","mo","acs","df",-12,1,100,[6,8],"blanc","#E8E2EE","Grandes feuilles découpées, supporte l'ombre sèche. Peut s'étendre."],
["Céanothe arborescent 'Trewithen Blue'","Ceanothus arboreus","arbuste","s","acs","d",-8,1,500,[3,5],"froid","#5A7BD0","Le céanothe le plus haut, pousse très vite. Floraison bleue au printemps."],
["Laurier-rose","Nerium oleander","arbuste","s","acs","d",-10,1,350,[5,10],"rose","#E2558C","Fleurit tout l'été sans eau. Toutes les parties sont toxiques."],
["Buisson ardent","Pyracantha coccinea","arbuste","sm","acs","df",-20,1,350,[5,6],"chaud","#E0582E","Pousse vite, épineux, baies orange en hiver. Bonne haie défensive."],
["Arroche marine","Atriplex halimus","arbuste","s","csa","d",-12,1,250,null,"vert","#AEB9AE","Feuillage argenté persistant, pousse très vite en sol sec."],
["Sauge officinale","Salvia officinalis","aromatique","s","cs","d",-15,1,60,[5,6],"froid","#8F7FC8","Feuillage gris persistant."],
["Origan","Origanum vulgare","aromatique","s","csa","d",-15,1,50,[7,9],"rose","#D69ABF","Très mellifère."],
["Ciboulette","Allium schoenoprasum","aromatique","sm","ahc","f",-20,1,30,[5,6],"rose","#C9A0D8","Pompons comestibles."],
// ---- Ajouts : chaque fiche porte ses propres informations (eau 1/2/3, pousse, persistant, mellifère, styles, forme, feuillage gris)
// ---- Arbustes persistants, haies sèches
["Alaterne","Rhamnus alaternus","arbuste","smo","acs","d",-15,1,400,[3,4],"vert","#9CB24A","Persistant local de garrigue, très résistant à la sécheresse. Baies pour les oiseaux.",{eau:1,pousse:"moyenne",pers:true,mel:true,styles:["med","sauvage","contemporain"]}],
["Pistachier lentisque","Pistacia lentiscus","arbuste","s","cs","d",-8,1,300,[4,5],"vert","#7A8F3A","Persistant méditerranéen aromatique, supporte vent et embruns.",{eau:1,pousse:"lente",pers:true,mel:false,styles:["med","sauvage"]}],
["Coronille glauque","Coronilla valentina subsp. glauca","arbuste","s","cs","d",-12,1,100,[2,5],"chaud","#F2C62E","Fleurs jaunes parfumées en plein hiver, feuillage bleuté.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med"],gris:true}],
["Buplèvre ligneux","Bupleurum fruticosum","arbuste","sm","cs","d",-12,1,200,[6,8],"chaud","#D9C440","Persistant gris-vert, ombelles jaunes en été. Supporte l'ombre sèche.",{eau:1,pousse:"moyenne",pers:true,mel:true,styles:["med","sauvage"]}],
["Phlomis frutescent","Phlomis fruticosa","arbuste","s","cs","d",-12,1,120,[5,7],"chaud","#E6B422","Feuillage gris laineux, fleurs jaunes en étages. Increvable en sol sec.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med","nat"],gris:true}],
["Santoline","Santolina chamaecyparissus","arbuste","s","cs","d",-12,1,50,[6,7],"chaud","#F0D232","Petite boule argentée, pompons jaunes. Se taille après floraison.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med","contemporain"],gris:true}],
["Immortelle d'Italie","Helichrysum italicum","arbuste","s","cs","d",-12,1,50,[6,8],"chaud","#E8C730","Feuillage argenté à odeur de curry, très résistant au sec.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med"],gris:true}],
["Ciste blanc","Cistus × hybridus","arbuste","s","csa","d",-12,1,100,[5,6],"blanc","#F7F2EA","Couvert de fleurs blanches au printemps, sans arrosage.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med","sauvage"]}],
["Westringia","Westringia fruticosa","arbuste","s","sca","d",-7,1,150,[4,9],"blanc","#F2F0F6","Ressemble au romarin et se passe de taille. Craint les grands froids.",{eau:1,pousse:"moyenne",pers:true,mel:true,styles:["med","contemporain"],gris:true}],
["Grevillea","Grevillea rosmarinifolia","arbuste","s","sa","d",-10,1,150,[1,5],"rose","#D2453F","Fleurs rouges en araignée pendant l'hiver. Sol non calcaire.",{eau:1,pousse:"moyenne",pers:true,mel:true,styles:["med"]}],
["Rince-bouteille","Callistemon citrinus","arbuste","s","as","df",-7,1,250,[6,8],"chaud","#D8262E","Goupillons rouges spectaculaires. Préfère les sols peu calcaires.",{eau:2,pousse:"moyenne",pers:true,mel:true,styles:["med"],forme:"epi"}],
["Fusain du Japon","Euonymus japonicus","arbuste","smo","acsh","df",-15,1,300,[6,6],"vert","#5E8A3C","Persistant brillant, supporte l'ombre et les embruns. Haie facile.",{eau:2,pousse:"moyenne",pers:true,mel:false,styles:["contemporain"]}],
["Chèvrefeuille arbustif","Lonicera nitida","arbuste","smo","acsh","df",-20,1,200,[4,5],"vert","#6E9A48","Petites feuilles, se taille en haie ou en boule. Pousse vite.",{eau:2,pousse:"rapide",pers:true,mel:true,styles:["contemporain","sauvage"]}],
["Houx","Ilex aquifolium","arbuste","smo","acsh","f",-25,1,500,[5,5],"vert","#2F5A2A","Persistant d'ombre, baies rouges en hiver sur les pieds femelles.",{eau:2,pousse:"lente",pers:true,mel:true,styles:["sauvage","anglais"]}],
["If","Taxus baccata","arbuste","smo","acsh","df",-20,1,600,null,"vert","#2B4A26","Persistant dense qui supporte l'ombre et la taille. Toxique.",{eau:2,pousse:"lente",pers:true,mel:false,styles:["contemporain","anglais"],forme:"conifere"}],
["Osmanthe à feuilles de houx","Osmanthus heterophyllus","arbuste","smo","acsh","df",-15,1,300,[9,10],"blanc","#F5F2E6","Persistant piquant, fleurs très parfumées à l'automne.",{eau:2,pousse:"lente",pers:true,mel:true,styles:["anglais","contemporain"]}],
["Cotonéaster","Cotoneaster lacteus","arbuste","smo","acs","df",-15,1,350,[6,7],"blanc","#F2EEE2","Persistant, fleurs blanches puis baies rouges tout l'hiver.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["sauvage"]}],
["Céanothe 'Skylark'","Ceanothus thyrsiflorus 'Skylark'","arbuste","s","acs","d",-10,1,200,[5,6],"froid","#3D5FC4","Bleu intense, plus rustique que la plupart des céanothes.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med","nat"]}],
["Lavande vraie 'Hidcote'","Lavandula angustifolia 'Hidcote'","arbuste","s","cs","d",-20,1,50,[6,7],"froid","#6B4FB8","Compacte et très parfumée, idéale en bordure.",{eau:1,pousse:"moyenne",pers:true,mel:true,styles:["med","anglais","contemporain"],gris:true,forme:"epi"}],
["Lavande papillon","Lavandula stoechas","arbuste","s","sa","d",-7,1,60,[4,6],"froid","#6A3FA0","Épis surmontés de « papillons » violets. Sol non calcaire.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med"],gris:true,forme:"epi"}],
// ---- Arbustes à fleurs caducs
["Gattilier","Vitex agnus-castus","arbuste","s","csa","d",-12,1,300,[7,9],"froid","#8A82D8","Épis bleu lavande en plein été, adoré des abeilles.",{eau:1,pousse:"rapide",pers:false,mel:true,styles:["med","nat","sauvage"],forme:"epi"}],
["Caryoptéris","Caryopteris × clandonensis","arbuste","s","csa","d",-15,1,100,[8,10],"froid","#5B6FD0","Petit arbuste bleu de fin d'été, très mellifère.",{eau:1,pousse:"rapide",pers:false,mel:true,styles:["nat","med"]}],
["Dentelaire de Willmott","Ceratostigma willmottianum","arbuste","sm","csa","d",-12,1,90,[7,10],"froid","#2F4FD0","Fleurs bleu vif jusqu'en octobre, feuillage rouge à l'automne.",{eau:1,pousse:"moyenne",pers:false,mel:true,styles:["med","nat"]}],
["Hibiscus de Syrie","Hibiscus syriacus","arbuste","s","acsh","df",-20,1,250,[7,9],"rose","#C25A9E","Grandes fleurs tout l'été, se plaît en sol calcaire.",{eau:2,pousse:"moyenne",pers:false,mel:true,styles:["anglais"]}],
["Lilas","Syringa vulgaris","arbuste","s","acsh","df",-25,1,400,[4,5],"froid","#9C7CC8","Floraison parfumée en mai. Aime le calcaire.",{eau:2,pousse:"moyenne",pers:false,mel:true,styles:["anglais"]}],
["Seringat","Philadelphus coronarius","arbuste","sm","acsh","f",-20,1,250,[5,6],"blanc","#FBFAF3","Fleurs blanches au parfum d'oranger en juin.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["anglais"]}],
["Deutzia","Deutzia × hybrida","arbuste","sm","acsh","f",-20,1,150,[6,7],"rose","#F0C9DA","Pluie de petites fleurs roses au printemps.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["anglais"]}],
["Weigela","Weigela florida","arbuste","sm","acsh","f",-25,1,200,[5,6],"rose","#D9457E","Floraison généreuse en mai, arbuste facile.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["anglais"]}],
["Rosier glauque","Rosa glauca","arbuste","sm","acs","df",-25,1,200,[6,7],"rose","#D57A9C","Feuillage pourpre bleuté, fleurs simples puis fruits rouges.",{eau:1,pousse:"rapide",pers:false,mel:true,styles:["nat","sauvage","anglais"]}],
["Rosier rugueux","Rosa rugosa","arbuste","s","as","df",-25,1,150,[6,10],"rose","#C2306E","Increvable et très parfumé, gros fruits rouges.",{eau:1,pousse:"rapide",pers:false,mel:true,styles:["sauvage","anglais"]}],
["Arbre à perruque","Cotinus coggygria 'Royal Purple'","arbuste","s","acs","d",-20,1,300,[6,7],"rose","#C09AAE","Feuillage pourpre, plumets vaporeux en été.",{eau:1,pousse:"moyenne",pers:false,mel:false,styles:["contemporain","nat"]}],
// ---- Haie champêtre locale
["Viorne lantane","Viburnum lantana","arbuste","sm","acs","d",-25,1,350,[4,5],"blanc","#F3EFDF","Arbuste local des sols calcaires secs. Baies pour les oiseaux.",{eau:1,pousse:"moyenne",pers:false,mel:true,styles:["sauvage"]}],
["Viorne obier","Viburnum opulus","arbuste","sm","ach","fw",-30,1,350,[5,6],"blanc","#F6F5EC","Boules blanches au printemps, baies rouges translucides.",{eau:3,pousse:"rapide",pers:false,mel:true,styles:["sauvage","anglais"]}],
["Noisetier","Corylus avellana","arbuste","smo","acsh","df",-25,1,500,[1,3],"chaud","#D8C35A","Chatons dès janvier, puis noisettes. Pilier de la haie champêtre.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["sauvage"]}],
["Aubépine","Crataegus monogyna","arbuste","sm","acs","d",-25,1,500,[4,5],"blanc","#FAF7F0","Haie défensive locale, refuge et nourriture pour les oiseaux.",{eau:1,pousse:"moyenne",pers:false,mel:true,styles:["sauvage"]}],
["Sureau noir","Sambucus nigra","arbuste","smo","ach","f",-30,1,500,[5,6],"blanc","#F4F1DE","Ombelles parfumées puis baies noires. Pousse très vite.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["sauvage"]}],
["Charmille","Carpinus betulus","arbuste","smo","acs","df",-30,1,500,null,"vert","#6F9A4A","Garde ses feuilles sèches en hiver : un écran presque toute l'année.",{eau:2,pousse:"moyenne",pers:false,mel:false,styles:["contemporain","sauvage"]}],
["Érable champêtre","Acer campestre","arbuste","smo","acs","d",-25,1,600,null,"chaud","#D8A93A","Haie ou petit arbre local, feuillage doré à l'automne.",{eau:1,pousse:"moyenne",pers:false,mel:true,styles:["sauvage"]}],
["Cornouiller mâle","Cornus mas","arbuste","smo","acs","df",-30,1,500,[2,3],"chaud","#E8C62C","Fleurs jaunes en février avant les feuilles, fruits comestibles.",{eau:1,pousse:"lente",pers:false,mel:true,styles:["sauvage"]}],
// ---- Arbres
["Olivier","Olea europaea","arbre","s","cs","d",-10,1,400,[5,6],"vert","#8FA392","Silhouette argentée, très résistant au sec. Craint les hivers très froids.",{eau:1,pousse:"lente",pers:true,mel:false,styles:["med","contemporain"],gris:true}],
["Arbre de soie","Albizia julibrissin","arbre","s","acs","df",-12,1,700,[7,9],"rose","#E58AB4","Pompons roses soyeux en été, ombre légère.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["med"]}],
["Érable de Montpellier","Acer monspessulanum","arbre","s","cs","d",-20,1,800,null,"chaud","#C9962E","Petit érable méditerranéen très résistant à la sécheresse.",{eau:1,pousse:"lente",pers:false,mel:true,styles:["med","sauvage"]}],
["Pommier d'ornement","Malus 'Evereste'","arbre","s","acsh","f",-25,1,600,[4,5],"blanc","#F6E8EC","Floraison blanche au printemps, petites pommes décoratives.",{eau:2,pousse:"moyenne",pers:false,mel:true,styles:["anglais","sauvage"]}],
["Prunier pourpre","Prunus cerasifera 'Nigra'","arbre","s","acs","df",-20,1,600,[3,4],"rose","#F2C7D6","Feuillage pourpre, nuage de fleurs roses en mars.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["anglais"]}],
["Lilas de Perse","Melia azedarach","arbre","s","acs","d",-10,1,800,[5,6],"froid","#B9A6E0","Grappes mauves parfumées, ombre légère. Fruits toxiques.",{eau:1,pousse:"rapide",pers:false,mel:true,styles:["med"]}],
["Tamaris","Tamarix ramosissima","arbre","s","acs","d",-15,1,400,[7,9],"rose","#E3A0C0","Plumeaux roses, supporte le vent, le sel et la sécheresse.",{eau:1,pousse:"rapide",pers:false,mel:true,styles:["med","nat"]}],
["Amélanchier","Amelanchier lamarckii","arbre","sm","ah","f",-25,1,500,[4,5],"blanc","#FAF7F2","Fleurs blanches, baies pour les oiseaux, couleurs d'automne.",{eau:2,pousse:"moyenne",pers:false,mel:true,styles:["anglais","sauvage","nat"]}],
// ---- Vivaces de soleil
["Sauge de Graham","Salvia greggii","vivace","s","csa","d",-12,1,70,[5,11],"rose","#D63B6E","Petite sauge arbustive qui fleurit de mai aux gelées.",{eau:1,pers:true,mel:true,styles:["med","nat"],forme:"boule"}],
["Sauge sclarée","Salvia sclarea","vivace","s","cs","d",-15,1,100,[6,7],"rose","#D9B6D6","Grandes hampes rose lilas. Bisannuelle qui se ressème.",{eau:1,mel:true,styles:["med","nat","sauvage"],forme:"epi"}],
["Sauge 'Amistad'","Salvia 'Amistad'","vivace","s","acs","df",-7,1,120,[6,11],"froid","#4B2A90","Grands épis violet profond tout l'été et l'automne.",{eau:2,mel:true,styles:["nat","anglais"],forme:"epi"}],
["Calament","Clinopodium nepeta","vivace","s","csa","d",-20,1,40,[7,10],"blanc","#E9E2F2","Nuage de petites fleurs blanc lilas, ruche à abeilles tout l'été.",{eau:1,mel:true,styles:["nat","med","sauvage"],forme:"nuage"}],
["Origan 'Herrenhausen'","Origanum laevigatum 'Herrenhausen'","vivace","s","csa","d",-12,1,40,[7,9],"rose","#A54C8C","Fleurs pourpres, feuillage bronze, très mellifère.",{eau:1,mel:true,styles:["nat","med","sauvage"],forme:"ombelle"}],
["Panicaut des Pyrénées","Eryngium bourgatii","vivace","s","cs","d",-20,1,50,[6,8],"froid","#7C9AC8","Chardon bleu argenté, sculptural.",{eau:1,mel:true,styles:["med","nat"],forme:"globe"}],
["Panicaut plane","Eryngium planum","vivace","s","csa","d",-25,1,80,[7,8],"froid","#5F7FC9","Petites têtes bleu acier qui tiennent en bouquet sec.",{eau:1,mel:true,styles:["nat"],forme:"globe"}],
["Molène","Verbascum olympicum","vivace","s","cs","d",-20,1,180,[6,8],"chaud","#F1CC2A","Grandes hampes jaunes au-dessus d'une rosette argentée. Se ressème.",{eau:1,mel:true,styles:["med","nat","sauvage"],forme:"epi",gris:true}],
["Asphodéline jaune","Asphodeline lutea","vivace","s","cs","d",-15,1,90,[5,6],"chaud","#F2C537","Épis jaunes parfumés, feuillage fin bleuté.",{eau:1,mel:true,styles:["med"],forme:"epi"}],
["Scabieuse colombaire","Scabiosa columbaria","vivace","s","cs","d",-25,1,40,[6,10],"froid","#A9A6E6","Pompons lavande légers, butinés tout l'été.",{eau:1,mel:true,styles:["nat","sauvage","anglais"]}],
["Knautie de Macédoine","Knautia macedonica","vivace","s","csa","d",-20,1,70,[7,9],"rose","#8E1F48","Pompons pourpres sur tiges fines, effet prairie.",{eau:1,mel:true,styles:["nat","sauvage"],forme:"nuage"}],
["Penstemon 'Garnet'","Penstemon 'Garnet'","vivace","sm","acs","df",-12,1,70,[7,10],"rose","#A3213F","Clochettes rouge grenat de juin à octobre.",{eau:2,mel:true,styles:["anglais","nat"],forme:"epi"}],
["Gaillarde","Gaillardia × grandiflora","vivace","s","sca","d",-20,1,50,[6,10],"chaud","#D9542A","Marguerites rouge et jaune tout l'été, aime la chaleur.",{eau:1,mel:true,styles:["nat"]}],
["Coréopsis 'Moonbeam'","Coreopsis verticillata 'Moonbeam'","vivace","s","acs","df",-20,1,40,[6,9],"chaud","#F2E38A","Petites étoiles jaune pâle sur un feuillage très fin.",{eau:2,mel:true,styles:["nat","anglais"]}],
["Hélénie","Helenium autumnale","vivace","s","ach","fw",-25,1,120,[7,10],"chaud","#D2642A","Marguerites cuivrées de fin d'été. Aime les sols frais.",{eau:3,mel:true,styles:["nat","anglais"]}],
["Aster de Frikart","Aster × frikartii 'Mönch'","vivace","s","ach","f",-25,1,80,[7,10],"froid","#8F8BE0","Marguerites bleu lavande de juillet aux gelées.",{eau:2,mel:true,styles:["anglais","nat"]}],
["Aster d'automne","Symphyotrichum novae-angliae","vivace","sm","ach","fw",-30,1,130,[9,10],"froid","#7A4FC2","Explosion violette en automne, dernière ressource des abeilles.",{eau:3,mel:true,styles:["anglais","nat","sauvage"]}],
["Grande marguerite","Leucanthemum × superbum","vivace","sm","ach","f",-30,1,70,[6,8],"blanc","#FFFFFF","La marguerite des jardins, généreuse et facile.",{eau:2,mel:true,styles:["anglais"]}],
["Coquelourde","Lychnis coronaria","vivace","s","csa","d",-25,1,70,[6,8],"rose","#C4166A","Fleurs magenta sur feuillage argenté laineux. Se ressème.",{eau:1,mel:true,styles:["anglais","med"],gris:true}],
["Fuchsia de Californie","Epilobium canum","vivace","s","csa","d",-12,1,40,[8,10],"chaud","#E24A2A","Trompettes rouge orangé en fin d'été, feuillage gris.",{eau:1,mel:true,styles:["med"],gris:true}],
["Ballote","Ballota pseudodictamnus","vivace","s","cs","d",-12,1,50,[6,7],"blanc","#DDE0D4","Boule de feuillage gris feutré, presque persistante.",{eau:1,pers:true,mel:true,styles:["med","contemporain"],gris:true,forme:"boule"}],
["Iris de Sibérie","Iris sibirica","vivace","sm","ah","fw",-30,1,80,[5,6],"froid","#4E52B8","Fines fleurs bleues, feuillage graphique. Aime les sols frais.",{eau:3,mel:true,styles:["anglais","nat"],forme:"epi"}],
["Lin vivace","Linum perenne","vivace","s","cs","d",-25,1,50,[5,7],"froid","#7AA2E8","Fleurs bleu ciel légères qui s'ouvrent chaque matin.",{eau:1,mel:true,styles:["nat","sauvage"],forme:"nuage"}],
["Bleuet vivace","Centaurea montana","vivace","sm","acs","df",-30,1,50,[5,7],"froid","#4A5ED0","Bleuets bleu intense au printemps, facile.",{eau:2,mel:true,styles:["anglais","sauvage"]}],
["Renouée amplexicaule","Persicaria amplexicaulis","vivace","sm","ah","fw",-25,1,110,[7,10],"rose","#B0204A","Épis rouges de juillet aux gelées, pour sols frais.",{eau:3,mel:true,styles:["nat","anglais"],forme:"epi"}],
["Sanguisorbe","Sanguisorba officinalis","vivace","sm","ah","fw",-30,1,120,[7,9],"rose","#7A1E3A","Petits pompons bordeaux sur tiges fines, effet prairie.",{eau:3,mel:true,styles:["nat","sauvage"],forme:"nuage"}],
// ---- Couvre-sols de soleil
["Germandrée petit-chêne","Teucrium chamaedrys","couvre-sol","s","cs","d",-20,1,30,[6,8],"rose","#C873A6","Petit couvre-sol persistant de garrigue, très mellifère.",{eau:1,pers:true,mel:true,styles:["med","sauvage"]}],
["Onagre rose","Oenothera speciosa","couvre-sol","s","csa","d",-15,1,30,[5,9],"rose","#F2B8CC","Coupes rose tendre, s'étale vite en sol pauvre.",{eau:1,mel:true,styles:["med","nat"]}],
["Hélianthème","Helianthemum nummularium","couvre-sol","s","cs","d",-20,1,25,[5,7],"chaud","#F0A830","Petit tapis fleuri pour les rocailles et les bords d'allée.",{eau:1,pers:true,mel:true,styles:["med"]}],
["Céraiste","Cerastium tomentosum","couvre-sol","s","csa","d",-30,1,20,[5,6],"blanc","#F6F6F1","Tapis argenté couvert de fleurs blanches en mai.",{eau:1,pers:true,mel:true,styles:["med","anglais"],gris:true}],
["Orpin bâtard","Phedimus spurius","couvre-sol","s","csa","d",-30,1,10,[7,8],"rose","#D26C8F","Couvre-sol succulent qui supporte tout, même un piétinement léger.",{eau:1,pers:true,mel:true,styles:["med","contemporain"]}],
["Géranium sanguin","Geranium sanguineum","couvre-sol","s","csa","d",-30,1,30,[5,8],"rose","#C2287C","Coussin couvert de fleurs magenta, résiste au sec.",{eau:1,mel:true,styles:["nat","anglais","sauvage"]}],
// ---- Ombre et ombre sèche
["Iris fétide","Iris foetidissima","vivace","mo","acs","d",-20,1,50,[5,6],"chaud","#E87B2A","Persistant pour l'ombre sèche, graines orange vif en hiver.",{eau:1,pers:true,mel:false,styles:["sauvage","contemporain"],forme:"touffe"}],
["Fragon","Ruscus aculeatus","arbuste","mo","acs","d",-15,1,60,null,"vert","#2F5A2A","Persistant local qui pousse à l'ombre sèche des arbres. Baies rouges.",{eau:1,pousse:"lente",pers:true,mel:false,styles:["sauvage","contemporain"]}],
["Fougère scolopendre","Asplenium scolopendrium","vivace","mo","acs","df",-25,1,40,null,"vert","#4E8A3A","Fougère persistante aux frondes en ruban, aime le calcaire.",{eau:2,pers:true,mel:false,styles:["anglais","contemporain","sauvage"],forme:"feuillage"}],
["Polystic à soies","Polystichum setiferum","vivace","mo","ach","df",-20,1,60,null,"vert","#5E8A3C","Fougère persistante très fine, tolère l'ombre sèche une fois installée.",{eau:2,pers:true,mel:false,styles:["anglais","contemporain"],forme:"fougere"}],
["Ellébore fétide","Helleborus foetidus","vivace","smo","acs","d",-25,1,60,[1,4],"vert","#B9CC5A","Feuillage découpé persistant, clochettes vertes en hiver. Ombre sèche.",{eau:1,pers:true,mel:true,styles:["sauvage","anglais"],forme:"feuillage"}],
["Bergénia","Bergenia cordifolia","couvre-sol","smo","acsh","df",-30,1,40,[2,4],"rose","#D2468A","Grandes feuilles persistantes, fleurs roses en fin d'hiver.",{eau:2,pers:true,mel:true,styles:["anglais","contemporain"],forme:"feuillage"}],
["Pulmonaire","Pulmonaria officinalis","couvre-sol","mo","ah","f",-30,0,30,[3,4],"froid","#8A6AC8","Feuilles tachetées d'argent, fleurs roses puis bleues au printemps.",{eau:3,mel:true,styles:["anglais","sauvage"],forme:"feuillage"}],
["Liriope","Liriope muscari","couvre-sol","smo","acsh","df",-15,1,35,[8,10],"froid","#7A5CC0","Touffes persistantes, épis violets en fin d'été. Ombre sèche.",{eau:2,pers:true,mel:true,styles:["contemporain"],forme:"touffe"}],
["Lierre","Hedera helix","couvre-sol","mo","acsh","d",-25,1,20,[9,11],"vert","#2F5A2A","Couvre-sol persistant pour l'ombre la plus sèche. Floraison d'automne très mellifère.",{eau:1,pers:true,mel:true,styles:["sauvage"]}],
["Luzule des bois","Luzula sylvatica","graminee","mo","ah","f",-25,1,40,[4,5],"vert","#5E8A3C","Graminée persistante d'ombre qui forme un tapis dense.",{eau:2,pers:true,styles:["sauvage","contemporain"],forme:"touffe"}],
["Anémone des bois","Anemone nemorosa","bulbe","mo","h","f",-30,0,15,[3,4],"blanc","#FBFBF6","Tapis de petites étoiles blanches au printemps, sous les arbres.",{eau:2,mel:true,styles:["sauvage","anglais"]}],
["Perce-neige","Galanthus nivalis","bulbe","mo","ach","f",-30,1,15,[1,2],"blanc","#FFFFFF","Premières fleurs de l'année, se naturalise sous les arbres.",{eau:2,mel:true,styles:["anglais","sauvage"]}],
["Cyclamen de Cos","Cyclamen coum","bulbe","mo","ach","df",-20,1,10,[1,3],"rose","#D63D84","Petites fleurs magenta en plein hiver.",{eau:2,mel:true,styles:["anglais","sauvage"]}],
// ---- Graminées
["Panic érigé","Panicum virgatum 'Heavy Metal'","graminee","s","acs","df",-30,1,120,[8,10],"froid","#9DB2C2","Touffe bleutée dressée, nuage de graines en automne.",{eau:2,styles:["nat","contemporain"],forme:"raide"}],
["Herbe aux écouvillons d'Orient","Pennisetum orientale 'Karley Rose'","graminee","s","csa","d",-15,1,70,[6,9],"rose","#D9A6C4","Épis rose poudré tout l'été.",{eau:1,styles:["nat","med"]}],
["Grand stipa","Stipa gigantea","graminee","s","csa","d",-20,1,200,[6,8],"chaud","#D9B46A","Épis dorés transparents qui dominent le massif.",{eau:1,styles:["nat","med","contemporain"],forme:"nuage"}],
["Calamagrostide argentée","Achnatherum calamagrostis","graminee","s","cs","d",-20,1,90,[6,9],"blanc","#E2D9C2","Plumets argentés qui ondulent, très tolérante au sec.",{eau:1,styles:["nat","med"]}],
["Miscanthus 'Gracillimus'","Miscanthus sinensis 'Gracillimus'","graminee","sm","ach","df",-25,1,150,[9,11],"chaud","#C9B07A","Feuillage très fin en fontaine, beau tout l'hiver.",{eau:2,styles:["nat","contemporain"]}],
["Avoine bleue","Helictotrichon sempervirens","graminee","s","cs","d",-25,1,60,[6,7],"froid","#8FA8B8","Touffe bleu argent persistante, très graphique.",{eau:1,pers:true,styles:["med","contemporain"],forme:"touffe"}],
["Seslérie d'automne","Sesleria autumnalis","graminee","smo","acs","df",-25,1,40,[8,10],"vert","#B7C74A","Touffe vert-jaune lumineuse, au soleil comme à l'ombre sèche.",{eau:1,pers:true,styles:["nat","contemporain"],forme:"touffe"}],
["Brize","Briza media","graminee","s","cs","df",-30,1,40,[5,7],"chaud","#C8B370","Petits épillets en cœur qui tremblent au vent.",{eau:2,styles:["nat","sauvage"]}],
["Herbe aux moustiques","Bouteloua gracilis","graminee","s","cs","d",-30,1,40,[7,9],"chaud","#C9A15A","Épis en cils horizontaux, très résistante au sec.",{eau:1,styles:["nat"]}],
// ---- Bulbes
["Tulipe botanique","Tulipa clusiana","bulbe","s","cs","d",-25,1,30,[4,4],"rose","#F2C1CF","Tulipe sauvage qui revient chaque année en sol sec.",{eau:1,mel:true,styles:["med","nat"]}],
["Ail à tête ronde","Allium sphaerocephalon","bulbe","s","csa","d",-25,1,60,[6,7],"rose","#8E1F5A","Petits œufs pourpres qui ponctuent les graminées.",{eau:1,mel:true,styles:["nat","sauvage"],forme:"globe"}],
["Ail de Christoph","Allium cristophii","bulbe","s","csa","d",-25,1,50,[5,6],"froid","#B49BD8","Grosses sphères étoilées, puis têtes sèches décoratives.",{eau:1,mel:true,styles:["nat","contemporain","anglais"],forme:"globe"}],
["Crocus de Tommasini","Crocus tommasinianus","bulbe","sm","acs","df",-25,1,10,[2,3],"froid","#B5A3E6","Tapis mauve en fin d'hiver, première nourriture des abeilles.",{eau:2,mel:true,styles:["sauvage","anglais"]}],
["Sternbergie","Sternbergia lutea","bulbe","s","cs","d",-15,1,15,[9,10],"chaud","#F2D02A","Crocus jaune d'automne pour sols secs et calcaires.",{eau:1,styles:["med"]}],
["Ipheion","Ipheion uniflorum","bulbe","sm","acs","df",-15,1,15,[3,4],"froid","#C9D4F2","Étoiles bleu pâle au printemps, se naturalise vite.",{eau:1,mel:true,styles:["med","sauvage"]}],
["Narcisse 'Tête-à-tête'","Narcissus 'Tête-à-tête'","bulbe","sm","acsh","df",-25,1,20,[2,3],"chaud","#F4D22E","Petite jonquille précoce, parfaite en bordure.",{eau:2,styles:["anglais"]}],
// ---- Grimpantes
["Clématite d'Armand","Clematis armandii","grimpante","sm","acs","df",-12,1,600,[3,4],"blanc","#FBF8F0","Grimpante persistante, fleurs blanches parfumées au printemps.",{eau:2,pousse:"rapide",pers:true,mel:true,styles:["anglais","contemporain"]}],
["Clématite d'hiver","Clematis cirrhosa","grimpante","sm","acs","d",-12,1,400,[12,2],"blanc","#F2EAD2","Persistante, clochettes crème en plein hiver.",{eau:1,pousse:"rapide",pers:true,mel:true,styles:["med","sauvage"]}],
["Glycine","Wisteria sinensis","grimpante","s","acsh","df",-25,1,1000,[4,5],"froid","#A796DA","Grappes mauves parfumées. Très vigoureuse : il lui faut un support solide.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["anglais","med"]}],
["Vigne vierge","Parthenocissus tricuspidata","grimpante","smo","acsh","df",-25,1,1500,null,"chaud","#C4422A","Couvre un mur sans support, rouge flamboyant en automne.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["contemporain","anglais"]}],
["Passiflore bleue","Passiflora caerulea","grimpante","s","acs","df",-12,1,600,[6,10],"froid","#9DB3E6","Fleurs étonnantes tout l'été, pousse très vite.",{eau:2,pousse:"rapide",pers:true,mel:true,styles:["med"]}],
["Morelle faux-jasmin","Solanum laxum","grimpante","s","acs","df",-8,1,500,[6,10],"blanc","#F7F4F7","Fleurs blanches de juin aux gelées. Craint les grands froids.",{eau:2,pousse:"rapide",pers:true,mel:true,styles:["med","anglais"]}],
["Akébia","Akebia quinata","grimpante","smo","acsh","f",-20,1,600,[4,5],"rose","#7A2F5A","Fleurs chocolat parfumées, semi-persistante, supporte la mi-ombre.",{eau:2,pousse:"rapide",pers:false,mel:true,styles:["anglais","contemporain"]}],
["Pois vivace","Lathyrus latifolius","grimpante","s","acs","d",-25,1,200,[6,9],"rose","#D84A8E","Grimpante qui résiste au sec, fleurs roses tout l'été.",{eau:1,pousse:"rapide",pers:false,mel:true,styles:["anglais","sauvage","nat"]}],
["Vigne","Vitis vinifera","grimpante","s","acs","d",-20,1,800,null,"vert","#5E8A3C","Treille ou pergola : du raisin et de l'ombre en été.",{eau:1,pousse:"rapide",pers:false,mel:false,styles:["med","sauvage"]}],
// ---- Aromatiques
["Thym commun","Thymus vulgaris","aromatique","s","cs","d",-20,1,30,[5,6],"rose","#DAB6D8","Petit buisson aromatique persistant, les abeilles adorent.",{eau:1,pers:true,mel:true,styles:["med","sauvage"],gris:true,forme:"boule"}],
["Hysope","Hyssopus officinalis","aromatique","s","cs","d",-20,1,50,[7,9],"froid","#4A5ED0","Épis bleus en été, très mellifère.",{eau:1,pers:true,mel:true,styles:["med","sauvage"],forme:"epi"}],
["Sarriette des montagnes","Satureja montana","aromatique","s","cs","d",-20,1,30,[7,10],"blanc","#EEE6F2","Coussin persistant fleuri en fin d'été.",{eau:1,pers:true,mel:true,styles:["med"],forme:"boule"}],
// ---- Ajouts 2026-11 : arbres de mi-ombre et plantes de sol humide, chaque fiche recoupée sur 3 sources (x.src)
["Érable du Japon","Acer palmatum","arbre","m","ash","f",-20,0,400,null,"chaud","#B33A2E","Feuillage finement découpé, flamboyant à l'automne. Craint le soleil brûlant.",{eau:3,pousse:"lente",pers:false,mel:false,tox:false,pot:true,styles:["anglais", "contemporain"],src:["https://www.jardiner-malin.fr/fiche/acer-palmatum-erable-japon.html", "https://ebben.nl/fr/treeebb/acpalmat-acer-palmatum/pdf", "https://www.leroymerlin.fr/produits/erable-du-japon-acer-palmatum-atropurpureum-hauteur-60-70cm-19cm-87652032.html"]}],
["Cornouiller de Kousa","Cornus kousa","arbre","sm","ah","f",-20,0,500,[5, 6],"blanc","#F4F1E6","Grandes bractées blanches en juin, fruits comme des fraises, rouge à l'automne.",{eau:2,pousse:"lente",pers:false,mel:true,tox:false,styles:["anglais", "contemporain"],src:["https://www.jardiner-malin.fr/fiche/cornouiller-du-japon.html", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/cornus-kousa.pdf", "https://www.ebben.nl/fr/treeebb/cokousa-cornus-kousa/pdf/"]}],
["Magnolia étoilé","Magnolia stellata","arbuste","sm","ah","f",-25,0,300,[3, 4],"blanc","#FBF7F2","Fleurs blanches étoilées en mars, avant les feuilles. À l'abri des vents froids.",{eau:2,pousse:"lente",pers:false,mel:false,tox:false,pot:true,styles:["anglais", "contemporain"],src:["https://www.jardiner-malin.fr/fiche/magnolia-etoile-stellata.html", "https://ebben.nl/fr/treeebb/mastella-magnolia-stellata/pdf", "https://www.rhs.org.uk/plants/10721/wd/details"]}],
["Sorbier des oiseleurs","Sorbus aucuparia","arbre","sm","ash","f",-30,0,800,[5, 6],"blanc","#F2EEE2","Fleurs blanches au printemps, baies orangées adorées des oiseaux.",{eau:2,pousse:"moyenne",pers:false,mel:true,tox:false,styles:["sauvage", "nat", "anglais"],src:["https://www.jardiner-malin.fr/fiche/sorbier.html", "https://ebben.nl/fr/treeebb/soaucupa-sorbus-aucuparia/pdf", "https://www.rhs.org.uk/plants/details?plantid=1853"]}],
["Érable à écorce de papier","Acer griseum","arbre","sm","ash","f",-25,0,800,null,"chaud","#B5562E","Écorce cannelle qui s'exfolie, feuillage rouge vif à l'automne. Pousse lentement.",{eau:2,pousse:"lente",pers:false,mel:false,tox:false,styles:["contemporain", "anglais"],src:["https://www.jardiner-malin.fr/fiche/acer-griseum-erable-ecorce-papier.html", "https://ebben.nl/fr/treeebb/acgriseu-acer-griseum/pdf", "https://www.truffaut.com/erable-a-ecorce-de-papier-acer-griseum-60-80-cm-pot.html"]}],
["Hortensia à feuilles de chêne","Hydrangea quercifolia","arbuste","sm","ah","f",-20,0,180,[7, 9],"blanc","#F5F1E4","Feuilles de chêne qui rougissent à l'automne, grandes panicules blanches l'été.",{eau:3,pousse:"moyenne",pers:false,mel:false,tox:true,pot:true,styles:["anglais"],src:["https://www.jardiner-malin.fr/fiche/hydrangea-quercifolia.html", "https://www.truffaut.com/hortensia-a-feuilles-de-chene-hydrangea-quercifolia-gatsby-star.html", "https://espacepourlavie.ca/carnet-horticole/hydrangee-feuilles-de-chene"]}],
["Salicaire","Lythrum salicaria","vivace","sm","ach","fw",-30,1,100,[6, 9],"rose","#C2427E","Épis rose pourpre tout l'été, adorés des abeilles. Indigène des berges.",{eau:3,pousse:"moyenne",pers:false,mel:true,tox:false,styles:["sauvage", "nat"],src:["https://www.jardiner-malin.fr/fiche/salicaire-bienfaits-plantation-entretien.html", "https://www.cbnbrest.fr/files/Fiche_ZH_BZH_Lythrum_salicaria_20230112.pdf", "https://www.rhs.org.uk/Plants/10645/wd/Details"]}],
["Eupatoire chanvrine","Eupatorium cannabinum","vivace","sm","ach","fw",-20,1,150,[7, 9],"rose","#D9A0BE","Ombelles rose pâle en fin d'été, un aimant à papillons. Indigène des fossés humides.",{eau:3,pousse:"moyenne",pers:false,mel:true,tox:false,styles:["sauvage", "nat"],src:["https://www.jardiner-malin.fr/fiche/eupatoire.html", "https://www.rhs.org.uk/Plants/7024/Eupatorium-cannabinum/Details", "https://www.techno-science.net/fr/definitions/eupatoire-a-feuilles-de-chanvre"]}],
["Reine-des-prés","Filipendula ulmaria","vivace","sm","ach","fw",-30,0,120,[6, 8],"blanc","#F3EFD8","Panaches crème au parfum de miel, pour les sols détrempés.",{eau:3,pousse:"moyenne",pers:false,mel:true,tox:false,styles:["sauvage", "nat", "anglais"],src:["https://www.jardiner-malin.fr/fiche/filipendule-reine-des-pres.html", "https://gentiana.org/wp-content/uploads/Fiche-espece-Reine-des-pres.pdf", "https://hautsdefrance.chambre-agriculture.fr/fileadmin/user_upload/National/FAL_commun/publications/Hauts-de-France/Fiche_reine_des_pres.pdf"]}],
["Iris des marais","Iris pseudacorus","vivace","sm","ach","w",-25,1,100,[5, 6],"chaud","#E8C531","Grandes fleurs jaunes au bord de l'eau, même les pieds dans l'eau. À diviser pour la contenir.",{eau:3,pousse:"rapide",pers:false,mel:false,tox:true,styles:["sauvage", "nat"],src:["https://www.jardiner-malin.fr/fiche/iris-des-marais.html", "https://rhs.org.uk/Plants/9334/wd/Details", "https://www.ontario.ca/files/2025-07/stdprod-104441.pdf"]}],
["Cornouiller blanc 'Sibirica'","Cornus alba 'Sibirica'","arbuste","sm","ach","fw",-30,1,200,[5, 6],"chaud","#B8332A","Tiges rouge vif en hiver, feuillage qui rougit à l'automne. Aime les sols frais.",{eau:2,pousse:"rapide",pers:false,mel:false,tox:true,styles:["nat", "sauvage", "contemporain"],src:["https://www.jardiner-malin.fr/fiche/cornus-alba.html", "https://www.ebben.nl/fr/treeebb/coasibir-cornus-alba-sibirica/pdf", "https://pepinieres-minier.fr/produit/pdf/463310"]}],
["Ligulaire dentée","Ligularia dentata","vivace","mo","ach","fw",-25,0,100,[7, 9],"chaud","#E88A1E","Grandes feuilles rondes et marguerites orange l'été, pour les coins frais à l'ombre.",{eau:3,pousse:"moyenne",pers:false,mel:false,tox:false,styles:["anglais"],src:["https://www.jardiner-malin.fr/boutique/ligulaire-dentee-pandora-ligularia-dentata", "https://www.rhs.org.uk/plants/10083/wd/details", "https://www.natureetdecouvertes.com/jardin/decoration-jardin/plantes-exterieur/6-x-ligulaire-ligularia-dentata-desdemona-godet-9x9-cm-93356530"]}],
// ---- Ajouts 2026-11 (lot 2) : ombre sèche et ombre, chaque fiche recoupée sur 3 sources (x.src)
["Mahonia","Mahonia aquifolium","arbuste","smo","acsh","df",-20,1,150,[3, 5],"chaud","#E5C21E","Persistant au feuillage de houx, grappes jaunes parfumées en fin d'hiver, baies bleues.",{eau:1,pousse:"moyenne",pers:true,mel:true,tox:false,styles:["sauvage", "anglais"],src:["https://www.jardiner-malin.fr/fiche/mahonia-entretien-taille-plantation.html", "https://www.ebben.nl/fr/treeebb/maaquifo-mahonia-aquifolium/pdf", "https://www.rhs.org.uk/plants/10730/mahonia-aquifolium/details"]}],
["Aucuba du Japon","Aucuba japonica","arbuste","mo","acsh","df",-15,1,200,null,"vert","#5E8A3A","Persistant à grandes feuilles luisantes, souvent tachées d'or. Supporte l'ombre et la ville.",{eau:1,pousse:"moyenne",pers:true,mel:false,tox:true,pot:true,styles:["anglais", "contemporain"],src:["https://www.jardiner-malin.fr/fiche/aucuba-japon.html", "https://ebben.nl/fr/treeebb/aujaponi-aucuba-japonica/pdf", "https://plants.ces.ncsu.edu/plants/aucuba-japonica/"]}],
["Fusain rampant","Euonymus fortunei","couvre-sol","smo","acsh","df",-20,1,40,null,"vert","#6E8F4E","Couvre-sol persistant et robuste, panaché selon les variétés. Supporte le sec.",{eau:1,pousse:"moyenne",pers:true,mel:false,tox:true,pot:true,styles:["contemporain"],src:["https://www.jardiner-malin.fr/fiche/fusain.html", "https://www.truffaut.com/fusain-de-fortune-dart-s-blanket-x40-plante-d-exterieur.html", "https://ebben.nl/fr/treeebb/eufdblan-euonymus-fortunei-darts-blanket/pdf"]}],
["Laurier d'Alexandrie","Danae racemosa","arbuste","mo","ach","f",-12,1,120,null,"vert","#3F7A3A","Tiges arquées au feuillage luisant, baies orange en hiver. Pour l'ombre profonde.",{eau:2,pousse:"lente",pers:true,mel:false,tox:false,pot:true,styles:["anglais", "contemporain"],src:["https://www.rhs.org.uk/plants/5306/wd/details", "https://jardin-florilege.eu/fr/encyclopedie/danae-racemosa", "https://worldfloradb.net/plants/danae-racemosa-l-moench"]}],
["Aralia du Japon","Fatsia japonica","arbuste","mo","ach","f",-12,1,250,[10, 11],"blanc","#4F7B3E","Grandes feuilles palmées très exotiques, pompons blancs en automne. Pour l'ombre.",{eau:2,pousse:"moyenne",pers:true,mel:true,tox:false,pot:true,styles:["contemporain"],src:["https://www.jardiner-malin.fr/fiche/fatsia-japonica.html", "https://www.truffaut.com/fatsia-japonica-conteneur-5-7-litres-22996.html", "https://www.rhs.org.uk/plants/details?plantid=788"]}],
["Chèvrefeuille à cupule","Lonicera pileata","couvre-sol","smo","acsh","df",-20,1,60,[4, 5],"vert","#4C7A3C","Couvre-sol persistant et touffu, pour les talus et sous les arbres, même au sec.",{eau:1,pousse:"rapide",pers:true,mel:false,tox:true,styles:["contemporain", "sauvage"],src:["https://www.truffaut.com/lonicera-pileata-30-40-cm-ctr-2-litres-74481.html", "https://www.denolf.com/fr_FR/plantguide/lopileat-lonicera-pileata-23807", "https://ebben.nl/fr/treeebb/lopmgree-lonicera-pileata-moss-green/pdf"]}],
["Géranium noueux","Geranium nodosum","vivace","mo","acsh","df",-25,1,40,[5, 9],"rose","#C98AB8","Petites fleurs lilas de mai à septembre, très tolérant à l'ombre sèche.",{eau:1,pousse:"moyenne",pers:false,mel:true,tox:false,styles:["anglais", "nat", "sauvage"],src:["https://www.jardiner-malin.fr/boutique/geranium-vivace-noueux-geranium-nodosum", "https://gentiana.org/wp-content/uploads/Fiche-espece-Geranium-noueux.pdf", "https://www.rhs.org.uk/plants/7900/Geranium-nodosum/Details"]}],
["Pachysandra","Pachysandra terminalis","couvre-sol","mo","ash","f",-20,0,25,[3, 4],"vert","#3E6E3A","Tapis persistant vert brillant pour l'ombre, petites fleurs blanches au printemps.",{eau:2,pousse:"moyenne",pers:true,mel:false,tox:false,styles:["contemporain", "anglais"],src:["https://www.jardiner-malin.fr/fiche/pachysandra.html", "https://www.ebben.nl/fr/treeebb/patermin-pachysandra-terminalis/pdf", "https://espacepourlavie.ca/carnet-horticole/pachysandre-du-japon"]}],
["Consoude à grandes fleurs","Symphytum grandiflorum","couvre-sol","mo","acsh","df",-20,1,30,[4, 6],"blanc","#F1E9C9","Couvre-sol vigoureux pour l'ombre sous les arbres, clochettes crème au printemps.",{eau:1,pousse:"rapide",pers:false,mel:true,tox:true,styles:["sauvage", "nat"],src:["https://www.leroymerlin.fr/produits/lot-de-6-symphytum-grandiflorum-consoude-rustique-vivace-hauteur-10-20-cm-pot-9-cm-78468847.html", "https://www.rhs.org.uk/plants/17885/wd/details", "https://www.natureetdecouvertes.com/jardin/decoration-jardin/plantes-exterieur/6-x-consoude-a-grandes-fleurs-symphytum-grandiflorum-godet-9x9-cm-93363320"]}],
["Euphorbe des bois","Euphorbia amygdaloides var. robbiae","vivace","mo","acsh","df",-20,1,60,[4, 6],"vert","#B9C85A","Rosettes persistantes et bractées vert citron au printemps, parfaite en ombre sèche.",{eau:1,pousse:"rapide",pers:true,mel:false,tox:true,styles:["contemporain", "nat"],src:["https://gardenersworld.com/plants/euphorbia-amygdaloides-var-robbiae", "https://hardysplants.co.uk/perennials/euphorbia-amygdaloides-var-robbiae", "https://plants.ces.ncsu.edu/plants/euphorbia-amygdaloides-subsp-robbiae/common-name/spurge/"]}],
// ---- Ajouts 2026-11 (lot 3) : classiques de jardinerie qui manquaient, chaque fiche recoupée sur 3 sources (x.src)
["Forsythia","Forsythia × intermedia","arbuste","sm","acsh","df",-25,1,250,[3, 4],"chaud","#F2C318","Explosion de fleurs jaunes en fin d'hiver, avant les feuilles. Robuste et facile.",{eau:1,pousse:"rapide",pers:false,mel:false,tox:false,styles:["anglais", "sauvage"],src:["https://www.ebben.nl/fr/treeebb/fointerm-forsythia-x-intermedia/pdf", "https://www.truffaut.com/forsythia-intermedia-60-80-cm-ctr-4-litres-37021.html", "https://www.jardiner-malin.fr/fiche/forsythia-entretien-taille.html"]}],
["Camélia du Japon","Camellia japonica","arbuste","mo","ash","f",-12,0,300,[2, 4],"rose","#D9446B","Grandes fleurs en fin d'hiver sur un feuillage persistant luisant. Terre acide, à l'abri du vent.",{eau:2,pousse:"lente",pers:true,mel:false,tox:false,pot:true,styles:["anglais"],src:["https://www.jardiner-malin.fr/fiche/camelia-du-japon.html", "https://www.ebben.nl/fr/treeebb/camjapon-camellia-japonica/pdf", "https://www.truffaut.com/camelia-varietes-plantation-entretien.html"]}],
["Skimmia du Japon","Skimmia japonica","arbuste","mo","ash","f",-15,0,100,[3, 4],"blanc","#F3EEE6","Petit persistant compact, boutons rouges tout l'hiver puis fleurs parfumées. Pour l'ombre.",{eau:2,pousse:"lente",pers:true,mel:true,tox:true,pot:true,styles:["anglais", "contemporain"],src:["https://www.jardiner-malin.fr/fiche/skimmia-japonica.html", "https://www.rhs.org.uk/plants/17401/skimmia-japonica/details", "https://www.truffaut.com/skimmia-japonica-pot-1l-804115.html"]}],
["Bambou sacré","Nandina domestica","arbuste","smo","acsh","f",-15,1,120,[6, 7],"chaud","#B8442E","Feuillage léger qui rougit en hiver, baies rouges. Ce n'est pas un bambou : il ne trace pas.",{eau:2,pousse:"lente",pers:true,mel:false,tox:true,pot:true,styles:["contemporain"],src:["https://www.jardiner-malin.fr/fiche/nandina-domestica.html", "https://www.rhs.org.uk/plants/11327/wd/details", "https://www.truffaut.com/nandina-domestica-touffe-ctr-5-litres-228737.html"]}],
["Potentille arbustive","Potentilla fruticosa","arbuste","sm","acsh","df",-25,1,100,[5, 10],"chaud","#F2C94C","Petit arbuste en fleurs de mai aux gelées, très rustique et peu exigeant, même en sol calcaire.",{eau:1,pousse:"moyenne",pers:false,mel:true,tox:false,pot:true,styles:["contemporain", "nat"],src:["https://www.jardiner-malin.fr/fiche/potentille-potentilla.html", "https://www.ebben.nl/fr/treeebb/pofrutic-potentilla-fruticosa/pdf", "https://www.rhs.org.uk/plants/13582/wd/details"]}],
["Pivoine herbacée","Paeonia lactiflora","vivace","sm","ach","f",-25,0,90,[5, 6],"rose","#E8A0B4","Grosses fleurs parfumées en mai-juin. Vit des décennies au même endroit, sans être déplacée.",{eau:2,pousse:"lente",pers:false,mel:false,tox:true,styles:["anglais"],src:["https://www.jardiner-malin.fr/fiche/pivoine-herbacee.html", "https://www.truffaut.com/pivoine-herbacee-varietes-plantation-entretien.html", "https://www.pepiniere-bretagne.fr/pdf/8640.pdf"]}],
["Phlox paniculé","Phlox paniculata","vivace","sm","ach","f",-25,0,100,[7, 9],"rose","#D77FB0","Grosses têtes parfumées tout l'été, adorées des papillons. Veut un sol qui reste frais.",{eau:2,pousse:"moyenne",pers:false,mel:true,tox:false,styles:["anglais", "nat"],src:["https://www.jardiner-malin.fr/fiche/phlox-paniculata.html", "https://www.truffaut.com/phlox-paniculata-pot-2-l.html", "https://www.greenweez.com/produit/phlox-panicule-blue-boy-godet-5-20-cm/8PLAN04XC"]}],
["Campanule des murailles","Campanula portenschlagiana","couvre-sol","sm","csh","df",-20,1,15,[5, 8],"froid","#8E7CC3","Coussins couverts de clochettes violettes, parfaite en bordure, entre les pierres ou en pot.",{eau:1,pousse:"rapide",pers:false,mel:true,tox:false,pot:true,styles:["anglais", "sauvage"],src:["https://www.truffaut.com/campanule-portenschlagiana-variee-pot-de-2-litres.html", "https://www.jardiner-malin.fr/fiche/campanule-des-murs.html", "https://www.futura-sciences.com/planete/definitions/botanique-campanule-murailles-21503/"]}],
["Corbeille d'argent","Iberis sempervirens","couvre-sol","s","cs","d",-15,1,25,[3, 5],"blanc","#FBFBF7","Coussin persistant couvert de fleurs blanches au printemps. Sol drainé, même calcaire.",{eau:1,pousse:"moyenne",pers:true,mel:true,tox:false,pot:true,styles:["med", "anglais"],src:["https://www.jardiner-malin.fr/fiche/corbeille-argent-iberis.html", "https://www.truffaut.com/iberis-sempervirens-plante-vivace-3-godets.html", "https://www.donzy.fr/medias/2022/03/CORBEILLE-DARGENT-IBERIS-ESCAPADE.pdf"]}],
["Œillet mignardise","Dianthus plumarius","couvre-sol","s","cs","d",-20,1,30,[5, 7],"rose","#F4B6C8","Touffes de feuillage gris persistant et petites fleurs très parfumées. Craint l'humidité.",{eau:1,pousse:"moyenne",pers:true,mel:false,tox:false,pot:true,styles:["anglais", "med"],src:["https://www.jardiner-malin.fr/fiche/oeillet-mignardise.html", "https://www.truffaut.com/oeillet-plantation-culture-entretien.html", "https://www.natureetdecouvertes.com/jardin/decoration-jardin/plantes-exterieur/6-x-oeillet-mignardise-dianthus-plumarius-haytor-white-godet-9x9-cm-93349980"]}],
["Cerisier du Japon 'Kanzan'","Prunus serrulata 'Kanzan'","arbre","s","acsh","f",-20,0,800,[4, 5],"rose","#F2A7C3","Nuage de fleurs roses doubles en avril, feuillage orangé en automne.",{eau:2,pousse:"moyenne",pers:false,mel:true,tox:false,styles:["anglais", "contemporain"],src:["https://www.ebben.nl/fr/treeebb/prskanza-prunus-serrulata-kanzan/pdf/", "https://www.truffaut.com/prunus-serrulata-kanzan-100-125-cm-ctr-10-litres-493292.html", "https://www.jardiner-malin.fr/fiche/prunus-serrulata.html"]}],
["Jasmin d'hiver","Jasminum nudiflorum","grimpante","sm","acsh","df",-15,1,250,[12, 3],"chaud","#F4CF3A","Fleurs jaunes en plein hiver sur des rameaux verts. À palisser contre un mur ou en retombée.",{eau:1,pousse:"rapide",pers:false,mel:false,tox:false,pot:true,styles:["anglais", "sauvage"],src:["https://www.jardiner-malin.fr/fiche/jasmin-hiver.html", "https://www.truffaut.com/jasminum-nudiflorum-ech-ctr-3-litres-523445.html", "https://luberon.fr/luberon/parc-naturel-regional/flore/annu+jasmin-d-hiver+2332.html"]}]
];
const PLANTS = RAW.map((r,i)=>({id:i,nom:r[0],latin:r[1],type:r[2],expo:r[3],sol:r[4],eau:r[5],rust:r[6],heat:r[7],h:r[8],bloom:r[9],fam:r[10],hex:r[11],note:r[12],x:r[13]||null}));
// Sources des fiches d'avant les ajouts de 2026-11 (qui portent les leurs dans x.src) : au moins 3 par plante, ajoutées lot par lot.
const SRC = /*SRC*/{"Lavandin 'Grosso'": ["https://www.jardiner-malin.fr/boutique/lavandin-grosso", "https://www.rhs.org.uk/plants/74019/lavandula-intermedia-grosso/details", "https://www.perennials.com/plants/lavandula-intermedia-grosso.html"], "Romarin": ["https://www.jardiner-malin.fr/fiche/romarin.html", "https://www.truffaut.com/romarin-varietes-culture-utilisation.html", "https://www.treesandshrubsonline.org/articles/salvia/salvia-rosmarinus/"], "Ciste pourpre": ["https://www.jardiner-malin.fr/boutique/cistus-x-purpureus", "https://www.truffaut.com/cistus-purpureus-ctr-3-litres-492779.html", "https://www.provendernurseries.co.uk/factsheets/cistus-x-purpureus"], "Sauge d'Afghanistan": ["https://www.truffaut.com/perovskia-atriplicifolia-touffe-ctr-3-litres-267841.html", "https://www.futura-sciences.com/planete/definitions/botanique-perovskia-21548/", "https://www.natureetdecouvertes.com/jardin/decoration-jardin/plantes-exterieur/sauge-d-afghanistan-perovskia-blue-spire-50-60-cm-pot-93358820"], "Abélia": ["https://www.ebben.nl/fr/treeebb/abgrandi-abelia-x-grandiflora/pdf/", "https://www.jardiner-malin.fr/fiche/abelia.html", "https://www.rhs.org.uk/plants/100036/abelia-×-grandiflora/details"], "Hortensia": ["https://www.jardiner-malin.fr/fiche/hortensia-plante.html", "https://www.ebben.nl/fr/treeebb/hymacrop-hydrangea-macrophylla/pdf", "https://espacepourlavie.ca/carnet-horticole/hydrangee-grandes-feuilles"], "Hortensia paniculé 'Limelight'": ["https://www.pepiniere-bretagne.fr/pdf/7838.pdf", "https://www.ebben.nl/fr/treeebb/hyplimel-hydrangea-paniculata-limelight/pdf", "https://www.rhs.org.uk/plants/154246/hydrangea-paniculata-limelight-(pbr)/details"], "Céanothe 'Concha'": ["https://www.truffaut.com/ceanothus-concha-ctr-3-litres-507834.html", "https://www.rhsplants.co.uk/plants/_/ceanothus-concha/classid.714/sku.pl00001250", "https://www.gardenersworld.com/plants/ceanothus-concha/"], "Laurier-tin": ["https://www.ebben.nl/fr/treeebb/vitinus-viburnum-tinus/pdf", "https://www.jardiner-malin.fr/fiche/laurier-tin.html", "https://www.truffaut.com/viburnum-tinus-ctr-3-litres-26358.html"], "Oranger du Mexique": ["https://www.jardiner-malin.fr/fiche/oranger-du-mexique.html", "https://www.truffaut.com/oranger-du-mexique-plantation-entretien.html", "https://www.rhs.org.uk/plants/3766/wd/details"], "Sarcococca": ["https://www.jardiner-malin.fr/boutique/sarcococca-confusa", "https://www.truffaut.com/sarcococca-varietes.html", "https://www.rhsplants.co.uk/plants/_/sarcococca-confusa/classid.2000027944/sku.RH30000570"], "Myrte": ["https://www.jardiner-malin.fr/fiche/myrte.html", "https://www.truffaut.com/myrte-commun-3l.html", "https://calanques-parcnational.fr/explorer-comprendre/flore/flore-vasculaire/myrte"], "Pittosporum nain": ["https://www.jardiner-malin.fr/boutique/pittospore-du-japon-nana-pittosporum-tobira", "https://www.truffaut.com/comment-planter-entretenir-pittosporum.html", "https://www.rhs.org.uk/Plants/61258/Pittosporum-tobira-Nanum/Details"], "Germandrée arbustive": ["https://www.jardiner-malin.fr/fiche/germandree-teucrium-fruticans.html", "https://www.truffaut.com/germandree-arbustive-teucrium-fruticans-pot-de-2l-3l.html", "https://www.rhs.org.uk/plants/18060/wd/details"], "Spirée du Japon": ["https://www.jardiner-malin.fr/fiche/spiree-spiraea.html", "https://www.ebben.nl/fr/treeebb/spjawate-spiraea-japonica-anthony-waterer/pdf", "https://www.rhs.org.uk/plants/86836/spiraea-japonica-little-princess-japanese-spiraea-little-princess/details"], "Cornouiller 'Midwinter Fire'": ["https://www.rhs.org.uk/plants/57639/cornus-sanguinea-midwinter-fire/details", "https://www.denolf.com/en_US/plantguide/cosmfire-cornus-sanguinea-midwinter-fire-10325", "https://www.natureetdecouvertes.com/jardin/decoration-jardin/plantes-exterieur/cornus-sanguinea-midwinter-fire-60-80-cm-pot-93373490"], "Stipa cheveux d'ange": ["https://www.jardiner-malin.fr/fiche/stipa-tenuifolia-les-cheveux-dange.html", "https://ebben.nl/fr/treeebb/sttenuis-stipa-tenuissima/pdf", "https://www.truffaut.com/cheveux-d-anges-pony-tails-pot-de-2l-40-60-cm.html"], "Miscanthus 'Morning Light'": ["https://www.rhs.org.uk/plants/54584/miscanthus-sinensis-morning-light-v/details", "https://www.pepinieres-minier.fr/produit/pdf/463652", "https://www.perennials.com/plants/miscanthus-sinensis-morning-light.html"], "Herbe aux écouvillons 'Hameln'": ["https://www.jardiner-malin.fr/fiche/pennisetum-entretien-plantation.html", "https://www.rhs.org.uk/Plants/43921/i-Pennisetum-alopecuroides-i-Hameln/Details", "https://edis.ifas.ufl.edu/publication/FP461/pdf"], "Calamagrostis 'Karl Foerster'": ["https://www.jardiner-malin.fr/fiche/calamagrostis.html", "https://www.pepiniere-bretagne.fr/pdf/6001.pdf", "https://www.gardenersworld.com/plants/plant-finder/calamagrostis-x-acutiflora-karl-foerster/"], "Laîche 'Ice Dance'": ["https://www.jardiner-malin.fr/fiche/carex-morrowii.html", "https://www.rhs.org.uk/plants/135663/carex-morrowii-ice-dance/details", "https://www.ebben.nl/fr/treeebb/camorrow-carex-morrowii/pdf"], "Fétuque bleue": ["https://www.jardiner-malin.fr/fiche/fetuque-bleue-festuca.html", "https://www.truffaut.com/fetuque-blue-select-lot-de-3-godets.html", "https://www.natureetdecouvertes.com/jardin/decoration-jardin/plantes-exterieur/6-x-fetuque-bleue-festuca-glauca-godet-9x9-cm-93351730"], "Herbe du Japon": ["https://www.jardiner-malin.fr/fiche/hakonechloa-macra.html", "https://www.truffaut.com/hakonechloa-macra-pot-3l-756363.html", "https://www.rhs.org.uk/Plants/33668/Hakonechloa-macra/Details"], "Muhlenbergia": ["https://www.promessedefleurs.ie/gardening-tips/familysheet/muhlenbergia-planting-growing-and-caring/", "https://edis.ifas.ufl.edu/publication/FP415/pdf", "https://www.rhsplants.co.uk/search/_/search.-/vid.237/vid.26/vid.2660/"], "Gaura": ["https://www.jardiner-malin.fr/fiche/gaura.html", "https://www.truffaut.com/gaura-varietes-plantation-entretien.html", "https://www.donzy.fr/medias/2022/03/GAURA.pdf"], "Achillée 'Terracotta'": ["https://www.jardiner-malin.fr/fiche/achillee.html", "https://www.rhs.org.uk/plants/182741/achillea-millefolium-terracotta/details", "https://perennials.com/plants/achillea-millefolium-terracotta.html"], "Échinacée pourpre": ["https://www.jardiner-malin.fr/fiche/echinacea.html", "https://www.ebben.nl/fr/treeebb/ecpurpur-echinacea-purpurea/pdf/", "https://www.truffaut.com/echinacea-purpurea-3-godets-plante-vivace.html"], "Rudbeckia 'Goldsturm'": ["https://www.ebben.nl/fr/treeebb/rudfgold-rudbeckia-fulgida-goldsturm/pdf", "https://www.truffaut.com/rudbeckie-goldsturm-godet-vert-209146.html", "https://www.rhs.org.uk/plants/44596/rudbeckia-fulgida-var-sullivantii-goldsturm/details"], "Népéta": ["https://www.truffaut.com/nepeta-de-faassen-h-15-25-cm-pot-o11-cm.html", "https://www.rhs.org.uk/plants/52221/nepeta-x-faassenii/details", "https://www.nature-and-garden.com/gardening/nepeta-faassenii.html"], "Sauge des bois 'Caradonna'": ["https://www.jardiner-malin.fr/boutique/sauge-des-bois-caradonna-salvia-nemorosa", "https://www.truffaut.com/sauge-des-bois-caradonna-pot-de-3l-20-40-cm.html", "https://www.gardenersworld.com/plants/salvia-nemorosa-caradonna"], "Euphorbe des garrigues": ["https://www.jardiner-malin.fr/fiche/euphorbe-planter-tailler.html", "https://luberon.fr/luberon/parc-naturel-regional/flore/annu+euphorbe-characias+2329.html", "https://plants.ces.ncsu.edu/plants/euphorbia-characias"], "Verveine de Buenos Aires": ["https://www.truffaut.com/verveine-bonariensis-pot-2l-715868.html", "https://www.promessedefleurs.ie/gardening-tips/advicesheet/how-to-successfully-plant-and-maintain-buenos-aires-verbena/", "https://www.futura-sciences.com/planete/definitions/botanique-verveine-buenos-aires-22467/"], "Géranium 'Rozanne'": ["https://www.truffaut.com/geranium-vivace-rozanne-3l.html", "https://www.ebben.nl/fr/treeebb/gerozann-geranium-rozanne/pdf", "https://www.jardiner-malin.fr/fiche/geranium-rozanne.html"], "Heuchère": ["https://www.jardiner-malin.fr/fiche/heuchere.html", "https://www.pepiniere-bretagne.fr/pdf/7617.pdf", "https://www.truffaut.com/heuchere-sugar-frosting-3l.html"], "Hellébore d'Orient": ["https://www.jardiner-malin.fr/fiche/hellebore-d-orient.html", "https://www.rhs.org.uk/plants/124882/helleborus-x-hybridus/details", "https://hgic.clemson.edu/factsheet/hellebore/"], "Fougère mâle": ["https://www.jardiner-malin.fr/fiche/dryopteris-fougere.html", "https://www.ebben.nl/fr/treeebb/drfmas-dryopteris-filixmas/pdf", "https://plants.ces.ncsu.edu/plants/dryopteris-filix-mas"], "Hosta": ["https://www.jardiner-malin.fr/fiche/hosta.html", "https://www.truffaut.com/hosta-conteneur-3-litres-245752.html", "https://www.techno-science.net/fr/definitions/hosta-genre"], "Anémone du Japon 'Honorine Jobert'": ["https://ebben.nl/fr/treeebb/anhhjobe-anemone-x-hybrida-honorine-jobert/pdf", "https://www.truffaut.com/anemone-varietes-plantation-entretien.html", "https://gardenersworld.com/plants/anemone-x-hybrida-honorine-jobert"], "Astilbe": ["https://www.jardiner-malin.fr/fiche/astilbe.html", "https://www.truffaut.com/astilbe-vision-in-pink-en-pot-de-3-litres.html", "https://espacepourlavie.ca/carnet-horticole/astilbe-chinensis-pumila"], "Orpin d'automne": ["https://www.jardiner-malin.fr/boutique/sedum-herbstfreude-hylotelephium-telephium", "https://www.truffaut.com/orpin-herbstfreude-godet-5-20-cm.html", "https://www.gardenersworld.com/plants/hylotelephium-herbstfreude/"], "Tritoma": ["https://www.truffaut.com/tritoma-lemon-en-pot-de-3-litres.html", "https://www.rhs.org.uk/plants/articles/misc/Kniphofia", "https://www.promessedefleurs.ie/gardening-tips/advicesheet/kniphofia-the-most-beautiful-varieties/"], "Valériane rouge": ["https://www.jardiner-malin.fr/fiche/valeriane-rouge.html", "https://www.truffaut.com/lot-de-6-centranthus-ruber-coccineus-h-10-20-cm.html", "https://giardinocapracotta.unimol.it/en/collezione-botanica/centranthus-ruber-l-dc-subsp-ruber/"], "Agapanthe": ["https://jardiner-malin.fr/fiche/agapanthe.html", "https://www.truffaut.com/agapanthe-varietes-plantation-entretien.html", "https://www.futura-sciences.com/planete/definitions/botanique-agapanthe-19572/"], "Hémérocalle": ["https://www.jardiner-malin.fr/fiche/hemerocallis.html", "https://www.truffaut.com/hemerocalle-wild-horses-godet-5-20-cm.html", "https://www.plantesdehaies-heijnen.fr/hemerocallis"], "Iris des jardins": ["https://www.jardiner-malin.fr/fiche/iris-des-jardin-germanica.html", "https://www.truffaut.com/iris-varietes-plantation-entretien.html", "https://www.jardins-familiaux.org/pdf/news/fr/FR170711_F_FrankreichIris28.pdf"], "Vergerette": ["https://www.jardiner-malin.fr/fiche/erigeron-vergerette-plantation-entretien.html", "https://www.truffaut.com/vergerette-de-karvinski-erigeron-karvinskianus-erigeron-karvinskianus-24.html", "https://www.rhsplants.co.uk/search/_/search.-/vid.69/vid.3043/"], "Brunnera 'Jack Frost'": ["https://www.truffaut.com/myosotis-du-caucase-jack-frostr-godet-5-20-cm.html", "https://www.rhs.org.uk/plants/172201/brunnera-macrophylla-jack-frost/details", "https://www.perennials.com/plants/brunnera-macrophylla-jack-frost.html"], "Alchémille": ["https://www.jardiner-malin.fr/fiche/alchemilla-mollis.html", "https://www.ebben.nl/fr/treeebb/almollis-alchemilla-mollis/pdf", "https://www.rhs.org.uk/plants/774/wd/details"], "Digitale": ["https://www.jardiner-malin.fr/fiche/digitale.html", "https://www.truffaut.com/digitale-pourpre-godet-vert-202262.html", "https://www.techno-science.net/fr/definitions/digitale-pourpre"], "Thym serpolet": ["https://www.jardiner-malin.fr/fiche/thym-serpolet.html", "https://www.truffaut.com/lot-de-6-thymus-serpyllum-petit-thym-h-10-20-cm-p-o-9-cm.html", "https://espacepourlavie.ca/carnet-horticole/thym-serpolet"], "Petite pervenche": ["https://www.jardiner-malin.fr/fiche/vinca-minor-petite-pervenche.html", "https://ebben.nl/fr/treeebb/viminor-vinca-minor/pdf", "https://www.truffaut.com/petite-pervenche-6-plants-h-15-25-cm-pot-o11-cm.html"], "Géranium à grosses racines": ["https://www.ebben.nl/fr/treeebb/gemacror-geranium-macrorrhizum/pdf", "https://www.pepiniere-bretagne.fr/pdf/10938.pdf", "https://www.rhs.org.uk/plants/7891/wd/details"], "Épimède": ["https://www.jardiner-malin.fr/fiche/epimedium.html", "https://www.truffaut.com/epimedium-frohnleiten-h-15-25-cm-pot-o11-cm.html", "https://www.rhs.org.uk/plants/93756/epimedium-x-perralchicum/details"], "Lamier 'White Nancy'": ["https://www.jardiner-malin.fr/fiche/lamier-lamium.html", "https://www.truffaut.com/lamier-white-nancy-godet-202382.html", "https://www.rhs.org.uk/plants/90876/lamium-maculatum-white-nancy/details"], "Herbe aux turquoises": ["https://www.promessedefleurs.ie/perennials/perennials-by-variety/ophiopogon/ophiopogon-japonicus.html", "https://www.truffaut.com/ophiopogon-herbe-aux-turquoises-big-blue-x12-plante-d-exterieur.html", "https://hort.ifas.ufl.edu/shrubs/OPHJAPA.PDF"], "Oreille d'ours": ["https://www.jardiner-malin.fr/fiche/stachys-byzantina-oreille-ours.html", "https://www.promessedefleurs.ie/gardening-tips/familysheet/bear-s-ear-stachys-planting-cultivation-and-maintenance", "https://plants.ces.ncsu.edu/plants/stachys-byzantina/common-name/wooly-betony"], "Bugle rampante": ["https://www.jardiner-malin.fr/fiche/fleur/bugle-rampante.html", "https://www.truffaut.com/bugle-rampante-godet-5-20-cm.html", "https://espacepourlavie.ca/carnet-horticole/bugle-rampante-burgundy-glow"], "Ail d'ornement 'Purple Sensation'": ["https://www.truffaut.com/ail-d-ornement-purple-sensation-30-bulbes.html", "https://www.jardiner-malin.fr/fiche/allium.html", "https://waterwiseplants.org/find-a-plant/purple-sensation-allium"], "Narcisse 'Thalia'": ["https://www.truffaut.com/narcisse-thalia-30-bulbes.html", "https://www.rhsplants.co.uk/plants/_/narcissus-thalia/classid.2000008256/", "https://www.johnscheepers.com/narcissus-thalia.html"], "Camassia": ["https://www.jardiner-malin.fr/fiche/camassia.html", "https://www.nature-and-garden.com/gardening/camassia-leichtlinii.html", "https://www.gardenersworld.com/plants/camassia-leichtlinii-subsp-leichtlinii"], "Crocosmia 'Lucifer'": ["https://www.jardiner-malin.fr/boutique/crocosmia-lucifer", "https://www.truffaut.com/crocosmia-lucifer-godet-5-20-cm.html", "https://www.gardenersworld.com/plants/crocosmia-lucifer/"], "Muscari": ["https://www.jardiner-malin.fr/fiche/muscari-jacinthe.html", "https://www.truffaut.com/muscari-d-armenie-100-bulbes.html", "https://gardenersworld.com/plants/muscari-armeniacum"], "Cyclamen de Naples": ["https://www.jardiner-malin.fr/fiche/cyclamen-de-naples.html", "https://www.truffaut.com/cyclamen-de-naples-lot-de-3-godets.html", "https://perennials.com/plants/cyclamen-hederifolium.html"], "Jasmin étoilé": ["https://www.jardiner-malin.fr/fiche/jasmin-etoile.html", "https://www.ebben.nl/fr/treeebb/trjasmin-trachelospermum-jasminoides/pdf", "https://www.truffaut.com/jasmin-etoile-planter-entretenir.html"], "Clématite 'Étoile Violette'": ["https://www.promessedefleurs.ie/climbers/clematis/clematis-by-variety/clematis-viticella/clematis-x-viticella-etoile-violette.html", "https://www.rhs.org.uk/plants/details?plantid=463", "https://www.provendernurseries.co.uk/factsheets/clematis-etoile-violette"], "Rosier grimpant 'New Dawn'": ["https://www.jardiner-malin.fr/fiche/rosier-new-dawn.html", "https://www.truffaut.com/rosier-grimpant-new-dawn-pot-5-litres-830746.html", "https://roseraie-ducher.com/en/rosiers-grimpants/265-800-rosier-grimpant-new-dawn.html"], "Chèvrefeuille des bois": ["https://www.jardiner-malin.fr/fiche/chevrefeuille.html", "https://www.truffaut.com/chevrefeuille-plantation-entretien.html", "https://www.cap.chu-lille.fr/2021/01/26/chevrefeuille"], "Rosier de Banks": ["https://www.jardiner-malin.fr/fiche/rose-rosier-de-banks.html", "https://www.truffaut.com/rosier-banksiae-echelle-hauteur-90-120-cm-conteneur-3-litres-433689.html", "https://www.rhs.org.uk/plants/67581/rosa-banksiae-lutea/details"], "Bignone 'Madame Galen'": ["https://www.truffaut.com/bignone-madame-galen-3l.html", "https://www.jardiner-malin.fr/boutique/bignone-mme-galen-campsis-x-tagliabuana", "https://www.rhs.org.uk/plants/97959/campsis-tagliabuana-madame-galen/details"], "Hortensia grimpant": ["https://www.jardiner-malin.fr/fiche/hortensia-grimpant-entretien-planter.html", "https://www.ebben.nl/fr/treeebb/hypetio-hydrangea-petiolaris/pdf", "https://espacepourlavie.ca/carnet-horticole/hydrangee-grimpante"], "Pin des montagnes": ["https://www.ebben.nl/fr/treeebb/pimugo-pinus-mugo/pdf", "https://www.truffaut.com/pinus-mugo-mughus-ctr-4-5l-314469.html", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/pinus-mugo.pdf"], "Thuya boule 'Danica'": ["https://www.jardiner-malin.fr/boutique/thuya-du-canada-danica-thuja-occidentalis", "https://www.rhs.org.uk/plants/68725/thuja-occidentalis-danica/details", "https://www.truffaut.com/thuya-occidentalis-danica-30-40-cm-ctr-4l-64319.html"], "Photinia 'Red Robin'": ["https://www.jardiner-malin.fr/fiche/photinia-arbuste.html", "https://ebben.nl/fr/treeebb/phfrrobi-photinia-x-fraseri-red-robin/pdf", "https://www.truffaut.com/photinia-varietes-plantation-entretien.html"], "Éléagnus": ["https://ebben.nl/fr/treeebb/elebbing-elaeagnus-x-ebbingei/pdf", "https://www.jardiner-malin.fr/fiche/eleagnus.html", "https://www.greenweez.com/produit/elaeagnus-ebbingei-pot-de-1-5l-10-20-cm/8PLAN02HE"], "Laurier du Portugal": ["https://www.ebben.nl/fr/treeebb/prlusita-prunus-lusitanica/pdf/", "https://www.truffaut.com/prunus-lusitanica-ctr-5-litres-170992.html", "https://plants.ces.ncsu.edu/plants/prunus-lusitanica/common-name/portugal-laurel/"], "Osmanthe": ["https://www.jardiner-malin.fr/boutique/osmanthe-de-burkwood-osmanthus-x-burkwoodii", "https://ebben.nl/fr/treeebb/osburkwo-osmanthus-x-burkwoodii/pdf", "https://www.truffaut.com/osmanthe-plantation-entretien.html"], "Filaire": ["https://www.jardiner-malin.fr/fiche/filaire-phillyrea.html", "https://www.truffaut.com/phillyrea-angustifolia-pot-4l-883706.html", "https://jardin-thuret.hub.inrae.fr/content/download/6157/49668?version=1"], "Arbousier": ["https://www.jardiner-malin.fr/fiche/arbousier-taille-plantation.html", "https://www.truffaut.com/planter-tailler-entretenir-arbousier.html", "https://jardin-thuret.hub.inrae.fr/content/download/6685/54819?version=1"], "Escallonia": ["https://www.jardiner-malin.fr/fiche/escallonia-taille-entretien.html", "https://www.truffaut.com/escallonia-plantation-entretien.html", "https://www.greenweez.com/produit/escallonia-pink-elle-en-pot-de-3-litres/1ROUE0467"], "Bambou non traçant": ["https://www.jardiner-malin.fr/fiche/fargesia-bambou-compact-brise-vue.html", "https://www.rhs.org.uk/plants/82475/wd/details", "https://www.techno-science.net/fr/definitions/fargesia"], "Savonnier": ["https://www.jardiner-malin.fr/fiche/savonnier.html", "https://ebben.nl/fr/treeebb/kopanicu-koelreuteria-paniculata/pdf", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/koelreuteria-paniculata.pdf"], "Lilas des Indes": ["https://www.jardiner-malin.fr/fiche/lagerstroemia.html", "https://www.ebben.nl/fr/treeebb/laindica-lagerstroemia-indica/pdf/", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/lagerstroemia-indica.pdf"], "Arbre de Judée": ["https://www.jardiner-malin.fr/fiche/cercis-siliquastrum.html", "https://www.ebben.nl/fr/treeebb/cersiliq-cercis-siliquastrum/pdf/", "https://jardin-thuret.hub.inrae.fr/media/fiches-especes-ardem-2023/cercis-siliquastrum.pdf"], "Laurier-sauce": ["https://www.jardiner-malin.fr/fiche/laurier-sauce.html", "https://www.ebben.nl/fr/treeebb/lanobili-laurus-nobilis/pdf", "https://www.truffaut.com/laurus-nobilis-hauteur-150-175-cm-conteneur-18-litres-65073.html"], "Chêne vert": ["https://www.jardiner-malin.fr/fiche/chene-vert.html", "https://www.ebben.nl/fr/treeebb/quilex-quercus-ilex/pdf/", "https://www.saint-cyr-sur-loire.com/content/download/16740/262578/version/2/file/FICHES_BOTANIQUES_Chene-vert.pdf"], "Pittosporum à petites feuilles": ["https://www.jardiner-malin.fr/fiche/pittosporum-tenuifolium.html", "https://www.truffaut.com/pittosporum-tenuifolium-ctr-15-litres-267139.html", "https://gardenersworld.com/how-to/grow-plants/pittosporum-tenuifolium"], "Agastache 'Tutti Frutti'": ["https://www.jardiner-malin.fr/fiche/agastache.html", "https://www.rhs.org.uk/plants/155294/agastache-tutti-frutti/details", "https://www.plantdelights.com/products/agastache-tutti-frutti"], "Sauge arbustive 'Hot Lips'": ["https://www.truffaut.com/salvia-arbustive-hot-lips-conteneur-2-litres-671314.html", "https://www.fermedesaintemarthe.com/salvia-microphylla-hot-lips-plant-p-11038", "https://www.plantdelights.com/products/salvia-microphylla-hot-lips"], "Échinops": ["https://www.truffaut.com/boule-azuree-ritro-godet-5-20-cm.html", "https://www.jardiner-malin.fr/fiche/chardon-bleu.html", "https://www.nature-and-garden.com/gardening/echinops-ritro.html"], "Acanthe": ["https://www.jardiner-malin.fr/fiche/acanthe.html", "https://www.truffaut.com/acanthe-mollis-godet-5-20-cm.html", "https://www.donzy.fr/medias/2022/03/ACANTHE-ESCAPADE.pdf"], "Céanothe arborescent 'Trewithen Blue'": ["https://www.rhs.org.uk/plants/3253/Ceanothus-arboreus-Trewithen-Blue/Details", "https://www.pepinieres-minier.fr/en/produit/pdf/463282", "https://www.horticopia.info/Plants/098/ceaarb003.html"], "Laurier-rose": ["https://www.jardiner-malin.fr/fiche/laurier-rose.html", "https://www.truffaut.com/nerium-oleander-pot-3l-1032817.html", "https://espacepourlavie.ca/node/1745"], "Buisson ardent": ["https://www.jardiner-malin.fr/fiche/buisson-ardent-pyracantha.html", "https://www.rhs.org.uk/plants/14208/pyracantha-coccinea/details", "https://www.truffaut.com/pyracantha.html"], "Arroche marine": ["https://www.jardiner-malin.fr/fiche/pourpier-mer-arbuste-mer.html", "https://temperate.theferns.info/plant/Atriplex+halimus", "https://www.wildflowersprovence.fr/?p=20655"], "Sauge officinale": ["https://www.jardiner-malin.fr/fiche/sauge.html", "https://www.truffaut.com/sauge-officinale-ctr-1-litre-64553.html", "https://pays-de-la-loire.chambres-agriculture.fr/fileadmin/user_upload/Pays_de_la_Loire/022_Inst-Pays-de-la-loire/PEI-Sante-animale/2023_PEI_Fiche_Sauge_officinale.pdf"], "Origan": ["https://www.jardiner-malin.fr/fiche/origan.html", "https://www.truffaut.com/origan-plantation-culture-recolte.html", "https://gentiana.org/wp-content/uploads/Fiche-espece-Origan.pdf"], "Ciboulette": ["https://www.jardiner-malin.fr/fiche/ciboulette.html", "https://www.truffaut.com/ciboulette-varietes-plantation-entretien.html", "https://espacepourlavie.ca/carnet-horticole/ciboulette"], "Alaterne": ["https://www.jardiner-malin.fr/fiche/rhamnus-nerprun.html", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/rhamnus-alaternus.pdf", "https://jardin-thuret.hub.inrae.fr/content/download/6685/54819?version=1"], "Pistachier lentisque": ["https://www.truffaut.com/pistacia-lentiscus-conteneur-8-litres-h40-60-cm-366349.html", "https://landscapeplants.aub.edu.lb/Plants/PlantProfile/e7224acd-e359-4d46-818b-180d550a2361", "https://horticultureunlimited.com/?p=777"], "Coronille glauque": ["https://www.jardiner-malin.fr/boutique/coronilla-valentina-glauca", "https://www.futura-sciences.com/maison/actualites/jardin-plante-semaine-cet-arbuste-meconnu-fleurit-jaune-vif-sent-miel-resiste-secheresse-134019/", "https://www.botanic.cam.ac.uk/the-garden/plant-list/coronilla-valentina-ssp-glauca/"], "Buplèvre ligneux": ["https://andre-briant.fr/en/variety-range/index/3950-bupleurum-fruticosum.html", "https://www.rhsplants.co.uk/plants/_/bupleurum-fruticosum/classid.2000050890/sku.RH30007902", "https://www.wildflowersprovence.fr/?p=20640"], "Phlomis frutescent": ["https://www.jardiner-malin.fr/fiche/sauge-de-jerusalem.html", "https://www.truffaut.com/sauge-de-jerusalem-lot-de-9-godets.html", "https://rhs.org.uk/plants/12700/phlomis-fruticosa/details"], "Santoline": ["https://www.jardiner-malin.fr/fiche/santoline-santolina.html", "https://www.rhs.org.uk/plants/details?plantid=4099", "https://provendernurseries.co.uk/factsheets/santolina-chamaecyparissus"], "Immortelle d'Italie": ["https://www.jardiner-malin.fr/fiche/helichrysum-italicum.html", "https://www.truffaut.com/helichrysum-varietes-plantation-entretien.html", "https://www.futura-sciences.com/planete/definitions/botanique-plante-curry-22486/"], "Ciste blanc": ["https://www.jardiner-malin.fr/boutique/ciste-des-corbieres-cistus-x-corbariensis", "https://www.truffaut.com/cistus-corbariensis-ctr-3-litres-492773.html", "https://www.rhs.org.uk/plants/89381/cistus-x-hybridus/details"], "Westringia": ["https://www.truffaut.com/westringia-fruticosa-plante-fleurie-40-50-cm-19-cm-plante-d-exterieur-fleur-blanche.html", "https://verd-urba.diba.cat/printpdf/765", "https://www.promessedefleurs.ie/gardening-tips/familysheet/westringia-fruticosa-australian-rosemary-planting-growing-and-care"], "Grevillea": ["https://www.promessedefleurs.ie/gardening-tips/fichaplanta/emgrevillea-em-planting-pruning-and-care/", "https://www.rhs.org.uk/plants/8115/grevillea-rosmarinifolia/details", "https://www.truffaut.com/grevillea-plantation-entretien.html"], "Rince-bouteille": ["https://www.jardiner-malin.fr/fiche/callistemon.html", "https://www.truffaut.com/callistemon-plantation-entretien.html", "https://fr.vikidia.org/wiki/Rince-bouteille"], "Fusain du Japon": ["https://www.jardiner-malin.fr/boutique/fusain-du-japon-kathy-euonymus-japonicus", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/euonymus-japonicus.pdf", "https://plants.ces.ncsu.edu/plants/euonymus-japonicus-aureomarginatus/"], "Chèvrefeuille arbustif": ["https://www.jardiner-malin.fr/fiche/lonicera-nitida-chevrefeuille-arbustif.html", "https://www.ebben.nl/fr/treeebb/lonitida-lonicera-nitida/pdf", "https://www.denolf.com/fr_FR/plantguide/lonitida-lonicera-nitida-23782"], "Houx": ["https://www.jardiner-malin.fr/fiche/ilex-aquifolium.html", "https://www.ebben.nl/fr/treeebb/ilaquifo-ilex-aquifolium/pdf/", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/ilex-aquifolium.pdf"], "If": ["https://www.jardiner-malin.fr/fiche/if.html", "https://www.ebben.nl/fr/treeebb/tabaccat-taxus-baccata/pdf/", "https://www.rhs.org.uk/plants/18001/Taxus-baccata/Details"], "Osmanthe à feuilles de houx": ["https://www.jardiner-malin.fr/fiche/osmanthe-automne-osmanthus-heterophyllus.html", "https://ebben.nl/fr/treeebb/oshetero-osmanthus-heterophyllus/pdf", "https://edis.ifas.ufl.edu/publication/FP450/pdf"], "Cotonéaster": ["https://www.truffaut.com/cotoneaster-lacteus-ctr-4-litres-25700.html", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/cotoneaster-lacteus.pdf", "https://www.rhs.org.uk/plants/details?plantid=565"], "Céanothe 'Skylark'": ["https://www.truffaut.com/ceanothus-thyrsiflorus-skylark-c4l-696705.html", "https://www.denolf.com/plantguide/cetskyla-ceanothus-thyrsiflorus-skylark-7710", "https://horticopia.info/Plants/021/ceathy002.html"], "Lavande vraie 'Hidcote'": ["https://www.ebben.nl/fr/treeebb/laahidco-lavandula-angustifolia-hidcote/pdf", "https://www.truffaut.com/lavandula-angustifolia-hidcote-3l-rc-386210.html", "https://www.denolf.com/fr_FR/plantguide/laahidco-lavandula-angustifolia-hidcote-23403"], "Lavande papillon": ["https://www.jardiner-malin.fr/fiche/lavande-papillon.html", "https://www.truffaut.com/lavande-stoechas-pot-1l-1108068.html", "https://calanques-parcnational.fr/explorer-comprendre/flore/flore-vasculaire/lavande-stechade"], "Gattilier": ["https://www.jardiner-malin.fr/fiche/vitex-agnus-castus.html", "https://www.denolf.com/fr_FR/plantguide/viaclati-vitex-agnus-castus-latifolia-48796", "https://www.botanic.cam.ac.uk/the-garden/plant-list/vitex-agnus-castus"], "Caryoptéris": ["https://www.jardiner-malin.fr/fiche/caryopteris.html", "https://ebben.nl/fr/treeebb/caclando-caryopteris-x-clandonensis/pdf", "https://gardenersworld.com/how-to/grow-plants/grow-caryopteris"], "Dentelaire de Willmott": ["https://www.denolf.com/fr_FR/plantguide/cewillmo-ceratostigma-willmottianum-7720", "https://www.pepinieres-minier.fr/produit/pdf/463963", "https://www.rhs.org.uk/plants/3411/ceratostigma-willmottianum/details"], "Hibiscus de Syrie": ["https://www.jardiner-malin.fr/fiche/hibiscus-syriacus.html", "https://www.truffaut.com/hibiscus-exterieur-jardin.html", "https://ebben.nl/fr/treeebb/hisyriac-hibiscus-syriacus/pdf"], "Lilas": ["https://www.jardiner-malin.fr/fiche/lilas.html", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/syringa-vulgaris.pdf", "https://www.truffaut.com/lilas-varietes-plantation.html"], "Seringat": ["https://www.truffaut.com/seringat-varietes.html", "https://ebben.nl/fr/treeebb/phcorona-philadelphus-coronarius/pdf", "https://www.futura-sciences.com/planete/definitions/plante-seringat-19526/"], "Deutzia": ["https://www.jardiner-malin.fr/fiche/deutzia.html", "https://www.treesandshrubsonline.org/articles/deutzia/deutzia-x-hybrida/", "https://www.promessedefleurs.ie/shrubs/shrubs-by-variety/deutzia/deutzia-mont-rose.html"], "Weigela": ["https://www.jardiner-malin.fr/fiche/weigelia.html", "https://www.ebben.nl/fr/treeebb/weflorid-weigela-florida/pdf", "https://www.rhs.org.uk/plants/101006/wd/details"], "Rosier glauque": ["https://ebben.nl/fr/treeebb/roglauca-rosa-glauca/pdf", "https://www.techno-science.net/fr/definitions/rosa-glauca", "https://www.gardenersworld.com/plants/rosa-glauca/"], "Rosier rugueux": ["https://www.jardiner-malin.fr/fiche/rosier-rugueux.html", "https://www.ebben.nl/fr/treeebb/rorugosa-rosa-rugosa/pdf", "https://plants.usda.gov/DocumentLibrary/factsheet/pdf/fs_roru.pdf"], "Arbre à perruque": ["https://www.jardiner-malin.fr/fiche/cotinus.html", "https://www.truffaut.com/arbre-a-perruques-royal-purple-5l.html", "https://www.ebben.nl/fr/treeebb/cocrpurp-cotinus-coggygria-royal-purple/pdf"], "Viorne lantane": ["https://www.jardiner-malin.fr/fiche/viburnum-lantana.html", "https://www.ebben.nl/fr/treeebb/vilantan-viburnum-lantana/pdf", "https://www.pepiniere.ca/en/products/viburnum-lantana"], "Viorne obier": ["https://www.jardiner-malin.fr/fiche/viorne-obier.html", "https://www.ebben.nl/fr/treeebb/viopulus-viburnum-opulus/pdf/", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/viburnum-opulus.pdf"], "Noisetier": ["https://ebben.nl/fr/treeebb/coavella-corylus-avellana/pdf", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/corylus-avellana.pdf", "https://www.truffaut.com/noisetier-vert-pot-4litres-36973.html"], "Aubépine": ["https://www.jardiner-malin.fr/fiche/aubepine.html", "https://ebben.nl/fr/treeebb/crmonogy-crataegus-monogyna/pdf", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/crataegus-monogyna.pdf"], "Sureau noir": ["https://www.jardiner-malin.fr/fiche/sureau-sambucus-nigra.html", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/sambucus-nigra.pdf", "https://www.techno-science.net/fr/definitions/sureau-noir"], "Charmille": ["https://www.jardiner-malin.fr/fiche/charme.html", "https://www.truffaut.com/carpinus-betulus-ctr-7l-532329.html", "https://www.ebben.nl/fr/treeebb/cabetulu-carpinus-betulus/pdf/"], "Érable champêtre": ["https://www.jardiner-malin.fr/fiche/erable-champetre.html", "https://www.ebben.nl/fr/treeebb/accampes-acer-campestre/pdf/", "https://trees.hillier.co.uk/trees/acer-campestre/"], "Cornouiller mâle": ["https://www.jardiner-malin.fr/fiche/cornouiller-male.html", "https://www.ebben.nl/fr/treeebb/comas-cornus-mas/pdf/", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/cornus-mas.pdf"], "Olivier": ["https://www.jardiner-malin.fr/fiche/olivier.html", "https://www.truffaut.com/olivier-varietes-plantation-culture.html", "https://www.futura-sciences.com/planete/definitions/botanique-olivier-8064/"], "Arbre de soie": ["https://www.jardiner-malin.fr/fiche/albizia.html", "https://www.ebben.nl/fr/treeebb/aljulibr-albizia-julibrissin/pdf/", "https://www.truffaut.com/planter-albizia.html"], "Érable de Montpellier": ["https://www.jardiner-malin.fr/fiche/acer-monspessulanum-erable-montpellier.html", "https://www.ebben.nl/fr/treeebb/acmonspe-acer-monspessulanum/pdf/", "https://jardin-thuret.hub.inrae.fr/content/download/6713/54929?version=1"], "Pommier d'ornement": ["https://www.jardiner-malin.fr/fiche/pommier-ornement.html", "https://www.ebben.nl/fr/treeebb/maeveres-malus-evereste/pdf/", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/malus-evereste-perpetu.pdf"], "Prunier pourpre": ["https://www.ebben.nl/fr/treeebb/prcnigra-prunus-cerasifera-nigra/pdf", "https://gardenersworld.com/plants/prunus-cerasifera-nigra", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/prunus-cerasifera-pissardii.pdf"], "Lilas de Perse": ["https://www.jardiner-malin.fr/fiche/melia-azedarach.html", "https://jardin-thuret.hub.inrae.fr/media/fiches-especes-ardem-2023/melia-azedarach.pdf", "https://www.rhs.org.uk/plants/57957/melia-azedarach/details"], "Tamaris": ["https://www.jardiner-malin.fr/fiche/tamaris-arbuste-fleur.html", "https://www.truffaut.com/tamaris-varietes-plantation-taille.html", "https://www.ebben.nl/fr/treeebb/taramosi-tamarix-ramosissima/pdf"], "Amélanchier": ["https://www.jardiner-malin.fr/fiche/amelanchier.html", "https://ebben.nl/fr/treeebb/amlamarc-amelanchier-lamarckii/pdf", "https://www.lapetiteloiterie.fr/lpl/wp-content/uploads/amelanchier-lamarckii.pdf"], "Sauge de Graham": ["https://www.jardiner-malin.fr/fiche/sauge-de-graham-grahamii.html", "https://sunset.com/garden/flowers-plants/easy-autumn-sage", "https://www.rhs.org.uk/Plants/16335/wd/Details"], "Sauge sclarée": ["https://www.truffaut.com/sauge-sclaree-godet-5-20-cm.html", "https://ain.chambres-agriculture.fr/fileadmin/user_upload/National/FAL_commun/publications/Auvergne-Rhone-Alpes/AB_Sauge_sclaree_2022.pdf", "https://www.techno-science.net/fr/definitions/sauge-sclaree"], "Sauge 'Amistad'": ["https://www.jardiner-malin.fr/boutique/sauge-amistad", "https://www.truffaut.com/salvia-amistad-c-7-5l-564188.html", "https://cotswoldgardenflowers.co.uk/encyclopedia/salvia-amistad/"], "Calament": ["https://www.truffaut.com/calament-godet-vert-209223.html", "https://plants.ces.ncsu.edu/plants/clinopodium-nepeta/", "https://inpn.mnhn.fr/espece/cd_nom/91910/tab/taxo"], "Origan 'Herrenhausen'": ["https://www.truffaut.com/origan-violet-origanum-laevigatum-herrenhausen-48.html", "https://www.rhs.org.uk/plants/79410/origanum-laevigatum-herrenhausen/details", "https://bethchatto.co.uk/o-r/origanum/origanum-laevigatum-herrenhausen.htm"], "Panicaut des Pyrénées": ["https://www.randozone.com/flore/chardon-bleu-des-pyrenees/", "https://www.jardiner-malin.fr/fiche/chardon-bleu.html", "https://www.promessedefleurs.ie/gardening-tips/advicesheet/choosing-an-eryngium/"], "Panicaut plane": ["https://www.natureetdecouvertes.com/jardin/decoration-jardin/plantes-exterieur/6-x-chardon-bleu-eryngium-planum-godet-9x9-cm-93350840", "https://www.havlis.cz/catalogue/eryngium-planum-blue-eryngo", "https://worldfloradb.net/plants/eryngium-planum-l"], "Molène": ["https://www.truffaut.com/molene-olympicum-godet-5-20-cm.html", "https://www.nature-and-garden.com/gardening/verbascum-olympicum.html", "https://www.pepiniere.ca/en/products/molene-d-olympe-bio"], "Asphodéline jaune": ["https://www.provendernurseries.co.uk/factsheets/asphodeline-lutea", "https://www.rhs.org.uk/plants/1709/wd/details", "https://horticopia.info/Plants/003/asplut000.html"], "Scabieuse colombaire": ["https://www.jardiner-malin.fr/fiche/scabieuse-scabiosa.html", "https://gardenersworld.com/plants/scabiosa-columbaria", "https://www.rhs.org.uk/plants/16772/wd/details"], "Knautie de Macédoine": ["https://www.jardiner-malin.fr/fiche/knautia-macedonica-petite-scabieuse-de-macedoine.html", "https://www.gardenersworld.com/plants/plant-finder/knautia-macedonica/", "https://www.rhs.org.uk/Plants/61000/Knautia-macedonica/Details"], "Penstemon 'Garnet'": ["https://www.rhs.org.uk/plants/46091/penstemon-andenken-an-friedrich-hahn/details", "https://hardysplants.co.uk/perennials/penstemon-andenken-an-friedrich-hahn-garnet", "https://www.plantdelights.com/products/penstemon-garnet"], "Gaillarde": ["https://www.jardiner-malin.fr/fiche/gaillarde.html", "https://www.truffaut.com/gaillarde-conteneur-3-litres-39960.html", "https://www.fermedesaintemarthe.com/gaillarde-royale-plant-p-11010"], "Coréopsis 'Moonbeam'": ["https://www.denolf.com/fr_FR/plantguide/covmoonb-coreopsis-verticillata-moonbeam-10437", "https://www.truffaut.com/coreopsis-moonbeam-godet-vert-205940.html", "https://finegardening.com/plant/thread-leaved-tickseed-coreopsis-verticillata-moonbeam"], "Hélénie": ["https://espacepourlavie.ca/carnet-horticole/helenie-automnale", "https://www.jardiner-malin.fr/fiche/helenium.html", "https://hort.extension.wisc.edu/articles/helenium-helenium-autumnale/"]};
PLANTS.forEach(p => { p.src = (p.x && p.x.src) || SRC[p.nom] || null; });
// Les plantes ajoutées décrivent elles-mêmes leurs caractéristiques ; les premières passent par les listes de noms latins.
const evergreen = p => p.x ? !!p.x.pers : EVERGREEN.test(p.latin);
const melli = p => p.x ? !!p.x.mel : MELLI.test(p.latin);

// ---------- Options ----------
const OPT = {
  obj:[["massif","Habiller mon jardin"],["isoler","M'isoler du voisinage"],["pollin","Attirer abeilles et papillons"],["mur","Habiller un mur ou une clôture"]],
  expo:[["s","Plein soleil"],["m","Mi-ombre"],["o","Ombre"]],
  sol:[["a","Argileux"],["ac","Argilo-calcaire"],["c","Calcaire"],["s","Sableux"],["h","Humifère"]],
  eau:[["d","Sec"],["f","Frais"],["w","Humide"]],
  clim:[["med","Méditerranéen"],["so","Sud-Ouest"],["oc","Océanique"],["co","Continental"],["mo","Montagnard"]],
  types:[["arbre","Arbres"],["arbuste","Arbustes"],["graminee","Graminées"],["vivace","Vivaces"],["couvre-sol","Couvre-sols"],["bulbe","Bulbes"],["aromatique","Aromatiques"],["grimpante","Grimpantes"]],
  pal:[["all","Toutes"],["chaud","Tons chauds"],["froid","Bleus et violets"],["rose","Roses et pastels"],["blanc","Blanc et vert"]],
  arro:[["1","Aucun, une fois installées"],["2","Occasionnel"],["3","Régulier"]],
  prof:[["60","60 cm"],["100","1 m"],["150","1,5 m"],["200","2 m et plus"]],
  style:Object.entries({libre:0,med:0,nat:0,anglais:0,contemporain:0,sauvage:0}).map(([k])=>[k, ({libre:"Sans style imposé",med:"Méditerranéen sec",nat:"Naturaliste",anglais:"Jardin anglais",contemporain:"Contemporain épuré",sauvage:"Refuge biodiversité"})[k]]),
  vite:[["rapide","Rapide en priorité"],["tout","Peu importe"]],
  haut:[["2","2 m"],["3","3 m"],["4","4 m et plus"]],
  fmt:[["petit","Petits formats"],["moyen","Formats moyens"]],
  taille:[["p","Petit · 3 m²"],["m","Moyen · 6 m²"],["g","Grand · 12 m²"]],
  hmax:[["50","Jusqu'à 50 cm"],["100","Jusqu'à 1 m"],["haut","Plutôt hautes"],["0","Peu importe"]],
  dens:[["a","Aéré"],["n","Généreux"],["d","Très fourni"]]
};
// Densité : écart entre les plantes sur le plan, en part de leur largeur adulte.
const DENS = {a:1.3, n:1, d:0.8};
const CLIM = {
  med:{min:-6,hint:"Hivers doux (jusqu'à −6 °C), étés chauds et secs."},
  so:{min:-10,hint:"Hivers jusqu'à −10 °C, étés chauds avec épisodes de sécheresse."},
  oc:{min:-10,hint:"Hivers doux et humides, étés tempérés."},
  co:{min:-20,hint:"Hivers froids jusqu'à −20 °C, étés chauds."},
  mo:{min:-25,hint:"Hivers rudes jusqu'à −25 °C, saison courte."}
};
const PAL = {chaud:["chaud","blanc","vert"],froid:["froid","blanc","vert","rose"],rose:["rose","blanc","froid","vert"],blanc:["blanc","vert"]};
const SWATCH = {chaud:"#E8822C",froid:"#6A4BB0",rose:"#D46A9A",blanc:"#F6F3E8"};
const MOIS = ["J","F","M","A","M","J","J","A","S","O","N","D"];
const MOIS_LONG = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

const OBJ_HINT = {
  massif:"Un massif en rangées, du fond vers l'allée, selon la profondeur disponible.",
  isoler:"Une haie libre et persistante qui cache la vue toute l'année : plusieurs espèces mélangées, un plant tous les mètres environ.",
  pollin:"Uniquement des plantes mellifères, avec des floraisons étalées du printemps à l'automne.",
  mur:"Des grimpantes sur le support, et quelques plantes basses pour habiller le pied."
};
const TAILLE_LBL = {
  massif:{p:"3 m de long",m:"4 m de long",g:"6 m de long"},
  pollin:{p:"3 m de long",m:"4 m de long",g:"6 m de long"},
  mur:{p:"3 m de mur",m:"5 m de mur",g:"8 m de mur"},
  isoler:{p:"5 m de haie",m:"10 m de haie",g:"15 m de haie"}
};
const EVERGREEN = /Ceanothus arboreus|Nerium|Pyracantha|Atriplex|Viburnum tinus|Choisya|Myrtus|Pittosporum|Ceanothus|Teucrium|Abelia|Pinus|Thuja|Trachelospermum|Salvia rosmarinus|Sarcococca|Cistus|Photinia|Elaeagnus|Prunus lusitanica|Osmanthus|Phillyrea|Arbutus|Escallonia|Fargesia|Lavandula|Euphorbia|Vinca|Ophiopogon|Festuca|Carex|Helleborus|Heuchera|Thymus|Stachys|Laurus|Quercus ilex/;
const MELLI = /Ceanothus arboreus|Pyracantha|banksiae|Campsis|Lavandula|yangii|Nepeta|nemorosa|Echinacea|Origanum|Hylotelephium|officinalis|Achillea|Verbena|Centranthus|Thymus|rosmarinus|Teucrium|Ceanothus|Cistus|Allium|Abelia|Agapanthus|lindheimeri|Rudbeckia|Geranium|Digitalis|Elaeagnus|Escallonia|Viburnum|Arbutus|Phillyrea|Lonicera|Erigeron|Muscari|Kniphofia|Myrtus|Clematis|Photinia|Choisya|Sarcococca|Crocosmia|Camassia|Spiraea|Hydrangea paniculata|Agastache|Echinops|microphylla|Koelreuteria|Lagerstroemia|Cercis|Laurus|Acanthus/;
// Plantes qui se cultivent en pot ou en jardinière (balcon, terrasse). Les plantes ajoutées le disent elles-mêmes avec x.pot.
const POT = new Set(["Lavandula × intermedia", "Lavandula angustifolia 'Hidcote'", "Lavandula stoechas", "Salvia rosmarinus", "Cistus × purpureus", "Abelia × grandiflora", "Hydrangea macrophylla", "Hydrangea paniculata", "Choisya ternata", "Sarcococca confusa", "Myrtus communis", "Pittosporum tobira 'Nana'", "Teucrium fruticans", "Spiraea japonica", "Thuja occidentalis", "Pinus mugo", "Santolina chamaecyparissus", "Helichrysum italicum", "Westringia fruticosa", "Callistemon citrinus", "Nerium oleander", "Laurus nobilis", "Olea europaea", "Caryopteris × clandonensis", "Ceratostigma willmottianum", "Phlomis fruticosa", "Coronilla valentina subsp. glauca", "Euonymus japonicus", "Lonicera nitida", "Fargesia murielae", "Grevillea rosmarinifolia", "Nassella tenuissima", "Pennisetum alopecuroides", "Carex morrowii", "Festuca glauca", "Hakonechloa macra", "Muhlenbergia capillaris", "Helictotrichon sempervirens", "Sesleria autumnalis", "Briza media", "Bouteloua gracilis", "Pennisetum orientale 'Karley Rose'", "Luzula sylvatica", "Miscanthus sinensis 'Gracillimus'", "Oenothera lindheimeri", "Achillea millefolium", "Echinacea purpurea", "Rudbeckia fulgida", "Nepeta × faassenii", "Salvia nemorosa", "Geranium", "Heuchera", "Helleborus × hybridus", "Hosta", "Astilbe", "Hylotelephium 'Herbstfreude'", "Centranthus ruber", "Agapanthus", "Hemerocallis", "Brunnera macrophylla", "Alchemilla mollis", "Agastache", "Salvia microphylla", "Salvia greggii", "Clinopodium nepeta", "Origanum laevigatum 'Herrenhausen'", "Scabiosa columbaria", "Penstemon 'Garnet'", "Gaillardia × grandiflora", "Coreopsis verticillata 'Moonbeam'", "Aster × frikartii 'Mönch'", "Leucanthemum × superbum", "Lychnis coronaria", "Epilobium canum", "Ballota pseudodictamnus", "Linum perenne", "Euphorbia characias", "Asplenium scolopendrium", "Polystichum setiferum", "Erigeron karvinskianus", "Thymus serpyllum", "Lamium maculatum", "Ophiopogon japonicus", "Stachys byzantina", "Ajuga reptans", "Geranium sanguineum", "Helianthemum nummularium", "Cerastium tomentosum", "Phedimus spurius", "Teucrium chamaedrys", "Bergenia cordifolia", "Liriope muscari", "Narcissus", "Narcissus 'Tête-à-tête'", "Muscari armeniacum", "Tulipa clusiana", "Crocus tommasinianus", "Ipheion uniflorum", "Allium cristophii", "Allium sphaerocephalon", "Cyclamen hederifolium", "Cyclamen coum", "Galanthus nivalis", "Salvia officinalis", "Origanum vulgare", "Allium schoenoprasum", "Thymus vulgaris", "Hyssopus officinalis", "Satureja montana", "Trachelospermum jasminoides", "Clematis viticella", "Clematis cirrhosa", "Passiflora caerulea", "Solanum laxum", "Lathyrus latifolius"]);
const pot = p => p.x && "pot" in p.x ? !!p.x.pot : POT.has(p.latin);
const has = o => state.obj.includes(o);
function goals(){
  const hedge=has("isoler"), wall=has("mur"), melli=has("pollin");
  const massif=has("massif") || (melli && !hedge && !wall);
  return {hedge,wall,melli,massif};
}
function objHint(){ return state.obj.map(o=>OBJ_HINT[o]).join(" "); }
function tailleLbl(v){
  const G=goals();
  if(G.hedge) return TAILLE_LBL.isoler[v];
  if(G.massif) return TAILLE_LBL.massif[v];
  return TAILLE_LBL.mur[v];
}
// Besoin en eau une fois la plante installée (après 1 à 2 étés), sous climat du Sud-Ouest.
// 1 = aucun arrosage, 2 = arrosage occasionnel pendant les canicules, 3 = arrosage régulier en été.
const DRY = /Ceanothus arboreus|Nerium|Atriplex|Pyracantha|Lavandula|rosmarinus|Cistus|yangii|Ceanothus|Viburnum tinus|Myrtus|Pittosporum tobira|Teucrium|Nassella|Festuca|Muhlenbergia|lindheimeri|Achillea|Nepeta|Euphorbia|Hylotelephium|Centranthus|Iris|Erigeron|Thymus|Stachys|Allium hollandicum|Muscari|Cyclamen|Geranium macrorrhizum|officinalis|Origanum|Elaeagnus|Phillyrea|Laurus|Quercus ilex|Cercis|Agastache|microphylla|Echinops|Acanthus|Pinus|Vinca|Koelreuteria|banksiae|Campsis/;
const THIRSTY = /Hydrangea|Heuchera|Anemone|Rudbeckia|Astilbe|Hosta|Dryopteris|Camassia|Carex|Brunnera|Digitalis|Lamium|Ajuga|Hakonechloa|Cornus|Spiraea|Choisya|Sarcococca|Lonicera|Clematis|Rosa|Alchemilla|Fargesia|schoenoprasum/;
function water(p){
  if(p.x && p.x.eau) return p.x.eau;
  if(DRY.test(p.latin)) return 1;
  if(THIRSTY.test(p.latin) || !p.heat || (p.eau.includes("w") && !p.eau.includes("d"))) return 3;
  return 2;
}
// ---------- Croissance ----------
// Vitesse de pousse des plantes ligneuses (hauteur gagnée par an) et taille à la plantation selon le format.
const FAST = /Ceanothus arboreus|Pyracantha|Atriplex|Elaeagnus|Pittosporum tenuifolium|Ceanothus|Cistus|Escallonia|Photinia|yangii|Lavandula|Campsis|banksiae|Clematis|Lonicera|Abelia|Spiraea|Cornus|Teucrium|Hydrangea paniculata/;
const SLOW = /Quercus ilex|Phillyrea|Myrtus|Pinus|Thuja|Arbutus|Lagerstroemia|Hydrangea anomala|Sarcococca|Pittosporum tobira|Osmanthus/;
// Forces et points d'attention de chaque plante, en mots simples : 2 de chaque au plus.
const CAVEATS = [
  [/Lavandula/, "Se dégarnit après 8 à 10 ans"], [/Gaura|lindheimeri/, "Vit 3 à 4 ans"], [/Agastache/, "Vit 2 à 3 ans, craint l'hiver humide"],
  [/Gaillardia/, "Vit 2 à 3 ans"], [/Verbena bonariensis/, "Vit peu, mais se ressème"], [/Centranthus/, "Se ressème partout"],
  [/Erigeron/, "Se ressème volontiers"], [/Nassella|Stipa/, "Se ressème beaucoup"], [/Salvia sclarea|Digitalis/, "Vit 2 ans, se ressème"],
  [/Miscanthus|Pennisetum|Calamagrostis/, "À rabattre chaque fin d'hiver"], [/Rosa/, "Taille et soins réguliers"],
  [/Hydrangea macrophylla/, "Arrosage régulier l'été"], [/Cistus/, "Vit 8 à 10 ans, pas de taille sévère"],
  [/Euphorbia/, "Sève irritante : gants pour la taille"], [/Pyracantha|Rosa rugosa|Echinops/, "Piquant"],
  [/Wisteria|Campsis|Lonicera periclymenum|Hedera/, "Vigoureuse : à contenir"], [/Clematis/, "Taille selon la variété"],
  [/Iris germanica|Hemerocallis|Kniphofia/, "À diviser tous les 4 à 5 ans"], [/Fargesia/, "Prend de la place avec le temps"],
  // Fragilités et maladies fréquentes
  [/Photinia/, "Sensible aux taches des feuilles"], [/Euonymus japonicus/, "Sensible à l'oïdium"], [/Lagerstroemia/, "Fait de l'oïdium en climat humide"],
  [/Pyracantha|Crataegus|Cotoneaster/, "Sensible au feu bactérien"], [/Lonicera periclymenum/, "Sensible aux pucerons et à l'oïdium"],
  [/Acanthus|Pulmonaria|Symphyotrichum/, "Fait souvent de l'oïdium l'été"], [/Vitis/, "Sensible à l'oïdium et au mildiou"],
  [/Hosta|Echinacea/, "Adorée des limaces"], [/Heuchera/, "Se dégarnit après 4 à 5 ans"], [/Thuja/, "Roussit en cas de sécheresse"],
  [/Ceanothus/, "Vit 10 à 15 ans"], [/Penstemon/, "Vit 3 à 4 ans, craint l'hiver humide"], [/Leucanthemum|Linum perenne/, "Vit 3 à 4 ans"],
  [/Lychnis/, "Vit 2 à 3 ans, se ressème"]
];
// Plantes toxiques si on les mange (feuilles, baies, graines ou bulbes) : écartées quand il y a des enfants ou des animaux au jardin.
const TOXIC = /Nerium|Taxus|Digitalis|Helleborus|Euphorbia|Narcissus|Galanthus|Tulipa|Sternbergia|Hedera|Ilex|Prunus lusitanica|Wisteria|Lathyrus|Solanum|Melia|Euonymus|Hydrangea|Agapanthus|Lonicera|Viburnum|Thuja|Iris|Ruscus|Anemone|Clematis|Cyclamen|Rhamnus|Hemerocallis|Parthenocissus|Vinca|Coronilla/;
const toxic = p => p.x && "tox" in p.x ? !!p.x.tox : TOXIC.test(p.latin);
// Effort d'entretien d'une plante (0 = rien) : taille, rabattage, division, renouvellement, arrosage.
const CARE = /Rosa|Hydrangea macrophylla|Miscanthus|Pennisetum|Calamagrostis|Iris germanica|Hemerocallis|Kniphofia|Clematis|Wisteria|Campsis|Gaura|lindheimeri|Agastache|Gaillardia|Lavandula/;
function effort(p){ return (CARE.test(p.latin) ? 1 : 0) + (water(p) >= 3 ? 1 : 0) + (water(p) === 2 ? 0.5 : 0); }
function atouts(p){
  const plus = [], moins = [];
  if(evergreen(p)) plus.push("Belle toute l'année");
  if(melli(p)) plus.push("Adorée des abeilles");
  if(water(p) <= 1) plus.push("Presque pas d'arrosage");
  if(months(p).length >= 4) plus.push("Fleurit longtemps");
  if(["arbuste","grimpante","arbre"].includes(p.type) && growth(p) === "rapide") plus.push("Pousse vite");
  if(p.rust <= -18) plus.push("Résiste au grand froid");
  if(toxic(p)) moins.push("Toxique si on la mange");
  for(const [re, txt] of CAVEATS) if(re.test(p.latin) && !moins.includes(txt)) moins.push(txt);
  if(water(p) >= 3) moins.push("Arrosage régulier l'été");
  if(["arbuste","grimpante","arbre"].includes(p.type) && growth(p) === "lente") moins.push("Pousse lentement");
  if(!moins.length && p.type === "vivace" && !evergreen(p)) moins.push("Disparaît l'hiver, revient au printemps");
  if(!moins.length && p.type === "arbuste" && !evergreen(p)) moins.push("Perd ses feuilles l'hiver");
  return {plus: plus.slice(0, 2), moins: moins.slice(0, 2)};
}
function growth(p){ if(p.x && p.x.pousse) return p.x.pousse; return FAST.test(p.latin) ? "rapide" : SLOW.test(p.latin) ? "lente" : "moyenne"; }
const RATE = {arbre:{rapide:70,moyenne:45,lente:30}, autre:{rapide:60,moyenne:40,lente:25}};
const START = {petit:{arbre:180,arbuste:40,grimpante:50}, moyen:{arbre:280,arbuste:80,grimpante:100}};
const woody = p => ["arbre","arbuste","grimpante"].includes(p.type);
function heightAt(p, t){
  if(t==="adulte") return p.h;
  t = +t;
  if(!woody(p)){
    if(p.type==="bulbe") return t===0 ? 0 : p.h;
    const r = t===0 ? (state.fmt==="moyen" ? .45 : .3) : t===1 ? .75 : 1;
    return p.h*r;
  }
  const h0 = Math.min(p.h, START[state.fmt][p.type]);
  const rate = RATE[p.type==="arbre"?"arbre":"autre"][growth(p)] * (p.type==="grimpante" ? 1.5 : 1);
  return Math.min(p.h, h0 + rate*t);
}
function ratioAt(p, t){ return p.h ? heightAt(p,t)/p.h : 1; }
function yearsTo(p, target){
  if(!woody(p)) return p.type==="bulbe" ? 1 : 2;
  const h0 = Math.min(p.h, START[state.fmt][p.type]);
  const rate = RATE[p.type==="arbre"?"arbre":"autre"][growth(p)] * (p.type==="grimpante" ? 1.5 : 1);
  return Math.max(1, Math.ceil((Math.min(target, p.h) - h0)/rate));
}
const AGES = [["0","À la plantation"],["1","Après 1 an"],["2","Après 2 ans"],["3","Après 3 ans"],["5","Après 5 ans"],["adulte","Adulte"]];
// ---------- Styles de jardin ----------
// Chaque style privilégie une famille de plantes. Si aucune plante du style ne convient à un emplacement, l'outil en prend une autre adaptée.
const STYLES = {
  libre:{label:"Sans style imposé", hint:"Toutes les plantes qui se plairont chez toi, sans contrainte.", re:null},
  med:{label:"Méditerranéen sec", hint:"L’odeur de la lavande et du romarin, des feuillages argentés. Presque pas d’arrosage.",
    re:/Lavandula|rosmarinus|Cistus|Myrtus|Teucrium|Euphorbia|Stachys|Thymus|officinalis|Origanum|Phillyrea|Quercus ilex|Laurus|Cercis|Pittosporum tobira|Ceanothus|Atriplex|Nerium|yangii|Nassella|Festuca|Iris|Centranthus|Erigeron|Agastache|Echinops|Pinus|Acanthus|Muscari|Allium hollandicum|Trachelospermum|banksiae|Elaeagnus|Viburnum tinus/},
  nat:{label:"Naturaliste", hint:"Comme une prairie fleurie : de hautes herbes qui ondulent et des fleurs mêlées.",
    re:/Nassella|Miscanthus|Pennisetum|Calamagrostis|Muhlenbergia|Echinacea|Rudbeckia|Achillea|Verbena|lindheimeri|Hylotelephium|Echinops|Agastache|Nepeta|nemorosa|Allium hollandicum|yangii|Kniphofia|Hemerocallis|Festuca|Carex|Koelreuteria|Elaeagnus|Viburnum tinus|Cornus|Geranium/},
  anglais:{label:"Jardin anglais", hint:"Des fleurs partout, des rosiers et des bordures généreuses. Un peu plus d’eau.",
    re:/Rosa|Clematis|Lonicera|Digitalis|Geranium|Nepeta|Alchemilla|Hydrangea|Anemone|Lavandula|Astilbe|Iris|Agapanthus|Allium hollandicum|Centranthus|Echinacea|Heuchera|Lamium|Helleborus|Choisya|Abelia|Escallonia|Viburnum tinus|Osmanthus|Erigeron|Narcissus|Camassia|Cercis|Lagerstroemia|Hemerocallis|Trachelospermum/},
  contemporain:{label:"Contemporain épuré", hint:"Peu de plantes, des formes nettes et calmes, belles toute l’année.",
    re:/Pittosporum|Thuja|Pinus|Festuca|Ophiopogon|Carex|Hakonechloa|Miscanthus|Calamagrostis|Nassella|Euphorbia|Stachys|yangii|Lavandula|Allium hollandicum|Laurus|Prunus lusitanica|Phillyrea|Elaeagnus|Fargesia|Trachelospermum|Agapanthus|Lagerstroemia|Koelreuteria|Acanthus|Teucrium/},
  sauvage:{label:"Refuge pour la biodiversité", hint:"Des fleurs pour les abeilles et des baies pour les oiseaux. Un jardin vivant, peu d’entretien.",
    re:/Centranthus|Origanum|Thymus|Viburnum tinus|Cornus|Pyracantha|Lonicera|Echinops|Achillea|Verbena|nemorosa|Nepeta|officinalis|Hylotelephium|Arbutus|Phillyrea|Laurus|Quercus ilex|Elaeagnus|Rosa|Agastache|Cistus|Lavandula|Echinacea|Erigeron|Digitalis|Geranium|Ceanothus|Cercis|Koelreuteria|Muscari|Narcissus|Cyclamen|Hedera|Atriplex/}
};
// Photos d'illustration des styles (Wikimedia Commons, licences libres : la page source indique l'auteur et la licence).
const STYLE_PHOTOS = {"med": {"src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Lavender_Field_Provence_France_021.JPG/500px-Lavender_Field_Provence_France_021.JPG", "page": "https://commons.wikimedia.org/wiki/File:Lavender_Field_Provence_France_021.JPG", "cap": "Lavandes et oliviers en Provence", "pos": "50% 60%"}, "nat": {"src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/AZBG_Ecinachea.jpg/500px-AZBG_Ecinachea.jpg", "page": "https://commons.wikimedia.org/wiki/File:AZBG_Ecinachea.jpg", "cap": "Échinacées en prairie fleurie", "pos": "50% 50%"}, "anglais": {"src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/HIDCOTE_MANOR.JPG/500px-HIDCOTE_MANOR.JPG", "page": "https://commons.wikimedia.org/wiki/File:HIDCOTE_MANOR.JPG", "cap": "Les bordures fleuries de Hidcote (Angleterre)", "pos": "50% 70%"}, "contemporain": {"src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hidcote_Manor_Garden_02.jpg/500px-Hidcote_Manor_Garden_02.jpg", "page": "https://commons.wikimedia.org/wiki/File:Hidcote_Manor_Garden_02.jpg", "cap": "Charmes taillés à Hidcote (Angleterre)", "pos": "50% 50%"}, "sauvage": {"src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Gunnersbury_Triangle_Wildflower_Meadow_with_Bumblebee.JPG/500px-Gunnersbury_Triangle_Wildflower_Meadow_with_Bumblebee.JPG", "page": "https://commons.wikimedia.org/wiki/File:Gunnersbury_Triangle_Wildflower_Meadow_with_Bumblebee.JPG", "cap": "Bleuets, coquelicots et bourdon (Londres)", "pos": "50% 40%"}};
function styleFigure(k){
  const ph = STYLE_PHOTOS[k];
  if(!ph) return "";
  return `<figure class="style-ph"><img src="${`/photos/style-${k}.jpg`}" style="object-position:${ph.pos||"50% 50%"}" alt="Exemple de style : ${ph.cap}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"><figcaption>${ph.cap} · <a href="${ph.page}" target="_blank" rel="noopener">Wikimedia Commons ↗</a></figcaption></figure>`;
}
// Recette de chaque style : la composition elle-même change (proportions, couleurs), pas seulement le choix des plantes.
const RECIPE = {
  med:{d:{structure:1, vivace:-1, bordure:1}, pal:["froid","blanc"], why:"Des boules grises et parfumées, espacées sur une terre claire."},
  nat:{d:{graminee:2, structure:-1}, pal:["rose","froid","chaud"], why:"Des graminées en vagues, mêlées de grandes fleurs."},
  anglais:{d:{vivace:2, bordure:1}, pal:["rose","froid","blanc"], why:"Beaucoup de fleurs serrées, en couches douces."},
  contemporain:{d:{vivace:-2, graminee:0}, pal:["blanc","froid"], why:"Peu d'espèces, répétées en masse, aux formes nettes."},
  sauvage:{d:{vivace:1}, mel:true, why:"Des fleurs pour les abeilles et un coin laissé libre."}
};
// Plantes à écarter si possible (pour qu'une nouvelle idée ne ressemble pas aux précédentes).
let AVOID = new Set();
const inStyle = p => !STYLES[state.style].re || (p.x ? (p.x.styles||[]).includes(state.style) : STYLES[state.style].re.test(p.latin));
const WATER_LBL = {1:"Sans arrosage",2:"Arrosage occasionnel",3:"Arrosage régulier"};
const isEcran = p => p.type==="arbuste" && p.h>=(+state.haut)*100 && evergreen(p);
// « Plutôt hautes » : pas de plafond, et la composition privilégie les grandes plantes (fond étoffé, vivaces et graminées hautes).
const wantTall = () => state.hmax === "haut";
// Un arbre en vedette quand le coin a la place : arbres autorisés, pleine terre, au moins 1,50 m de profondeur, coin moyen ou grand, pas de plafond de hauteur.
const roomForTree = () => state.types.includes("arbre") && state.projet !== "balcon" && +state.prof >= 150 && state.taille !== "p" && !(+state.hmax);
const TALL_MIN = {structure:150, vivace:70, graminee:80};
function preferTall(cand, r){ if(!wantTall() || !TALL_MIN[r]) return cand; const t = cand.filter(p=>p.h>=TALL_MIN[r]); return t.length ? t : cand; }

const state = {projet:"jardin",style:"libre",vite:"rapide",age:"3",arro:"1",prof:"150",haut:"2",hmax:"0",dens:"n",fmt:"petit",obj:["massif"],expo:"s",sol:"ac",eau:"d",clim:"so",types:["arbuste","graminee","vivace","couvre-sol","bulbe","aromatique"],pal:"all",taille:"m"};
let combo = [];   // [{plant, role, locked}]

// ---------- UI des filtres ----------
function chips(key, multi){
  const box = document.getElementById("f-"+key);
  box.innerHTML = OPT[key].map(([v,l])=>{
    if(key==="taille") l = tailleLbl(v);
    const id = `opt-${key}-${v}`;
    const checked = Array.isArray(state[key]) ? state[key].includes(v) : state[key]===v;
    const sw = key==="pal" && SWATCH[v] ? `<i class="sw" style="background:${SWATCH[v]}"></i>` : "";
    return `<label class="chip" for="${id}"><input id="${id}" type="${multi?"checkbox":"radio"}" name="${key}" value="${v}" ${checked?"checked":""}><span>${sw}${l}</span></label>`;
  }).join("");
  if(box.dataset.bound) return;
  box.dataset.bound = "1";
  box.addEventListener("change",e=>{
    if(multi){
      const vals = [...box.querySelectorAll("input:checked")].map(i=>i.value);
      if(key==="obj" && !vals.length){ e.target.checked = true; return; }
      state[key] = vals;
    }
    else state[key] = e.target.value;
    if(key==="fmt"){ renderCurrent(); return; }
    if(key==="obj"){ chips("taille",false); document.getElementById("obj-hint").textContent = objHint(); }
    generate(false);
  });
}
chips("obj",true);
document.getElementById("obj-hint").textContent = objHint();
["style","vite","arro","prof","haut","hmax","dens","fmt","expo","sol","eau","clim","pal","taille"].forEach(k=>chips(k,false));
chips("types",true);

// ---------- Logique ----------
function solOk(p){
  if(state.sol==="ac") return p.sol.includes("c") && (p.sol.includes("a") || !p.sol.includes("s") || p.sol.length>1);
  return p.sol.includes(state.sol);
}
function compatible(p){
  // Une plante repérée et ajoutée à la main n'est jamais proposée d'office.
  if(p.x && p.x.perso) return false;
  if(window.securite && toxic(p)) return false;
  const c = CLIM[state.clim];
  if(!p.expo.includes(state.expo)) return false;
  // Balcon : seulement des plantes en pot, plantées en terreau (le sol du jardin ne compte pas).
  const enPot = state.projet === "balcon";
  if(enPot && !pot(p)) return false;
  if(!enPot && !solOk(p)) return false;
  if(!p.eau.includes(state.eau)) return false;
  if(p.rust > c.min) return false;
  if(!p.heat && (state.clim==="med" || (state.clim==="so" && state.expo==="s"))) return false;
  const G = goals();
  const forced = (G.hedge && isEcran(p)) || (G.wall && p.type==="grimpante") || (G.hedge && state.haut==="4" && p.type==="arbre");
  if(!state.types.includes(p.type) && !forced) return false;
  if(+state.hmax && p.h > +state.hmax && !forced) return false;
  // Sans les arbres : on écarte aussi les arbustes qui en ont la taille (plus de 4 m), sauf pour une haie.
  if(!roomForTree() && p.type==="arbuste" && p.h > 400 && !forced) return false;
  if(state.pal!=="all" && !PAL[state.pal].includes(p.fam)) return false;
  if(water(p) > +state.arro) return false;
  if(G.melli && p.type!=="graminee" && !melli(p)) return false;
  return true;
}
function role(p){
  if(has("isoler") && isEcran(p)) return "ecran";
  if(p.type==="arbre") return "arbre";
  if(p.type==="grimpante") return "grimpante";
  if(p.type==="bulbe") return "bulbe";
  if(p.type==="couvre-sol" || p.h<=25) return "bordure";
  if(p.type==="graminee") return p.h>=100 ? "structure" : "graminee";
  if(p.type==="arbuste" || p.h>=100) return "structure";
  return "vivace";
}
const ROLE_LABEL = {arbre:"Arbre",ecran:"Haie persistante",structure:"Structure",graminee:"Graminée",vivace:"Vivace de remplissage",bordure:"Bordure",bulbe:"Bulbe",grimpante:"Grimpante"};
const SLOTS = {p:{structure:1,graminee:1,vivace:2,bordure:1},m:{structure:1,graminee:1,vivace:3,bordure:1,bulbe:1},g:{structure:2,graminee:2,vivace:3,bordure:2,bulbe:1}};
function months(p){
  if(!p.bloom) return [];
  let [a,b]=p.bloom, out=[];
  for(let m=a;;m=m%12+1){ out.push(m); if(m===b) break; }
  return out;
}
function density(p, r){
  if(r==="arbre") return "1 sujet";
  if(r==="ecran") return "1 plant tous les 80 à 100 cm";
  if(r==="grimpante") return "1 plant";
  if(r==="structure") return p.type==="graminee" ? "1 à 2 plants" : "1 plant";
  if(r==="bulbe") return "15 à 25 bulbes";
  if(r==="bordure") return "6 à 9 / m²";
  if(r==="graminee") return "3 à 5 / m²";
  return "3 à 5 / m²";
}

// Mémoire des tirages récents : une plante déjà proposée plusieurs fois passe derrière les autres,
// pour que deux clics sur « Nouvelle combinaison » donnent vraiment des massifs différents.
const SEEN = new Map();
function remember(p){ SEEN.set(p.id, (SEEN.get(p.id)||0) + 1); }
function fadeSeen(){ for(const [k,v] of SEEN){ const n = v*0.6; if(n<0.05) SEEN.delete(k); else SEEN.set(k,n); } }
function pick(pool, covered, colors){
  if(!pool.length) return null;
  const scored = pool.map(p=>{
    const nm = months(p).filter(m=>!covered.has(m)).length;
    const colorBonus = colors.has(p.fam) ? 0.4 : 0;
    const care = +state.arro === 1 ? -0.8*effort(p) : +state.arro === 2 ? -0.3*effort(p) : 0;
    const R = RECIPE[state.style], recipeBonus = R ? ((R.pal||[]).includes(p.fam) ? 0.6 : 0) + (R.mel && melli(p) ? 0.5 : 0) : 0;
    const tall = wantTall() ? Math.min(p.h, 250)/100*0.5 : 0;
    return {p, s: Math.random()*1.4 + nm*0.18 + colorBonus + recipeBonus + care + tall - (SEEN.get(p.id)||0)*0.9};
  }).sort((x,y)=>y.s-x.s);
  remember(scored[0].p);
  return scored[0].p;
}

// Rangées autorisées selon la profondeur de terre disponible.
// Une haie occupe environ 1 m ; chaque rangée de vivaces 40 à 60 cm.
function rows(){
  const G = goals(), P = +state.prof;
  if(G.hedge) return !G.massif && !G.wall ? (P>=150 ? 1 : 0) : (P>=200 ? 2 : P>=150 ? 1 : 0);
  return P>=200 ? 3 : P>=100 ? 2 : 1;
}
function rowLayers(){
  const G = goals(), P = +state.prof, n = rows();
  if(n===0) return [];
  if(G.hedge) return n===1 ? ["mid"] : ["mid","front"];
  if(n===1) return ["mid"];
  // Plutôt hautes : un fond d'arbustes et une rangée de vivaces hautes, plutôt qu'une bordure basse.
  if(n===2) return P>=150 ? (wantTall() ? ["back","mid"] : ["back","front"]) : ["mid","front"];
  return ["back","mid","front"];
}
function layout(){
  const G = goals(), T = state.taille, n = {p:1,m:2,g:2}[T];
  const S = []; const add = (role,layer,c)=>{ if(c>0) S.push({role,layer,c}); };
  if(G.hedge){
    add("arbre","hedge", state.haut==="4" ? 1 : 0);
    add("ecran","hedge",{p:2,m:3,g:3}[T]);
  }
  if(G.wall) add("grimpante","wall",{p:1,m:2,g:2}[T]);
  if(!G.hedge && roomForTree()) add("arbre","tree",1);
  const L = rowLayers();
  if(L.includes("back")) add("structure","back", T==="g" ? 2 : 1);
  if(L.includes("mid")){ add("vivace","mid", n); if(T!=="p" || L.length===1) add("graminee","mid",1); }
  if(L.includes("front")) add("bordure","front", T==="g" ? 2 : 1);
  if(L.length && state.types.includes("bulbe")) add("bulbe","bulb",1);
  const R = RECIPE[state.style];
  if(R && L.length){
    const LAYER = {structure:"back", graminee:"mid", vivace:"mid", bordure:"front"};
    for(const [r,dv] of Object.entries(R.d)){
      const e = S.find(x=>x.role===r);
      if(e) e.c = Math.max(r==="vivace" ? 1 : 0, e.c+dv);
      else if(dv>0){ const l = L.includes(LAYER[r]) ? LAYER[r] : L.includes("mid") ? "mid" : L[0]; S.push({role:r, layer:l, c:dv}); }
    }
  }
  // Plutôt hautes : un vrai fond d'arbustes même sur peu de profondeur, et la bordure basse seulement sur trois rangées.
  if(wantTall() && L.length){
    const need = {p:1,m:2,g:3}[T], st = S.find(x=>x.role==="structure");
    if(st) st.c = Math.max(st.c, need); else S.push({role:"structure", layer: L.includes("back") ? "back" : L[0], c: need});
    if(L.length < 3){ const b = S.find(x=>x.role==="bordure"); if(b) b.c = 0; }
  }
  return S.filter(e=>e.c>0);
}
function layerName(l){ return {back:"un fond d'arbustes",mid:"une rangée de vivaces",front:"une bordure basse"}[l]||""; }

// Plantes déjà en place dans le coin (fournies par l'app) : toujours gardées, quelle que soit la proposition.
const existingNow = () => (typeof window.EXISTING === "function" ? window.EXISTING() : []);
const isExisting = p => existingNow().includes(p);
function generate(keepLocks=true){
  fadeSeen();
  const pool = PLANTS.filter(compatible);
  const ex = existingNow().map(p=>({plant:p, role:role(p), locked:true, existing:true}));
  const locked = [...ex, ...(keepLocks ? combo.filter(c=>c.locked && !c.existing && !isExisting(c.plant) && compatible(c.plant)) : [])];
  const used = new Set(locked.map(c=>c.plant.id));
  const covered = new Set(locked.flatMap(c=>months(c.plant)));
  const colors = new Set(locked.map(c=>c.plant.fam));
  const S = layout();
  locked.forEach(c=>{ const e = S.find(e=>e.role===c.role && e.c>0); if(e){ e.c--; if(!c.layer) c.layer=e.layer; } });

  const result = [...locked];
  let missing = 0;
  const FALL = {graminee:["vivace","bordure"], vivace:["graminee","bordure"], structure:["graminee","vivace"], bordure:["vivace"]};
  for(const e of S){
    for(let i=0;i<e.c;i++){
      let cand = pool.filter(p=>role(p)===e.role && !used.has(p.id));
      if(AVOID.size){ const fresh = cand.filter(p=>!AVOID.has(p.id)); if(fresh.length) cand = fresh; }
      if(e.role==="ecran" && state.vite==="rapide"){
        const fast = cand.filter(p=>growth(p)==="rapide");
        const mid = cand.filter(p=>growth(p)==="moyenne");
        cand = fast.length ? fast : mid.length ? mid : cand;
      }
      if(state.style!=="libre"){ const st = cand.filter(inStyle); if(st.length) cand = st; }
      cand = preferTall(cand, e.role);
      if(e.role==="arbre" && state.vite==="rapide"){ const nl = cand.filter(p=>growth(p)!=="lente"); if(nl.length) cand = nl; }
      if(!cand.length && e.role==="ecran") cand = pool.filter(p=>p.type==="arbuste" && p.h>=150 && !used.has(p.id));
      for(const fr of (FALL[e.role]||[])){ if(cand.length) break; cand = pool.filter(p=>role(p)===fr && !used.has(p.id) && (e.layer!=="front" || p.h<=50)); if(state.style!=="libre"){ const st=cand.filter(inStyle); if(st.length) cand=st; } }
      const p = pick(cand, covered, colors);
      if(!p){ missing++; continue; }
      used.add(p.id); months(p).forEach(m=>covered.add(m)); colors.add(p.fam);
      result.push({plant:p, role:role(p), layer:e.layer, locked:false});
    }
  }
  combo = result;
  render(pool.length, missing);
}

function replace(idx){
  const pool = PLANTS.filter(compatible);
  const cur = combo[idx];
  const used = new Set(combo.map(c=>c.plant.id));
  const others = combo.filter((_,i)=>i!==idx);
  const covered = new Set(others.flatMap(c=>months(c.plant)));
  const colors = new Set(others.map(c=>c.plant.fam));
  let rc = pool.filter(x=>role(x)===cur.role && !used.has(x.id));
  if(cur.role==="ecran" && state.vite==="rapide"){ const f = rc.filter(x=>growth(x)==="rapide"); if(f.length) rc = f; }
  if(state.style!=="libre"){ const st = rc.filter(inStyle); if(st.length) rc = st; }
  rc = preferTall(rc, cur.role);
  const p = pick(rc, covered, colors);
  if(p){ combo[idx] = {plant:p, role:role(p), layer:cur.layer, locked:false}; render(pool.length,0); }
  else { const b=document.querySelector(`[data-rep="${idx}"]`); if(b){ b.textContent="Aucune autre"; b.disabled=true; } }
}

// ---------- Budget ----------
// Prix unitaires indicatifs (€ TTC), calés sur des prix constatés en jardinerie et pépinière en ligne en France :
// vivace en godet ≈ 4 €, vivace en pot de 2 L ≈ 10 à 13 €, laurier du Portugal 50–60 cm ≈ 23 €.
const PRICE = {
  petit:{vivace:[4,7],arbuste:[12,22],ecran:[10,18],grimpante:[12,20],arbre:[60,110],bulbe:[0.3,0.9]},
  moyen:{vivace:[10,16],arbuste:[25,45],ecran:[25,45],grimpante:[25,40],arbre:[130,250],bulbe:[0.3,0.9]}
};
const FMT_DESC = {petit:"godets et jeunes plants (arbustes 30–60 cm, arbres en baliveau)", moyen:"pots de 2–3 L, arbustes 60–100 cm, arbres en tige 10/12"};
const PRICE_FACTOR = [[/Fargesia/,1.6],[/Hydrangea/,1.3],[/Lagerstroemia/,1.2],[/Trachelospermum/,1.2],[/Pinus/,1.5],[/Cyclamen/,6],[/Helleborus/,1.6],[/Agapanthus/,1.3]];
function unitPrice(p, r){
  const T = PRICE[state.fmt];
  let base = r==="arbre" ? T.arbre : r==="ecran" ? T.ecran : r==="grimpante" ? T.grimpante : r==="bulbe" ? T.bulbe
    : (p.type==="arbuste" ? T.arbuste : T.vivace);
  let f = 1; for(const [re,v] of PRICE_FACTOR) if(re.test(p.latin)) f = v;
  if(p.type==="graminee" && p.h>=100) f *= 1.3;
  return [base[0]*f, base[1]*f];
}
const eur = n => new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",maximumFractionDigits:n<10?2:0}).format(n);
const eur0 = n => new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(Math.round(n/5)*5);
let lastBudget = null;
function budgetHTML(items){
  items = items.filter(it=>!it.c.existing);   // déjà en place : rien à acheter
  let min=0, max=0;
  const rows = items.map(it=>{
    const [a,b] = unitPrice(it.c.plant, it.c.role);
    const q = it.n || 1; min += a*q; max += b*q;
    const qty = it.c.role==="bulbe" ? `${q} bulbes` : `${q}`;
    return `<tr><td>${it.c.plant.nom}<small>${ROLE_LABEL[it.c.role]}</small></td><td class="n">${qty}</td><td class="n">${eur(a)} – ${eur(b)}</td><td class="n">${eur0(a*q)} – ${eur0(b*q)}</td></tr>`;
  }).join("");
  lastBudget = {min, max, rows: items.map(it=>[it.c.plant.nom, it.c.role, it.n||1])};
  return `<section class="budget"><h2>Budget estimé <em>${eur0(min)} – ${eur0(max)}</em></h2>
    <p class="note">Formats : ${FMT_DESC[state.fmt]}. Prix indicatifs de jardinerie et de pépinière, hors terre, paillage, livraison et main-d'œuvre.</p>
    <div class="tbl"><table><thead><tr><th>Plante</th><th class="n">Quantité</th><th class="n">Prix unitaire</th><th class="n">Sous-total</th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td>Total</td><td></td><td></td><td class="n">${eur0(min)} – ${eur0(max)}</td></tr></tfoot></table></div></section>`;
}

// ---------- Plan de plantation (vue de dessus) ----------
const BED = {p:[300,100],m:[400,150],g:[600,200]};
const BED_OBJ = {isoler:{p:[500,150],m:[1000,150],g:[1500,170]}, mur:{p:[300,80],m:[500,80],g:[800,90]}};
function spread(p, r){
  if(r==="ecran") return 100;
  if(r==="structure") return p.type==="graminee" ? 70 : Math.min(160, Math.max(80, p.h*0.8));
  if(r==="graminee") return p.h>=60 ? 55 : 40;
  if(r==="bordure") return 30;
  return p.h>=80 ? 55 : 42;
}
function codes(list){
  const seen = {};
  return list.map(c=>{
    const w = c.plant.latin.replace(/[×'"]/g,"").split(/\s+/).filter(Boolean);
    let k = w[0][0].toUpperCase() + (w[1] ? w[1][0].toLowerCase() : w[0][1]);
    if(seen[k]){ seen[k]++; k = k + seen[k]; } else seen[k]=1;
    return k;
  });
}
function darkHex(h){
  const n=parseInt(h.slice(1),16), r=n>>16, g=(n>>8)&255, b=n&255;
  return (0.299*r+0.587*g+0.114*b) < 140;
}
function rng(seed){ let s = seed*9301+49297; return ()=>{ s=(s*9301+49297)%233280; return s/233280; }; }

function growthNote(){
  const fmt = state.fmt==="moyen" ? "en formats moyens" : "en petits formats";
  const lines = [];
  const hedge = combo.filter(c=>c.role==="ecran");
  if(hedge.length){
    const target = +state.haut*100;
    const ys = hedge.map(c=>yearsTo(c.plant, target));
    const a = Math.min(...ys), b = Math.max(...ys);
    lines.push(`Haie plantée ${fmt} : ${state.haut} m atteints en ${a===b?`${a} ans`:`${a} à ${b} ans selon les espèces`}.`);
  }
  combo.filter(c=>c.role==="arbre").forEach(c=>lines.push(`${c.plant.nom} : 4 m en ${yearsTo(c.plant,400)} ans environ.`));
  if(combo.some(c=>!woody(c.plant))) lines.push("Les vivaces et les graminées remplissent leur place dès la 2e année.");
  return lines.length ? lines.join(" ")+" Les cercles en pointillés montrent la taille adulte." : "";
}
function planHTML(){
  const G = goals();
  let [W] = G.hedge ? BED_OBJ.isoler[state.taille] : G.massif ? BED[state.taille] : BED_OBJ.mur[state.taille];
  let D = +state.prof;
  const code = codes(combo);
  const items = combo.map((c,i)=>({c, code:code[i], n:0}));
  const layerOf = it => (it.c.role==="bulbe" || it.c.role==="arbre") ? null : it.c.role==="grimpante" ? "g" : it.c.role==="ecran" ? "hedge"
    : (it.c.layer && it.c.layer!=="bulb") ? it.c.layer : it.c.plant.h>=90 ? "back" : it.c.plant.h>=35 ? "mid" : "front";
  const bands = ["hedge","back","mid","front"].filter(b=>items.some(it=>layerOf(it)===b));
  // la haie prend environ 1 m, le reste se partage entre les rangées
  const hedgeH = bands.includes("hedge") ? (bands.length>1 ? Math.min(100, D*0.65) : D) : 0;
  const rest = bands.filter(b=>b!=="hedge").length;
  const wts = bands.map(b=>b==="hedge" ? hedgeH : (D-hedgeH)/rest);
  const wSum = D;
  let circles = [], yAcc = 0;
  bands.forEach((b,bi)=>{
    const L = items.filter(it=>layerOf(it)===b);
    const y0 = yAcc, y1 = y0 + wts[bi]; yAcc = y1;
    // dérives répétées pour donner du rythme quand le massif est long
    const reps = Math.max(1, Math.round(W/(L.length*(b==="hedge"?200:240))));
    let seq = [];
    for(let k=0;k<reps;k++) seq = seq.concat(k%2 ? [...L].reverse() : L);
    const segW = W/seq.length;
    seq.forEach((it,si)=>{
      const d = spread(it.c.plant, it.c.role), r=d/2;
      const x0 = si*segW, x1 = x0+segW;
      const dd = it.c.role==="ecran" ? d : d*(DENS[state.dens]||1);
      const rowStep = dd*0.87;
      const rows = Math.max(1, Math.floor((y1-y0)/rowStep));
      const colsBase = it.c.role==="ecran" ? Math.max(1, Math.round(segW/d)) : Math.max(1, Math.floor(segW/dd));
      const step = it.c.role==="ecran" ? segW/colsBase : dd;
      const offY = (y1-y0 - (rows-1)*rowStep)/2;
      for(let ri=0; ri<rows; ri++){
        const shift = (ri%2 && colsBase>1) ? r : 0;
        const cols = (ri%2 && colsBase>1) ? colsBase-1 : colsBase;
        const offX = (segW - (cols-1)*step)/2;
        for(let ci=0; ci<cols; ci++){
          circles.push({x:x0+offX+ci*step, y:y0+offY+ri*rowStep, r:r*0.96, it});
          it.n++;
        }
      }
    });
  });
  // bulbes semés entre les vivaces
  const bulbs = items.filter(it=>it.c.role==="bulbe");
  const dots = [];
  bulbs.forEach(it=>{
    const R = rng(it.c.plant.id+7), n = Math.round(W*(bands.includes("hedge") ? Math.max(20,D-100) : D)/1000);
    const yStart = bands.includes("hedge") ? Math.min(D-10, (wts[0]||0)+5) : D*0.15;
    for(let k=0;k<n;k++) dots.push({x:8+R()*(W-16), y:yStart+R()*Math.max(5,(D-yStart-8)), it});
    it.n = n;
  });
  const climbers = items.filter(it=>it.c.role==="grimpante");
  climbers.forEach(it=>it.n=Math.max(1,Math.round(W/300)));
  // arbre : une couronne placée dans l'axe de la vue, au fond
  const trees = items.filter(it=>it.c.role==="arbre").map((it,j)=>{ it.n=1; return {x:W*(0.5+j*0.25), y:Math.min(D*0.35,50), r:Math.min(180, W/4), it}; });

  const k = Math.max(1, W/450), fs = n => (n*k).toFixed(1);
  const pad = 30*k, top = (climbers.length ? 46 : 34)*k;
  const vbW = W+pad*2, vbH = D+top+24*k;
  let svg = `<svg viewBox="0 0 ${vbW} ${vbH}" role="img" aria-label="Plan de plantation vu de dessus, ${W/100} m sur ${D/100} m">
    <g transform="translate(${pad},${top})">
    <line x1="0" y1="${-18*k}" x2="${W}" y2="${-18*k}" stroke="var(--muted)" stroke-width="1"/>
    <line x1="0" y1="${-23*k}" x2="0" y2="${-13*k}" stroke="var(--muted)"/><line x1="${W}" y1="${-23*k}" x2="${W}" y2="${-13*k}" stroke="var(--muted)"/>
    <text x="${W/2}" y="${-25*k}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="${fs(11)}" fill="var(--muted)">${(W/100).toLocaleString("fr-FR")} m</text>
    <text x="${-10*k}" y="${D/2}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="${fs(11)}" fill="var(--muted)" transform="rotate(-90 ${-10*k} ${D/2})">${(D/100).toLocaleString("fr-FR")} m</text>
    <defs><clipPath id="bedclip"><rect x="0" y="0" width="${W}" height="${D}" rx="6"/></clipPath></defs>
    <rect x="0" y="0" width="${W}" height="${D}" rx="6" fill="var(--pollen-soft)" stroke="var(--line)"/>`;
  if(climbers.length){
    svg += `<rect x="0" y="${-8*k}" width="${W}" height="${5*k}" fill="var(--muted)" opacity=".5"/>`;
    climbers.forEach((it,k)=>{
      for(let j=0;j<it.n;j++){
        const x = W*(j+0.5)/it.n + k*24;
        svg += `<circle cx="${x}" cy="${-5*k}" r="${11*k}" fill="${it.c.plant.hex}" stroke="rgba(0,0,0,.25)"/><text x="${x}" y="${-1.5*k}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="${fs(9)}" fill="${darkHex(it.c.plant.hex)?"#fff":"#1E2820"}">${it.code}</text>`;
      }
    });
  }
  svg += `<g clip-path="url(#bedclip)">`;
  circles.forEach(o=>{
    const h=o.it.c.plant.hex, rr = o.r*Math.max(.18, ratioAt(o.it.c.plant, state.age));
    svg += `<circle cx="${o.x.toFixed(1)}" cy="${o.y.toFixed(1)}" r="${o.r.toFixed(1)}" fill="none" stroke="var(--line)" stroke-dasharray="3 3" stroke-width="1"/>`;
    svg += `<circle cx="${o.x.toFixed(1)}" cy="${o.y.toFixed(1)}" r="${rr.toFixed(1)}" fill="${h}" fill-opacity=".88" stroke="rgba(0,0,0,.22)" stroke-width="1"/>`;
    if(rr>=14) svg += `<text x="${o.x.toFixed(1)}" y="${(o.y+4).toFixed(1)}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="${rr>=35?13:10}" fill="${darkHex(h)?"#fff":"#1E2820"}">${o.it.code}</text>`;
  });
  trees.forEach(o=>{
    const tr = o.r*Math.max(.12, ratioAt(o.it.c.plant, state.age));
    svg += `<circle cx="${o.x}" cy="${o.y}" r="${o.r}" fill="none" stroke="var(--line)" stroke-dasharray="${4*k} ${4*k}"/>
      <circle cx="${o.x}" cy="${o.y}" r="${tr}" fill="${o.it.c.plant.hex}" fill-opacity=".28" stroke="${o.it.c.plant.hex}" stroke-width="${2*k}" stroke-dasharray="${8*k} ${6*k}"/>
      <circle cx="${o.x}" cy="${o.y}" r="${6*k}" fill="#6B5137"/>
      <text x="${o.x}" y="${o.y - 12*k}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="${fs(13)}" fill="var(--ink)">${o.it.code}</text>`;
  });
  if(state.age!=="0") dots.forEach(o=>{ svg += `<circle cx="${o.x.toFixed(1)}" cy="${o.y.toFixed(1)}" r="4" fill="${o.it.c.plant.hex}" stroke="rgba(0,0,0,.35)" stroke-width=".6"/>`; });
  svg += `</g>
    <text x="0" y="${D+16*k}" font-family="IBM Plex Mono, monospace" font-size="${fs(10)}" fill="var(--muted)">↑ fond (côté limite ou mur)</text>
    <text x="${W}" y="${D+16*k}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="${fs(10)}" fill="var(--muted)">bordure, côté allée ↓</text>
    </g></svg>`;

  lastLayout = {W,D,circles,dots,climbers,trees};
  const budget = budgetHTML(items);
  const unit = it => it.c.role==="bulbe" ? `≈ ${it.n} bulbes` : it.c.role==="arbre" ? "1 arbre, couronne adulte en pointillés" : `${it.n} plant${it.n>1?"s":""}`;
  const legend = items.map(it=>`<li><b style="background:${it.c.plant.hex};color:${darkHex(it.c.plant.hex)?"#fff":"#1E2820"}">${it.code}</b>
    <span><a class="lg" href="${photoUrl(it.c.plant)}" target="_blank" rel="noopener">${it.c.plant.nom}</a> <i>${it.c.plant.latin}</i><small>${unit(it)}</small></span></li>`).join("");
  const total = items.filter(it=>it.c.role!=="bulbe").reduce((s,it)=>s+it.n,0);

  return `<section class="plan"><h2>${G.hedge&&G.massif?"Plan de la haie et du massif":G.hedge?"Plan de la haie":G.massif?"Plan de plantation":"Plan du pied de mur"} <em>${(W/100).toLocaleString("fr-FR")} × ${(D/100).toLocaleString("fr-FR")} m · ${total} plants</em></h2>
    <div class="ages" role="group" aria-label="Âge du jardin">${AGES.map(([v,l])=>`<button type="button" class="small" data-age="${v}" aria-pressed="${state.age===v}">${l}</button>`).join("")}</div>
    <p class="note">${growthNote()}</p>
    <div class="elev"><span>Vue de face, en pleine floraison · ${AGES.find(a=>a[0]===state.age)[1].toLowerCase()}</span><canvas id="elev" aria-label="Vue de face du massif dessinée"></canvas></div>
    <div class="plansvg">${svg}</div><ul class="legend">${legend}</ul></section>${budget}`;
}

// ---------- Illustrations des plantes ----------
function form(p){
  const l = p.latin;
  if(p.x && p.x.forme && p.type!=="arbre" && p.type!=="grimpante") return p.x.forme;
  if(p.type==="grimpante") return "grimpe";
  if(p.type==="arbre") return "arbre";
  if(/Salvia microphylla/.test(l)) return "boule";
  if(/Echinops/.test(l)) return "globe";
  if(/Acanthus/.test(l)) return "feuillage";
  if(/Agastache/.test(l)) return "epi";
  if(/Pinus/.test(l)) return "conifere";
  if(/Lavandula|yangii|nemorosa|Nepeta|Digitalis|Astilbe|officinalis|Camassia|Muscari|Crocosmia/.test(l)) return "epi";
  if(/Kniphofia/.test(l)) return "torche";
  if(/Hydrangea|Allium|Agapanthus/.test(l)) return "globe";
  if(/Muhlenbergia|Gaura|lindheimeri|Verbena/.test(l)) return "nuage";
  if(/Calamagrostis/.test(l)) return "raide";
  if(/Carex|Festuca|Hakonechloa|Ophiopogon/.test(l)) return "touffe";
  if(p.type==="graminee") return "plumet";
  if(/Dryopteris/.test(l)) return "fougere";
  if(/Hosta|Heuchera|Brunnera|Epimedium/.test(l)) return "feuillage";
  if(/Achillea|Hylotelephium|Euphorbia|Origanum|Alchemilla|Centranthus/.test(l)) return "ombelle";
  if(p.type==="arbuste" || /Salvia rosmarinus/.test(l)) return "boule";
  if(p.h<=30) return "tapis";
  return "marguerite";
}
const GREENS = ["#3F6B35","#4F7D40","#62904B","#355C2E"];
const SILVER = ["#8FA392","#A3B4A2","#B6C3B3","#7D917F"];
function leafCols(p){ if(p.x) return p.x.gris ? SILVER : GREENS; return /Lavandula|yangii|Teucrium|Stachys|Festuca|officinalis|rosmarinus|Myrtus/.test(p.latin) ? SILVER : GREENS; }

function drawPlant(ctx,p,cx,base,w,H,R){
  const f=form(p), L=leafCols(p), fc=p.hex, bloom=!!p.bloom;
  const g=i=>L[i%L.length];
  const ell=(x,y,rx,ry,c,a=1,rot=0)=>{ctx.globalAlpha=a;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,Math.max(.5,rx),Math.max(.5,ry),rot,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;};
  const line=(x1,y1,x2,y2,c,lw=1.2,a=1,cpx,cpy)=>{ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(x1,y1);cpx!==undefined?ctx.quadraticCurveTo(cpx,cpy,x2,y2):ctx.lineTo(x2,y2);ctx.stroke();ctx.globalAlpha=1;};
  const dots=(x,y,rx,ry,n,c,r,a=1)=>{for(let i=0;i<n;i++){const t=R()*Math.PI*2,d=Math.sqrt(R());ell(x+Math.cos(t)*rx*d,y+Math.sin(t)*ry*d,r,r,c,a);}};
  const blades=(n,len,spread,cols,lw=1.1)=>{for(let i=0;i<n;i++){const s=(R()-.5)*2, ex=cx+s*spread, ey=base-len*(.55+R()*.45);line(cx+s*w*.08,base,ex,ey,cols[i%cols.length],lw,1,cx+s*spread*.2,base-len*.7);}};
  ctx.lineCap="round";
  ell(cx,base,w*.45,Math.max(2,H*.04),"#6B5137",.25);
  switch(f){
    case "boule":
    case "conifere":{
      const dark = f==="conifere";
      ell(cx,base-H*.48,w*.48,H*.48,dark?"#2F4A27":g(3));
      for(let i=0;i<9;i++) ell(cx+(R()-.5)*w*.6,base-H*(.25+R()*.5),w*(.14+R()*.12),H*(.14+R()*.12),dark?(i%2?"#3B5A2F":"#4A6B35"):g(i),.9);
      if(dark) for(let i=0;i<40;i++){const x=cx+(R()-.5)*w*.85,y=base-H*(.08+R()*.85);line(x,y,x+(R()-.5)*6,y-4,"#25391F",1);}
      if(bloom) dots(cx,base-H*.55,w*.42,H*.38,Math.round(w*.5),fc,Math.max(1.5,w*.022),.95);
      break;}
    case "epi":{
      ell(cx,base-H*.12,w*.42,H*.14,g(0));
      const n=Math.max(5,Math.round(w/9));
      for(let i=0;i<n;i++){
        const x=cx+(R()-.5)*w*.8, lean=(x-cx)*.25, top=base-H*(.72+R()*.28);
        line(x,base-H*.08,x+lean,top,g(1),1.1);
        const len=(base-top)*.45;
        for(let k=0;k<9;k++){const y=top+k*len/9, xx=x+lean*(1-(y-top+H*.08)/(base-top));ell(xx,y,Math.max(1.4,w*.022),Math.max(1.6,len/12),fc);}
      }
      break;}
    case "torche":{
      blades(16,H*.55,w*.5,L,1.3);
      for(let i=0;i<5;i++){const x=cx+(R()-.5)*w*.6, top=base-H*(.75+R()*.25);line(x,base,x,top+H*.1,g(1),1.4);ell(x,top+H*.03,Math.max(2.5,w*.045),H*.08,fc);ell(x,top+H*.11,Math.max(2.5,w*.045),H*.05,"#F2CF4A");}
      break;}
    case "marguerite":{
      ell(cx,base-H*.18,w*.44,H*.2,g(0));ell(cx+w*.1,base-H*.24,w*.25,H*.14,g(2),.8);
      const n=Math.max(4,Math.round(w/14)), rp=Math.max(3,w*.06);
      for(let i=0;i<n;i++){
        const x=cx+(R()-.5)*w*.85, top=base-H*(.65+R()*.35);
        line(x,base-H*.15,x,top,g(1),1.1);
        for(let a=0;a<8;a++){const t=a/8*Math.PI*2;ell(x+Math.cos(t)*rp*.7,top+Math.sin(t)*rp*.45,rp*.55,rp*.2,fc,1,t);}
        ell(x,top,rp*.35,rp*.3,p.fam==="blanc"?"#E3B83A":"#5A3A1E");
      }
      break;}
    case "ombelle":{
      ell(cx,base-H*.2,w*.42,H*.22,g(0));
      const n=Math.max(4,Math.round(w/16));
      for(let i=0;i<n;i++){const x=cx+(R()-.5)*w*.8, top=base-H*(.75+R()*.25);line(x,base-H*.15,x,top,g(1),1.2);ell(x,top,Math.max(4,w*.1),Math.max(2.5,H*.07),fc);dots(x,top-1,w*.08,H*.04,6,"#FFFFFF",.9,.35);}
      break;}
    case "globe":{
      const hyd=/Hydrangea/.test(p.latin);
      if(hyd){ell(cx,base-H*.42,w*.48,H*.42,g(3));for(let i=0;i<6;i++){const x=cx+(R()-.5)*w*.7,y=base-H*(.45+R()*.4),r=Math.max(5,w*.12);ell(x,y,r,r*.85,fc,.95);dots(x,y,r,r*.8,12,"#FFFFFF",1,.3);}break;}
      blades(14,H*.35,w*.5,L,1.6);
      const n=Math.max(3,Math.round(w/16));
      for(let i=0;i<n;i++){const x=cx+(R()-.5)*w*.7, top=base-H*(.8+R()*.2), rs=Math.max(4,w*.09);line(x,base,x,top,g(1),1.2);ell(x,top,rs,rs,fc,.4);dots(x,top,rs,rs,22,fc,Math.max(1,rs*.18));}
      break;}
    case "nuage":{
      blades(20,H*.45,w*.45,L,1);
      for(let i=0;i<10;i++){const x=cx+(R()-.5)*w*.8;line(x,base-H*.2,x+(R()-.5)*10,base-H*(.7+R()*.3),g(1),.8,.8);}
      dots(cx,base-H*.65,w*.48,H*.33,Math.round(w*1.6),fc,Math.max(1,w*.018),.6);
      break;}
    case "raide":{
      blades(20,H*.45,w*.4,L,1.1);
      for(let i=0;i<26;i++){const s=(R()-.5)*2;line(cx+s*w*.08,base,cx+s*w*.3,base-H*(.8+R()*.2),fc,1.3,.9);}
      break;}
    case "plumet":{
      blades(30,H*.8,w*.55,L,1.1);
      for(let i=0;i<9;i++){const s=(R()-.5)*2, x=cx+s*w*.35, y=base-H*(.75+R()*.25);line(cx+s*w*.1,base,x,y,g(1),.9);ell(x,y,Math.max(2,w*.035),H*.09,fc,.85,s*.3);}
      break;}
    case "touffe":blades(36,H,w*.55,[fc,g(0),fc,g(2)],1.3);break;
    case "fougere":{
      for(let i=0;i<8;i++){const s=(i/7-.5)*2, ex=cx+s*w*.48, ey=base-H*(.55+(1-Math.abs(s))*.45);line(cx,base,ex,ey,g(i),1.4,1,cx+s*w*.15,ey-H*.1);
        for(let k=1;k<9;k++){const t=k/9, x=cx+(ex-cx)*t, y=base+(ey-base)*t-Math.sin(t*Math.PI)*H*.08;line(x,y,x+(s>=0?1:-1)*w*.05,y+H*.03,g(i+1),1);line(x,y,x-(s>=0?1:-1)*w*.02,y-H*.04,g(i+1),1);}}
      break;}
    case "feuillage":{
      const lc = /Heuchera/.test(p.latin) ? "#6E2E4A" : /Brunnera/.test(p.latin) ? "#B9C8B4" : null;
      if(bloom && !/Heuchera/.test(p.latin)) for(let i=0;i<4;i++){const x=cx+(R()-.5)*w*.5,top=base-H*(.85+R()*.15);line(x,base-H*.3,x,top,g(1),1);dots(x,top+H*.08,3,H*.08,8,fc,1.6);}
      if(/Heuchera/.test(p.latin)) for(let i=0;i<4;i++){const x=cx+(R()-.5)*w*.5,top=base-H*(.85+R()*.15);line(x,base-H*.3,x,top,"#4A2A30",.8);dots(x,top+H*.1,3,H*.1,8,"#E58AB0",1.2);}
      for(let i=0;i<9;i++){const s=(i/8-.5)*2;ell(cx+s*w*.3,base-H*(.18+(1-Math.abs(s))*.18),w*.16,H*.12,lc||g(i),1,s*.9);}
      break;}
    case "tapis":{
      for(let i=0;i<6;i++) ell(cx+(R()-.5)*w*.6,base-H*(.3+R()*.3),w*(.2+R()*.12),H*.35,g(i));
      if(bloom) dots(cx,base-H*.55,w*.45,H*.35,Math.round(w*.6),fc,Math.max(1.4,w*.02));
      break;}
    case "arbre":{
      ctx.fillStyle="#6B5137";ctx.fillRect(cx-Math.max(2,w*.035),base-H*.5,Math.max(4,w*.07),H*.5);
      ell(cx,base-H*.66,w*.5,H*.32,g(3));
      for(let i=0;i<10;i++) ell(cx+(R()-.5)*w*.75,base-H*(.5+R()*.35),w*(.12+R()*.1),H*(.08+R()*.08),g(i),.9);
      if(bloom) dots(cx,base-H*.68,w*.45,H*.28,Math.round(w*.6),fc,Math.max(1.8,w*.02));
      break;}
    case "grimpe":{
      for(let k=0;k<=4;k++){const x=cx-w*.4+k*w*.2;line(x,base,x,base-H,"#8A6A48",1,.5);}
      for(let k=1;k<=4;k++){const y=base-k*H*.22;line(cx-w*.45,y,cx+w*.45,y,"#8A6A48",1,.5);}
      for(let v=0;v<3;v++){let x=cx+(v-1)*w*.25,y=base;for(let k=0;k<14;k++){const nx=x+(R()-.5)*w*.18, ny=y-H/14;line(x,y,nx,ny,g(3),1.5);ell(nx+(R()-.5)*6,ny,Math.max(2,w*.035),Math.max(1.5,w*.02),g(k),1,R()*3);x=nx;y=ny;}}
      if(bloom) dots(cx,base-H*.6,w*.42,H*.38,Math.round(w*.5),fc,Math.max(1.8,w*.028));
      break;}
  }
}

function sizeCanvas(cv){
  const dpr=window.devicePixelRatio||1, r=cv.getBoundingClientRect();
  if(!r.width) return null;
  cv.width=Math.round(r.width*dpr); cv.height=Math.round(r.height*dpr);
  const ctx=cv.getContext("2d"); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,r.width,r.height);
  return {ctx,w:r.width,h:r.height};
}
function drawPreviews(){
  document.querySelectorAll("canvas[data-pv]").forEach(cv=>{
    const c=combo[+cv.dataset.pv]; if(!c) return;
    const s=sizeCanvas(cv); if(!s) return;
    const p=c.plant, H=p.type==="grimpante"?s.h-14:Math.min(s.h-14, 22+Math.min(p.h,200)/200*(s.h-36));
    const w=Math.min(s.w*.6, Math.max(70, H*1.3));
    drawPlant(s.ctx,p,s.w/2,s.h-8,w,H,rng(p.id+3));
  });
}
let lastLayout=null;
function drawElevation(){
  const cv=document.getElementById("elev"); if(!cv||!lastLayout) return;
  const s=sizeCanvas(cv); if(!s) return;
  const {W,circles,dots,climbers}=lastLayout, ctx=s.ctx;
  const ground=s.h-18, sx=s.w/W;
  const maxH=Math.max(100,...circles.map(o=>o.it.c.plant.h));

  const sy=(s.h-60)/maxH;
  if(climbers.length){ climbers.forEach((it,k)=>{ for(let j=0;j<it.n;j++){ const x=s.w*(j+.5)/it.n+k*20; const ra=ratioAt(it.c.plant,state.age); drawPlant(ctx,it.c.plant,x,ground-34,Math.min(140,s.w/it.n*.8)*Math.max(.35,Math.sqrt(ra)),(s.h-50)*ra,rng(it.c.plant.id+j)); } }); }
  (lastLayout.trees||[]).forEach((o,j)=>{ const p=o.it.c.plant, ra=ratioAt(p,state.age); drawPlant(ctx,p,o.x*sx,ground-26,Math.min(s.w*.45,o.r*2*sx*1.1)*Math.max(.15,ra),Math.min(p.h*sy,s.h-28)*ra,rng(p.id+99+j)); });
  const maxY=Math.max(...circles.map(o=>o.y),1);
  const order=[...circles].sort((a,b)=>a.y-b.y);
  const bulbs=dots.filter((_,i)=>i%3===0);
  let bi=0;
  if(state.age==="0") bulbs.length=0;
  order.forEach((o,i)=>{
    const depth=o.y/maxY, base=ground-(1-depth)*30;
    while(bi<bulbs.length && bulbs[bi].y<o.y){const b=bulbs[bi++], bp=b.it.c.plant;drawPlant(ctx,bp,b.x*sx,ground-(1-b.y/maxY)*30,16,bp.h*sy,rng(bi));}
    const p=o.it.c.plant;
    const ra=ratioAt(p,state.age); drawPlant(ctx,p,o.x*sx,base,o.r*2*sx*1.25*Math.max(.3,Math.sqrt(ra)),Math.max(6,p.h*sy*ra),rng(p.id*31+i));
  });
  while(bi<bulbs.length){const b=bulbs[bi++], bp=b.it.c.plant;drawPlant(ctx,bp,b.x*sx,ground,16,bp.h*sy,rng(bi));}
  const css=getComputedStyle(document.documentElement);
  ctx.fillStyle=css.getPropertyValue("--pollen-soft").trim()||"#F6EBCF";
  ctx.fillRect(0,ground,s.w,s.h-ground);
  ctx.strokeStyle=css.getPropertyValue("--line").trim()||"#D5DCCD";ctx.beginPath();ctx.moveTo(0,ground);ctx.lineTo(s.w,ground);ctx.stroke();
}
function drawAll(){ drawPreviews(); drawElevation(); }
let rT; window.addEventListener("resize",()=>{clearTimeout(rT);rT=setTimeout(drawAll,150);});
try{ matchMedia("(prefers-color-scheme: dark)").addEventListener("change",drawAll); }catch(e){}

function photoUrl(p){
  const cv = (p.nom.match(/'[^']+'/)||[""])[0];
  return "https://www.google.com/search?tbm=isch&q="+encodeURIComponent((p.latin+" "+cv).trim());
}
// Google Shopping : pépinières et jardineries en ligne qui vendent la plante (nom latin + « plante » pour écarter graines et plantes artificielles).
function shopUrl(p){
  const cv = (p.nom.match(/'[^']+'/)||[""])[0];
  return "https://www.google.com/search?tbm=shop&q="+encodeURIComponent((p.latin+" "+cv).trim()+(p.type==="bulbe"?" bulbes":" plante"));
}
// ---------- Photos (Wikimedia Commons, licences libres) ----------
const PHOTOS = /*PHOTOS*/{"achillee-terracotta": {"page": "https://commons.wikimedia.org/wiki/File:Achillea_Terracotta_2zz.jpg", "artist": "", "license": ""}, "arbre-de-judee": {"page": "https://commons.wikimedia.org/wiki/File:Cercis_siliquastrum_spring.jpg", "artist": "", "license": ""}, "arroche-marine": {"page": "https://commons.wikimedia.org/wiki/File:Atriplex_halimus_kz1.JPG", "artist": "", "license": ""}, "buisson-ardent": {"page": "https://commons.wikimedia.org/wiki/File:Pyracantha.bush.arp.jpg", "artist": "", "license": ""}, "ceanothe-arborescent-trewithen-blue": {"page": "https://commons.wikimedia.org/wiki/File:Blue_blossom_ceanothus_%28Ceanothus_thyrsiflorus%29_on_Point_Reyes_Fire_Lane_Trail.jpg", "artist": "", "license": ""}, "ceanothe-concha": {"page": "https://commons.wikimedia.org/wiki/File:Ceanothus_-_California_lilac.jpg", "artist": "", "license": ""}, "echinops": {"page": "https://commons.wikimedia.org/wiki/File:Echinops_ritro_0010.JPG", "artist": "", "license": ""}, "eleagnus": {"page": "https://commons.wikimedia.org/wiki/File:Elaeagnus_ebbingei.jpg", "artist": "", "license": ""}, "gaura": {"page": "https://commons.wikimedia.org/wiki/File:Gaura_lindheimeri_Whirling_Butterflies_4zz.jpg", "artist": "", "license": ""}, "iris-des-jardins": {"page": "https://commons.wikimedia.org/wiki/File:Lirio_morado_-_Lirio_com%C3%BAn_-_C%C3%A1rdeno_%28Iris_germanica%29_%2814300433695%29.jpg", "artist": "", "license": ""}, "laurier-sauce": {"page": "https://commons.wikimedia.org/wiki/File:Laurus_nobilis_14zz.jpg", "artist": "", "license": ""}, "muhlenbergia": {"page": "https://commons.wikimedia.org/wiki/File:Muhlenbergia_capillaris_10zz.jpg", "artist": "", "license": ""}, "nepeta": {"page": "https://commons.wikimedia.org/wiki/File:Nepeta_x_faasenii_Walkers_Low_2zz.jpg", "artist": "", "license": ""}, "origan": {"page": "https://commons.wikimedia.org/wiki/File:-2019-08-05_Organo_%28Origanum_vulgare%29_flowers%2C_Trimingham.JPG", "artist": "", "license": ""}, "orpin-d-automne": {"page": "https://commons.wikimedia.org/wiki/File:Sedum_Herbstfreude.jpg", "artist": "", "license": ""}, "sauge-arbustive-hot-lips": {"page": "https://commons.wikimedia.org/wiki/File:Salvia_Hot_Lips.jpg", "artist": "", "license": ""}, "sauge-officinale": {"page": "https://commons.wikimedia.org/wiki/File:Salvia_officinalis.jpg", "artist": "", "license": ""}, "savonnier": {"page": "https://commons.wikimedia.org/wiki/File:Koelreuteria_paniculata_B.jpg", "artist": "", "license": ""}, "stipa-cheveux-d-ange": {"page": "https://commons.wikimedia.org/wiki/File:Stipa_tenuissima_Parc_floral.JPG", "artist": "", "license": ""}, "valeriane-rouge": {"page": "https://commons.wikimedia.org/wiki/File:Centranthus_ruber_Prague_2017_1.jpg", "artist": "", "license": ""}, "lavandin-grosso": {"page": "https://commons.wikimedia.org/wiki/File:Lavandula_x_intermedia_2c.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Lavandula_x_intermedia_2c.JPG/500px-Lavandula_x_intermedia_2c.JPG"}, "romarin": {"page": "https://commons.wikimedia.org/wiki/File:2017-12-06_Rosemary_shrub_in_blossom%2C_Albufeira_%282%29.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2017-12-06_Rosemary_shrub_in_blossom%2C_Albufeira_%282%29.JPG/500px-2017-12-06_Rosemary_shrub_in_blossom%2C_Albufeira_%282%29.JPG"}, "ciste-pourpre": {"page": "https://commons.wikimedia.org/wiki/File:Cistus_%C3%97_purpureus_Alan_Fradd_%287258793268%29.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Cistus_%C3%97_purpureus_Alan_Fradd_%287258793268%29.jpg/500px-Cistus_%C3%97_purpureus_Alan_Fradd_%287258793268%29.jpg"}, "sauge-d-afghanistan": {"page": "https://commons.wikimedia.org/wiki/File:Perovskia_atriplicifolia_E.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Perovskia_atriplicifolia_E.jpg/500px-Perovskia_atriplicifolia_E.jpg"}, "abelia": {"page": "https://commons.wikimedia.org/wiki/File:Abelia_x_grandiflora-Fleurs-20200601.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Abelia_x_grandiflora-Fleurs-20200601.jpg/500px-Abelia_x_grandiflora-Fleurs-20200601.jpg"}, "hortensia-panicule-limelight": {"page": "https://commons.wikimedia.org/wiki/File:Hydrangea_paniculata_Limelight_6zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Hydrangea_paniculata_Limelight_6zz.jpg/500px-Hydrangea_paniculata_Limelight_6zz.jpg"}, "laurier-tin": {"page": "https://commons.wikimedia.org/wiki/File:Viburnum_tinus.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Viburnum_tinus.jpg/500px-Viburnum_tinus.jpg"}, "oranger-du-mexique": {"page": "https://commons.wikimedia.org/wiki/File:Choisya_ternata.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Choisya_ternata.jpg/500px-Choisya_ternata.jpg"}, "sarcococca": {"page": "https://commons.wikimedia.org/wiki/File:Sarcococca_confusa_kz03.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Sarcococca_confusa_kz03.jpg/500px-Sarcococca_confusa_kz03.jpg"}, "myrte": {"page": "https://commons.wikimedia.org/wiki/File:Myrtus_communis_8zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Myrtus_communis_8zz.jpg/500px-Myrtus_communis_8zz.jpg"}, "pittosporum-nain": {"page": "https://commons.wikimedia.org/wiki/File:Pittosporum_tobira_Nana_in_the_garden_of_the_Musee_d%27Histoire_naturelle_in_Nimes.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pittosporum_tobira_Nana_in_the_garden_of_the_Musee_d%27Histoire_naturelle_in_Nimes.jpg/500px-Pittosporum_tobira_Nana_in_the_garden_of_the_Musee_d%27Histoire_naturelle_in_Nimes.jpg"}, "germandree-arbustive": {"page": "https://commons.wikimedia.org/wiki/File:Teucrium_fruticans.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Teucrium_fruticans.JPG/500px-Teucrium_fruticans.JPG"}, "spiree-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Spiraea_japonica_plant.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Spiraea_japonica_plant.JPG/500px-Spiraea_japonica_plant.JPG"}, "cornouiller-midwinter-fire": {"page": "https://commons.wikimedia.org/wiki/File:Cornus_sanguinea_Midwinter_Fire_4zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Cornus_sanguinea_Midwinter_Fire_4zz.jpg/500px-Cornus_sanguinea_Midwinter_Fire_4zz.jpg"}, "miscanthus-morning-light": {"page": "https://commons.wikimedia.org/wiki/File:Chinaschilf_-_Miscanthus_sinensis_03.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chinaschilf_-_Miscanthus_sinensis_03.jpg/500px-Chinaschilf_-_Miscanthus_sinensis_03.jpg"}, "herbe-aux-ecouvillons-hameln": {"page": "https://commons.wikimedia.org/wiki/File:Pennisetum_alopecuroides_Hameln_2zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Pennisetum_alopecuroides_Hameln_2zz.jpg/500px-Pennisetum_alopecuroides_Hameln_2zz.jpg"}, "calamagrostis-karl-foerster": {"page": "https://commons.wikimedia.org/wiki/File:Calamagrostis_x_acutiflora_Karl_Foerster_0zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Calamagrostis_x_acutiflora_Karl_Foerster_0zz.jpg/500px-Calamagrostis_x_acutiflora_Karl_Foerster_0zz.jpg"}, "fetuque-bleue": {"page": "https://commons.wikimedia.org/wiki/File:Festuca_glauca.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Festuca_glauca.jpg/500px-Festuca_glauca.jpg"}, "echinacee-pourpre": {"page": "https://commons.wikimedia.org/wiki/File:Echinacea_purpurea.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Echinacea_purpurea.jpg/500px-Echinacea_purpurea.jpg"}, "rudbeckia-goldsturm": {"page": "https://commons.wikimedia.org/wiki/File:Rudbeckia_fulgida_var._sullivantii_Goldsturm_10zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Rudbeckia_fulgida_var._sullivantii_Goldsturm_10zz.jpg/500px-Rudbeckia_fulgida_var._sullivantii_Goldsturm_10zz.jpg"}, "sauge-des-bois-caradonna": {"page": "https://commons.wikimedia.org/wiki/File:Salvia_nemorosa_Caradonna_4zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Salvia_nemorosa_Caradonna_4zz.jpg/500px-Salvia_nemorosa_Caradonna_4zz.jpg"}, "euphorbe-des-garrigues": {"page": "https://commons.wikimedia.org/wiki/File:Euphorbia-characias-total2.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Euphorbia-characias-total2.JPG/500px-Euphorbia-characias-total2.JPG"}, "verveine-de-buenos-aires": {"page": "https://commons.wikimedia.org/wiki/File:Verbena_bonariensis_10zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Verbena_bonariensis_10zz.jpg/500px-Verbena_bonariensis_10zz.jpg"}, "geranium-rozanne": {"page": "https://commons.wikimedia.org/wiki/File:Geranium_Rozanne_6zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Geranium_Rozanne_6zz.jpg/500px-Geranium_Rozanne_6zz.jpg"}, "hellebore-d-orient": {"page": "https://commons.wikimedia.org/wiki/File:Helleborus_orientalis_2zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Helleborus_orientalis_2zz.jpg/500px-Helleborus_orientalis_2zz.jpg"}, "anemone-du-japon-honorine-jobert": {"page": "https://commons.wikimedia.org/wiki/File:Japanese_Anemone_Honorine_Jobert.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Japanese_Anemone_Honorine_Jobert.jpg/500px-Japanese_Anemone_Honorine_Jobert.jpg"}, "tritoma": {"page": "https://commons.wikimedia.org/wiki/File:Kniphofia_uvaria.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Kniphofia_uvaria.jpg/500px-Kniphofia_uvaria.jpg"}, "hemerocalle": {"page": "https://commons.wikimedia.org/wiki/File:Hemerocallis_fulva_2012_G1.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Hemerocallis_fulva_2012_G1.jpg/500px-Hemerocallis_fulva_2012_G1.jpg"}, "vergerette": {"page": "https://commons.wikimedia.org/wiki/File:Erigeron_karvinskianus_RF.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Erigeron_karvinskianus_RF.jpg/500px-Erigeron_karvinskianus_RF.jpg"}, "alchemille": {"page": "https://commons.wikimedia.org/wiki/File:Alchemilla_mollis%2C_Lady%27s_Mantle.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Alchemilla_mollis%2C_Lady%27s_Mantle.jpg/500px-Alchemilla_mollis%2C_Lady%27s_Mantle.jpg"}, "thym-serpolet": {"page": "https://commons.wikimedia.org/wiki/File:Thymus_serpyllum_Magic_Carpet_1zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Thymus_serpyllum_Magic_Carpet_1zz.jpg/500px-Thymus_serpyllum_Magic_Carpet_1zz.jpg"}, "petite-pervenche": {"page": "https://commons.wikimedia.org/wiki/File:Vinca_minor_RF.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Vinca_minor_RF.jpg/500px-Vinca_minor_RF.jpg"}, "geranium-a-grosses-racines": {"page": "https://commons.wikimedia.org/wiki/File:Geranium_macrorrhizum_Spessart_0zz.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Geranium_macrorrhizum_Spessart_0zz.jpg/500px-Geranium_macrorrhizum_Spessart_0zz.jpg"}, "epimede": {"page": "https://commons.wikimedia.org/wiki/File:Epimedium_x_perralchicum_%27Frohnleiten%27_2013-05-10.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Epimedium_x_perralchicum_%27Frohnleiten%27_2013-05-10.jpg/500px-Epimedium_x_perralchicum_%27Frohnleiten%27_2013-05-10.jpg"}, "oreille-d-ours": {"page": "https://commons.wikimedia.org/wiki/File:Stachys_byzantina_Minsk.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Stachys_byzantina_Minsk.jpg/500px-Stachys_byzantina_Minsk.jpg"}, "ail-d-ornement-purple-sensation": {"page": "https://commons.wikimedia.org/wiki/File:Flowering_Onion_Allium_aflatunense_%27Purple_Sensation%27_Flower_2319px.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Flowering_Onion_Allium_aflatunense_%27Purple_Sensation%27_Flower_2319px.jpg/500px-Flowering_Onion_Allium_aflatunense_%27Purple_Sensation%27_Flower_2319px.jpg"}, "narcisse-thalia": {"page": "https://commons.wikimedia.org/wiki/File:Narcissus_%27Thalia%27.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Narcissus_%27Thalia%27.jpg/500px-Narcissus_%27Thalia%27.jpg"}, "muscari": {"page": "https://commons.wikimedia.org/wiki/File:Muscari_armeniacum_4.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Muscari_armeniacum_4.jpg/500px-Muscari_armeniacum_4.jpg"}, "cyclamen-de-naples": {"page": "https://commons.wikimedia.org/wiki/File:Cyclamen_hederifolium_pink.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Cyclamen_hederifolium_pink.jpg/500px-Cyclamen_hederifolium_pink.jpg"}, "jasmin-etoile": {"page": "https://commons.wikimedia.org/wiki/File:Trachelospermum_jasminoides.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Trachelospermum_jasminoides.jpg/500px-Trachelospermum_jasminoides.jpg"}, "clematite-etoile-violette": {"page": "https://commons.wikimedia.org/wiki/File:%27Clematis_viticella%27_%C3%89toile_Violette_trellis_at_Nuthurst%2C_West_Sussex%2C_England.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/%27Clematis_viticella%27_%C3%89toile_Violette_trellis_at_Nuthurst%2C_West_Sussex%2C_England.jpg/500px-%27Clematis_viticella%27_%C3%89toile_Violette_trellis_at_Nuthurst%2C_West_Sussex%2C_England.jpg"}, "rosier-grimpant-new-dawn": {"page": "https://commons.wikimedia.org/wiki/File:Rosa_New_Dawn.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rosa_New_Dawn.jpg/500px-Rosa_New_Dawn.jpg"}, "chevrefeuille-des-bois": {"page": "https://commons.wikimedia.org/wiki/File:Lonicera_periclymenum_Luc_Viatour.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Lonicera_periclymenum_Luc_Viatour.JPG/500px-Lonicera_periclymenum_Luc_Viatour.JPG"}, "rosier-de-banks": {"page": "https://commons.wikimedia.org/wiki/File:Rosa_banksiae_%27Lutea%27.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Rosa_banksiae_%27Lutea%27.jpg/500px-Rosa_banksiae_%27Lutea%27.jpg"}, "bignone-madame-galen": {"page": "https://commons.wikimedia.org/wiki/File:Campsis_x_tagliabuana_HRM1.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Campsis_x_tagliabuana_HRM1.JPG/500px-Campsis_x_tagliabuana_HRM1.JPG"}, "pin-des-montagnes": {"page": "https://commons.wikimedia.org/wiki/File:Pinus_mugo_plant.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Pinus_mugo_plant.jpg/500px-Pinus_mugo_plant.jpg"}, "laurier-du-portugal": {"page": "https://commons.wikimedia.org/wiki/File:Portugal_laurel_%28Prunus_lusitanica%29.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Portugal_laurel_%28Prunus_lusitanica%29.jpg/500px-Portugal_laurel_%28Prunus_lusitanica%29.jpg"}, "osmanthe": {"page": "https://commons.wikimedia.org/wiki/File:Osmanthus_burkwoodii_B.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Osmanthus_burkwoodii_B.jpg/500px-Osmanthus_burkwoodii_B.jpg"}, "filaire": {"page": "https://commons.wikimedia.org/wiki/File:Phillyrea_angustifolia_1.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Phillyrea_angustifolia_1.JPG/500px-Phillyrea_angustifolia_1.JPG"}, "escallonia": {"page": "https://commons.wikimedia.org/wiki/File:Escallonia_rubra_var._macrantha-Tige_et_Fleurs-20190422.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Escallonia_rubra_var._macrantha-Tige_et_Fleurs-20190422.jpg/500px-Escallonia_rubra_var._macrantha-Tige_et_Fleurs-20190422.jpg"}, "lilas-des-indes": {"page": "https://commons.wikimedia.org/wiki/File:Lagerstroemia_indica_in_Damyang_1.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Lagerstroemia_indica_in_Damyang_1.JPG/500px-Lagerstroemia_indica_in_Damyang_1.JPG"}, "chene-vert": {"page": "https://commons.wikimedia.org/wiki/File:Quercus_ilex_in_Piggiola%2C_Corsica.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Quercus_ilex_in_Piggiola%2C_Corsica.jpg/500px-Quercus_ilex_in_Piggiola%2C_Corsica.jpg"}, "pittosporum-a-petites-feuilles": {"page": "https://commons.wikimedia.org/wiki/File:Pittosporum_tenuifolium_%27Silver_Sheen%27_hedge.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Pittosporum_tenuifolium_%27Silver_Sheen%27_hedge.jpg/500px-Pittosporum_tenuifolium_%27Silver_Sheen%27_hedge.jpg"}, "agastache-tutti-frutti": {"page": "https://commons.wikimedia.org/wiki/File:AgastacheTFHVN.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/AgastacheTFHVN.jpg/500px-AgastacheTFHVN.jpg"}, "acanthe": {"page": "https://commons.wikimedia.org/wiki/File:Acanthus_mollis_flower.JPG", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Acanthus_mollis_flower.JPG/500px-Acanthus_mollis_flower.JPG"}, "laurier-rose": {"page": "https://commons.wikimedia.org/wiki/File:Nerium_oleander_pink.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Nerium_oleander_pink.jpg/500px-Nerium_oleander_pink.jpg"}, "ciboulette": {"page": "https://commons.wikimedia.org/wiki/File:Allium_schoenoprasum%2C_flowers.jpg", "artist": "", "license": "", "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Allium_schoenoprasum%2C_flowers.jpg/500px-Allium_schoenoprasum%2C_flowers.jpg"}, "hortensia": {"page": "https://commons.wikimedia.org/wiki/File:(Natural)_Hydrangea_macrophylla,_Iwafune,_Isumi,_Chiba,_Japan_2.jpg", "artist": "belvedere04", "license": "CC BY 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/%28Natural%29_Hydrangea_macrophylla%2C_Iwafune%2C_Isumi%2C_Chiba%2C_Japan_2.jpg/500px-%28Natural%29_Hydrangea_macrophylla%2C_Iwafune%2C_Isumi%2C_Chiba%2C_Japan_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "laiche-ice-dance": {"page": "https://commons.wikimedia.org/wiki/File:Carex_morrowii_2016-04-03_6868b.JPG", "artist": "Salicyna", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Carex_morrowii_2016-04-03_6868b.JPG/500px-Carex_morrowii_2016-04-03_6868b.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "herbe-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Hakonechloa_macra_%27All_Gold%27_Leaves_2448px.jpg", "artist": "Photo by and (c)2006 Derek Ramsey (Ram-Man).  Location credit to the Chanticleer", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Hakonechloa_macra_%27All_Gold%27_Leaves_2448px.jpg/500px-Hakonechloa_macra_%27All_Gold%27_Leaves_2448px.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "heuchere": {"page": "https://commons.wikimedia.org/wiki/File:San_Gabriel_Mountains_coralbells.jpg", "artist": "User:Geographer", "license": "CC BY 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/San_Gabriel_Mountains_coralbells.jpg/500px-San_Gabriel_Mountains_coralbells.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "fougere-male": {"page": "https://commons.wikimedia.org/wiki/File:20220529_115145_Dryopteris_filix-mas_(L.)_Schott.jpg", "artist": "Sdjurovic", "license": "CC0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/20220529_115145_Dryopteris_filix-mas_%28L.%29_Schott.jpg/500px-20220529_115145_Dryopteris_filix-mas_%28L.%29_Schott.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "hosta": {"page": "https://commons.wikimedia.org/wiki/File:Hosta_Bressingham_Blue.JPG", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Hosta_Bressingham_Blue.JPG/500px-Hosta_Bressingham_Blue.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "astilbe": {"page": "https://commons.wikimedia.org/wiki/File:Astilbe_arendsii1.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Astilbe_arendsii1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "agapanthe": {"page": "https://commons.wikimedia.org/wiki/File:Agapanthus_africanus1.jpg", "artist": "Kurt Stüber [1]", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Agapanthus_africanus1.jpg/500px-Agapanthus_africanus1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "brunnera-jack-frost": {"page": "https://commons.wikimedia.org/wiki/File:(MHNT)_Brunnera_macrophylla,_flowers_-_Les_Martels,_Giroussens_Tarn.jpg", "artist": "Didier Descouens", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/%28MHNT%29_Brunnera_macrophylla%2C_flowers_-_Les_Martels%2C_Giroussens_Tarn.jpg/500px-%28MHNT%29_Brunnera_macrophylla%2C_flowers_-_Les_Martels%2C_Giroussens_Tarn.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "digitale": {"page": "https://commons.wikimedia.org/wiki/File:Digitalis_purpurea_LC0101.jpg", "artist": "Jörg Hempel", "license": "CC BY-SA 3.0 de", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Digitalis_purpurea_LC0101.jpg/500px-Digitalis_purpurea_LC0101.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "lamier-white-nancy": {"page": "https://commons.wikimedia.org/wiki/File:Lamium_maculatum_cm01.jpg", "artist": "Tomasz Kuran aka Meteor2017", "license": "CC BY 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Lamium_maculatum_cm01.jpg/500px-Lamium_maculatum_cm01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "herbe-aux-turquoises": {"page": "https://commons.wikimedia.org/wiki/File:Japonska_ka%C4%8Dja_brada.jpg", "artist": "Shabicht", "license": "CC0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Japonska_ka%C4%8Dja_brada.jpg/500px-Japonska_ka%C4%8Dja_brada.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "bugle-rampante": {"page": "https://commons.wikimedia.org/wiki/File:Ajuga_reptans_20070429_132711_1.jpg", "artist": "G. Edward Johnson", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Ajuga_reptans_20070429_132711_1.jpg/500px-Ajuga_reptans_20070429_132711_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "camassia": {"page": "https://commons.wikimedia.org/wiki/File:Camassia_leichtlinii_inflorescence.jpg", "artist": "Flowersinmyyard", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Camassia_leichtlinii_inflorescence.jpg/500px-Camassia_leichtlinii_inflorescence.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "crocosmia-lucifer": {"page": "https://commons.wikimedia.org/wiki/File:Iridaceae_-_Crocosmia_aurea-1.JPG", "artist": "Hectonichus", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Iridaceae_-_Crocosmia_aurea-1.JPG/500px-Iridaceae_-_Crocosmia_aurea-1.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "thuya-boule-danica": {"page": "https://commons.wikimedia.org/wiki/File:Thuja_occidentalis.jpg", "artist": "", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Thuja_occidentalis.jpg/500px-Thuja_occidentalis.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "photinia-red-robin": {"page": "https://commons.wikimedia.org/wiki/File:Photinia_fraseri_B.JPG", "artist": "Wouter Hagens", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Photinia_fraseri_B.JPG/500px-Photinia_fraseri_B.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "arbousier": {"page": "https://commons.wikimedia.org/wiki/File:Carcassonne_-_Arbutus_unedo_02.jpg", "artist": "Tylwyth Eldar", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Carcassonne_-_Arbutus_unedo_02.jpg/500px-Carcassonne_-_Arbutus_unedo_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "bambou-non-tracant": {"page": "https://commons.wikimedia.org/wiki/File:FargesiaMurieliae.jpg", "artist": "IKAl", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/FargesiaMurieliae.jpg/500px-FargesiaMurieliae.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "alaterne": {"page": "https://commons.wikimedia.org/wiki/File:Rhamnus_alaternus_(8692911406).jpg", "artist": "Kevin Thiele from Perth, Australia", "license": "CC BY 2.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Rhamnus_alaternus_%288692911406%29.jpg/500px-Rhamnus_alaternus_%288692911406%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "pistachier-lentisque": {"page": "https://commons.wikimedia.org/wiki/File:Pistacia_lentiscus.jpg", "artist": "Lumbar~commonswiki", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Pistacia_lentiscus.jpg/500px-Pistacia_lentiscus.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "coronille-glauque": {"page": "https://commons.wikimedia.org/wiki/File:Coronilla_valentina_170208.jpg", "artist": "Vassil", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Coronilla_valentina_170208.jpg/500px-Coronilla_valentina_170208.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "buplevre-ligneux": {"page": "https://commons.wikimedia.org/wiki/File:Bupleurum_fruticosum3.jpg", "artist": "No machine-readable author provided. Aroche assumed (based on copyright claims).", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Bupleurum_fruticosum3.jpg/500px-Bupleurum_fruticosum3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "phlomis-frutescent": {"page": "https://commons.wikimedia.org/wiki/File:0_Phlomis_fruticosa_-_Samo%C3%ABns_(2).JPG", "artist": "Jean-Pol GRANDMONT", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/0_Phlomis_fruticosa_-_Samo%C3%ABns_%282%29.JPG/500px-0_Phlomis_fruticosa_-_Samo%C3%ABns_%282%29.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "santoline": {"page": "https://commons.wikimedia.org/wiki/File:Santolina_chamaecyparissus_flowers.jpg", "artist": "User:Stan Shebs", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Santolina_chamaecyparissus_flowers.jpg/500px-Santolina_chamaecyparissus_flowers.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "immortelle-d-italie": {"page": "https://commons.wikimedia.org/wiki/File:Helichrysum_italicum_(immortelle).JPG", "artist": "(c) 2005 Zubro", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Helichrysum_italicum_%28immortelle%29.JPG/500px-Helichrysum_italicum_%28immortelle%29.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "westringia": {"page": "https://commons.wikimedia.org/wiki/File:Westringia_fruticosa_04.jpg", "artist": "[User:Eug]]", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Westringia_fruticosa_04.jpg/500px-Westringia_fruticosa_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "grevillea": {"page": "https://commons.wikimedia.org/wiki/File:Grevillea_rosmarinifolia_Fagg.jpg", "artist": "Murray Fagg", "license": "CC BY 3.0 au", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Grevillea_rosmarinifolia_Fagg.jpg/500px-Grevillea_rosmarinifolia_Fagg.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "rince-bouteille": {"page": "https://commons.wikimedia.org/wiki/File:Callistemon_citrinus-0878.jpg", "artist": "DirkHoffmann", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Callistemon_citrinus-0878.jpg/500px-Callistemon_citrinus-0878.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "fusain-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Euonyjap.jpg", "artist": "MPF (talk) (Uploads)", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Euonyjap.jpg/500px-Euonyjap.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "chevrefeuille-arbustif": {"page": "https://commons.wikimedia.org/wiki/File:Lonicera_nitida_aurea_after_pruning.JPG", "artist": "User:SB_Johnny", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Lonicera_nitida_aurea_after_pruning.JPG/500px-Lonicera_nitida_aurea_after_pruning.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "houx": {"page": "https://commons.wikimedia.org/wiki/File:Ilex-aquifolium_(Europaeische_Stechpalme-1).jpg", "artist": "Jürgen Howaldt", "license": "CC BY-SA 2.0 de", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Ilex-aquifolium_%28Europaeische_Stechpalme-1%29.jpg/500px-Ilex-aquifolium_%28Europaeische_Stechpalme-1%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "if": {"page": "https://commons.wikimedia.org/wiki/File:Taxus_baccata_MHNT.jpg", "artist": "Didier Descouens", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Taxus_baccata_MHNT.jpg/500px-Taxus_baccata_MHNT.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "osmanthe-a-feuilles-de-houx": {"page": "https://commons.wikimedia.org/wiki/File:Osmanthus_heterophyllus3.jpg", "artist": "KENPEI", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Osmanthus_heterophyllus3.jpg/500px-Osmanthus_heterophyllus3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "cotoneaster": {"page": "https://commons.wikimedia.org/wiki/File:Cotoneaster_lacteus_D.jpg", "artist": "Wouter Hagens", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Cotoneaster_lacteus_D.jpg/500px-Cotoneaster_lacteus_D.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "ceanothe-skylark": {"page": "https://commons.wikimedia.org/wiki/File:Ceanothus_thyrsiflorus.jpg", "artist": "A. Barra", "license": "CC BY 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Ceanothus_thyrsiflorus.jpg/500px-Ceanothus_thyrsiflorus.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "lavande-vraie-hidcote": {"page": "https://commons.wikimedia.org/wiki/File:%27Lavandula_angustifolia%27_Hidcote_cultivar_Henham_Essex_England.jpg", "artist": "Acabashi", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/%27Lavandula_angustifolia%27_Hidcote_cultivar_Henham_Essex_England.jpg/500px-%27Lavandula_angustifolia%27_Hidcote_cultivar_Henham_Essex_England.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "lavande-papillon": {"page": "https://commons.wikimedia.org/wiki/File:Topped_lavendar_flowerhead.jpg", "artist": "fir0002  flagstaffotos [at] gmail.com\n\t\tCanon 20D + Sigma 150mm f/2.8", "license": "GFDL 1.2", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Topped_lavendar_flowerhead.jpg/500px-Topped_lavendar_flowerhead.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "gattilier": {"page": "https://commons.wikimedia.org/wiki/File:Vitex_agnus-castus_1.JPG", "artist": "Cillas", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Vitex_agnus-castus_1.JPG/500px-Vitex_agnus-castus_1.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "caryopteris": {"page": "https://commons.wikimedia.org/wiki/File:Caryopteris_x_clandonensis_%27Heavenly_Blue%27_2016-09-04_01.jpg", "artist": "Agnieszka Kwiecień, Nova", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Caryopteris_x_clandonensis_%27Heavenly_Blue%27_2016-09-04_01.jpg/500px-Caryopteris_x_clandonensis_%27Heavenly_Blue%27_2016-09-04_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "dentelaire-de-willmott": {"page": "https://commons.wikimedia.org/wiki/File:Ceratostigma_willmottianum_kz1.jpg", "artist": "Krzysztof Ziarnek, Kenraiz", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Ceratostigma_willmottianum_kz1.jpg/500px-Ceratostigma_willmottianum_kz1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "hibiscus-de-syrie": {"page": "https://commons.wikimedia.org/wiki/File:Hibiscus_Syriacus.JPG", "artist": "Eric Kounce TexasRaiser", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Hibiscus_Syriacus.JPG/500px-Hibiscus_Syriacus.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "lilas": {"page": "https://commons.wikimedia.org/wiki/File:Lilac_Flower%26Leaves,_SC,_Vic,_13.10.2007.jpg", "artist": "Jjron", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Lilac_Flower%26Leaves%2C_SC%2C_Vic%2C_13.10.2007.jpg/500px-Lilac_Flower%26Leaves%2C_SC%2C_Vic%2C_13.10.2007.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "seringat": {"page": "https://commons.wikimedia.org/wiki/File:Philadelphus_coronarius.jpg", "artist": "No machine-readable author provided. Rainer Bielefeld assumed (based on copyrigh", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Philadelphus_coronarius.jpg/500px-Philadelphus_coronarius.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "weigela": {"page": "https://commons.wikimedia.org/wiki/File:Dipsacales_-_Weigela_florida_-_1.jpg", "artist": "Emőke Dénes", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Dipsacales_-_Weigela_florida_-_1.jpg/500px-Dipsacales_-_Weigela_florida_-_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "rosier-glauque": {"page": "https://commons.wikimedia.org/wiki/File:Rosa_glauca_img_2050.jpg", "artist": "Henryhartley", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Rosa_glauca_img_2050.jpg/500px-Rosa_glauca_img_2050.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "rosier-rugueux": {"page": "https://commons.wikimedia.org/wiki/File:Rosa_rugosa_Tokyo.JPG", "artist": "Qwert1234", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Rosa_rugosa_Tokyo.JPG/500px-Rosa_rugosa_Tokyo.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "arbre-a-perruque": {"page": "https://commons.wikimedia.org/wiki/File:Cotinus_coggygria5.jpg", "artist": "Alexander Dunkel", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Cotinus_coggygria5.jpg/500px-Cotinus_coggygria5.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "viorne-lantane": {"page": "https://commons.wikimedia.org/wiki/File:Viburnum_lantana_a1.jpg", "artist": "Opioła Jerzy", "license": "CC BY 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Viburnum_lantana_a1.jpg/500px-Viburnum_lantana_a1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "viorne-obier": {"page": "https://commons.wikimedia.org/wiki/File:Viburnum_01.JPG", "artist": "Lestat (Jan Mehlich)", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Viburnum_01.JPG/500px-Viburnum_01.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "noisetier": {"page": "https://commons.wikimedia.org/wiki/File:Corylus_avellana.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Corylus_avellana.jpg/500px-Corylus_avellana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "aubepine": {"page": "https://commons.wikimedia.org/wiki/File:Hawthorn_fruit.JPG", "artist": "Elstro", "license": "CC BY 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Hawthorn_fruit.JPG/500px-Hawthorn_fruit.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "sureau-noir": {"page": "https://commons.wikimedia.org/wiki/File:Sambucus_nigra_004.jpg", "artist": "Willow", "license": "CC BY 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Sambucus_nigra_004.jpg/500px-Sambucus_nigra_004.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "charmille": {"page": "https://commons.wikimedia.org/wiki/File:Carpinus_betulus_-_Hunsr%C3%BCck_001.jpg", "artist": "Willow", "license": "CC BY 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Carpinus_betulus_-_Hunsr%C3%BCck_001.jpg/500px-Carpinus_betulus_-_Hunsr%C3%BCck_001.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "erable-champetre": {"page": "https://commons.wikimedia.org/wiki/File:Acer_campestre_in_Appennino2.jpg", "artist": "Galloramenu", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Acer_campestre_in_Appennino2.jpg/500px-Acer_campestre_in_Appennino2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "cornouiller-male": {"page": "https://commons.wikimedia.org/wiki/File:CornusMas_Fruits_01.jpg", "artist": "B.navez", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/CornusMas_Fruits_01.jpg/500px-CornusMas_Fruits_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "olivier": {"page": "https://commons.wikimedia.org/wiki/File:Olea_europaea_cuspidata-africana_Cape_Town.JPG", "artist": "Abu Shawka", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Olea_europaea_cuspidata-africana_Cape_Town.JPG/500px-Olea_europaea_cuspidata-africana_Cape_Town.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "arbre-de-soie": {"page": "https://commons.wikimedia.org/wiki/File:2018-07-08_11_10_27_Rosea_Mimosa_blossoms_along_the_ramp_from_southbound_Interstate_95_(New_Jersey_Turnpike_Eastern_Spur)_to_westbound_Interstate_280_(Essex_Freeway)_in_the_New_Jersey_Meadowlands,_within_Kearny,_Hudson_County,_New_Jersey.jpg", "artist": "Famartin", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/2018-07-08_11_10_27_Rosea_Mimosa_blossoms_along_the_ramp_from_southbound_Interstate_95_%28New_Jersey_Turnpike_Eastern_Spur%29_to_westbound_Interstate_280_%28Essex_Freeway%29_in_the_New_Jersey_Meadowlands%2C_within_Kearny%2C_Hudson_County%2C_New_Jersey.jpg/500px-thumbnail.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "erable-de-montpellier": {"page": "https://commons.wikimedia.org/wiki/File:Acer_monspessulanum_fg02.jpg", "artist": "Fritz Geller-Grimm", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Acer_monspessulanum_fg02.jpg/500px-Acer_monspessulanum_fg02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "pommier-d-ornement": {"page": "https://commons.wikimedia.org/wiki/File:Purple_prince_crabapple_tree.JPG", "artist": "Bruce Marlin", "license": "CC BY 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Purple_prince_crabapple_tree.JPG/500px-Purple_prince_crabapple_tree.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "prunier-pourpre": {"page": "https://commons.wikimedia.org/wiki/File:Wildpflaume_Althof-2.jpg", "artist": "An-d", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Wildpflaume_Althof-2.jpg/500px-Wildpflaume_Althof-2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "lilas-de-perse": {"page": "https://commons.wikimedia.org/wiki/File:Cinamomo_(Melia_azedarach)_em_Bag%C3%A9,_RS,_Brasil,_final_de_outono,_frutificado_e_com_folhas_j%C3%A1_ca%C3%ADdas_-_55336704649.jpg", "artist": "O Tupinólogo", "license": "CC BY 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Cinamomo_%28Melia_azedarach%29_em_Bag%C3%A9%2C_RS%2C_Brasil%2C_final_de_outono%2C_frutificado_e_com_folhas_j%C3%A1_ca%C3%ADdas_-_55336704649.jpg/500px-Cinamomo_%28Melia_azedarach%29_em_Bag%C3%A9%2C_RS%2C_Brasil%2C_final_de_outono%2C_frutificado_e_com_folhas_j%C3%A1_ca%C3%ADdas_-_55336704649.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "tamaris": {"page": "https://commons.wikimedia.org/wiki/File:Tamarix_ramosissima_a2.jpg", "artist": "Jerzy Opioła", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Tamarix_ramosissima_a2.jpg/500px-Tamarix_ramosissima_a2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "amelanchier": {"page": "https://commons.wikimedia.org/wiki/File:Busch_Jakobsberg.jpg", "artist": "Udo Schröter", "license": "CC BY 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Busch_Jakobsberg.jpg/500px-Busch_Jakobsberg.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "sauge-de-graham": {"page": "https://commons.wikimedia.org/wiki/File:Salvia_greggii_kz2.jpg", "artist": "Krzysztof Ziarnek, Kenraiz", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Salvia_greggii_kz2.jpg/500px-Salvia_greggii_kz2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "sauge-sclaree": {"page": "https://commons.wikimedia.org/wiki/File:Salvia_sclarea3.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Salvia_sclarea3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "sauge-amistad": {"page": "https://commons.wikimedia.org/wiki/File:Salvia_officinalis0.jpg", "artist": "Kurt Stüber", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Salvia_officinalis0.jpg/500px-Salvia_officinalis0.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "calament": {"page": "https://commons.wikimedia.org/wiki/File:Clinopodium_nepeta_flowers.jpg", "artist": "Margoth195", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Clinopodium_nepeta_flowers.jpg/500px-Clinopodium_nepeta_flowers.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "origan-herrenhausen": {"page": "https://commons.wikimedia.org/wiki/File:Origanum_laevigatum.jpg", "artist": "Ghislain118 (AD) http://www.fleurs-des-montagnes.net", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Origanum_laevigatum.jpg/500px-Origanum_laevigatum.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "panicaut-des-pyrenees": {"page": "https://commons.wikimedia.org/wiki/File:Eryngium_bourgatii_1.jpg", "artist": "Myrabella", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Eryngium_bourgatii_1.jpg/500px-Eryngium_bourgatii_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "panicaut-plane": {"page": "https://commons.wikimedia.org/wiki/File:Eryngium_planum_bgiu.jpg", "artist": "No machine-readable author provided. Bogdan assumed (based on copyright claims).", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Eryngium_planum_bgiu.jpg/500px-Eryngium_planum_bgiu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "molene": {"page": "https://commons.wikimedia.org/wiki/File:Verbascum_olympicum_Dziewanna_olimpijska_2017-08-06_01.jpg", "artist": "Agnieszka Kwiecień, Nova", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Verbascum_olympicum_Dziewanna_olimpijska_2017-08-06_01.jpg/500px-Verbascum_olympicum_Dziewanna_olimpijska_2017-08-06_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "asphodeline-jaune": {"page": "https://commons.wikimedia.org/wiki/File:Asphodeline_lutea0.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/8/80/Asphodeline_lutea0.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "scabieuse-colombaire": {"page": "https://commons.wikimedia.org/wiki/File:Scabiosa_columbaria_Butterfly_Blue_2.jpg", "artist": "Stan Shebs", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Scabiosa_columbaria_Butterfly_Blue_2.jpg/500px-Scabiosa_columbaria_Butterfly_Blue_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "knautie-de-macedoine": {"page": "https://commons.wikimedia.org/wiki/File:Knautia_macedonica1.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/8/80/Knautia_macedonica1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "penstemon-garnet": {"page": "https://commons.wikimedia.org/wiki/File:Penstemon_nitidus_-_Patrick_Alexander_square.jpg", "artist": "Patrick Alexander\n\nhttps://www.inaturalist.org/people/aspidoscelis", "license": "CC0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Penstemon_nitidus_-_Patrick_Alexander_square.jpg/500px-Penstemon_nitidus_-_Patrick_Alexander_square.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "gaillarde": {"page": "https://commons.wikimedia.org/wiki/File:Gaillardia_x_grandiflora_%27Oranges_and_Lemons%27_in_NH.jpg", "artist": "Captain-tucker", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Gaillardia_x_grandiflora_%27Oranges_and_Lemons%27_in_NH.jpg/500px-Gaillardia_x_grandiflora_%27Oranges_and_Lemons%27_in_NH.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "coreopsis-moonbeam": {"page": "https://commons.wikimedia.org/wiki/File:Coreopsis_verticillata.jpg", "artist": "Chrumps", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Coreopsis_verticillata.jpg/500px-Coreopsis_verticillata.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "helenie": {"page": "https://commons.wikimedia.org/wiki/File:Helenium_autumnale1.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Helenium_autumnale1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "aster-de-frikart": {"page": "https://commons.wikimedia.org/wiki/File:Aster_Frikartii-DSC_0386.jpg", "artist": "MarcoC80", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Aster_Frikartii-DSC_0386.jpg/500px-Aster_Frikartii-DSC_0386.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "aster-d-automne": {"page": "https://commons.wikimedia.org/wiki/File:Symphyotrichum_novae-angliae3.jpg", "artist": "The Cosmonaut", "license": "CC BY-SA 2.5 ca", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Symphyotrichum_novae-angliae3.jpg/500px-Symphyotrichum_novae-angliae3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "grande-marguerite": {"page": "https://commons.wikimedia.org/wiki/File:Leucanthemum_x_superbum_%27Becky%27_in_NH.jpg", "artist": "Captain-tucker", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Leucanthemum_x_superbum_%27Becky%27_in_NH.jpg/500px-Leucanthemum_x_superbum_%27Becky%27_in_NH.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "coquelourde": {"page": "https://commons.wikimedia.org/wiki/File:Prikneus0348.jpg", "artist": "nl:Gebruiker:Algont", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Prikneus0348.jpg/500px-Prikneus0348.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "fuchsia-de-californie": {"page": "https://commons.wikimedia.org/wiki/File:Zauschneria_flowers-500px.jpg", "artist": "Stan Shebs", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Zauschneria_flowers-500px.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "ballote": {"page": "https://commons.wikimedia.org/wiki/File:Ballota_pseudodictamnus_1.jpg", "artist": "Ghislain118 https://www.fleurs-des-montagnes.net", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Ballota_pseudodictamnus_1.jpg/500px-Ballota_pseudodictamnus_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "iris-de-siberie": {"page": "https://commons.wikimedia.org/wiki/File:Sibirische_Schwertlilie,_Iris_sibirica_06.JPG", "artist": "Feel free to use my photos, but please mention me as the author and if you want ", "license": "CC BY-SA 3.0 at", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Sibirische_Schwertlilie%2C_Iris_sibirica_06.JPG/500px-Sibirische_Schwertlilie%2C_Iris_sibirica_06.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "lin-vivace": {"page": "https://commons.wikimedia.org/wiki/File:Linumperenne1.jpg", "artist": "No machine-readable author provided. Hagen Graebner assumed (based on copyright ", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Linumperenne1.jpg/500px-Linumperenne1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "bleuet-vivace": {"page": "https://commons.wikimedia.org/wiki/File:Centaurea_montana.jpg", "artist": "User:Stemonitis", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Centaurea_montana.jpg/500px-Centaurea_montana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "renouee-amplexicaule": {"page": "https://commons.wikimedia.org/wiki/File:(MHNT)_Persicaria_amplexicaulis_Blackfield_-_Les_Martels,_Giroussens_Tarn.jpg", "artist": "Didier Descouens", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/%28MHNT%29_Persicaria_amplexicaulis_Blackfield_-_Les_Martels%2C_Giroussens_Tarn.jpg/500px-%28MHNT%29_Persicaria_amplexicaulis_Blackfield_-_Les_Martels%2C_Giroussens_Tarn.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "sanguisorbe": {"page": "https://commons.wikimedia.org/wiki/File:Sanguisorba_officinalis_RF.jpg", "artist": "Robert Flogaus-Faust", "license": "CC BY 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Sanguisorba_officinalis_RF.jpg/500px-Sanguisorba_officinalis_RF.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "germandree-petit-chene": {"page": "https://commons.wikimedia.org/wiki/File:Gamander_Passau.JPG", "artist": "Konrad Lackerbeck", "license": "CC0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Gamander_Passau.JPG/500px-Gamander_Passau.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "onagre-rose": {"page": "https://commons.wikimedia.org/wiki/File:Showy_Primrose.JPG", "artist": "ZooFari", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Showy_Primrose.JPG/500px-Showy_Primrose.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "heliantheme": {"page": "https://commons.wikimedia.org/wiki/File:Sonnenr%C3%B6schen.jpg", "artist": "Tigerente", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Sonnenr%C3%B6schen.jpg/500px-Sonnenr%C3%B6schen.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "ceraiste": {"page": "https://commons.wikimedia.org/wiki/File:Cerastium_tomentosum.jpg", "artist": "No machine-readable author provided. Heron2 assumed (based on copyright claims).", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Cerastium_tomentosum.jpg/500px-Cerastium_tomentosum.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "orpin-batard": {"page": "https://commons.wikimedia.org/wiki/File:Phedimus_spurius_IMG_7179.JPG", "artist": "Bjoertvedt", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Phedimus_spurius_IMG_7179.JPG/500px-Phedimus_spurius_IMG_7179.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "geranium-sanguin": {"page": "https://commons.wikimedia.org/wiki/File:2012-07-03_Bloody_Crane%27s-bill,_Hauxley,_Northumberland_1.jpg", "artist": "MPF", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/2012-07-03_Bloody_Crane%27s-bill%2C_Hauxley%2C_Northumberland_1.jpg/500px-2012-07-03_Bloody_Crane%27s-bill%2C_Hauxley%2C_Northumberland_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "iris-fetide": {"page": "https://commons.wikimedia.org/wiki/File:Iris_foetidissima_PaR.JPG", "artist": "Jymm", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Iris_foetidissima_PaR.JPG/500px-Iris_foetidissima_PaR.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "fragon": {"page": "https://commons.wikimedia.org/wiki/File:Ruscus_aculeatus13.jpg", "artist": "No machine-readable author provided. Vista~commonswiki assumed (based on copyrig", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Ruscus_aculeatus13.jpg/500px-Ruscus_aculeatus13.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "fougere-scolopendre": {"page": "https://commons.wikimedia.org/wiki/File:Asplenium_scolopendrium.jpg", "artist": "No machine-readable author provided. MPF assumed (based on copyright claims).", "license": "CC BY 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Asplenium_scolopendrium.jpg/500px-Asplenium_scolopendrium.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "polystic-a-soies": {"page": "https://commons.wikimedia.org/wiki/File:Polystichum_setiferum0.jpg", "artist": "Kurt Stüber [1]", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Polystichum_setiferum0.jpg/500px-Polystichum_setiferum0.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "ellebore-fetide": {"page": "https://commons.wikimedia.org/wiki/File:HelleborusFoetidus-plant.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/HelleborusFoetidus-plant.jpg/500px-HelleborusFoetidus-plant.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "bergenia": {"page": "https://commons.wikimedia.org/wiki/File:Bergenia_crassifolia_a1.jpg", "artist": "Jerzy Opioła", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Bergenia_crassifolia_a1.jpg/500px-Bergenia_crassifolia_a1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "pulmonaire": {"page": "https://commons.wikimedia.org/wiki/File:Pulmonaria_officinalis_800.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Pulmonaria_officinalis_800.jpg/500px-Pulmonaria_officinalis_800.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "liriope": {"page": "https://commons.wikimedia.org/wiki/File:Liriope_muscari_4.JPG", "artist": "Qwert1234", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Liriope_muscari_4.JPG/500px-Liriope_muscari_4.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "lierre": {"page": "https://commons.wikimedia.org/wiki/File:Hedera_helix_Dover.jpg", "artist": "kallerna", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Hedera_helix_Dover.jpg/500px-Hedera_helix_Dover.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "luzule-des-bois": {"page": "https://commons.wikimedia.org/wiki/File:Luzula_sylvatica_in_natural_setting.JPG", "artist": "Cwmhiraeth", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Luzula_sylvatica_in_natural_setting.JPG/500px-Luzula_sylvatica_in_natural_setting.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "anemone-des-bois": {"page": "https://commons.wikimedia.org/wiki/File:Anemone_nemorosa_001.JPG", "artist": "Lilly M", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Anemone_nemorosa_001.JPG/500px-Anemone_nemorosa_001.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "perce-neige": {"page": "https://commons.wikimedia.org/wiki/File:Galanthus_nivalis.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Galanthus_nivalis.jpg/500px-Galanthus_nivalis.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "cyclamen-de-cos": {"page": "https://commons.wikimedia.org/wiki/File:Cyclamen_(8457919409).jpg", "artist": "Ian Kirk from Broadstone, Dorset, UK", "license": "CC BY 2.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Cyclamen_%288457919409%29.jpg/500px-Cyclamen_%288457919409%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "panic-erige": {"page": "https://commons.wikimedia.org/wiki/File:Panicum_virgatum_JdP.jpg", "artist": "Jebulon", "license": "CC0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Panicum_virgatum_JdP.jpg/500px-Panicum_virgatum_JdP.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "herbe-aux-ecouvillons-d-orient": {"page": "https://commons.wikimedia.org/wiki/File:Pennisetum_orientale_II.jpg", "artist": "Erhan yelekci", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Pennisetum_orientale_II.jpg/500px-Pennisetum_orientale_II.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "grand-stipa": {"page": "https://commons.wikimedia.org/wiki/File:Stipa_gigantea_3.JPG", "artist": "Xemenendura", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Stipa_gigantea_3.JPG/500px-Stipa_gigantea_3.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "calamagrostide-argentee": {"page": "https://commons.wikimedia.org/wiki/File:Achnatherum_calamagrostis_-_Berlin_Botanical_Garden_-_IMG_8584.JPG", "artist": "Daderot", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Achnatherum_calamagrostis_-_Berlin_Botanical_Garden_-_IMG_8584.JPG/500px-Achnatherum_calamagrostis_-_Berlin_Botanical_Garden_-_IMG_8584.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "miscanthus-gracillimus": {"page": "https://commons.wikimedia.org/wiki/File:Japanese_pampas_grass_%E3%82%B9%E3%82%B9%E3%82%AD%E3%81%AE%E7%A9%82%E6%B3%A2PB080105.jpg", "artist": "松岡明芳", "license": "CC BY 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Japanese_pampas_grass_%E3%82%B9%E3%82%B9%E3%82%AD%E3%81%AE%E7%A9%82%E6%B3%A2PB080105.jpg/500px-Japanese_pampas_grass_%E3%82%B9%E3%82%B9%E3%82%AD%E3%81%AE%E7%A9%82%E6%B3%A2PB080105.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "avoine-bleue": {"page": "https://commons.wikimedia.org/wiki/File:Helictotrichon-sempervirens-habit.JPG", "artist": "Sten Porse", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Helictotrichon-sempervirens-habit.JPG/500px-Helictotrichon-sempervirens-habit.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "seslerie-d-automne": {"page": "https://commons.wikimedia.org/wiki/File:Sesleria_autumnalis_kz1.jpg", "artist": "Krzysztof Ziarnek, Kenraiz", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Sesleria_autumnalis_kz1.jpg/500px-Sesleria_autumnalis_kz1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "brize": {"page": "https://commons.wikimedia.org/wiki/File:Briza_media_kz03.jpg", "artist": "Krzysztof Ziarnek, Kenraiz", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Briza_media_kz03.jpg/500px-Briza_media_kz03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "herbe-aux-moustiques": {"page": "https://commons.wikimedia.org/wiki/File:Blue_grama,_Arizona-Sonora_Desert_Museum,_Tucson,_Arizona_(c0329a67-34b2-4240-8ff1-5969fe1db23d).jpg", "artist": "Alice Wondrak-Biel", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Blue_grama%2C_Arizona-Sonora_Desert_Museum%2C_Tucson%2C_Arizona_%28c0329a67-34b2-4240-8ff1-5969fe1db23d%29.jpg/500px-Blue_grama%2C_Arizona-Sonora_Desert_Museum%2C_Tucson%2C_Arizona_%28c0329a67-34b2-4240-8ff1-5969fe1db23d%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "tulipe-botanique": {"page": "https://commons.wikimedia.org/wiki/File:Tulip_Tulipa_clusiana_%27Lady_Jane%27_Rock_Ledge_Flower_2000px.jpg", "artist": "Photo by and (c)2007 Derek Ramsey (Ram-Man).  Location credit to the Chanticleer", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Tulip_Tulipa_clusiana_%27Lady_Jane%27_Rock_Ledge_Flower_2000px.jpg/500px-Tulip_Tulipa_clusiana_%27Lady_Jane%27_Rock_Ledge_Flower_2000px.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "ail-a-tete-ronde": {"page": "https://commons.wikimedia.org/wiki/File:Alcal%C3%A1_de_Henares_(RPS_01-06-2024)_Allium_sphaerocephalon.png", "artist": "Raimundo Pastor", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Alcal%C3%A1_de_Henares_%28RPS_01-06-2024%29_Allium_sphaerocephalon.png/500px-Alcal%C3%A1_de_Henares_%28RPS_01-06-2024%29_Allium_sphaerocephalon.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "ail-de-christoph": {"page": "https://commons.wikimedia.org/wiki/File:R10_kamera033be.jpg", "artist": "Vulkano Uwe Horst Friese , Bremerhaven", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/R10_kamera033be.jpg/500px-R10_kamera033be.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "crocus-de-tommasini": {"page": "https://commons.wikimedia.org/wiki/File:Crocus_tommasinianus_(Xytram).jpg", "artist": "Martyn M aka Martyx", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Crocus_tommasinianus_%28Xytram%29.jpg/500px-Crocus_tommasinianus_%28Xytram%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "sternbergie": {"page": "https://commons.wikimedia.org/wiki/File:Sternbergia_lutea_MILAN.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/4/49/Sternbergia_lutea_MILAN.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "ipheion": {"page": "https://commons.wikimedia.org/wiki/File:Ipheion_uniflorum1.jpg", "artist": "Kurt Stüber [1]", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Ipheion_uniflorum1.jpg/500px-Ipheion_uniflorum1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "narcisse-tete-a-tete": {"page": "https://commons.wikimedia.org/wiki/File:Narzissen_Fr%C3%BChling.JPG", "artist": "3268zauber", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Narzissen_Fr%C3%BChling.JPG/500px-Narzissen_Fr%C3%BChling.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "clematite-d-armand": {"page": "https://commons.wikimedia.org/wiki/File:Clematis_armandii01-4035~2015_03_22.JPG", "artist": "This picture is a work by Emmanuel Douzery.\n\nPlease credit this with: Picture : ", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Clematis_armandii01-4035~2015_03_22.JPG/500px-Clematis_armandii01-4035~2015_03_22.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "clematite-d-hiver": {"page": "https://commons.wikimedia.org/wiki/File:Clematis_cirrhosa_Bl%C3%BCte.JPG", "artist": "Dericks-Tan", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Clematis_cirrhosa_Bl%C3%BCte.JPG/500px-Clematis_cirrhosa_Bl%C3%BCte.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "glycine": {"page": "https://commons.wikimedia.org/wiki/File:Chinesischer_Blauregen_Detail_Bl%C3%BCtentraube.JPG", "artist": "3268zauber", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Chinesischer_Blauregen_Detail_Bl%C3%BCtentraube.JPG/500px-Chinesischer_Blauregen_Detail_Bl%C3%BCtentraube.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "vigne-vierge": {"page": "https://commons.wikimedia.org/wiki/File:Poertschach_Hauptstrasse_Parthenocissus_tricuspidata_Blattwerk_04062015_4423.jpg", "artist": "Johann Jaritz", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Poertschach_Hauptstrasse_Parthenocissus_tricuspidata_Blattwerk_04062015_4423.jpg/500px-Poertschach_Hauptstrasse_Parthenocissus_tricuspidata_Blattwerk_04062015_4423.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "passiflore-bleue": {"page": "https://commons.wikimedia.org/wiki/File:Passiflora_caerulea_(2019-06-24)_frontal-view.jpg", "artist": "Franz van Duns", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Passiflora_caerulea_%282019-06-24%29_frontal-view.jpg/500px-Passiflora_caerulea_%282019-06-24%29_frontal-view.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "morelle-faux-jasmin": {"page": "https://commons.wikimedia.org/wiki/File:Solanum_2.JPG", "artist": "RoyFocker", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Solanum_2.JPG/500px-Solanum_2.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "akebia": {"page": "https://commons.wikimedia.org/wiki/File:Akebia_quinata02.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Akebia_quinata02.jpg/500px-Akebia_quinata02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "pois-vivace": {"page": "https://commons.wikimedia.org/wiki/File:Lathyrus_latifolius_flowers.jpg", "artist": "Arx Fortis at English Wikipedia", "license": "CC BY-SA 3.0", "remote": "https://upload.wikimedia.org/wikipedia/commons/9/90/Lathyrus_latifolius_flowers.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"}, "vigne": {"page": "https://commons.wikimedia.org/wiki/File:Cabernet_Sauvignon_Gaillac.jpg", "artist": "", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Cabernet_Sauvignon_Gaillac.jpg/500px-Cabernet_Sauvignon_Gaillac.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "thym-commun": {"page": "https://commons.wikimedia.org/wiki/File:Thymus_vulgaris1.JPG", "artist": "Henry Brisse (upload by user:Abalg)", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Thymus_vulgaris1.JPG/500px-Thymus_vulgaris1.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "hysope": {"page": "https://commons.wikimedia.org/wiki/File:Hyssopus-officinalis-flowers.jpg", "artist": "Sten Porse", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Hyssopus-officinalis-flowers.jpg/500px-Hyssopus-officinalis-flowers.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "sarriette-des-montagnes": {"page": "https://commons.wikimedia.org/wiki/File:Satureja_montana2.jpg", "artist": "Kurt Stüber [1]", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Satureja_montana2.jpg/500px-Satureja_montana2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "hortensia-grimpant": {"page": "https://commons.wikimedia.org/wiki/File:Hydrangea_petiolaris.jpg", "artist": "Sten at da.wikipedia", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Hydrangea_petiolaris.jpg/500px-Hydrangea_petiolaris.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "ciste-blanc": {"page": "https://commons.wikimedia.org/wiki/File:Cistus_April_2008-1.jpg", "artist": "Alvesgaspar", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Cistus_April_2008-1.jpg/500px-Cistus_April_2008-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "deutzia": {"page": "https://commons.wikimedia.org/wiki/File:Deutzia_scabra_Japan.jpg", "artist": "Mason Brock (Masebrock)", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Deutzia_scabra_Japan.jpg/500px-Deutzia_scabra_Japan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "erable-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Acer_palmatum0.jpg", "artist": "Kurt Stüber [1]", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Acer_palmatum0.jpg/500px-Acer_palmatum0.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "cornouiller-de-kousa": {"page": "https://commons.wikimedia.org/wiki/File:Longwood_2011_09_02_0241_(6160777858).jpg", "artist": "Harvey Barrison from Massapequa, NY, USA", "license": "CC BY-SA 2.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Longwood_2011_09_02_0241_%286160777858%29.jpg/500px-Longwood_2011_09_02_0241_%286160777858%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "magnolia-etoile": {"page": "https://commons.wikimedia.org/wiki/File:Magnolia_stellata_fleurs.jpg", "artist": "Myrabella", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Magnolia_stellata_fleurs.jpg/500px-Magnolia_stellata_fleurs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "sorbier-des-oiseleurs": {"page": "https://commons.wikimedia.org/wiki/File:Sorbus-aucuparia.JPG", "artist": "Giallopolenta", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Sorbus-aucuparia.JPG/500px-Sorbus-aucuparia.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "erable-a-ecorce-de-papier": {"page": "https://commons.wikimedia.org/wiki/File:Acer_griseum_Morton_836-58-7.jpg", "artist": "Bruce Marlin", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Acer_griseum_Morton_836-58-7.jpg/500px-Acer_griseum_Morton_836-58-7.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "hortensia-a-feuilles-de-chene": {"page": "https://commons.wikimedia.org/wiki/File:Hydrangea_quercifolia_BhamBotGdn.jpg", "artist": "Eric in SF", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Hydrangea_quercifolia_BhamBotGdn.jpg/500px-Hydrangea_quercifolia_BhamBotGdn.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "salicaire": {"page": "https://commons.wikimedia.org/wiki/File:Lythrum_salicaria_-_harilik_kukesaba.jpg", "artist": "Ivar Leidus", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Lythrum_salicaria_-_harilik_kukesaba.jpg/500px-Lythrum_salicaria_-_harilik_kukesaba.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "eupatoire-chanvrine": {"page": "https://commons.wikimedia.org/wiki/File:Eupatorium_cannabinum.jpg", "artist": "Burkhard Mücke", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Eupatorium_cannabinum.jpg/500px-Eupatorium_cannabinum.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "reine-des-pres": {"page": "https://commons.wikimedia.org/wiki/File:Filipendula-ulmaria.JPG", "artist": "Sten Porse", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Filipendula-ulmaria.JPG/500px-Filipendula-ulmaria.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "iris-des-marais": {"page": "https://commons.wikimedia.org/wiki/File:Iris_pseudacorus_001.jpg", "artist": "Jean-Jacques MILAN", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Iris_pseudacorus_001.jpg/500px-Iris_pseudacorus_001.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "cornouiller-blanc-sibirica": {"page": "https://commons.wikimedia.org/wiki/File:Cornus_alba_a2.jpg", "artist": "Opioła Jerzy (Poland)", "license": "CC BY 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Cornus_alba_a2.jpg/500px-Cornus_alba_a2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "ligulaire-dentee": {"page": "https://commons.wikimedia.org/wiki/File:Ligularia_dentata_1.jpg", "artist": "Pieter Pelser", "license": "CC BY 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Ligularia_dentata_1.jpg/500px-Ligularia_dentata_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "mahonia": {"page": "https://commons.wikimedia.org/wiki/File:Bessen_van_een_Mahonia_aquifolium._17-08-2025._(actm.)_01.jpg", "artist": "Agnes Monkelbaan", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Bessen_van_een_Mahonia_aquifolium._17-08-2025._%28actm.%29_01.jpg/500px-Bessen_van_een_Mahonia_aquifolium._17-08-2025._%28actm.%29_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "aucuba-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Bessen_van_Aucuba_japonica._Locatie,_Tuinreservaat_Jonker_vallei_03.jpg", "artist": "Dominicus Johannes Bergsma", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Bessen_van_Aucuba_japonica._Locatie%2C_Tuinreservaat_Jonker_vallei_03.jpg/500px-Bessen_van_Aucuba_japonica._Locatie%2C_Tuinreservaat_Jonker_vallei_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "fusain-rampant": {"page": "https://commons.wikimedia.org/wiki/File:Euonymus_fortunei_002.jpg", "artist": "The Cosmonaut", "license": "CC BY-SA 2.5 ca", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Euonymus_fortunei_002.jpg/500px-Euonymus_fortunei_002.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "laurier-d-alexandrie": {"page": "https://commons.wikimedia.org/wiki/File:Danae_racemosa_kz1.jpg", "artist": "Krzysztof Ziarnek, Kenraiz", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Danae_racemosa_kz1.jpg/500px-Danae_racemosa_kz1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "aralia-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Fatsia_japonica.003_-_Zapateira.jpg", "artist": "Fernando Losada Rodríguez", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Fatsia_japonica.003_-_Zapateira.jpg/500px-Fatsia_japonica.003_-_Zapateira.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "chevrefeuille-a-cupule": {"page": "https://commons.wikimedia.org/wiki/File:Lonicera_pileata_flowers_001.JPG", "artist": "User:SB_Johnny", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Lonicera_pileata_flowers_001.JPG/500px-Lonicera_pileata_flowers_001.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "geranium-noueux": {"page": "https://commons.wikimedia.org/wiki/File:Geranium_nodosum_03.JPG", "artist": "Dominicus Johannes Bergsma", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Geranium_nodosum_03.JPG/500px-Geranium_nodosum_03.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "pachysandra": {"page": "https://commons.wikimedia.org/wiki/File:Pachysandra_terminalis0.jpg", "artist": "Kurt Stüber [1]", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Pachysandra_terminalis0.jpg/500px-Pachysandra_terminalis0.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "consoude-a-grandes-fleurs": {"page": "https://commons.wikimedia.org/wiki/File:Symphytum-grandiflorum-uncertain-0874.JPG", "artist": "own work", "license": "CC BY-SA 2.5", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Symphytum-grandiflorum-uncertain-0874.JPG/500px-Symphytum-grandiflorum-uncertain-0874.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "euphorbe-des-bois": {"page": "https://commons.wikimedia.org/wiki/File:Bloeiende_Euphorbia_amygdaloides_var._Robbiae._31-03-2021._(d.j.b).jpg", "artist": "Dominicus Johannes Bergsma", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Bloeiende_Euphorbia_amygdaloides_var._Robbiae._31-03-2021._%28d.j.b%29.jpg/500px-Bloeiende_Euphorbia_amygdaloides_var._Robbiae._31-03-2021._%28d.j.b%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "forsythia": {"page": "https://commons.wikimedia.org/wiki/File:Forsythia_flower_Close-ups-20230405-RM-104141.jpg", "artist": "Ermell", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Forsythia_flower_Close-ups-20230405-RM-104141.jpg/500px-Forsythia_flower_Close-ups-20230405-RM-104141.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "camelia-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Camellia_japonica_NBG.jpg", "artist": "PumpkinSky", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Camellia_japonica_NBG.jpg/500px-Camellia_japonica_NBG.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "skimmia-du-japon": {"page": "https://commons.wikimedia.org/wiki/File:Skimmia_japonica_d.j.b_02.jpg", "artist": "Dominicus Johannes Bergsma", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Skimmia_japonica_d.j.b_02.jpg/500px-Skimmia_japonica_d.j.b_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "bambou-sacre": {"page": "https://commons.wikimedia.org/wiki/File:Nandina_domestica_PfP.jpg", "artist": "Jebulon", "license": "Public domain", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Nandina_domestica_PfP.jpg/500px-Nandina_domestica_PfP.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "potentille-arbustive": {"page": "https://commons.wikimedia.org/wiki/File:Dasiphora_fruticosa_5698.jpg", "artist": "Walter Siegmund (talk)", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Dasiphora_fruticosa_5698.jpg/500px-Dasiphora_fruticosa_5698.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "pivoine-herbacee": {"page": "https://commons.wikimedia.org/wiki/File:Paeonia_lactiflora_%27Jacques_Doriat%27_(Pivoine_de_Chine)_-_113.jpg", "artist": "Another one of my pictures:[[File:|150x150px]]\n\n\n\nThis photograph was taken by Medium69 (William Crochot) and released under the license stated below. You are free to use it for any purpose as long as you credit the author (William Crochot), the Source (Wikimedia Commons) and the license (CC-BY-SA 4.0) in close relation to the image.\n\n\n\n\n\nPlease do not upload an updated image here without consultation with the Author. The author would like to make corrections only at his own source RAW. This ensures that the changes are preserved.Please if you think that any changes should be required, please inform the author.Otherwise you can upload a new image with a new name. Please use one of the templates derivative or extract.", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Paeonia_lactiflora_%27Jacques_Doriat%27_%28Pivoine_de_Chine%29_-_113.jpg/500px-Paeonia_lactiflora_%27Jacques_Doriat%27_%28Pivoine_de_Chine%29_-_113.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "phlox-panicule": {"page": "https://commons.wikimedia.org/wiki/File:Phlox_paniculata_%27Fujiyama%27_(d.j.b.)_01.jpg", "artist": "Dominicus Johannes Bergsma", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Phlox_paniculata_%27Fujiyama%27_%28d.j.b.%29_01.jpg/500px-Phlox_paniculata_%27Fujiyama%27_%28d.j.b.%29_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "campanule-des-murailles": {"page": "https://commons.wikimedia.org/wiki/File:Dalmatiner_Polster-Glockenblume_(Campanula_portenschlagiana)_Bl%C3%BCte_Focus_stack-20220528-RM-174230.jpg", "artist": "Ermell", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Dalmatiner_Polster-Glockenblume_%28Campanula_portenschlagiana%29_Bl%C3%BCte_Focus_stack-20220528-RM-174230.jpg/500px-Dalmatiner_Polster-Glockenblume_%28Campanula_portenschlagiana%29_Bl%C3%BCte_Focus_stack-20220528-RM-174230.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "corbeille-d-argent": {"page": "https://commons.wikimedia.org/wiki/File:Iberis_sempervirens.JPG", "artist": "No machine-readable author provided. Heron2 assumed (based on copyright claims).", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Iberis_sempervirens.JPG/500px-Iberis_sempervirens.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "oeillet-mignardise": {"page": "https://commons.wikimedia.org/wiki/File:Dianthus_plumarius_%27Marieberg%27,_Visby_Botanical_Gardens,_2022.jpg", "artist": "Lokal_Profil", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Dianthus_plumarius_%27Marieberg%27%2C_Visby_Botanical_Gardens%2C_2022.jpg/500px-Dianthus_plumarius_%27Marieberg%27%2C_Visby_Botanical_Gardens%2C_2022.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "cerisier-du-japon-kanzan": {"page": "https://commons.wikimedia.org/wiki/File:Cerisier_du_Japon_Prunus_serrulata.jpg", "artist": "Myrabella", "license": "CC BY-SA 3.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Cerisier_du_Japon_Prunus_serrulata.jpg/500px-Cerisier_du_Japon_Prunus_serrulata.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}, "jasmin-d-hiver": {"page": "https://commons.wikimedia.org/wiki/File:Jasminum_nudiflorum_kz03.jpg", "artist": "Krzysztof Ziarnek, Kenraiz", "license": "CC BY-SA 4.0", "remote": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Jasminum_nudiflorum_kz03.jpg/500px-Jasminum_nudiflorum_kz03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"}};
function slugify(t){
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/œ/g,"oe").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}
const photoOf = p => { const e = PHOTOS[slugify(p.nom)]; return e ? {src: e.remote || `/photos/${slugify(p.nom)}.jpg`, ...e} : null; };
// Si une photo ne charge pas (hors ligne, page intégrée qui bloque les images externes), on revient au dessin.
function photoFail(img){
  const fig = img.closest("figure"); if(!fig) return;
  const link = fig.nextElementSibling;
  const grid = fig.closest(".bgrid");
  fig.remove();
  if(grid && !grid.children.length) grid.closest(".board").remove();
  if(link && link.classList.contains("pvlink")){ link.hidden = false; requestAnimationFrame(drawPreviews); }
}
function creditHTML(ph){
  return ph.artist ? `Photo : ${ph.artist.replace(/</g,"&lt;")} · ${ph.license||"licence libre"} · <a href="${ph.page}" target="_blank" rel="noopener">Wikimedia Commons</a>`
    : `Photo libre de droits · <a href="${ph.page}" target="_blank" rel="noopener">auteur et licence sur Wikimedia Commons</a>`;
}
function boardHTML(){
  const withPh = combo.filter(c=>photoOf(c.plant));
  if(!withPh.length) return "";
  const order = ["arbre","ecran","grimpante","back","mid","front","bulb"];
  const sorted = [...withPh].sort((a,b)=>order.indexOf(lay(a))-order.indexOf(lay(b)));
  return `<section class="board"><h2>La combinaison en photos</h2>
    <div class="bgrid">${sorted.map(c=>{ const ph=photoOf(c.plant); return `<figure><img src="${ph.src}" alt="${c.plant.nom}" loading="lazy" width="480" height="360" referrerpolicy="no-referrer" onerror="photoFail(this)"><figcaption><b>${c.plant.nom}</b><span>${ROLE_LABEL[c.role]}${c.layer&&c.layer!=="bulb"&&!["ecran","arbre","grimpante"].includes(c.role)?" · "+layerName(c.layer).replace(/^un(e)? /,""):""}</span></figcaption></figure>`; }).join("")}</div>
    <p class="note">Photos libres de droits issues de Wikimedia Commons ; les crédits figurent sur chaque fiche. Elles montrent la plante adulte en saison, pas forcément la variété exacte.</p></section>`;
}
// ---------- Rendu ----------
function calCells(p){
  const ms = months(p);
  return MOIS.map((l,i)=>{
    const on = ms.includes(i+1);
    return `<span class="${on?"on":""}" style="${on?`background:${p.hex}`:""}" title="${MOIS_LONG[i]}">${l}</span>`;
  }).join("");
}
function card(c, idx){
  const p=c.plant;
  const fl = p.bloom ? `${MOIS_LONG[p.bloom[0]-1]} → ${MOIS_LONG[p.bloom[1]-1]}` : "feuillage";
  const tags = [woody(p) && growth(p)==="rapide" ? "Pousse rapide" : "", WATER_LBL[water(p)], evergreen(p)?"Persistant":"", melli(p)?"Mellifère":""].filter(Boolean).map(t=>`<span>${t}</span>`).join("");
  return `<article class="card ${c.locked?"locked":""}">
    ${photoOf(p) ? `<figure class="cph"><img src="${photoOf(p).src}" alt="${p.nom}" loading="lazy" width="480" height="360" referrerpolicy="no-referrer" onerror="photoFail(this)"><figcaption>${creditHTML(photoOf(p))}</figcaption></figure>` : ""}<a class="pvlink" href="${photoUrl(p)}" target="_blank" rel="noopener" aria-label="Voir des photos de ${p.nom} sur Google Images" ${photoOf(p)?"hidden":""}><canvas class="pv" data-pv="${idx}" role="img" aria-label="Illustration : ${p.nom}"></canvas><span>Voir en photo ↗</span></a>
    <div class="top"><span class="dot" style="background:${p.hex}"></span>
      <div class="name"><div class="role">${ROLE_LABEL[c.role]}</div><h3>${p.nom}</h3><i>${p.latin}</i></div></div>
    <div class="meta"><span>↕ ${p.h>=100?(p.h/100).toLocaleString("fr-FR")+" m":p.h+" cm"}</span><span>❄ ${p.rust} °C</span><span>${density(p,c.role)}</span><span>${woody(p)?`Croissance ${growth(p)} · adulte en ~${yearsTo(p,p.h)} ans`:p.type==="bulbe"?"Fleurit dès le 1er printemps":"Adulte en 2 ans"}</span>${tags}</div>
    <div class="cal" aria-label="Floraison : ${fl}">${calCells(p)}</div>
    <p class="note">${p.note}</p>
    <div class="cardact">
      <button class="small" type="button" data-lock="${idx}" aria-pressed="${c.locked}">${c.locked?"Verrouillée":"Verrouiller"}</button>
      <button class="small" type="button" data-rep="${idx}">Remplacer</button>
      <a class="photo" href="${photoUrl(p)}" target="_blank" rel="noopener">Photos ↗</a>
      <a class="photo" href="${shopUrl(p)}" target="_blank" rel="noopener">Où l'acheter ↗</a>
    </div>
  </article>`;
}

function lay(c){
  if(["grimpante","ecran","arbre"].includes(c.role)) return c.role;
  if(c.layer) return c.layer;
  if(c.role==="bulbe") return "bulb";
  return c.plant.h>=90 ? "back" : c.plant.h>=35 ? "mid" : "front";
}
function renderCurrent(){ render(PLANTS.filter(compatible).length,0); }
function render(nCompat, missing){
  document.getElementById("fs-haut").hidden = !goals().hedge;
  document.getElementById("style-hint").textContent = STYLES[state.style].hint;
  document.getElementById("style-ph").innerHTML = styleFigure(state.style);
  const RL = rowLayers(), G0 = goals();
  const parts = [G0.hedge?"la haie":null, G0.wall?"une grimpante sur le support":null, ...RL.map(layerName)].filter(Boolean);
  document.getElementById("prof-hint").textContent = `Mesure la terre plantable, du fond jusqu'à l'allée ou la pelouse. Ici : ${parts.join(" + ")||"aucune rangée"}.`
    + (G0.hedge && G0.massif && RL.length===0 ? " Il faut au moins 1,5 m pour ajouter une rangée de vivaces devant la haie." : "");
  document.getElementById("count").innerHTML = `<b>${nCompat}</b> plantes compatibles sur ${PLANTS.length}`;
  document.getElementById("clim-hint").textContent = CLIM[state.clim].hint;
  const out = document.getElementById("out");
  if(!combo.length){
    lastBudget = null; storeZone();
    out.innerHTML = `<div class="summary"><p class="warn">Aucune plante ne correspond à ces conditions. Élargis les types de plantes, la palette de couleurs ou le niveau d'arrosage.</p></div>`;
    return;
  }
  const allM = new Set(combo.flatMap(c=>months(c.plant)));
  const hs = combo.map(c=>c.plant.h);
  const ordered = [...allM].sort((a,b)=>a-b);
  const layers = [
    ["Arbre","à placer dans l'axe de la vue à masquer",c=>c.role==="arbre"],
    ["Support","mur, treillage, pergola",c=>c.role==="grimpante"],
    ["Écran",`haie persistante, ${state.haut} m et plus`,c=>c.role==="ecran"],
    ["Fond du massif","arbustes et grandes graminées",c=>lay(c)==="back"],
    ["Rangée de vivaces","le cœur du massif",c=>lay(c)==="mid"],
    ["Bordure","côté allée ou pelouse",c=>lay(c)==="front"],
    ["Bulbes","plantés entre les vivaces, sans place en plus",c=>lay(c)==="bulb"]
  ];
  const planPart = planHTML();
  let html = `<div class="summary">
    <div class="stat"><small>Plantes</small><strong>${combo.length} espèces</strong></div>
    <div class="stat"><small>Couches</small><strong>${(goals().hedge?1:0)+rowLayers().length} sur ${(+state.prof/100).toLocaleString("fr-FR")} m</strong></div>
    <div class="stat"><small>Arrosage une fois installé</small><strong>${({1:"Aucun",2:"Occasionnel",3:"Régulier"})[Math.max(...combo.map(c=>water(c.plant)))]}</strong></div>
    <div class="stat"><small>Fleuri</small><strong>${allM.size} mois sur 12</strong></div>
    <div class="stat"><small>Hauteurs</small><strong>${Math.min(...hs)} cm à ${(Math.max(...hs)/100).toLocaleString("fr-FR")} m</strong></div>
    <div class="stat"><small>Budget estimé</small><strong>${eur0(lastBudget.min)} – ${eur0(lastBudget.max)}</strong></div>
    ${state.style!=="libre" ? `<div class="stat"><small>Style ${STYLES[state.style].label.toLowerCase()}</small><strong>${combo.filter(c=>inStyle(c.plant)).length} plantes sur ${combo.length}</strong></div>` : ""}
    ${missing?`<p class="warn">${missing} emplacement${missing>1?"s":""} sans plante adaptée. Élargis les critères pour compléter.</p>`:""}
  </div>`;
  html += boardHTML();
  html += planPart;
  for(const [t,sub,f] of layers){
    const items = combo.map((c,i)=>[c,i]).filter(([c])=>f(c));
    if(!items.length) continue;
    html += `<section class="layer"><h2>${t} <em>${sub}</em></h2><div class="cards">${items.map(([c,i])=>card(c,i)).join("")}</div></section>`;
  }
  const now = new Date().getMonth();
  html += `<section class="calendar"><h2>Calendrier de floraison</h2><div class="cg">
    <span></span>${MOIS.map((m,i)=>`<span class="m">${m}</span>`).join("")}
    ${[...combo].sort((a,b)=>(a.plant.bloom?a.plant.bloom[0]:13)-(b.plant.bloom?b.plant.bloom[0]:13)).map(c=>{
      const ms=months(c.plant);
      return `<span class="lab" title="${c.plant.nom}">${c.plant.nom}</span>`+MOIS.map((_,i)=>`<span class="c ${i===now?"now":""}" style="${ms.includes(i+1)?`background:${c.plant.hex}`:""}"></span>`).join("");
    }).join("")}
  </div></section>`;
  out.innerHTML = html;
  requestAnimationFrame(drawAll);
  storeZone();
}

document.getElementById("out").addEventListener("click",e=>{
  const a = e.target.closest("[data-age]");
  if(a){ state.age = a.dataset.age; const y=window.scrollY; renderCurrent(); window.scrollTo(0,y); return; }
  const l = e.target.closest("[data-lock]");
  if(l){ const i=+l.dataset.lock; combo[i].locked=!combo[i].locked; render(PLANTS.filter(compatible).length,0); return; }
  const r = e.target.closest("[data-rep]");
  if(r) replace(+r.dataset.rep);
});
document.getElementById("gen").addEventListener("click",()=>generate(true));

// ---------- Combinaisons gardées (navigateur local) ----------
const KEY="app-massifs-saved-v1";
function loadSaved(){ try{ return JSON.parse(localStorage.getItem(KEY))||[]; }catch(e){ return []; } }
function storeSaved(list){ try{ localStorage.setItem(KEY, JSON.stringify(list)); }catch(e){} }
function lbl(key,v){ return (OPT[key].find(o=>o[0]===v)||[,""])[1]; }
function renderSaved(){
  const list = loadSaved(), ul=document.getElementById("saved");
  if(!list.length){ ul.innerHTML = `<li style="border:0;padding:0"><p class="empty">Garde une combinaison pour la retrouver ici.</p></li>`; return; }
  ul.innerHTML = list.map((s,i)=>`<li><span>${s.ids.length} plantes<small>${s.st.obj?[].concat(s.st.obj).map(o=>lbl("obj",o)).join(" + ")+" · ":""}${lbl("expo",s.st.expo)} · ${lbl("sol",s.st.sol)} · ${lbl("clim",s.st.clim)}</small></span>
    <span style="display:flex;gap:4px"><button class="small" type="button" data-open="${i}">Ouvrir</button><button class="small" type="button" data-del="${i}" aria-label="Retirer">×</button></span></li>`).join("");
}
document.getElementById("save").addEventListener("click",()=>{
  if(!combo.length) return;
  const list = loadSaved();
  list.unshift({st:JSON.parse(JSON.stringify(state)), ids:combo.map(c=>[c.plant.nom,c.role,c.layer||""])});
  storeSaved(list.slice(0,12)); renderSaved();
  const b=document.getElementById("save"); b.textContent="Gardée"; setTimeout(()=>b.textContent="Garder",1400);
});
document.getElementById("saved").addEventListener("click",e=>{
  const o=e.target.closest("[data-open]"), d=e.target.closest("[data-del]");
  const list=loadSaved();
  if(d){ list.splice(+d.dataset.del,1); storeSaved(list); renderSaved(); return; }
  if(o){
    const s=list[+o.dataset.open]; Object.assign(state, s.st);
    state.obj = [].concat(state.obj || "massif");
    state.haut = state.haut || "2"; state.hmax = state.hmax || "0"; state.dens = state.dens || "n"; state.fmt = state.fmt || "petit"; state.prof = state.prof || "150"; state.arro = state.arro || "1"; state.vite = state.vite || "rapide"; state.style = state.style || "libre";
    ["style","vite","arro","prof","haut","hmax","dens","fmt","expo","sol","eau","clim","pal","taille"].forEach(k=>chips(k,false)); chips("types",true); chips("obj",true);
    document.getElementById("obj-hint").textContent = objHint();
    setZone(null, false);
    combo = restore(s.ids);
    renderCurrent();
  }
});

// ---------- Mon jardin : zones préréglées ----------
const BASE_TYPES = ["arbuste","graminee","vivace","couvre-sol","bulbe","aromatique"];
let ZONES = [];
let ZKEY = "app-zones";
let zoneData = {};
let curZone = null;
function restore(ids){
  return ids.map(([k,r,l])=>{
    const p = typeof k==="number" ? PLANTS[k] : PLANTS.find(x=>x.nom===k);
    return p ? {plant:p, role:r, layer:l||undefined, locked:isExisting(p), existing:isExisting(p)} : null;
  }).filter(Boolean);
}
function storeZone(){
  if(!curZone) { renderZones(); return; }
  zoneData[curZone] = {st:JSON.parse(JSON.stringify(state)), ids:combo.map(c=>[c.plant.nom,c.role,c.layer||""]), budget:lastBudget};
  try{ localStorage.setItem(ZKEY, JSON.stringify(zoneData)); }catch(e){}
  renderZones();
}
function applyState(st){
  Object.assign(state, JSON.parse(JSON.stringify(st)));
  state.projet = st.projet || "jardin";
  state.fmt = state.fmt || "petit"; state.prof = state.prof || "150"; state.arro = state.arro || "1"; state.vite = state.vite || "rapide"; state.style = state.style || "libre";
  state.hmax = st.hmax || "0"; state.dens = st.dens || "n";
  ["style","vite","arro","prof","haut","hmax","dens","fmt","expo","sol","eau","clim","pal","taille"].forEach(k=>chips(k,false)); chips("types",true); chips("obj",true);
  document.getElementById("obj-hint").textContent = objHint();
}
function setZone(id, load=true){
  curZone = id;
  const z = ZONES.find(z=>z.id===id);
  renderZoneDetail(z);
  if(!load){ renderZones(); return; }
  if(!z){ renderZones(); return; }
  const saved = zoneData[id];
  const fmt = state.fmt;
  applyState(saved ? saved.st : z.st);
  state.fmt = fmt; chips("fmt",false);
  if(saved && saved.ids.length){ combo = restore(saved.ids); renderCurrent(); }
  else { combo = []; generate(false); }
  if(!window.__quiet){ try{ document.getElementById("zones-t").scrollIntoView({block:"nearest"}); }catch(e){} }
}
function zoneBudget(b){
  if(!b || !b.rows) return b;
  let min=0, max=0;
  b.rows.forEach(([nom,r,q])=>{ const p=PLANTS.find(x=>x.nom===nom); if(!p) return; const [a,c]=unitPrice(p,r); min+=a*q; max+=c*q; });
  return {min,max};
}
function renderZones(){
  const box = document.getElementById("zones");
  let tmin=0, tmax=0, n=0;
  box.innerHTML = ZONES.map(z=>{
    const b = zoneBudget(zoneData[z.id] && zoneData[z.id].budget);
    if(b){ tmin+=b.min; tmax+=b.max; n++; }
    return `<button class="zone" type="button" data-zone="${z.id}" aria-pressed="${curZone===z.id}">${z.label}<small>${b?`${eur0(b.min)} – ${eur0(b.max)}`:"pas encore composée"}</small></button>`;
  }).join("") + `<button class="zone" type="button" data-zone="" aria-pressed="${curZone===null}">Réglage libre<small>tous les critères</small></button>`;
  document.getElementById("gtotal").innerHTML = n ? `Budget du jardin (${n} zone${n>1?"s":""} sur ${ZONES.length}) : <b>${eur0(tmin)} – ${eur0(tmax)}</b>` : "Choisis une zone pour composer ton jardin";
}
document.getElementById("zones").addEventListener("click",e=>{
  const b = e.target.closest("[data-zone]"); if(!b) return;
  setZone(b.dataset.zone || null);
});

renderSaved();
