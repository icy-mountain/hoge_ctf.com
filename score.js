"use strict";
function storageAvailable() {
    let storage;
    try {
        storage = window['localStorage'];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return storage;
    }
    catch(e) {
        return e.message;
    }
}

function set_storage(key, val) {
    const storage = storageAvailable();
    if (typeof storage === "string") 
        return storage;
    storage[key] = val;
    return storage;
}

function get_storage(key) {
    const storage = storageAvailable();
    if (typeof storage === "string") 
        return storage;
    return storage[key];
}

function del_storage(key) {
    const storage = storageAvailable();
    if (typeof storage === "string") 
        return storage;
    storage.removeItem(key)
}
