"use strict";

/*
    steem-arbitrag-cloudfara
    cache.js

    Простой кэш в памяти.
*/

const Cache = {

    /*
        Время жизни записи (5 минут)
    */
    TTL: 5 * 60 * 1000,

    /*
        Хранилище
    */
    storage: new Map(),

    /*
        Получить запись
    */
    get(key) {

        if (!this.storage.has(key)) {
            return null;
        }

        const entry = this.storage.get(key);

        if (Date.now() > entry.expires) {
            this.storage.delete(key);
            return null;
        }

        return entry.data;

    },

    /*
        Сохранить запись
    */
    set(key, data) {

        this.storage.set(key, {
            data: data,
            expires: Date.now() + this.TTL
        });

    },

    /*
        Проверить наличие
    */
    has(key) {

        return this.get(key) !== null;

    },

    /*
        Удалить запись
    */
    remove(key) {

        this.storage.delete(key);

    },

    /*
        Очистить весь кэш
    */
    clear() {

        this.storage.clear();

    },

    /*
        Размер кэша
    */
    size() {

        return this.storage.size;

    }

};