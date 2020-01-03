class Gimnasio {
  constructor(
    id,
    nombre,
    slug,
    telefono,
    api_key_enc,
    email,
    h_servicios,
    logo,
    url
  ) {
    this.id          = id
    this.nombre      = nombre
    this.slug        = slug
    this.telefono    = telefono
    this.api_key_enc = api_key_enc
    this.email       = email
    this.h_servicios = h_servicios
    this.logo        = logo
    this.url         = url
  }
}

export default Gimnasio
