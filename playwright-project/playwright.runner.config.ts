import baseConfig from './src/configuraciones/playwright.config';

export default {
    ...baseConfig,

    // Sobrescribimos SOLO el reporter
    reporter: [
        ['json', { outputFile: 'results.json' }]
    ],
};