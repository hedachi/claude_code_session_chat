const fs = require('fs')

const CHAT_FILE = '/tmp/claude-chat.txt'

const NAMES = [
  'アポロ', 'バジル', 'カシス', 'ダリア', 'エルモ',
  'フジ', 'ガレス', 'ハルカ', 'イカロス', 'ジャスパー',
  'カリン', 'ラムネ', 'マロン', 'ナツメ', 'オニキス',
  'パセリ', 'クオーツ', 'ルビー', 'サクラ', 'タルト',
  'ウニ', 'バニラ', 'ワサビ', 'キセノン', 'ユズ',
  'ゼファー', 'アンコ', 'ボルト', 'チャイ', 'ドリアン',
  'エクレア', 'フィグ', 'ガトー', 'ヒスイ', 'インディゴ',
  'ジンジャー', 'コバルト', 'ライム', 'モカ', 'ネロ',
  'オパール', 'プリン', 'キルト', 'ロゼ', 'シナモン',
  'トパーズ', 'アズキ', 'ビスケ', 'クレソン', 'デニム',
  'エスプレッソ', 'フランボ', 'グミ', 'ハニー', 'アイリス',
  'ジェイド', 'カフェ', 'ラベンダー', 'ミント', 'ノワール',
  'オリーブ', 'ペッパー', 'クランベリー', 'ラズベリー', 'セージ',
  'ターメリック', 'ウコン', 'ベルベット', 'ウィスカー', 'キャラメル',
  'ヤマブキ', 'ザクロ', 'アーモンド', 'ブリオッシュ', 'コルク',
  'ダイヤ', 'エメラルド', 'フェンネル', 'ゴマ', 'ヘーゼル',
  'イチジク', 'ジャム', 'カルダモン', 'レモン', 'マスカット',
  'ナッツ', 'オレガノ', 'ピスタチオ', 'クミン', 'ローズマリー',
  'ソルベ', 'タイム', 'アプリコット', 'ブルーベリー', 'ココア',
  'デイジー', 'エルダー', 'フリージア', 'ガーネット', 'ホップ'
]

const cmd = process.argv[2]

// node chat.js --name → ランダムな名前を出力
if (cmd === '--name') {
  console.log(NAMES[Math.floor(Math.random() * NAMES.length)])
  process.exit(0)
}

// node chat.js --clear → チャットファイルをクリア
if (cmd === '--clear') {
  fs.writeFileSync(CHAT_FILE, '')
  process.exit(0)
}

// ファイルがなければ作る
if (!fs.existsSync(CHAT_FILE)) fs.writeFileSync(CHAT_FILE, '')

// node chat.js → 全メッセージを読んで出力
if (!cmd) {
  const content = fs.readFileSync(CHAT_FILE, 'utf-8').trim()
  if (content) console.log(content)
  process.exit(0)
}

// node chat.js "名前: メッセージ" → 書き込み、次のメッセージを待って出力
const lineCount = fs.readFileSync(CHAT_FILE, 'utf-8').split('\n').filter(Boolean).length
fs.appendFileSync(CHAT_FILE, cmd + '\n')
const myLineCount = lineCount + 1

const poll = setInterval(() => {
  const lines = fs.readFileSync(CHAT_FILE, 'utf-8').split('\n').filter(Boolean)
  if (lines.length > myLineCount) {
    lines.slice(myLineCount).forEach(l => console.log(l))
    clearInterval(poll)
  }
}, 500)
