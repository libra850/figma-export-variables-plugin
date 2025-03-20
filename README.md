# Figma変数エクスポートプラグイン

## 概要

このFigmaプラグインは、Figmaで定義された変数（Variables）をJSON形式でエクスポートするためのツールです。デザインシステムで定義したカラー、スペーシング、タイポグラフィなどの変数を開発環境で利用しやすい形式に変換します。

主な機能：
- Figmaの変数コレクションをJSON形式でエクスポート
- 複数のモード（ライト/ダークテーマなど）に対応
- 変数の参照関係を保持
- カラー値を適切なHEX/RGBA形式に変換
- 小数値の適切なフォーマット処理

このリポジトリはドメイン駆動設計（DDD）の原則に従って構造化されており、保守性と拡張性に優れたコード構成になっています。

## インストール方法

### 前提条件

- Node.js (v22.14.0推奨、Voltaで管理)
- npm
- Figma デスクトップアプリ

### ローカル開発環境のセットアップ

1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/export-variables.git
cd export-variables
```

2. 依存パッケージのインストール

```bash
npm install
```

3. 開発モードで実行

```bash
npm run dev
```

または、ビルドを監視するモードで実行

```bash
npm run watch
```

## Figmaでの使用方法

### プラグインをFigmaに読み込む

1. Figmaアプリを開く
2. メニューから「Plugins」→「Development」→「Import plugin from manifest...」を選択
3. このリポジトリ内の`manifest.json`ファイルを選択

### プラグインの使用方法

1. Figmaで変数を含むファイルを開く
2. メニューから「Plugins」→「Development」→「export variables」→「Export Variables」を選択
3. 表示されたダイアログで「Export Variables」ボタンをクリック
4. JSON形式でエクスポートされた変数が表示される
5. エクスポートされたJSONをコピーして、開発プロジェクトで使用

## プロジェクト構造

このプロジェクトはドメイン駆動設計（DDD）の原則に従って構造化されています：

```
src/
  ├── domain/            # ドメイン層（ビジネスロジックと概念）
  │   ├── models/        # ドメインモデル（Variable, VariableCollection）
  │   ├── services/      # ドメインサービス（FormatService）
  │   ├── valueObjects/  # 値オブジェクト（Mode, VariableValue）
  │   └── repositories/  # リポジトリインターフェース
  ├── application/       # アプリケーション層（ユースケース）
  │   └── useCases/      # ユースケース（ExportVariablesUseCase など）
  ├── infrastructure/    # インフラストラクチャ層
  │   └── figmaApi/      # Figma API連携
  ├── ui/                # UI層
  │   ├── controllers/   # UIコントローラー
  │   └── html/          # HTMLファイル
  └── main.ts            # エントリーポイント
```

## 利用可能なスクリプト

package.jsonに定義されているスクリプトを使用できます：

- `npm run dev` - TypeScriptのウォッチモードでの開発環境起動（変更を検知して自動的にコンパイル）
- `npm run build` - 本番用ビルドの作成
- `npm run watch` - 変更を監視しながらビルド（`build`コマンドのウォッチモード）
- `npm run lint` - ESLintを使用したコード品質チェック
- `npm run lint:fix` - コードのリント問題を自動修正

## コード品質

このプロジェクトでは以下のESLint設定に従ってコード品質を管理しています：

- `eslint:recommended` - ESLintの推奨ルール
- `plugin:@typescript-eslint/recommended` - TypeScript用の推奨ルール
- `plugin:@figma/figma-plugins/recommended` - Figmaプラグイン用の推奨ルール

また、以下のカスタムルールが適用されています：
- 未使用の変数は、`_`で始まる場合はエラーにしない

## 開発環境

このプロジェクトはVoltaを使用してNode.jsのバージョンを管理しています：
- Node.js: v22.14.0

## 開発者向け情報

### Figma Plugin API

このプラグインはFigma Plugin APIを使用して開発されています。詳細な情報は[Figma Plugin開発者ドキュメント](https://www.figma.com/plugin-docs/)を参照してください。

### 変数について

Figmaの変数システムは以下の構造に基づいています：
- **VariableCollection**: 変数の集合。複数のモード（例：ライト/ダークテーマ）を持つことができます。
- **Variable**: 個々の変数（例：primaryColor, spacing.md など）
- **Mode**: コレクション内で定義された異なるモード（例：Light, Dark）
- **VariableValue**: モードごとの変数の値

このプラグインはこれらの構造をJSON形式に変換し、開発環境で使いやすい形式で出力します。

## コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

このプロジェクトはプロジェクトのルートディレクトリにあるライセンスファイルに記載されたライセンスの下で提供されています。
