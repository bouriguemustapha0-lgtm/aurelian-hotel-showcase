import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Globe } from "lucide-react";

export const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "es", label: "ES", name: "Español" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "ar", label: "ع", name: "العربية" },
] as const;

const RTL_LANGS = new Set(["ar"]);

export type Lang = (typeof LANGS)[number]["code"];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.rooms": "Rooms",
  "nav.amenities": "Amenities",
  "nav.gallery": "Gallery",
  "nav.contact": "Contact",
  "hero.eyebrow": "Five-Star Sanctuary · Est. 2014",
  "hero.title.1": "Experience Luxury",
  "hero.title.em": "Beyond",
  "hero.title.2": "Expectations",
  "hero.desc": "Discover elegant rooms, premium comfort, and unforgettable hospitality at the heart of a city that never sleeps.",
  "hero.cta1": "Explore Rooms",
  "hero.cta2": "Contact Us",
  "hero.scroll": "Scroll",
  "about.eyebrow": "Our Story",
  "about.title": "A sanctuary where heritage meets quiet modernity.",
  "about.desc": "Set within a restored Belle Époque landmark, Maison Aurelle is a love letter to slow luxury — soft warm light, hand-finished marble, and a service philosophy passed down through generations of hoteliers.",
  "about.f1.t": "Hand-crafted Interiors", "about.f1.d": "Bespoke furnishings sourced from European ateliers.",
  "about.f2.t": "Michelin-trained Kitchen", "about.f2.d": "Seasonal menus by a two-star executive chef.",
  "about.f3.t": "Personal Concierge", "about.f3.d": "A dedicated guest host across your entire stay.",
  "about.f4.t": "Wellness Sanctuary", "about.f4.d": "A subterranean spa with mineral hammam & cold plunge.",
  "rooms.eyebrow": "Signature Stays",
  "rooms.title": "Featured Rooms & Suites",
  "rooms.desc": "Each space is composed as a private retreat — a deliberate balance of warm white, charcoal stone and quiet gold detail.",
  "rooms.from": "From", "rooms.night": "/night", "rooms.view": "View Details",
  "rooms.guests": "Guests",
  "room.deluxe.name": "Deluxe King", "room.deluxe.desc": "A serene retreat with panoramic skyline windows and warm silk linens.",
  "room.exec.name": "Executive Suite", "room.exec.desc": "A private living room with hand-stitched leather and bespoke joinery.",
  "room.pent.name": "Aurelle Penthouse", "room.pent.desc": "Our signature top-floor residence with private terrace and butler.",
  "am.eyebrow": "Hotel Amenities",
  "am.title": "Curated comforts, refined to the smallest detail.",
  "am.wifi.t": "Free Wi-Fi", "am.wifi.d": "Lightning-fast fibre across every suite.",
  "am.rest.t": "Restaurant", "am.rest.d": "Seasonal tasting menu by Chef Lemaire.",
  "am.pool.t": "Swimming Pool", "am.pool.d": "Heated rooftop infinity pool with city view.",
  "am.fit.t": "Fitness Studio", "am.fit.d": "24/7 strength & cardio with Technogym.",
  "am.spa.t": "Aurelle Spa", "am.spa.d": "Hammam, sauna and signature gold facials.",
  "am.valet.t": "Valet Parking", "am.valet.d": "Discreet underground parking with concierge.",
  "gal.eyebrow": "The Gallery",
  "gal.title": "A visual journey through Aurelle.",
  "gal.all": "All", "gal.rooms": "Rooms", "gal.interior": "Interior", "gal.exterior": "Exterior", "gal.experience": "Experience",
  "test.eyebrow": "Guest Words",
  "test.title": "Stories from those who have stayed with us.",
  "test.r1": "Every detail at Maison Aurelle felt considered — the way morning light fell across the marble, the perfectly chilled champagne on arrival. Unforgettable.",
  "test.r1.role": "Travel Editor, Maison & Voyage",
  "test.r2": "We've stayed in many five-stars; few feel this personal. The concierge remembered every preference from our first night.",
  "test.r2.role": "Returning Guests",
  "test.r3": "The rooftop pool at dusk is reason enough. The spa is reason to extend your stay. We did both.",
  "test.r3.role": "Architect, Lisbon",
  "stats.guests": "Happy Guests", "stats.rooms": "Signature Rooms", "stats.years": "Years of Hospitality", "stats.rating": "Guest Rating",
  "contact.eyebrow": "Get in Touch",
  "contact.title": "We would be delighted to welcome you.",
  "contact.desc": "Our concierge team is available around the clock to arrange your stay, recommend experiences, or simply answer a question.",
  "contact.tel": "Telephone", "contact.email": "Email", "contact.loc": "Location",
  "contact.hours": "Reception Hours", "contact.hours.v": "Open 24 hours, every day",
  "contact.check": "Check-in from 3:00 pm · Check-out by 12:00 pm",
  "foot.desc": "A five-star sanctuary of warm light, gold detail and quiet luxury — set within a restored Belle Époque landmark.",
  "foot.explore": "Explore", "foot.contact": "Contact",
  "foot.rights": "All rights reserved.", "foot.craft": "Crafted with care · Paris",
};

