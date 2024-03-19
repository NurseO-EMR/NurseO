export function storeLocation(location:string) {
    localStorage.setItem("location", location)
}

export function getLocationFromStorage() {
    return localStorage.getItem("location")
}


export function storeVerify(verify:string) {
    localStorage.setItem("verify", verify)
}

export function getVerifyFromStorage() {
    return localStorage.getItem("verify")
}