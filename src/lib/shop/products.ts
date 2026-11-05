export type ProductTag = '熱銷' | '新品' | '特價'

export interface ProductSpec { label: string; value: string }
export interface ProductReview { name: string; rating: number; comment: string; date: string }

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number | null
  shortDesc: string
  fullDesc: string
  emoji: string
  tag: ProductTag | null
  category: string
  rating: number
  reviewCount: number
  stock: number
  specs: ProductSpec[]
  features: string[]
  colors?: string[]
  reviews: ProductReview[]
  relatedIds: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '高效能鍵盤',
    price: 2990,
    originalPrice: 3990,
    shortDesc: '靜音軸體，適合長時間辦公使用',
    fullDesc: '採用頂級靜音線性軸體，每次按鍵僅 35g 觸發力道，敲擊時幾乎無聲。搭配 PBT 熱昇華鍵帽，字體耐磨不退色。符合人體工學的鍵盤傾角設計，長時間打字也不疲憊。內建 RGB 背光，支援每鍵單獨調色。',
    emoji: '⌨️',
    tag: '熱銷',
    category: '輸入設備',
    rating: 4.8,
    reviewCount: 312,
    stock: 48,
    specs: [
      { label: '軸體', value: '靜音線性軸（35gf）' },
      { label: '鍵帽', value: 'PBT 熱昇華，OEM 高度' },
      { label: '連接方式', value: 'USB-C（有線）' },
      { label: '輪詢率', value: '1000Hz' },
      { label: '背光', value: 'RGB 每鍵獨立' },
      { label: '尺寸', value: '全尺寸 104 鍵' },
      { label: '重量', value: '920g（含線）' },
    ],
    features: [
      '靜音軸體，音量降低 70%，不打擾旁人',
      'PBT 熱昇華鍵帽，字體耐磨 10 年不退色',
      'USB-C 可拆卸線材，方便攜帶',
      '全鍵無衝突（NKRO），遊戲打字兩相宜',
      '內建 RGB 控制晶片，支援官方 App 自訂',
    ],
    colors: ['太空灰', '月光白', '夜幕黑'],
    reviews: [
      { name: 'Eason W.', rating: 5, comment: '靜音效果非常好！在辦公室用不會影響同事，手感也很舒適，值得入手。', date: '2024-10-18' },
      { name: 'Mia C.', rating: 5, comment: '以前用薄膜鍵盤，換了之後完全不想回去，PBT 鍵帽的質感比想像中好很多。', date: '2024-09-30' },
      { name: 'Leo T.', rating: 4, comment: 'RGB 背光很好看，不過軟體設定介面有點複雜，要花時間研究。', date: '2024-09-12' },
    ],
    relatedIds: ['2', '5', '6'],
  },
  {
    id: '2',
    name: '人體工學滑鼠',
    price: 1490,
    originalPrice: null,
    shortDesc: '垂直設計，有效減輕手腕負擔',
    fullDesc: '採用 57° 自然握持角度，讓手腕維持在最舒適的中立位置。適合長時間工作的使用者，可顯著減少手腕痛和腕隧道症候群的風險。搭載高精度 3200 DPI 光學感應器，支援四段 DPI 切換，在不同解析度螢幕上都能精準操控。',
    emoji: '🖱️',
    tag: '新品',
    category: '輸入設備',
    rating: 4.6,
    reviewCount: 87,
    stock: 120,
    specs: [
      { label: '感應器', value: 'PMW3327 光學感應器' },
      { label: 'DPI 範圍', value: '400 / 800 / 1600 / 3200（4 段切換）' },
      { label: '按鍵數', value: '6 鍵（含滾輪 + DPI 切換）' },
      { label: '連接方式', value: 'USB-A 有線' },
      { label: '握持角度', value: '57° 垂直設計' },
      { label: '適用手型', value: '右手專用' },
      { label: '重量', value: '135g（含線）' },
    ],
    features: [
      '57° 垂直握持，手腕保持自然中立姿勢',
      '可調 DPI 四段切換，適應不同使用場景',
      '防滑矽膠側面紋路，久握不累',
      '相容 Windows / macOS，隨插即用',
      '低噪音點擊設計，辦公更安靜',
    ],
    colors: ['石墨黑', '珍珠白'],
    reviews: [
      { name: 'Amy L.', rating: 5, comment: '手腕痛問題因為這個改善很多，真的很有感。設計雖然有點特殊，但只需要兩天就適應了。', date: '2024-11-01' },
      { name: 'David K.', rating: 4, comment: '垂直滑鼠第一次用，剛開始有點不習慣，但一週後完全愛上了，手腕舒服多了。', date: '2024-10-20' },
    ],
    relatedIds: ['1', '5', '3'],
  },
  {
    id: '3',
    name: '27吋 4K 螢幕',
    price: 12900,
    originalPrice: 15900,
    shortDesc: 'IPS 面板，色彩準確，適合設計工作',
    fullDesc: '採用 LG 原廠 IPS 面板，Delta E < 2 色準表現媲美專業顯示器。出廠即完成色彩校正，開箱即可投入設計工作。支援 sRGB 99%、DCI-P3 95% 色域覆蓋。HDR 400 認證，畫面層次豐富。內建 KVM 切換器，一套鍵鼠輕鬆控制兩台電腦。',
    emoji: '🖥️',
    tag: '特價',
    category: '顯示器',
    rating: 4.9,
    reviewCount: 203,
    stock: 15,
    specs: [
      { label: '面板類型', value: 'IPS（LG 原廠）' },
      { label: '解析度', value: '3840 × 2160（4K UHD）' },
      { label: '更新率', value: '60Hz' },
      { label: '色域', value: 'sRGB 99% / DCI-P3 95%' },
      { label: 'HDR', value: 'HDR 400 認證' },
      { label: '色準', value: 'Delta E < 2（出廠校色）' },
      { label: '接口', value: 'HDMI 2.0 × 2 / DisplayPort 1.4 × 1 / USB-C 65W' },
      { label: '尺寸', value: '27 吋 / 超薄邊框' },
    ],
    features: [
      '出廠色彩校正，Delta E < 2，設計師首選',
      'USB-C 65W 供電，一線連接筆電',
      '內建 KVM 切換器，一套鍵鼠管理兩台設備',
      '高度 / 傾角 / 旋轉三維調節底座',
      '不閃屏、低藍光，久看護眼',
    ],
    reviews: [
      { name: 'Claire H.', rating: 5, comment: '作為 UI 設計師，色準是我最在意的，這台完全沒有讓我失望。色彩還原準確，出廠就有校色報告。', date: '2024-10-05' },
      { name: 'Jason M.', rating: 5, comment: '4K 解析度搭配 27 吋真的很舒服，文字超清晰。USB-C 一線接 MacBook 超方便。', date: '2024-09-22' },
      { name: 'Tracy Y.', rating: 4, comment: '整體非常滿意，唯一缺點是 60Hz 更新率，如果是 120Hz 就完美了。', date: '2024-08-15' },
    ],
    relatedIds: ['1', '2', '4'],
  },
  {
    id: '4',
    name: '降噪耳機',
    price: 5990,
    originalPrice: 7990,
    shortDesc: '主動降噪，續航 30 小時',
    fullDesc: '搭載第三代主動降噪晶片，可消除高達 98% 的低頻環境噪音。在辦公室、咖啡廳、捷運上都能獲得安靜的聆聽環境。40mm 鈦合金振膜驅動單體，音質清晰寬廣。摺疊設計方便攜帶，快充 10 分鐘即可使用 3 小時。',
    emoji: '🎧',
    tag: null,
    category: '音訊設備',
    rating: 4.7,
    reviewCount: 445,
    stock: 62,
    specs: [
      { label: '驅動單體', value: '40mm 鈦合金振膜' },
      { label: '降噪晶片', value: '第三代 ANC 晶片' },
      { label: '降噪深度', value: '-35dB（最大）' },
      { label: '頻率響應', value: '20Hz – 20kHz' },
      { label: '電池續航', value: '30 小時（ANC 關閉 40 小時）' },
      { label: '快充', value: '10 分鐘充電 → 3 小時使用' },
      { label: '連接方式', value: 'Bluetooth 5.3 / 3.5mm 有線' },
      { label: '重量', value: '250g' },
    ],
    features: [
      '主動降噪消除 98% 低頻噪音，專注工作',
      '透明模式，一鍵切換聆聽環境聲',
      '30 小時超長續航，出差無後顧之憂',
      '快充 10 分鐘補充 3 小時電量',
      '摺疊設計，隨附硬殼收納包',
    ],
    colors: ['夜幕黑', '星光銀', '靜謐藍'],
    reviews: [
      { name: 'Kevin C.', rating: 5, comment: '降噪效果真的很強，在捷運上幾乎聽不到外面的聲音，音質也比想像中好很多。', date: '2024-11-02' },
      { name: 'Sophia N.', rating: 5, comment: '我對比過幾個品牌，這支降噪效果最好而且價格最實在，強力推薦。', date: '2024-10-15' },
      { name: 'Mark W.', rating: 4, comment: '電話通話品質還不錯，降噪一流，唯一就是夾頭的力道有點大，戴久了有點不舒服。', date: '2024-09-28' },
    ],
    relatedIds: ['1', '3', '6'],
  },
  {
    id: '5',
    name: '筆電支架',
    price: 890,
    originalPrice: null,
    shortDesc: '鋁合金材質，六段角度調整',
    fullDesc: '全鋁合金 CNC 精密切割打造，重量僅 320g，折疊後厚度 1.2cm，輕鬆放入後背包側袋。六段可調節高度讓螢幕提升至視線水平，改善長期低頭的脖子問題。底部防滑膠墊確保使用時不晃動。可承重達 10 公斤，適用所有 11-17 吋筆電。',
    emoji: '💻',
    tag: null,
    category: '配件',
    rating: 4.5,
    reviewCount: 198,
    stock: 200,
    specs: [
      { label: '材質', value: '航空級鋁合金（6061）' },
      { label: '重量', value: '320g' },
      { label: '折疊厚度', value: '1.2cm' },
      { label: '調節段數', value: '6 段（15° – 45°）' },
      { label: '最大承重', value: '10 公斤' },
      { label: '適用筆電尺寸', value: '11 – 17 吋' },
      { label: '顏色', value: '太空灰 / 銀色' },
    ],
    features: [
      '航空鋁合金打造，輕盈卻堅固耐用',
      '六段角度調整，找到最舒適的視線高度',
      '折疊後僅 1.2cm，放後背包毫不佔空間',
      '底部防滑矽膠，使用時穩固不位移',
      '散熱通道設計，讓筆電保持涼爽',
    ],
    colors: ['太空灰', '銀色'],
    reviews: [
      { name: 'Grace Y.', rating: 5, comment: '質感超好，完全不像千元以下的產品。折疊後真的很薄，出差帶著完全不嫌重。', date: '2024-10-28' },
      { name: 'Ben S.', rating: 4, comment: '買了之後脖子不再痠痛，改善很明顯。材質很好，六段調整也夠用。', date: '2024-09-14' },
    ],
    relatedIds: ['1', '2', '6'],
  },
  {
    id: '6',
    name: '無線充電盤',
    price: 690,
    originalPrice: 990,
    shortDesc: '15W 快充，相容所有 Qi 裝置',
    fullDesc: '支援 15W 最大功率無線快充，比標準 7.5W 快上一倍。超薄 4mm 設計，完全不佔桌面空間。搭載智慧溫控系統，自動偵測最佳充電電流，避免過熱。相容所有 Qi 標準裝置，包含 iPhone、Android、AirPods、Galaxy Watch 等。',
    emoji: '🔋',
    tag: '特價',
    category: '充電配件',
    rating: 4.4,
    reviewCount: 267,
    stock: 93,
    specs: [
      { label: '最大功率', value: '15W（需對應快充充電器）' },
      { label: '標準功率', value: '10W / 7.5W / 5W（依裝置）' },
      { label: '厚度', value: '4mm' },
      { label: '直徑', value: '100mm' },
      { label: '輸入', value: 'USB-C 5V/3A' },
      { label: '相容規格', value: 'Qi / MagSafe 相容' },
      { label: '安全認證', value: 'CE / FCC / BSMI' },
    ],
    features: [
      '15W 高功率快充，同等時間充更多電',
      '4mm 超薄設計，不影響桌面整潔',
      '智慧溫控晶片，充電安全有保障',
      '異物偵測技術，金屬物品不誤充電',
      'LED 充電指示燈，一眼確認充電狀態',
    ],
    reviews: [
      { name: 'Lily H.', rating: 5, comment: '超薄設計很喜歡，放在桌上完全沒有礙眼感。15W 充電速度也很快，很滿意。', date: '2024-11-03' },
      { name: 'Tom L.', rating: 4, comment: '性價比很高，功能正常。唯一小缺點是充電時偶爾會有輕微的線圈噪音。', date: '2024-10-07' },
    ],
    relatedIds: ['1', '2', '5'],
  },
]

export const TAG_CFG: Record<string, { gradient: string; badge: string; badgeText: string }> = {
  熱銷: { gradient: 'from-orange-400 to-amber-400',   badge: 'bg-orange-500',  badgeText: 'text-white' },
  新品: { gradient: 'from-blue-400 to-indigo-500',    badge: 'bg-blue-500',    badgeText: 'text-white' },
  特價: { gradient: 'from-red-400 to-rose-500',       badge: 'bg-red-500',     badgeText: 'text-white' },
}
export const DEFAULT_GRADIENT = 'from-gray-200 to-gray-300'

export function discount(orig: number, cur: number) { return Math.round((1 - cur / orig) * 100) }

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getRelated(ids: string[]): Product[] {
  return ids.map(id => getProduct(id)).filter(Boolean) as Product[]
}
