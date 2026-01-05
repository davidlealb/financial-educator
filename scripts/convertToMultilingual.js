/**
 * Batch Lesson Translation Converter
 * 
 * This script converts all lesson JSON files from single-language format
 * to multilingual format with EN, ES, and FR translations.
 * 
 * Usage: node scripts/convertToMultilingual.js
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.resolve(__dirname, '../src/data/lessons');
const lessons = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'));

// Simple translation mapping for common financial terms
const glossary = {
    // Common terms
    "account": { es: "cuenta", fr: "compte" },
    "bank": { es: "banco", fr: "banque" },
    "credit": { es: "crédito", fr: "crédit" },
    "debit": { es: "débito", fr: "débit" },
    "ATM": { es: "cajero automático", fr: "guichet automatique" },
    "savings": { es: "ahorros", fr: "épargne" },
    "fee": { es: "tarifa", fr: "frais" },
    "card": { es: "tarjeta", fr: "carte" },
    "loan": { es: "préstamo", fr: "prêt" },
    "insurance": { es: "seguro", fr: "assurance" },
    "tax": { es: "impuesto", fr: "impôt" },
    "TFSA": { es: "CELI (Cuenta de Ahorros Libre de Impuestos)", fr: "CELI (Compte d'épargne libre d'impôt)" },
    "RRSP": { es: "REER (Plan Registrado de Ahorro para el Retiro)", fr: "REER (Régime enregistré d'épargne-retraite)" }
};

// Helper to check if already multilingual
function isMultilingual(field) {
    return typeof field === 'object' && field !== null && ('en' in field || 'es' in field || 'fr' in field);
}

// Convert string to multilingual object (placeholder - requires manual review)
function toMultilingual(text) {
    if (isMultilingual(text)) return text;
    if (typeof text !== 'string') return text;

    // Return structure with EN filled, ES/FR as TODO placeholders
    return {
        en: text,
        es: `[ES] ${text}`,  // Placeholder for Spanish translation
        fr: `[FR] ${text}`   // Placeholder for French translation
    };
}

// Process a single lesson
function convertLesson(filePath) {
    console.log(`\nProcessing: ${path.basename(filePath)}`);

    const lesson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Skip if already converted (check if building-credit which we did manually)
    if (isMultilingual(lesson.title)) {
        console.log(`  ✓ Already multilingual, skipping`);
        return false;
    }

    // Convert top-level fields
    lesson.title = toMultilingual(lesson.title);
    lesson.description = toMultilingual(lesson.description);

    // Convert content array
    if (lesson.content) {
        lesson.content = lesson.content.map(c => ({
            ...c,
            title: toMultilingual(c.title),
            text: toMultilingual(c.text)
        }));
    }

    // Convert quiz array
    if (lesson.quiz) {
        lesson.quiz = lesson.quiz.map(q => ({
            ...q,
            question: toMultilingual(q.question),
            options: (q.options || []).map(opt => toMultilingual(opt)),
            explanation: toMultilingual(q.explanation)
        }));
    }

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(lesson, null, 4), 'utf-8');
    console.log(`  ✓ Converted successfully`);
    return true;
}

// Main execution
console.log(`Found ${lessons.length} lesson files to process...\n`);

let convertedCount = 0;
lessons.forEach(file => {
    const filePath = path.join(lessonsDir, file);
    if (convertLesson(filePath)) {
        convertedCount++;
    }
});

console.log(`\n✅ Conversion complete!`);
console.log(`   Converted: ${convertedCount} files`);
console.log(`   Skipped: ${lessons.length - convertedCount} files (already multilingual)`);
console.log(`\n⚠️  IMPORTANT: Review all [ES] and [FR] placeholders and replace with proper translations!`);