const fr: Dict = {
  "nav.home": "Accueil", "nav.rooms": "Chambres", "nav.amenities": "Services", "nav.gallery": "Galerie", "nav.contact": "Contact",
  "hero.eyebrow": "Sanctuaire Cinq Étoiles · Depuis 2014",
  "hero.title.1": "Vivez le Luxe", "hero.title.em": "Au-delà", "hero.title.2": "des Attentes",
  "hero.desc": "Découvrez des chambres élégantes, un confort raffiné et une hospitalité inoubliable au cœur d'une ville qui ne dort jamais.",
  "hero.cta1": "Découvrir les Chambres", "hero.cta2": "Nous Contacter", "hero.scroll": "Défiler",
  "about.eyebrow": "Notre Histoire",
  "about.title": "Un sanctuaire où l'héritage rencontre la modernité paisible.",
  "about.desc": "Installé dans un monument Belle Époque restauré, Maison Aurelle est une lettre d'amour au luxe lent — lumière chaude, marbre fini à la main et un service transmis de génération en génération d'hôteliers.",
  "about.f1.t": "Intérieurs Artisanaux", "about.f1.d": "Mobilier sur mesure des ateliers européens.",
  "about.f2.t": "Cuisine Étoilée", "about.f2.d": "Menus saisonniers par un chef deux étoiles.",
  "about.f3.t": "Conciergerie Personnelle", "about.f3.d": "Un hôte dédié pendant tout votre séjour.",
  "about.f4.t": "Sanctuaire de Bien-être", "about.f4.d": "Un spa souterrain avec hammam minéral et bain froid.",
  "rooms.eyebrow": "Séjours Signature", "rooms.title": "Chambres & Suites en Vedette",
  "rooms.desc": "Chaque espace est composé comme une retraite privée — un équilibre délibéré de blanc chaud, pierre anthracite et détails dorés discrets.",
  "rooms.from": "À partir de", "rooms.night": "/nuit", "rooms.view": "Voir les Détails", "rooms.guests": "Invités",
  "room.deluxe.name": "Deluxe King", "room.deluxe.desc": "Une retraite sereine avec fenêtres panoramiques et linge de soie chaude.",
  "room.exec.name": "Suite Exécutive", "room.exec.desc": "Un salon privé en cuir cousu main et menuiserie sur mesure.",
  "room.pent.name": "Penthouse Aurelle", "room.pent.desc": "Notre résidence signature au dernier étage avec terrasse privée et majordome.",
  "am.eyebrow": "Services de l'Hôtel", "am.title": "Des conforts choisis, raffinés dans les moindres détails.",
  "am.wifi.t": "Wi-Fi Gratuit", "am.wifi.d": "Fibre ultra-rapide dans chaque suite.",
  "am.rest.t": "Restaurant", "am.rest.d": "Menu de dégustation saisonnier du Chef Lemaire.",
  "am.pool.t": "Piscine", "am.pool.d": "Piscine à débordement chauffée avec vue sur la ville.",
  "am.fit.t": "Salle de Fitness", "am.fit.d": "Musculation et cardio 24/7 avec Technogym.",
  "am.spa.t": "Spa Aurelle", "am.spa.d": "Hammam, sauna et soins du visage à l'or.",
  "am.valet.t": "Voiturier", "am.valet.d": "Parking souterrain discret avec conciergerie.",
  "gal.eyebrow": "La Galerie", "gal.title": "Un voyage visuel à travers Aurelle.",
  "gal.all": "Tout", "gal.rooms": "Chambres", "gal.interior": "Intérieur", "gal.exterior": "Extérieur", "gal.experience": "Expérience",
  "test.eyebrow": "Paroles d'Invités", "test.title": "Histoires de ceux qui ont séjourné chez nous.",
  "test.r1": "Chaque détail à Maison Aurelle semblait pensé — la lumière du matin sur le marbre, le champagne parfaitement frais à l'arrivée. Inoubliable.",
  "test.r1.role": "Rédactrice Voyage, Maison & Voyage",
  "test.r2": "Nous avons séjourné dans de nombreux cinq étoiles ; peu sont aussi personnels. Le concierge se souvenait de chaque préférence.",
  "test.r2.role": "Invités Fidèles",
  "test.r3": "La piscine sur le toit au crépuscule suffit. Le spa est une raison de prolonger. Nous avons fait les deux.",
  "test.r3.role": "Architecte, Lisbonne",
  "stats.guests": "Invités Heureux", "stats.rooms": "Chambres Signature", "stats.years": "Années d'Hospitalité", "stats.rating": "Note des Invités",
  "contact.eyebrow": "Contactez-nous", "contact.title": "Nous serions ravis de vous accueillir.",
  "contact.desc": "Notre équipe de conciergerie est disponible 24h/24 pour organiser votre séjour ou répondre à toute question.",
  "contact.tel": "Téléphone", "contact.email": "Email", "contact.loc": "Adresse",
  "contact.hours": "Heures de Réception", "contact.hours.v": "Ouvert 24h/24, tous les jours",
  "contact.check": "Arrivée à partir de 15h00 · Départ avant 12h00",
  "foot.desc": "Un sanctuaire cinq étoiles de lumière chaude, de détails dorés et de luxe paisible — dans un monument Belle Époque restauré.",
  "foot.explore": "Explorer", "foot.contact": "Contact",
  "foot.rights": "Tous droits réservés.", "foot.craft": "Conçu avec soin · Paris",
};

