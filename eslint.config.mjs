import { readdirSync } from "node:fs";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Architectural layer boundaries (see README "Dependency rules").
 * Each layer lists the layers it may import from via the `@/` alias.
 * ESLint replaces (not merges) a rule for overlapping file globs, so every
 * layer config carries the full pattern list it needs.
 */
const LAYERS = ["app", "features", "components", "content", "config", "lib", "types", "styles"];

const ALLOWED_IMPORTS = {
  app: LAYERS,
  features: ["features", "components", "content", "lib", "types"],
  components: ["components", "lib", "types"],
  content: ["content", "types"],
  config: ["config", "types"],
  lib: ["lib", "config", "types"],
  types: ["types"],
};

const NO_PARENT_RELATIVE = {
  regex: "^\\.\\./",
  message: "Import across folders with the @/ alias so layer boundaries stay enforceable.",
};

/** Specimen content for the internal design-system preview must never reach production pages. */
const DEMO_CONSUMERS = ["src/app/(internal)/**/*.{ts,tsx}", "src/content/demo/**/*.{ts,tsx}"];
const DEMO_FEATURE = "design-system";

const NO_DEMO_CONTENT = {
  regex: "^@/content/demo(/|$)",
  message: `Demo content is only for the internal preview (features/${DEMO_FEATURE}, app/(internal)).`,
};

function boundaryRule(layer, extraPatterns = [], { allowDemo = false } = {}) {
  const forbidden = LAYERS.filter((candidate) => !ALLOWED_IMPORTS[layer].includes(candidate));
  const patterns = [NO_PARENT_RELATIVE, ...(allowDemo ? [] : [NO_DEMO_CONTENT]), ...extraPatterns];

  if (forbidden.length > 0) {
    patterns.push({
      regex: `^@/(${forbidden.join("|")})(/|$)`,
      message: `src/${layer} may only import from: ${ALLOWED_IMPORTS[layer].join(", ")}.`,
    });
  }

  return ["error", { patterns }];
}

const layerConfigs = Object.keys(ALLOWED_IMPORTS).map((layer) => ({
  files: [`src/${layer}/**/*.{ts,tsx}`],
  rules: { "no-restricted-imports": boundaryRule(layer) },
}));

const featureNames = readdirSync(new URL("./src/features", import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const featureIsolationConfigs = featureNames.map((feature) => ({
  files: [`src/features/${feature}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": boundaryRule(
      "features",
      [
        {
          regex: `^@/features/(?!${feature}(/|$))`,
          message:
            "Features must not import other features. Promote shared UI to src/components or shared data to src/content.",
        },
      ],
      { allowDemo: feature === DEMO_FEATURE },
    ),
  },
}));

const demoConsumerConfigs = DEMO_CONSUMERS.map((files) => {
  const layer = files.split("/")[1];
  return {
    files: [files],
    rules: { "no-restricted-imports": boundaryRule(layer, [], { allowDemo: true }) },
  };
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  ...layerConfigs,
  ...featureIsolationConfigs,
  ...demoConsumerConfigs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
