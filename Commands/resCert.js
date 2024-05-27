const getResCert = (msj) => {
    switch(msj){
        case "1":
            return "exit"
        case "46235028":
            return "./certificados/cdf_46235028.pdf"
        case "43213966":
            return "./certificados/edp_43213966.pdf"
        case "29148561":
            return "./certificados/edp_29148561.pdf"  
        default:
            return -1
    }
}

module.exports = {
    getResCert
}