const es: Dict = {
  "nav.home": "Inicio", "nav.rooms": "Habitaciones", "nav.amenities": "Servicios", "nav.gallery": "Galería", "nav.contact": "Contacto",
  "hero.eyebrow": "Santuario de Cinco Estrellas · Desde 2014",
  "hero.title.1": "Viva el Lujo", "hero.title.em": "Más Allá", "hero.title.2": "de las Expectativas",
  "hero.desc": "Descubra habitaciones elegantes, confort premium y hospitalidad inolvidable en el corazón de una ciudad que nunca duerme.",
  "hero.cta1": "Explorar Habitaciones", "hero.cta2": "Contáctenos", "hero.scroll": "Desplazar",
  "about.eyebrow": "Nuestra Historia",
  "about.title": "Un santuario donde la herencia se encuentra con la modernidad serena.",
  "about.desc": "Ubicado en un monumento Belle Époque restaurado, Maison Aurelle es una carta de amor al lujo pausado — luz cálida, mármol acabado a mano y un servicio transmitido de generación en generación.",
  "about.f1.t": "Interiores Artesanales", "about.f1.d": "Mobiliario a medida de talleres europeos.",
  "about.f2.t": "Cocina con Estrellas", "about.f2.d": "Menús de temporada por un chef dos estrellas.",
  "about.f3.t": "Conserje Personal", "about.f3.d": "Un anfitrión dedicado durante toda su estancia.",
  "about.f4.t": "Santuario de Bienestar", "about.f4.d": "Un spa subterráneo con hammam mineral y baño frío.",
  "rooms.eyebrow": "Estancias Distinguidas", "rooms.title": "Habitaciones & Suites Destacadas",
  "rooms.desc": "Cada espacio es un retiro privado — un equilibrio de blanco cálido, piedra antracita y detalles dorados.",
  "rooms.from": "Desde", "rooms.night": "/noche", "rooms.view": "Ver Detalles", "rooms.guests": "Huéspedes",
  "room.deluxe.name": "Deluxe King", "room.deluxe.desc": "Un refugio sereno con ventanales panorámicos y ropa de seda cálida.",
  "room.exec.name": "Suite Ejecutiva", "room.exec.desc": "Salón privado con cuero cosido a mano y carpintería a medida.",
  "room.pent.name": "Ático Aurelle", "room.pent.desc": "Residencia insignia en la última planta con terraza privada y mayordomo.",
  "am.eyebrow": "Servicios del Hotel", "am.title": "Comodidades cuidadas, refinadas al mínimo detalle.",
  "am.wifi.t": "Wi-Fi Gratis", "am.wifi.d": "Fibra ultrarrápida en cada suite.",
  "am.rest.t": "Restaurante", "am.rest.d": "Menú degustación de temporada por el Chef Lemaire.",
  "am.pool.t": "Piscina", "am.pool.d": "Piscina infinita climatizada en la azotea.",
  "am.fit.t": "Gimnasio", "am.fit.d": "Fuerza y cardio 24/7 con Technogym.",
  "am.spa.t": "Spa Aurelle", "am.spa.d": "Hammam, sauna y faciales de oro.",
  "am.valet.t": "Aparcacoches", "am.valet.d": "Parking subterráneo discreto con conserjería.",
  "gal.eyebrow": "La Galería", "gal.title": "Un viaje visual por Aurelle.",
  "gal.all": "Todo", "gal.rooms": "Habitaciones", "gal.interior": "Interior", "gal.exterior": "Exterior", "gal.experience": "Experiencia",
  "test.eyebrow": "Palabras de Huéspedes", "test.title": "Historias de quienes han pernoctado con nosotros.",
  "test.r1": "Cada detalle en Maison Aurelle se sentía pensado — la luz de la mañana en el mármol, el champán a la llegada. Inolvidable.",
  "test.r1.role": "Editora de Viajes, Maison & Voyage",
  "test.r2": "Hemos estado en muchos cinco estrellas; pocos se sienten tan personales. El conserje recordaba cada preferencia.",
  "test.r2.role": "Huéspedes Habituales",
  "test.r3": "La piscina al atardecer ya es razón suficiente. El spa, razón para extender la estancia. Hicimos ambos.",
  "test.r3.role": "Arquitecto, Lisboa",
  "stats.guests": "Huéspedes Felices", "stats.rooms": "Habitaciones", "stats.years": "Años de Hospitalidad", "stats.rating": "Valoración",
  "contact.eyebrow": "Contáctenos", "contact.title": "Estaríamos encantados de recibirle.",
  "contact.desc": "Nuestro equipo de conserjería está disponible las 24 horas para organizar su estancia o responder cualquier pregunta.",
  "contact.tel": "Teléfono", "contact.email": "Correo", "contact.loc": "Ubicación",
  "contact.hours": "Horario de Recepción", "contact.hours.v": "Abierto 24 horas, todos los días",
  "contact.check": "Entrada desde 15:00 · Salida hasta 12:00",
  "foot.desc": "Un santuario cinco estrellas de luz cálida, detalles dorados y lujo sereno — en un monumento Belle Époque restaurado.",
  "foot.explore": "Explorar", "foot.contact": "Contacto",
  "foot.rights": "Todos los derechos reservados.", "foot.craft": "Hecho con cariño · París",
};

