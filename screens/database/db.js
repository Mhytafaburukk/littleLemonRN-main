import * as SQLite from 'expo-sqlite';

// Veritabanı dosyasını aç (yoksa otomatik oluşturur)
const db = SQLite.openDatabase('littleLemon.db');

// ─────────────────────────────────────────────
// 1. TABLO OLUŞTUR
//    Uygulama ilk açıldığında çağrılır.
//    "IF NOT EXISTS" sayesinde tablo zaten varsa tekrar oluşturmaz.
// ─────────────────────────────────────────────
export function createTable() {
  db.transaction(tx => {
    // tx = transaction (işlem birimi)
    // executeSql ile SQL komutu çalıştırıyoruz
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS menu (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        name     TEXT NOT NULL,
        price    TEXT NOT NULL,
        category TEXT NOT NULL
      );`
    );
  });
}

// ─────────────────────────────────────────────
// 2. TÜM ÜRÜNLERİ GETİR
//    callback → veriler hazır olunca çağrılır,
//    içine rows (satırlar) gelir.
// ─────────────────────────────────────────────
export function getMenuItems(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM menu;',  // Tüm satırları getir
      [],                     // Parametre yok
      (_, { rows }) => {
        // rows._array → sonuçları JS dizisine çevirir
        callback(rows._array);
      }
    );
  });
}

// ─────────────────────────────────────────────
// 3. YENİ ÜRÜN EKLE
//    ? işaretleri → SQL injection'a karşı güvenli parametre
//    callback → ekleme bitti mi bildirir
// ─────────────────────────────────────────────
export function insertMenuItem(name, price, category, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO menu (name, price, category) VALUES (?, ?, ?);',
      [name, price, category],  // ? yerine bu değerler geçer
      (_, result) => {
        // result.insertId → eklenen satırın id'si
        callback(result.insertId);
      }
    );
  });
}
