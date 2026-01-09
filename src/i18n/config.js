import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    common: {
                        start_lesson: "Start Lesson",
                        next: "Next",
                        continue: "Continue",
                        check_answer: "Check Answer",
                        finish_lesson: "Finish Lesson",
                        xp_earned: "XP Earned",
                        xp: "XP",
                        streak: "Day Streak",
                        level: "Level",
                        loading: "Loading content...",
                        curriculum: "Learning Path",
                        tagline: "Empowering newcomers with financial knowledge 🇨🇦",
                        footer_motivation: "\"Your financial journey in Canada starts here. Take it one step at a time.\" 🏠",
                        correct: "Correct!",
                        incorrect: "Incorrect",
                        search_placeholder: "Search for lessons (taxes, credit, etc.)",
                        recent_searches: "Recent Searches",
                        no_results: "No results found for",
                        try_another: "Try another keyword or browse the Learning Path.",
                        calculators: "Calculators",
                        search: "Search",
                        learn: "Learn",
                        settings: "Settings",
                        language: "Language",
                        progress: "Progress",
                        lessons_done: "Lessons Done",
                        aria_start_lesson: "Start lesson: {{title}}",
                        level_1_title: "The First 30 Days (Survival)",
                        level_2_title: "Building Your Foundation",
                        level_3_title: "Government Benefits & Tax",
                        level_4_title: "Protection & Long-Term Growth",
                        level_5_title: "Estate Planning & Segregated Funds",
                        help: "Help",
                        help_advice: "Help & Advice",
                        talk_to_advisor: "Talk to an Advisor",
                        email: "Email",
                        call: "Call",
                        try_another_advisor: "Try Another Advisor",
                        loading_advisors: "Finding an advisor for you..."
                    }
                }
            },
            es: {
                translation: {
                    common: {
                        start_lesson: "Empezar Lección",
                        next: "Siguiente",
                        continue: "Continuar",
                        check_answer: "Verificar Respuesta",
                        finish_lesson: "Finalizar Lección",
                        xp_earned: "XP Ganados",
                        xp: "XP",
                        streak: "Día de Racha",
                        level: "Nivel",
                        loading: "Cargando contenido...",
                        curriculum: "Camino de Aprendizaje",
                        tagline: "Empoderando a recién llegados con conocimiento financiero 🇨🇦",
                        footer_motivation: "\"Tu camino financiero en Canadá comienza aquí. Da un paso a la vez.\" 🏠",
                        correct: "¡Correcto!",
                        incorrect: "Incorrecto",
                        search_placeholder: "Buscar lecciones (impuestos, crédito, etc.)",
                        recent_searches: "Búsquedas Recientes",
                        no_results: "No se encontraron resultados para",
                        try_another: "Intenta con otra palabra clave o explora el Camino de Aprendizaje.",
                        calculators: "Calculadoras",
                        search: "Buscar",
                        learn: "Aprender",
                        settings: "Ajustes",
                        language: "Idioma",
                        progress: "Progreso",
                        lessons_done: "Lecciones Terminadas",
                        aria_start_lesson: "Empezar lección: {{title}}",
                        level_1_title: "Los Primeros 30 Días (Supervivencia)",
                        level_2_title: "Construyendo tu Base",
                        level_3_title: "Beneficios del Gobierno e Impuestos",
                        level_4_title: "Protección y Crecimiento a Largo Plazo",
                        level_5_title: "Planificación Patrimonial y Fondos Segregados",
                        help: "Ayuda",
                        help_advice: "Ayuda y Asesoría",
                        talk_to_advisor: "Habla con un Asesor",
                        email: "Correo",
                        call: "Llamar",
                        try_another_advisor: "Probar con otro Asesor",
                        loading_advisors: "Buscando un asesor para ti..."
                    }
                }
            },
            fr: {
                translation: {
                    common: {
                        start_lesson: "Commencer la leçon",
                        next: "Suivant",
                        continue: "Continuer",
                        check_answer: "Vérifier la réponse",
                        finish_lesson: "Terminer la leçon",
                        xp_earned: "XP gagnés",
                        xp: "XP",
                        streak: "Jour de série",
                        level: "Niveau",
                        loading: "Chargement du contenu...",
                        curriculum: "Parcours d'apprentissage",
                        tagline: "Donner aux nouveaux arrivants des connaissances financières 🇨🇦",
                        footer_motivation: "\"Votre parcours financier au Canada commence ici. Faites un pas à la fois.\" 🏠",
                        correct: "Correct !",
                        incorrect: "Incorrect",
                        search_placeholder: "Rechercher des leçons (impôts, crédit, etc.)",
                        recent_searches: "Recherches récentes",
                        no_results: "Aucun résultat trouvé pour",
                        try_another: "Essayez un autre mot-clé ou parcourez le parcours d'apprentissage.",
                        calculators: "Calculateurs",
                        search: "Chercher",
                        learn: "Apprendre",
                        settings: "Paramètres",
                        language: "Langue",
                        progress: "Progression",
                        lessons_done: "Leçons Terminées",
                        aria_start_lesson: "Commencer la leçon : {{title}}",
                        level_1_title: "Les 30 Premiers Jours (Survie)",
                        level_2_title: "Bâtir votre Fondation",
                        level_3_title: "Avantages Gouvernementaux et Impôts",
                        level_4_title: "Protection et Croissance à Long Terme",
                        level_5_title: "Planification Successorale et Fonds Segregués",
                        help: "Aide",
                        help_advice: "Aide et Conseils",
                        talk_to_advisor: "Parler à un conseiller",
                        email: "E-mail",
                        call: "Appeler",
                        try_another_advisor: "Essayer un autre conseiller",
                        loading_advisors: "Recherche d'un conseiller pour vous..."
                    }
                }
            }
        }
    });

export default i18n;
