import * as fs from 'fs';
import * as path from 'path';

const featureName = process.argv[2];

if (!featureName) {
    console.error('❌ Debes proporcionar un nombre de feature. Ej: "npx ts-node console/GenerateHexagonal user"');
    process.exit(1);
}

const structure = {
    src: {
        [featureName]: {
            application: {
                dto: {
                    response: {},
                    request: {},
                },
                'use-case': {}
            },
            domain: {
                entities: {},
                exceptions: {},
                repository: {},
                service: {},
            },
            infrastructure: {
                controller: {},
                persistence: {},
                service: {},
            },
            routes: {},
        },
    },
};

function createStructure(basePath: string, obj: any) {
    if (!obj || typeof obj !== 'object') return;

    Object.entries(obj).forEach(([name, content]) => {
        const fullPath = path.join(basePath, name);

        if (typeof content === 'string') {
            fs.writeFileSync(fullPath, content);
            console.log(`✅ Archivo creado: ${fullPath}`);
        } else {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`📁 Carpeta creada: ${fullPath}`);
            createStructure(fullPath, content);
        }
    });
}

createStructure(process.cwd(), structure);
