console.clear();

interface Mode {
  modeId: string;
  name: string;
}

interface Value {
  type: "VARIABLE_ALIAS" | "FLOAT" | "COLOR";
  id?: string;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
}

async function exportToJSON() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const files = [];
  for (const collection of collections) {
    files.push(...(await processCollection(collection)));
  }
  const mergedBody = Object.assign({}, ...files.map((file) => file.body));
  figma.ui.postMessage({ mergedBody });
}

async function processCollection({
  modes,
  variableIds,
}: {
  name: string;
  modes: Mode[];
  variableIds: string[];
}) {
  const files = [];
  for (const mode of modes) {
    const file = { body: {} };
    for (const variableId of variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      // NOTE: 型ガード
      if (variable !== null) {
        const { name, resolvedType, valuesByMode } = variable;
        const value: Value = valuesByMode[mode.modeId];

        if (value !== undefined) {
          let obj = file.body as Record<string, unknown>;
          name.split("/").forEach((groupName) => {
            obj[groupName] = obj[groupName] || {};
            obj = obj[groupName];
          });

          obj.$type = resolvedType === 'FLOAT' ? 'number': resolvedType.toLowerCase();

          if (value.type === "VARIABLE_ALIAS" && value.id) {
            const currentVar = await figma.variables.getVariableByIdAsync(value.id);

            // NOTE: 型ガード
            if (currentVar !== null) {
              obj.$value = `{${currentVar.name.replace(/\//g, ".")}}`;
            } else {
              console.warn(`Variable with ID ${value.id} not found.`);
            }
          } else {
            if (resolvedType === "COLOR") {
              obj.$value = rgbToHex(value);
            } else if (resolvedType === "FLOAT") {
              obj.$value = Number.isInteger(value) ? value : formatNumber(value, 2);
            } else {
              obj.$value = value;
            }
          }
        }
      } else {
        console.warn(`Variable with ID ${variableId} not found.`);
      }
    }
    files.push(file);
  }
  return files;
}

// NOTE: VariableのLetterSpacingの小数点処理を考慮した処理
function formatNumber(value, decimalPlaces) {
  // 小数点以下の桁数で切り上げ
  const factor = Math.pow(10, decimalPlaces + 1);
  let roundedValue = Math.ceil(value * factor) / factor;

  // 小数点以下の桁数で文字列に変換
  let result = roundedValue.toFixed(decimalPlaces);

  // 小数点以下の桁数が 0 の場合、省略
  if (decimalPlaces > 0 && result.endsWith('0')) {
    result = result.replace(/\.?0+$/, '');
  }

  return result;
}

figma.ui.onmessage = async (e: unknown) => {
  console.log("code received message", e);
  await exportToJSON();
};

if (figma.command === "import") {
  figma.showUI(__uiFiles__["import"], {
    width: 500,
    height: 500,
    themeColors: true,
  });
} else if (figma.command === "export") {
  figma.showUI(__uiFiles__["export"], {
    width: 500,
    height: 500,
    themeColors: true,
  });
}

function rgbToHex({ r, g, b, a = 1 }: { r: number; g: number; b: number; a?: number }) {
  if (a !== 1) {
    return `rgba(${[r, g, b]
      .map((n) => Math.round(n * 255))
      .join(", ")}, ${a.toFixed(4)})`;
  }
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}`;
}