const de: Dict = {
  "nav.home": "Start", "nav.rooms": "Zimmer", "nav.amenities": "Annehmlichkeiten", "nav.gallery": "Galerie", "nav.contact": "Kontakt",
  "hero.eyebrow": "Fünf-Sterne-Refugium · Seit 2014",
  "hero.title.1": "Erleben Sie Luxus", "hero.title.em": "Jenseits", "hero.title.2": "der Erwartungen",
  "hero.desc": "Entdecken Sie elegante Zimmer, erstklassigen Komfort und unvergessliche Gastfreundschaft im Herzen einer Stadt, die niemals schläft.",
  "hero.cta1": "Zimmer Entdecken", "hero.cta2": "Kontakt", "hero.scroll": "Scrollen",
  "about.eyebrow": "Unsere Geschichte",
  "about.title": "Ein Refugium, in dem Tradition auf stille Moderne trifft.",
  "about.desc": "In einem restaurierten Belle-Époque-Wahrzeichen ist Maison Aurelle eine Liebeserklärung an den langsamen Luxus — warmes Licht, handgefertigter Marmor und über Generationen vererbte Gastfreundschaft.",
  "about.f1.t": "Handgefertigte Interieurs", "about.f1.d": "Maßmöbel aus europäischen Ateliers.",
  "about.f2.t": "Sterne-Küche", "about.f2.d": "Saisonale Menüs von einem Zwei-Sterne-Küchenchef.",
  "about.f3.t": "Persönlicher Concierge", "about.f3.d": "Ein dedizierter Gastgeber während Ihres Aufenthalts.",
  "about.f4.t": "Wellness-Oase", "about.f4.d": "Unterirdisches Spa mit Mineral-Hammam & Kaltbad.",
  "rooms.eyebrow": "Signature-Aufenthalte", "rooms.title": "Empfohlene Zimmer & Suiten",
  "rooms.desc": "Jeder Raum ist ein privater Rückzugsort — eine Balance aus warmem Weiß, Anthrazit und goldenen Details.",
  "rooms.from": "Ab", "rooms.night": "/Nacht", "rooms.view": "Details Ansehen", "rooms.guests": "Gäste",
  "room.deluxe.name": "Deluxe King", "room.deluxe.desc": "Eine ruhige Suite mit Panoramafenstern und warmer Seidenwäsche.",
  "room.exec.name": "Executive Suite", "room.exec.desc": "Privates Wohnzimmer mit handvernähtem Leder und Maßtischlerei.",
  "room.pent.name": "Aurelle Penthouse", "room.pent.desc": "Unsere Signature-Residenz im obersten Stock mit privater Terrasse und Butler.",
  "am.eyebrow": "Hotel-Annehmlichkeiten", "am.title": "Kuratierter Komfort, bis ins kleinste Detail verfeinert.",
  "am.wifi.t": "Kostenloses WLAN", "am.wifi.d": "Blitzschnelle Glasfaser in jeder Suite.",
  "am.rest.t": "Restaurant", "am.rest.d": "Saisonales Menü von Chef Lemaire.",
  "am.pool.t": "Pool", "am.pool.d": "Beheizter Infinity-Pool auf dem Dach mit Stadtblick.",
  "am.fit.t": "Fitnessstudio", "am.fit.d": "24/7 Kraft & Cardio mit Technogym.",
  "am.spa.t": "Aurelle Spa", "am.spa.d": "Hammam, Sauna und Gold-Gesichtsbehandlungen.",
  "am.valet.t": "Valet-Parking", "am.valet.d": "Diskretes Tiefgaragenparken mit Concierge.",
  "gal.eyebrow": "Die Galerie", "gal.title": "Eine visuelle Reise durch Aurelle.",
  "gal.all": "Alle", "gal.rooms": "Zimmer", "gal.interior": "Innen", "gal.exterior": "Außen", "gal.experience": "Erlebnis",
  "test.eyebrow": "Gästestimmen", "test.title": "Geschichten von Gästen, die bei uns übernachtet haben.",
  "test.r1": "Jedes Detail im Maison Aurelle wirkte durchdacht — das Morgenlicht auf dem Marmor, der gekühlte Champagner bei Ankunft. Unvergesslich.",
  "test.r1.role": "Reiseredakteurin, Maison & Voyage",
  "test.r2": "Wir kennen viele Fünf-Sterne-Hotels; wenige fühlen sich so persönlich an. Der Concierge erinnerte sich an jede Vorliebe.",
  "test.r2.role": "Stammgäste",
  "test.r3": "Der Dachpool in der Dämmerung allein lohnt die Reise. Das Spa ist Grund zu verlängern. Wir taten beides.",
  "test.r3.role": "Architekt, Lissabon",
  "stats.guests": "Zufriedene Gäste", "stats.rooms": "Signature-Zimmer", "stats.years": "Jahre Gastfreundschaft", "stats.rating": "Gästebewertung",
  "contact.eyebrow": "Kontakt", "contact.title": "Wir würden Sie gerne willkommen heißen.",
  "contact.desc": "Unser Concierge-Team ist rund um die Uhr erreichbar, um Ihren Aufenthalt zu organisieren oder Fragen zu beantworten.",
  "contact.tel": "Telefon", "contact.email": "E-Mail", "contact.loc": "Adresse",
  "contact.hours": "Rezeptionszeiten", "contact.hours.v": "24 Stunden geöffnet, jeden Tag",
  "contact.check": "Check-in ab 15:00 · Check-out bis 12:00",
  "foot.desc": "Ein Fünf-Sterne-Refugium aus warmem Licht, goldenen Details und stillem Luxus — in einem restaurierten Belle-Époque-Wahrzeichen.",
  "foot.explore": "Entdecken", "foot.contact": "Kontakt",
  "foot.rights": "Alle Rechte vorbehalten.", "foot.craft": "Mit Sorgfalt gefertigt · Paris",
};

