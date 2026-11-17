// Errores de negocio con codigo HTTP sugerido (el controlador decide como responder).
class AppError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
class ValidationError extends AppError { constructor(m) { super(m, 400); } }
class NotFoundError extends AppError { constructor(m) { super(m, 404); } }
class ConflictError extends AppError { constructor(m) { super(m, 409); } }
module.exports = { AppError, ValidationError, NotFoundError, ConflictError };
