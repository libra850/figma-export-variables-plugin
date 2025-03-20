export class FormatService {
    /**
     * 数値を指定された小数点以下の桁数で適切にフォーマットする
     * LetterSpacingの小数点処理を考慮
     */
    static formatNumber(value, decimalPlaces) {
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
    /**
     * RGB値をHEX形式に変換する
     */
    static rgbToHex({ r, g, b, a = 1 }) {
        if (a !== 1) {
            return `rgba(${[r, g, b]
                .map((n) => Math.round(n * 255))
                .join(", ")}, ${a.toFixed(4)})`;
        }
        const toHex = (value) => {
            const hex = Math.round(value * 255).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        const hex = [toHex(r), toHex(g), toHex(b)].join("");
        return `#${hex}`;
    }
}