const it: Dict = {
  "nav.home": "Home", "nav.rooms": "Camere", "nav.amenities": "Servizi", "nav.gallery": "Galleria", "nav.contact": "Contatti",
  "hero.eyebrow": "Santuario Cinque Stelle · Dal 2014",
  "hero.title.1": "Vivi il Lusso", "hero.title.em": "Oltre", "hero.title.2": "le Aspettative",
  "hero.desc": "Scopri camere eleganti, comfort premium e un'ospitalità indimenticabile nel cuore di una città che non dorme mai.",
  "hero.cta1": "Scopri le Camere", "hero.cta2": "Contattaci", "hero.scroll": "Scorri",
  "about.eyebrow": "La Nostra Storia",
  "about.title": "Un santuario dove l'eredità incontra la modernità silenziosa.",
  "about.desc": "All'interno di un monumento Belle Époque restaurato, Maison Aurelle è una lettera d'amore al lusso lento — luce calda, marmo finito a mano e un servizio tramandato da generazioni di albergatori.",
  "about.f1.t": "Interni Artigianali", "about.f1.d": "Arredi su misura da atelier europei.",
  "about.f2.t": "Cucina Stellata", "about.f2.d": "Menù stagionali di uno chef due stelle.",
  "about.f3.t": "Concierge Personale", "about.f3.d": "Un host dedicato per tutto il soggiorno.",
  "about.f4.t": "Santuario del Benessere", "about.f4.d": "Spa sotterranea con hammam minerale e bagno freddo.",
  "rooms.eyebrow": "Soggiorni Signature", "rooms.title": "Camere & Suite in Evidenza",
  "rooms.desc": "Ogni spazio è un rifugio privato — un equilibrio di bianco caldo, pietra antracite e dettagli dorati.",
  "rooms.from": "Da", "rooms.night": "/notte", "rooms.view": "Vedi Dettagli", "rooms.guests": "Ospiti",
  "room.deluxe.name": "Deluxe King", "room.deluxe.desc": "Un rifugio sereno con finestre panoramiche e biancheria di seta calda.",
  "room.exec.name": "Suite Executive", "room.exec.desc": "Soggiorno privato in pelle cucita a mano e falegnameria su misura.",
  "room.pent.name": "Attico Aurelle", "room.pent.desc": "Residenza signature all'ultimo piano con terrazza privata e maggiordomo.",
  "am.eyebrow": "Servizi dell'Hotel", "am.title": "Comfort curati, raffinati nel minimo dettaglio.",
  "am.wifi.t": "Wi-Fi Gratuito", "am.wifi.d": "Fibra ultrarapida in ogni suite.",
  "am.rest.t": "Ristorante", "am.rest.d": "Menù degustazione stagionale dello Chef Lemaire.",
  "am.pool.t": "Piscina", "am.pool.d": "Piscina infinity riscaldata sul tetto con vista città.",
  "am.fit.t": "Palestra", "am.fit.d": "Forza e cardio 24/7 con Technogym.",
  "am.spa.t": "Spa Aurelle", "am.spa.d": "Hammam, sauna e trattamenti viso all'oro.",
  "am.valet.t": "Parcheggio Valet", "am.valet.d": "Parcheggio sotterraneo discreto con concierge.",
  "gal.eyebrow": "La Galleria", "gal.title": "Un viaggio visivo attraverso Aurelle.",
  "gal.all": "Tutto", "gal.rooms": "Camere", "gal.interior": "Interni", "gal.exterior": "Esterni", "gal.experience": "Esperienza",
  "test.eyebrow": "Parole degli Ospiti", "test.title": "Storie di chi ha soggiornato con noi.",
  "test.r1": "Ogni dettaglio a Maison Aurelle sembrava pensato — la luce del mattino sul marmo, lo champagne fresco all'arrivo. Indimenticabile.",
  "test.r1.role": "Editor di Viaggi, Maison & Voyage",
  "test.r2": "Abbiamo soggiornato in molti cinque stelle; pochi sono così personali. Il concierge ricordava ogni preferenza.",
  "test.r2.role": "Ospiti Abituali",
  "test.r3": "La piscina sul tetto al tramonto basta. La spa è motivo per prolungare il soggiorno. Abbiamo fatto entrambi.",
  "test.r3.role": "Architetto, Lisbona",
  "stats.guests": "Ospiti Felici", "stats.rooms": "Camere Signature", "stats.years": "Anni di Ospitalità", "stats.rating": "Valutazione",
  "contact.eyebrow": "Contattaci", "contact.title": "Saremmo lieti di accogliervi.",
  "contact.desc": "Il nostro team concierge è disponibile 24 ore su 24 per organizzare il vostro soggiorno o rispondere a qualsiasi domanda.",
  "contact.tel": "Telefono", "contact.email": "Email", "contact.loc": "Posizione",
  "contact.hours": "Orari Reception", "contact.hours.v": "Aperto 24 ore, tutti i giorni",
  "contact.check": "Check-in dalle 15:00 · Check-out entro le 12:00",
  "foot.desc": "Un santuario cinque stelle di luce calda, dettagli dorati e lusso silenzioso — in un monumento Belle Époque restaurato.",
  "foot.explore": "Esplora", "foot.contact": "Contatti",
  "foot.rights": "Tutti i diritti riservati.", "foot.craft": "Realizzato con cura · Parigi",
};

const DICTS: Record<Lang, Dict> = { en, fr, es, de, it };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved && DICTS[saved]) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    }
  };

  const t = (k: string) => DICTS[lang][k] ?? DICTS.en[k] ?? k;

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] transition-colors hover:text-[var(--color-gold)] ${
          dark ? "text-foreground/80" : "text-background/85"
        }`}
        aria-label="Change language"
      >
        <Globe size={14} />
        {LANGS.find((l) => l.code === lang)?.label}
      </button>
      {open && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <ul className="absolute right-0 top-full z-50 mt-3 min-w-[140px] border border-border bg-background py-2 shadow-[var(--shadow-luxe)]">
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-muted hover:text-[var(--color-gold)] ${
                    lang === l.code ? "text-[var(--color-gold)]" : "text-foreground/80"
                  }`}
                >
                  <span>{l.name}</span>
                  <span className="text-[10px] text-muted-foreground">{l.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
