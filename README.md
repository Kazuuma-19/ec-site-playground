# ECサイト(検証用)

## Get Started
### 1. 環境構築
- DBを作成
```bash
CREATE DATABASE ec_site_playground;
```
- パッケージをインストール(プロジェクト直下)
```bash
make ready
```
### 2. サーバー起動
#### React起動
```bash
cd frontend
```
```bash
npm run dev
```
#### Spring Boot起動
```bash
cd backend
```
```bash
./gradlew bootRun
```

## 設計
### ER図
![ecsite-ER drawio (1)](https://github.com/user-attachments/assets/9150b4f2-8921-4f3a-b6e8-da260aa4b6b1)
