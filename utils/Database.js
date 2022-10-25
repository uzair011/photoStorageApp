import * as SQLite from "expo-sqlite";

import { place } from "../models/Place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
                  id INTEGER PRIMARY KEY NOT NULL,
                  title TEXT NOT NULL,
                  imageUri TEXT NOT NULL,
                  address TEXT NOT NULL,
                  lat REAL NOT NULL,
                  long REAL NOT NULL
              )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        ` INSERT INTO places (title, imageUri, address, lat,long) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.long,
        ],
        (_, result) => {
          //   console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  long: dp.long,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise; //
}
