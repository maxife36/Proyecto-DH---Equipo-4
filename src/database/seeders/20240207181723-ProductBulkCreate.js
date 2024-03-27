"use strict";
const { DbProduct } = require("../controllers");
const updateSeedsVariables = require("../assets/updateSeedsVariables")
/* features: [{
  featureId: ["UUID"],
  specifications: -> Array de strings con epsecifaciones por cada featureId
}, (puede venir vacio, no se generara realicones de feature)
{},...{}]  -> Array de Objetos, c/obj tiene el feature con sus especificaciones,
imageTitles: ["pathImg", ...] -> Array de strings con el nombre y extension de la imagen,
categories: ["categoryId",...] -> Array de strings con categoryIds */

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { features, categories } = await updateSeedsVariables()
    
    const productos = [
      {
        productName: "Laptop Dell XPS 13",
        productBrand: "Dell",
        shortDescription: "Laptop ultradelgada con pantalla InfinityEdge",
        longDescription: "La laptop Dell XPS 13 es conocida por su diseño ultradelgado, potencia y calidad de construcción. La pantalla InfinityEdge ofrece una experiencia visual inmersiva.",
        productPrice: 1200,
        discount: 10,
        stock: 50,
        score: 92,
        features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["512 gb", "SSD"]
          },
          {
            featureId: features.Pantalla,
            specifications: ["15''", "1080p"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI", "USB 3.0", "USB 2.0"]
          },
        ],
        imageTitles: ["/LaptopDell.png", "/IntelCore.png"],
        categories: [categories.Laptops]
      },
      {
         productName: "Teclado mecánico Redragon K552",
         productBrand: "Redragon",
         shortDescription: "Teclado compacto con interruptores mecánicos",
         longDescription: "El teclado mecánico Redragon K552 es compacto y cuenta con interruptores mecánicos que ofrecen una experiencia de escritura táctil y precisa. Perfecto para gamers y escritores.",
         productPrice: 70,
         discount: null,
         stock: 100,
         score: 88,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Cableado"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Mecánico"]
          }
         ],
         imageTitles: ["/RedragonK552.png","/redragon-2.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Monitor Samsung Odyssey G7",
         productBrand: "Samsung",
         shortDescription: "Monitor curvo gaming QLED",
         longDescription: "El monitor Samsung Odyssey G7 ofrece una experiencia gaming inmersiva con su pantalla curva QLED. Con una alta tasa de actualización y resolución, es ideal para jugadores exigentes.",
         productPrice: 800,
         discount: 15,
         stock: 30,
         score: 95,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["32'","Curva","1000R"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDM", "USB"]
          }
         ],
         imageTitles: ["/SamsungOdysseyG7.png"],
         categories: [categories.Monitores]
       },
       {
         productName: "Disco duro externo WD My Passport",
         productBrand: "WD",
         shortDescription: "Almacenamiento portátil confiable",
         longDescription: "El disco duro externo WD My Passport ofrece almacenamiento portátil confiable. Con capacidades generosas y un diseño compacto, es perfecto para llevar tus datos a cualquier lugar.",
         productPrice: 100,
         discount: 5,
         stock: 80,
         score: 89,
         features:[
          {
            featureId: features.Almacenamiento,
            specifications: ["5TB"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB SuperSpeed", "USB 2.0"]
          }
         ],
         imageTitles: ["/WDMyPassport.png"],
         categories: [categories.Almacenamiento]
       },
       {
         productName: "Memoria RAM Corsair Vengeance LPX",
         productBrand: "Corsair",
         shortDescription: "Módulo de memoria DDR4 para rendimiento extremo",
         longDescription: "La memoria RAM Corsair Vengeance LPX está diseñada para ofrecer un rendimiento extremo en sistemas exigentes. Con capacidades y velocidades impresionantes, es ideal para entusiastas de la informática.",
         productPrice: 120,
         discount: null,
         stock: 60,
         score: 94,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["8GB"]
          },
         ],
         imageTitles: ["/CorsairLPX.png"],
         categories: [categories.MemoriaRAM]
       },
       {
         productName: "MacBook Air M2",
         productBrand: "Apple",
         shortDescription: "Laptop ligera con chip M2",
         longDescription: "La MacBook Air M2 presenta el último chip M2 de Apple, ofreciendo un rendimiento mejorado y una duración de la batería excepcional en un diseño ultraligero.",
         productPrice: 1500,
         discount: 8,
         stock: 40,
         score: 93,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["LED","13.6'","True Tone"]
          },
          {
            featureId: features.Almacenamiento,
            specifications: ["16GB", "SSD de 256"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB-C 30 W", "Puerto MagSafe 3"]
          },
          {
            featureId: features.Conectividad,
            specifications: ["Wi-Fi 6 ","Bluetooth 5.3"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["macOS"]
          }
         ],
         imageTitles: ["/MacBookAirM2.png", "/apple_carrucel.png"],
         categories: [categories.Laptops]
       },
       {
         productName: "Mouse Logitech G Pro X Superlight",
         productBrand: "Logitech",
         shortDescription: "Mouse inalámbrico ultraligero para gaming",
         longDescription: "El mouse Logitech G Pro X Superlight es conocido por su diseño ultraligero y su sensor de alta precisión. Ideal para jugadores que buscan rapidez y precisión en sus movimientos.",
         productPrice: 90,
         discount: 12,
         stock: 75,
         score: 91,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrica"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          }
         ],
         imageTitles: ["/LogitechSuperlight.png","/logitech.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Tarjeta gráfica NVIDIA GeForce RTX 3080",
         productBrand: "NVIDIA",
         shortDescription: "Potente tarjeta gráfica para gaming y diseño",
         longDescription: "La tarjeta gráfica NVIDIA GeForce RTX 3080 ofrece un rendimiento excepcional en juegos y aplicaciones de diseño. Con tecnología Ray Tracing, proporciona gráficos realistas y detallados.",
         productPrice: 1200,
         discount: null,
         stock: 25,
         score: 97,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["12GB" ,"GDDR6X"]
          }
         ],
         imageTitles: ["/NVIDIAGeForce.png","/nvidia-2.png"],
         categories: [categories.TarjetasGraficas]
       },
       {
         productName: "Monitor LG UltraGear 27GN950-B",
         productBrand: "LG",
         shortDescription: "Monitor gaming 4K Nano IPS",
         longDescription: "El monitor LG UltraGear 27GN950-B cuenta con una pantalla 4K Nano IPS para ofrecer imágenes nítidas y colores vibrantes. Con una alta tasa de refresco, es perfecto para gaming.",
         productPrice: 900,
         discount: 10,
         stock: 35,
         score: 96,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["27'"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI", "DisplayPort", "USB"]
          }
         ],
         imageTitles: ["/LGUltraGear.png", "/lg-4.png"],
         categories: [categories.Monitores]
       },
       {
         productName: "SSD Kingston A2000 NVMe PCIe",
         productBrand: "Kingston",
         shortDescription: "Unidad de estado sólido de alta velocidad",
         longDescription: "El SSD Kingston A2000 NVMe PCIe ofrece velocidades de lectura y escritura ultrarrápidas, mejorando significativamente el rendimiento del sistema. Perfecto para almacenamiento de alta velocidad.",
         productPrice: 80,
         discount: 5,
         stock: 50,
         score: 90,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["SSD", "500GB"]
          }
         ],
         imageTitles: ["/KingstonA2000.png"],
         categories: [categories.Procesadores, categories.Ofertas]
       },
       {
         productName: "Ryzen 9 5900X",
         productBrand: "AMD",
         shortDescription: "Procesador de alto rendimiento para gaming y multitarea",
         longDescription: "El procesador AMD Ryzen 9 5900X ofrece un rendimiento excepcional en juegos y aplicaciones multitarea. Con 12 núcleos y 24 hilos, es ideal para usuarios exigentes.",
         productPrice: 550,
         discount: 15,
         stock: 30,
         score: 94,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["DDR4"]
          }
         ],
         imageTitles: ["/AMDRyzen.png", "/amd.png"],
         categories: [categories.Procesadores, categories.Ofertas]
       },
       {
         productName: "Teclado Razer BlackWidow Elite",
         productBrand: "Razer",
         shortDescription: "Teclado mecánico gaming con teclas iluminadas",
         longDescription: "El teclado Razer BlackWidow Elite presenta interruptores mecánicos Razer, teclas programables y retroiluminación personalizable. Diseñado para jugadores que buscan precisión y estilo.",
         productPrice: 130,
         discount: null,
         stock: 60,
         score: 89,
         features: [
          {
            featureId: features.Puertos,
            specifications: ["USB 2.0"]
          },
          {
            featureId: features.Almacenamiento,
            specifications: ["Memoria híbrida"]
          }
         ],
         imageTitles: ["/RazerBlackWidow.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Samsung 970 EVO Plus SSD",
         productBrand: "Samsung",
         shortDescription: "Unidad de estado sólido NVMe con velocidades de lectura y escritura elevadas",
         longDescription: "El Samsung 970 EVO Plus SSD ofrece velocidades de transferencia de datos ultrarrápidas y una capacidad de almacenamiento generosa. Perfecto para mejorar el rendimiento del sistema.",
         productPrice: 150,
         discount: 8,
         stock: 40,
         score: 92,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["1 TB", "SSD"]
          }
         ],
         imageTitles: ["/SamsungEVOPlus.png"],
         categories: [categories.Procesadores]
       },
       {
         productName: "Gigabyte RTX 3070 Gaming OC",
         productBrand: "Gigabyte",
         shortDescription: "Tarjeta gráfica GeForce RTX 3070 para gaming",
         longDescription: "La tarjeta gráfica Gigabyte RTX 3070 Gaming OC proporciona un rendimiento gráfico excepcional en juegos y aplicaciones intensivas. Con iluminación RGB personalizable.",
         productPrice: 800,
         discount: 12,
         stock: 25,
         score: 96,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["GDDR6", "8 GB"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI 2.1", "DisplayPort 1.4a"]
          }
         ],
         imageTitles: ["/GigabyteRTX.png", "/gigabyte.png"],
         categories: [categories.TarjetasGraficas]
       },
       {
         productName: "HyperX Cloud II Gaming Headset",
         productBrand: "HyperX",
         shortDescription: "Auriculares gaming con sonido envolvente y micrófono desmontable",
         longDescription: "Los auriculares HyperX Cloud II ofrecen un sonido envolvente 7.1 virtual, comodidad excepcional y un micrófono desmontable con cancelación de ruido. Ideales para sesiones de juego prolongadas.",
         productPrice: 90,
         discount: 10,
         stock: 50,
         score: 88,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Cableado"]
          }
         ],
         imageTitles: ["/HyperXCloud.png","/hyperx.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Logitech MX Master 3",
         productBrand: "Logitech",
         shortDescription: "Ratón inalámbrico ergonómico para productividad",
         longDescription: "El ratón Logitech MX Master 3 ofrece ergonomía avanzada y funciones personalizables para mejorar la productividad. Con conectividad Bluetooth y USB-C para una versatilidad máxima.",
         productPrice: 100,
         discount: 10,
         stock: 45,
         score: 93,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrico"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB-A"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows 10", "Windows 11", "macOS 10.15", "otros"]
          }
         ],
         imageTitles: ["/LogitechMX.png", "/logitech.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming, categories.Ofertas]
       },
       {
         productName: "Asus ROG Strix B550-F Gaming",
         productBrand: "Asus",
         shortDescription: "Placa base gaming con soporte PCIe 4.0",
         longDescription: "La placa base Asus ROG Strix B550-F Gaming ofrece un rendimiento gaming excepcional con soporte para PCIe 4.0. Con iluminación RGB personalizable y características de alta gama.",
         productPrice: 180,
         discount: null,
         stock: 30,
         score: 94,
         features: [
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4", "128 GB"]
          }
         ],
         imageTitles: ["/AsusROGStrix.png", "/asus.png"],
         categories: [categories.Almacenamiento]
       },
       {
         productName: "Corsair Vengeance RGB Pro RAM",
         productBrand: "Corsair",
         shortDescription: "Módulo de memoria DDR4 con iluminación RGB",
         longDescription: "La memoria RAM Corsair Vengeance RGB Pro no solo ofrece un rendimiento excepcional, sino que también cuenta con iluminación RGB dinámica para personalizar el aspecto de tu sistema.",
         productPrice: 120,
         discount: 15,
         stock: 25,
         score: 91,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["Kit de 16GB"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Luces LED RGB"]
          }
         ],
         imageTitles: ["/logos-2020.png"],
         categories: [categories.MemoriaRAM]
       },
       {
         productName: "Sony WH-1000XM4 Auriculares",
         productBrand: "Sony",
         shortDescription: "Auriculares inalámbricos con cancelación de ruido",
         longDescription: "Los auriculares Sony WH-1000XM4 brindan una experiencia auditiva excepcional con cancelación de ruido adaptativa y una calidad de sonido premium. Perfectos para viajes y entornos ruidosos.",
         productPrice: 250,
         discount: 8,
         stock: 20,
         score: 96,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrico", "Bluetooth"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Luces LED", "Micrófono"]
          }
         ],
         imageTitles: ["/SonyWH.png"],
         categories: [categories.Perifericos]
       },
       {
         productName: "EVGA GeForce RTX 3060 Ti",
         productBrand: "EVGA",
         shortDescription: "Tarjeta gráfica para gaming de gama media",
         longDescription: "La tarjeta gráfica EVGA GeForce RTX 3060 Ti ofrece un rendimiento sólido en juegos de gama media. Con tecnología de trazado de rayos para una experiencia visual mejorada.",
         productPrice: 400,
         discount: 10,
         stock: 35,
         score: 88,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["8GB", "GDDR6", "256 bit"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI", "DisplayPort"]
          }
         ],
         imageTitles: ["/TarjetaEVGA.png"],
         categories: [categories.TarjetasGraficas, categories.Ofertas]
       },
       {
         productName: "Dell XPS 13 Laptop",
         productBrand: "Dell",
         shortDescription: "Portátil ultradelgado con pantalla InfinityEdge",
         longDescription: "La laptop Dell XPS 13 cuenta con una pantalla InfinityEdge sin bordes, procesador potente y diseño ultradelgado. Ideal para usuarios que buscan portabilidad y rendimiento.",
         productPrice: 1200,
         discount: 5,
         stock: 15,
         score: 95,
         features: [
          {
            featureId: features.MemoriaRAM,
            specifications: ["16 GB", "DDR4"]
          },
          {
            featureId: features.Almacenamiento,
            specifications: ["SSD", "1 TB"]
          },
          {
            featureId: features.Pantalla,
            specifications: ["13'", "Táctil"]
          },
          {
            featureId: features.Conectividad,
            specifications: ["Wi-Fi", "Bluetooht"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows 11 Pro"]
          }
         ],
         imageTitles: ["/DellXPS.png","/dell_logo_blanco_2.png"],
         categories: [categories.Laptops]
       },
       {
         productName: "Seagate Barracuda 4TB HDD",
         productBrand: "Seagate",
         shortDescription: "Disco duro de alta capacidad para almacenamiento",
         longDescription: "El disco duro Seagate Barracuda de 4TB ofrece una amplia capacidad de almacenamiento para archivos multimedia, juegos y más. Con velocidades de transferencia rápidas y confiabilidad.",
         productPrice: 100,
         discount: 10,
         stock: 40,
         score: 89,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["HDD", "4TB"]
          }
         ],
         imageTitles: ["/Discoduro.png"],
         categories: [categories.Almacenamiento, categories.Ofertas]
       },
       {
         productName: "HP Omen 27 Gaming Monitor",
         productBrand: "HP",
         shortDescription: "Monitor gaming QHD con tasa de actualización alta",
         longDescription: "El monitor HP Omen 27 ofrece una experiencia gaming inmersiva con resolución QHD, alta tasa de actualización y tecnología AMD FreeSync. Diseñado para jugadores exigentes.",
         productPrice: 450,
         discount: null,
         stock: 20,
         score: 92,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["IPS", "24.5'", "Antirreflejo"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI 2.0", "DisplayPort 1.4", "USB-A 3.2 Gen 1"]
          }
         ],
         imageTitles: ["/OMEN.png", "/hp-2.png"],
         categories: [categories.Monitores]
       },
       {
         productName: "Crucial Ballistix RGB RAM",
         productBrand: "Crucial",
         shortDescription: "Módulo de memoria DDR4 con iluminación RGB",
         longDescription: "La memoria RAM Crucial Ballistix RGB combina un rendimiento excepcional con iluminación RGB personalizable. Ideal para sistemas gaming con estilo.",
         productPrice: 80,
         discount: 15,
         stock: 30,
         score: 91,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["8 GB"]
          },
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4", "UDIMM", "3200 MHz"]
          }
         ],
         imageTitles: ["/MemoriaRAM.png"],
         categories: [categories.MemoriaRAM]
       },
       {
         productName: "Logitech G Pro X Mechanical Keyboard",
         productBrand: "Logitech",
         shortDescription: "Teclado mecánico personalizable para gamers",
         longDescription: "El teclado Logitech G Pro X ofrece interruptores mecánicos intercambiables y teclas personalizables para adaptarse a las preferencias de los jugadores. Diseñado para el rendimiento.",
         productPrice: 150,
         discount: 8,
         stock: 25,
         score: 94,
         features: [
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["RGB LIGHTSYNC"]
          }
         ],
         imageTitles: ["/TecladoLogitech.png", "/logitech.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       }, {
         productName: "Samsung 970 EVO Plus SSD",
         productBrand: "Samsung",
         shortDescription: "Unidad de estado sólido NVMe para velocidad y fiabilidad",
         longDescription: "El SSD Samsung 970 EVO Plus proporciona velocidades de lectura/escritura ultrarrápidas y confiabilidad para mejorar el rendimiento del sistema. Ideal para usuarios que buscan tiempos de carga rápidos.",
         productPrice: 180,
         discount: 12,
         stock: 25,
         score: 93,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["500 GB","SSD"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows"]
          }
         ],
         imageTitles: ["/SamsungEVOPlus.png"],
         categories: [categories.Procesadores]
       },
       {
         productName: "Razer DeathAdder Elite Gaming Mouse",
         productBrand: "Razer",
         shortDescription: "Ratón gaming ergonómico con sensor óptico avanzado",
         longDescription: "El Razer DeathAdder Elite ofrece un diseño ergonómico, sensor óptico de alta precisión y switches mecánicos duraderos para una experiencia de juego excepcional. Diseñado para gamers exigentes.",
         productPrice: 70,
         discount: null,
         stock: 35,
         score: 90,
         features: [
          {
            featureId: features.SistemaOperativo,
            specifications: ["Mic. Windows"]
          }
         ],
         imageTitles: ["/RazerDeathAdder.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Acer Predator XB271HU Gaming Monitor",
         productBrand: "Acer",
         shortDescription: "Monitor gaming IPS con G-Sync y overclocking",
         longDescription: "El monitor Acer Predator XB271HU presenta una pantalla IPS con G-Sync para una experiencia gaming suave. Además, ofrece la opción de overclocking para alcanzar tasas de actualización más altas.",
         productPrice: 600,
         discount: 15,
         stock: 15,
         score: 96,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["27'","Full HD", "LED"]
          }
         ],
         imageTitles: ["/Predator.png"],
         categories: [categories.Monitores]
       },
       {
         productName: "NZXT Kraken X63 Liquid Cooler",
         productBrand: "NZXT",
         shortDescription: "Refrigeración líquida para procesadores de alto rendimiento",
         longDescription: "La NZXT Kraken X63 es una solución de refrigeración líquida todo en uno con un diseño elegante y rendimiento térmico excepcional. Perfecta para sistemas que requieren una refrigeración eficiente.",
         productPrice: 140,
         discount: 8,
         stock: 20,
         score: 94,
         features: [
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Bomba MTTF", "RGB Gen 2 direc."]
          }
         ],
         imageTitles: ["/NZXTKraken.png"],
         categories: [categories.AccesoriosGaming]
       },
       {
         productName: "AMD Ryzen 9 5900X CPU",
         productBrand: "AMD",
         shortDescription: "Procesador de 12 núcleos y 24 hilos para rendimiento extremo",
         longDescription: "El procesador AMD Ryzen 9 5900X ofrece un rendimiento de vanguardia con 12 núcleos y 24 hilos. Ideal para usuarios que buscan potencia de procesamiento para tareas intensivas.",
         productPrice: 550,
         discount: 10,
         stock: 10,
         score: 97,
         features: [
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4", "128 GB"]
          }
         ],
         imageTitles: ["/AMDRyzen.png", "/amd.png"],
         categories: [categories.Procesadores, categories.Ofertas]
       },
       {
         productName: "Corsair K95 RGB Platinum XT Mechanical Keyboard",
         productBrand: "Corsair",
         shortDescription: "Teclado mecánico premium con retroiluminación RGB",
         longDescription: "El teclado Corsair K95 RGB Platinum XT ofrece interruptores Cherry MX, retroiluminación RGB programable y teclas multimedia dedicadas. Ideal para usuarios que buscan un teclado de alta calidad.",
         productPrice: 200,
         discount: 10,
         stock: 18,
         score: 96,
         features: [
          {
            featureId: features.Puertos,
            specifications: ["USB 3.1"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Retro. RGB"]
          }
         ],
         imageTitles: ["/CorsairK95.png", "/logos-2020.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Logitech G Pro Wireless Gaming Mouse",
         productBrand: "Logitech",
         shortDescription: "Ratón gaming inalámbrico con sensor HERO 25K",
         longDescription: "El Logitech G Pro Wireless cuenta con un sensor HERO 25K de alta precisión, diseño ligero y batería de larga duración. Perfecto para jugadores que buscan libertad de movimiento.",
         productPrice: 150,
         discount: 8,
         stock: 22,
         score: 94,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrico"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Chrome OS", "macOS 10.11", "Windows 7"]
          }
         ],
         imageTitles: ["/LogitechGProMouse.png" , "/logitech.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Samsung Odyssey G9 Curved Gaming Monitor",
         productBrand: "Samsung",
         shortDescription: "Monitor gaming curvo de 49 pulgadas con resolución QLED",
         longDescription: "El Samsung Odyssey G9 presenta una pantalla curva de 49 pulgadas con tecnología QLED, alta tasa de actualización y resolución impresionante. Diseñado para una experiencia de juego envolvente.",
         productPrice: 1200,
         discount: 15,
         stock: 12,
         score: 98,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["49'", "Curvo"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI", "USB"]
          }
         ],
         imageTitles: ["/SamsungOdyssey.png"],
         categories: [categories.Monitores]
       },
       {
         productName: "Crucial P5 Plus NVMe SSD",
         productBrand: "Crucial",
         shortDescription: "Unidad de estado sólido NVMe con velocidades extremas",
         longDescription: "El Crucial P5 Plus ofrece velocidades de lectura/escritura extremas gracias a la tecnología NVMe. Perfecto para usuarios que requieren un rendimiento de almacenamiento ultrarrápido.",
         productPrice: 250,
         discount: null,
         stock: 15,
         score: 97,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["SSD", "1 TB"]
          }
         ],
         imageTitles: ["/CrucialP5Plus.png"],
         categories: [categories.Almacenamiento]
       },
       {
         productName: "NVIDIA GeForce RTX 3080 Graphics Card",
         productBrand: "NVIDIA",
         shortDescription: "Tarjeta gráfica potente para juegos y renderizado",
         longDescription: "La tarjeta gráfica NVIDIA GeForce RTX 3080 ofrece un rendimiento excepcional para juegos de alta gama y tareas de renderizado. Ideal para entusiastas de los gráficos.",
         productPrice: 800,
         discount: 10,
         stock: 8,
         score: 99,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["10 GB", "GDDR6X","PCI-Exp. 4.0"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDM 2.1", "DisplayPort 1.4a"]
          }
         ],
         imageTitles: ["/NVIDIARTX3080.png", "/nvidia-2.png"],
         categories: [categories.TarjetasGraficas, categories.Ofertas]
       },
       {
         productName: "ASUS ROG Strix Scar 17 Gaming Laptop",
         productBrand: "ASUS",
         shortDescription: "Portátil gaming de alto rendimiento con pantalla de 17 pulgadas",
         longDescription: "El ASUS ROG Strix Scar 17 cuenta con un potente procesador, GPU dedicada, y una pantalla de alta frecuencia de actualización para ofrecer una experiencia gaming inmersiva.",
         productPrice: 2200,
         discount: 5,
         stock: 10,
         score: 97,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["QHD de 240 Hz"]
          },
          {
            featureId: features.MemoriaRAM,
            specifications: ["32 GB", "4800 MHz"]
          },
          {
            featureId: features.Almacenamiento,
            specifications: ["2 TB", "SSD PCle 4.0"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows 11 Pro"]
          }
         ],
         imageTitles: ["/ASUSROG.png", "/asus.png"],
         categories: [categories.Laptops]
       },
       {
         productName: "SteelSeries Arctis Pro Wireless Headset",
         productBrand: "SteelSeries",
         shortDescription: "Auriculares inalámbricos de alta fidelidad para gaming",
         longDescription: "El SteelSeries Arctis Pro Wireless proporciona audio de alta resolución, comodidad duradera y conectividad inalámbrica para una experiencia de juego sin cables. Ideal para jugadores audiófilos.",
         productPrice: 300,
         discount: null,
         stock: 15,
         score: 95,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrico", "Bluetooth"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Microfono"]
          }
         ],
         imageTitles: ["/SteelSeries.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "LG UltraGear 27GN950-B 4K Gaming Monitor",
         productBrand: "LG",
         shortDescription: "Monitor gaming 4K con tecnología Nano IPS",
         longDescription: "El LG UltraGear 27GN950-B ofrece una resolución 4K, colores vibrantes gracias a la tecnología Nano IPS, y una alta frecuencia de actualización para una experiencia de juego cristalina.",
         productPrice: 700,
         discount: 12,
         stock: 20,
         score: 98,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["27'","IPS", "4K", "3840 x 2160"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI", "DisplayPort", "USB"]
          }
         ],
         imageTitles: ["/LGUltraGear.png", "/lg-4.png"],
         categories: [categories.Monitores]
       },
       {
         productName: "Kingston HyperX Cloud II Gaming Headset",
         productBrand: "Kingston",
         shortDescription: "Auriculares con sonido envolvente y micrófono desmontable",
         longDescription: "El Kingston HyperX Cloud II es conocido por su sonido envolvente 7.1, comodidad extrema y micrófono desmontable. Perfecto para jugadores que buscan calidad de audio y comunicación.",
         productPrice: 100,
         discount: 15,
         stock: 25,
         score: 92,
         features: [
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Microfono","Luz LED"]
          }
         ],
         imageTitles: ["/KingstonHyperX.png", "/hyperx.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Dell XPS 13 Ultrabook",
         productBrand: "Dell",
         shortDescription: "Ultrabook premium con pantalla InfinityEdge",
         longDescription: "El Dell XPS 13 ofrece un diseño delgado, potencia de procesamiento, y una pantalla InfinityEdge sin bordes para una experiencia portátil de alta gama.",
         productPrice: 1300,
         discount: 8,
         stock: 18,
         score: 96,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["13.4'", "4K UHD", "Dolby Vision HDR"]
          },
          {
            featureId: features.MemoriaRAM,
            specifications: ["32 GB LPDDR4X"]
          },
          {
            featureId: features.Almacenamiento,
            specifications: ["SSD PCle 3.0", "1 TB"]
          },
          {
            featureId: features.Conectividad,
            specifications: ["Wi-Fi", "Bluetooth 5.0"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB-C"]
          }
         ],
         imageTitles: ["/DellXPS.png", "/dell_logo_blanco_2.png"],
         categories: [categories.Laptops]
  
       },
       {
         productName: "AMD Ryzen 9 5950X Processor",
         productBrand: "AMD",
         shortDescription: "Procesador de alto rendimiento con 16 núcleos y 32 hilos",
         longDescription: "El AMD Ryzen 9 5950X es un procesador de última generación con un rendimiento excepcional, ideal para usuarios que necesitan potencia de procesamiento para tareas exigentes.",
         productPrice: 699,
         discount: 10,
         stock: 15,
         score: 98,
         features: [
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4", "128 GB"]
          }
         ],
         imageTitles: ["/AMDRyzen.png", "/amd.png"],
         categories: [categories.Procesadores]
       },
       {
         productName: "Logitech MX Master 3 Wireless Mouse",
         productBrand: "Logitech",
         shortDescription: "Ratón inalámbrico ergonómico para productividad",
         longDescription: "El Logitech MX Master 3 es un ratón diseñado para la productividad con funciones avanzadas, ergonomía mejorada y conectividad inalámbrica de alta precisión.",
         productPrice: 99,
         discount: 8,
         stock: 25,
         score: 94,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrico"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Android", "Chrome OS", "Windows 10", "Otros"]
          }
         ],
         imageTitles: ["/LogitechMX.png", "/logitech.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Samsung T5 Portable SSD 1TB",
         productBrand: "Samsung",
         shortDescription: "Unidad de estado sólido portátil con capacidad de 1TB",
         longDescription: "La Samsung T5 Portable SSD ofrece velocidad de transferencia rápida y capacidad de almacenamiento portátil. Perfecta para usuarios que necesitan almacenamiento externo de alta velocidad.",
         productPrice: 159,
         discount: null,
         stock: 20,
         score: 96,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["SSD", "1 TB"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB 3.2 Gen 2"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows 7", "MacOS 10 X 10.1", "Android Lollipop"]
          }
         ],
         imageTitles: ["/SamsuntT5.png"],
         categories: [categories.Almacenamiento, categories.Ofertas]
       },
       {
         productName: "Corsair Vengeance LPX 32GB RAM",
         productBrand: "Corsair",
         shortDescription: "Módulos de memoria RAM DDR4 de alto rendimiento",
         longDescription: "La Corsair Vengeance LPX ofrece 32GB de memoria RAM DDR4 con alta velocidad y eficiencia. Ideal para sistemas que requieren un rendimiento de memoria excepcional.",
         productPrice: 189,
         discount: 12,
         stock: 18,
         score: 95,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["32 GB"]
          },
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4 DRAM", "UDIMM", "2666 MHz"]
          }
         ],
         imageTitles: ["/CorsairLPX.png", "/logos-2020.png"],
         categories: [categories.MemoriaRAM]
       },
       {
         productName: "NVIDIA Quadro RTX 5000 Graphics Card",
         productBrand: "NVIDIA",
         shortDescription: "Tarjeta gráfica profesional para estaciones de trabajo",
         longDescription: "La NVIDIA Quadro RTX 5000 es una tarjeta gráfica diseñada para estaciones de trabajo profesionales, ofreciendo rendimiento gráfico de nivel empresarial y capacidades de GPU aceleradas.",
         productPrice: 1299,
         discount: 15,
         stock: 12,
         score: 97,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["16 GB", "1750 MHz"]
          }
         ],
         imageTitles: ["/NVIDIAQuadro.png", "/nvidia-2.png"],
         categories: [categories.TarjetasGraficas]
       },
       {
         productName: "Intel Core i7-11700K CPU",
         productBrand: "Intel",
         shortDescription: "Procesador de alto rendimiento para gaming y multitarea",
         longDescription: "El Intel Core i7-11700K es un procesador de última generación con 8 núcleos y 16 hilos, ideal para usuarios exigentes que buscan un rendimiento potente para juegos y tareas múltiples.",
         productPrice: 449,
         discount: 7,
         stock: 20,
         score: 96,
         features: [
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4", "128 GB"]
          }
         ],
         imageTitles: ["/IntelCore.png", "/intelnewlogoblanco.png"],
         categories: [categories.Procesadores]
       },
       {
         productName: "Razer BlackWidow Elite Mechanical Keyboard",
         productBrand: "Razer",
         shortDescription: "Teclado mecánico con retroiluminación RGB",
         longDescription: "El Razer BlackWidow Elite es un teclado mecánico diseñado para gamers y usuarios profesionales, con interruptores mecánicos Razer, retroiluminación personalizable y teclas programables.",
         productPrice: 169,
         discount: 10,
         stock: 15,
         score: 93,
         features: [
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Retroiluminación", "Ergonómico"]
          }
         ],
         imageTitles: ["/RazerBlackWidow.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Crucial MX500 1TB SATA SSD",
         productBrand: "Crucial",
         shortDescription: "Unidad de estado sólido SATA de alta capacidad",
         longDescription: "La Crucial MX500 es una SSD con capacidad de 1TB, ideal para mejorar la velocidad y capacidad de almacenamiento de tu sistema. Ofrece confiabilidad y rendimiento duradero.",
         productPrice: 129,
         discount: null,
         stock: 25,
         score: 98,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["1 TB"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Hasta 510 MB/s"]
          }
         ],
         imageTitles: ["/CrucialMX500.png"],
         categories: [categories.Almacenamiento]
       },
       {
         productName: "Corsair K95 RGB Platinum XT Mechanical Keyboard",
         productBrand: "Corsair",
         shortDescription: "Teclado mecánico premium con retroiluminación RGB",
         longDescription: "El Corsair K95 RGB Platinum XT es un teclado mecánico de alta gama con interruptores Cherry MX, retroiluminación RGB dinámica y teclas programables. Ideal para gamers y creadores de contenido.",
         productPrice: 209,
         discount: 15,
         stock: 18,
         score: 97,
         features: [
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Retro. RGB"]
          }
         ],
         imageTitles: ["/CorsairK95"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "Logitech G Pro X Gaming Mouse",
         productBrand: "Logitech",
         shortDescription: "Ratón gaming personalizable con sensor HERO 25K",
         longDescription: "El Logitech G Pro X es un ratón gaming con un sensor HERO 25K de alta precisión, diseño ambidiestro y botones intercambiables. Ofrece un rendimiento excepcional para jugadores profesionales.",
         productPrice: 89,
         discount: 8,
         stock: 22,
         score: 95,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrico"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows 7", "macOS 10.11", "Chrome OS"]
          }
         ],
         imageTitles: ["/LogitechGProMouse.png", "/logitech.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "WD Black 4TB Desktop Hard Drive",
         productBrand: "WD",
         shortDescription: "Disco duro de 4TB para almacenamiento de escritorio",
         longDescription: "El WD Black 4TB es un disco duro de alta capacidad diseñado para almacenamiento de escritorio. Ofrece velocidad y fiabilidad para tus necesidades de almacenamiento intensivas.",
         productPrice: 129,
         discount: 5,
         stock: 15,
         score: 94,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["4 TB"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["SATA 6 GB/s"]
          }
         ],
         imageTitles: ["/WDBlack.png"],
         categories: [categories.Almacenamiento]
       },
       {
         productName: "Asus ROG Strix B550-F Gaming Motherboard",
         productBrand: "Asus",
         shortDescription: "Placa base gaming con soporte PCIe 4.0",
         longDescription: "La Asus ROG Strix B550-F es una placa base gaming con soporte PCIe 4.0 para un rendimiento de transferencia ultra rápido. Cuenta con características avanzadas para gamers entusiastas.",
         productPrice: 199,
         discount: 12,
         stock: 18,
         score: 96,
         features: [
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4", "128 GB", "DIMM"]
          }
         ],
         imageTitles: ["/AsusROGStrix.png", "/asus.png"],
         categories: [categories.Procesadores]
  
       },
       {
         productName: "HyperX Cloud II Gaming Headset",
         productBrand: "HyperX",
         shortDescription: "Auriculares gaming con sonido envolvente 7.1",
         longDescription: "El HyperX Cloud II es un auricular gaming con sonido envolvente 7.1, diseñado para proporcionar una experiencia de audio inmersiva. Ideal para jugadores que buscan calidad de sonido.",
         productPrice: 79,
         discount: 8,
         stock: 20,
         score: 92,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Mini Jack"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Cancelación pasiva", "98 dB SPL/mW"]
          }
         ],
         imageTitles: ["/HyperXCloud.png", "/hyperx.png"],
         categories: [categories.Perifericos, categories.AccesoriosGaming]
       },
       {
         productName: "MSI GeForce RTX 3080 Gaming X Trio GPU",
         productBrand: "MSI",
         shortDescription: "Tarjeta gráfica gaming de alta gama",
         longDescription: "La MSI GeForce RTX 3080 Gaming X Trio es una tarjeta gráfica de alta gama diseñada para gamers entusiastas. Ofrece un rendimiento excepcional y tecnologías avanzadas de trazado de rayos.",
         productPrice: 799,
         discount: 10,
         stock: 12,
         score: 98,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["10 GB", "GDDR6X"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI 2.1", "DisplayPort 1.4a"]
          }
         ],
         imageTitles: ["/MSIGeForce.png"],
         categories: [categories.TarjetasGraficas, categories.Ofertas]
       },
       {
         productName: "Seagate FireCuda 1TB NVMe SSD",
         productBrand: "Seagate",
         shortDescription: "Unidad de estado sólido NVMe de 1TB para gaming",
         longDescription: "La Seagate FireCuda 1TB NVMe SSD es una SSD de alto rendimiento diseñada para gaming. Ofrece velocidades de lectura y escritura rápidas para mejorar la experiencia de juego.",
         productPrice: 149,
         discount: null,
         stock: 22,
         score: 95,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["1 TB", "SSD"]
          },
          {
            featureId: features.OtrasCaracteristicas,
            specifications: ["Tec. 3D NAND"]
          }
         ],
         imageTitles: ["/FireCuda.png"],
         categories: [categories.Procesadores]
       },
       {
         productName: "Corsair Vengeance RGB Pro 32GB RAM",
         productBrand: "Corsair",
         shortDescription: "Módulos de memoria RAM DDR4 con iluminación RGB",
         longDescription: "Corsair Vengeance RGB Pro es una memoria RAM DDR4 de alto rendimiento con iluminación RGB personalizable. Ofrece 32GB de capacidad para mejorar el rendimiento del sistema.",
         productPrice: 199,
         discount: 15,
         stock: 14,
         score: 93,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["32 GB"]
          },
          {
            featureId: features.MemoriaRAM,
            specifications: ["DDR4 DRAM", "DIMM", "2666 MHz"]
          }
         ],
         imageTitles: ["/Vengeance.png", "/logos-2020.png"],
         categories: [categories.MemoriaRAM]
       },
       {
         productName: "Acer Predator X34 Curved Gaming Monitor",
         productBrand: "Acer",
         shortDescription: "Monitor gaming curvo de 34 pulgadas con resolución 3440x1440",
         longDescription: "Acer Predator X34 es un monitor gaming curvo de 34 pulgadas con resolución ultrawide de 3440x1440. Ofrece una experiencia inmersiva y tecnologías avanzadas para gamers.",
         productPrice: 799,
         discount: 8,
         stock: 10,
         score: 97,
         features: [
          {
            featureId: features.Pantalla,
            specifications: ["34'", "3440 x 1440", "Curvatura 1900R", "IPS"]
          },
          {
            featureId: features.Puertos,
            specifications: ["HDMI 2.0", "DisplayPort 1.4", "USB tipo C", "USB 3.0"]
          }
         ],
         imageTitles: ["/Predator.png"],
         categories: [categories.Monitores]
       },
       {
         productName: "Logitech MX Master 3 Wireless Mouse",
         productBrand: "Logitech",
         shortDescription: "Ratón inalámbrico avanzado para productividad",
         longDescription: "Logitech MX Master 3 es un ratón inalámbrico diseñado para la productividad, con funciones avanzadas como el seguimiento Darkfield de alta precisión y botones programables.",
         productPrice: 99,
         discount: 10,
         stock: 18,
         score: 95,
         features: [
          {
            featureId: features.Conectividad,
            specifications: ["Inalambrico"]
          },
          {
            featureId: features.Puertos,
            specifications: ["USB"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows 10", "Windows 11", "macOS 10.15", "Otors"]
          }
         ],
         imageTitles: ["/LogitechMX.png", "/logitech.png"],
         categories: [categories.Perifericos]
       },
       {
         productName: "Samsung 970 EVO Plus 500GB NVMe SSD",
         productBrand: "Samsung",
         shortDescription: "Unidad de estado sólido NVMe de alta velocidad",
         longDescription: "Samsung 970 EVO Plus es una SSD NVMe de 500GB con velocidades de lectura y escritura excepcionales. Mejora el rendimiento de tu sistema con esta unidad de almacenamiento de alta velocidad.",
         productPrice: 129,
         discount: null,
         stock: 20,
         score: 96,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["500 GB", "SSD"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows"]
          }
         ],
         imageTitles: ["/SamsungEVOPlus.png"],
         categories: [categories.Procesadores]
       },
       {
         productName: "AMD Ryzen 9 5950X 16-Core CPU",
         productBrand: "AMD",
         shortDescription: "Procesador de 16 núcleos y 32 hilos para entusiastas",
         longDescription: "AMD Ryzen 9 5950X es un procesador de alto rendimiento con 16 núcleos y 32 hilos. Ideal para usuarios entusiastas y creadores de contenido que requieren potencia de procesamiento.",
         productPrice: 699,
         discount: 12,
         stock: 15,
         score: 98,
         features: [
          {
            featureId: features.Almacenamiento,
            specifications: ["DDR4"]
          },
          {
            featureId: features.SistemaOperativo,
            specifications: ["Windows 10"]
          }
         ],
         imageTitles: ["/AMDRyzen.png", "/amd.png"],
         categories: [categories.Procesadores]
       }
    ]

    const productsPromises = []

    for (const producto of productos) {
      productsPromises.push(DbProduct.createProduct(producto))
    }

    await Promise.all(productsPromises)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  }
};
