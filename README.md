# API Aerolinea - Guia 6 (Modularizacion backend)

Flujo: Cliente HTTP -> Routes -> Controllers -> Services -> Models -> JSON

## Ejecutar
    npm install
    npm start        # http://localhost:3000/api

## Endpoints (CRUD completo)
| Recurso | Base | Campos |
|---|---|---|
| Pilotos | /api/pilotos | nombre, licencia (unica), horasVuelo, estado (activo/inactivo/suspendido) |
| Aviones | /api/aviones | modelo, matricula (unica), capacidadMaxima, fabricante |
| Asignaciones | /api/asignaciones | idPiloto, idAvion, fechaVuelo (AAAA-MM-DD), rutaAsignada |

GET / , GET /:id , POST / , PUT /:id , DELETE /:id

## Reglas de negocio (capa Services)
- Asignacion: idPiloto e idAvion deben existir (se consulta a los modelos); piloto debe estar activo; un piloto no puede tener 2 asignaciones el mismo dia.
- No se elimina un piloto o avion con asignaciones.
- Solo `models/jsonStore.js` usa `fs`.

## Ejemplo
    curl -X POST localhost:3000/api/pilotos -H "Content-Type: application/json" \
      -d '{"nombre":"Ana Ruiz","licencia":"ATP-001","horasVuelo":3200,"estado":"activo"}'
