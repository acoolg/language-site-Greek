var request = indexedDB.open("myDatabase", 1);
var db = undefined

request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.error);
};

request.onsuccess = function (event) {
    db = request.result;
    console.log(request.result)
};



request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });
};

if (!window.indexedDB) {
    window.alert(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.",
    );
}