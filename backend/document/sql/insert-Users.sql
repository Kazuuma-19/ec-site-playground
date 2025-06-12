-- 1. 全項目が正常値（基本ケース）
INSERT INTO users (user_name, email, password, zip_code, prefecture, municipalities, address, telephone)
VALUES ('山田 太郎', 'yamada@example.com', 'password123', '1234567', '東京都', '新宿区', '西新宿2-8-1', '09012345678');

-- 2. NULL許容カラムにnullを入れる
INSERT INTO users (user_name, email, password, zip_code, prefecture, municipalities, address, telephone)
VALUES ('田中 花子', 'tanaka@example.com', 'securepass', '7654321', NULL, NULL, '中央区銀座1-2-3', '08098765432');

-- 3. prefectureが10文字ぴったり、zip_codeが7桁
INSERT INTO users (user_name, email, password, zip_code, prefecture, municipalities, address, telephone)
VALUES ('佐藤 一郎', 'sato@example.com', 'passpass', '0000000', '長野県長野市', '長野中央', '長野1-1-1', '07000000000');

-- 4. telephoneが15文字ぴったり
INSERT INTO users (user_name, email, password, zip_code, prefecture, municipalities, address, telephone)
VALUES ('中村 美咲', 'nakamura@example.com', 'mipass123', '2223333', '大阪府', '北区', '梅田1-1-1', '090123456789012');

-- 5. 異常系：電話番号が全角／記号含む
INSERT INTO users (user_name, email, password, zip_code, prefecture, municipalities, address, telephone)
VALUES ('高橋 健', 'takahashi@example.com', 'badpass', '1112222', '兵庫県', '神戸市', '中央区港町1-1', '０９０ー１２３４ー５６７８');

-- 6. アドレスに特殊文字を含む（XSS対策などのテスト）
INSERT INTO users (user_name, email, password, zip_code, prefecture, municipalities, address, telephone)
VALUES ('川口 陽子', 'kawaguchi@example.com', 'xssTest', '5556666', '京都府', '京都市', '<script>alert("xss")</script>', '09099999999');