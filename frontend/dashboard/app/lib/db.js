import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { resolve } from 'path';

export async function openDB() {
  return open({
    // Gunakan path absolut ke database
    filename: resolve('D:/Project Mandiri/Python/Yolov11/detections.db'),
    driver: sqlite3.Database,
  });
}
