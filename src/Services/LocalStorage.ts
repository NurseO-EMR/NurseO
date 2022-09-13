export function storeLocation(location:string) {
    localStorage.setItem("location", location)
}

export function getLocationFromStorage() {
    return localStorage.getItem("location")
}