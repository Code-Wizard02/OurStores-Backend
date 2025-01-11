export interface User {
  id?: string; // ID único del usuario
  email?: string; // Correo Gmail (opcional, si usa teléfono)
  phoneNumber?: string; // Número de teléfono (opcional, si usa Gmail)
  name: string; // Nombre del usuario
  lastName?: string; // Apellido
  profilePictureUrl?: string; // Foto de perfil
  password:string; // Contraseña
  createdAt?: Date; // Fecha de creación
  updatedAt?: Date; // Fecha de última actualización
  isActive: boolean; // Indica si la cuenta está activa
}
