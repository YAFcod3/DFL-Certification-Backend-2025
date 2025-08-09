# MS Print Order API


Repositorio: [https://github.com/YAFcod3/DFL-Certification-Backend-2025](https://github.com/YAFcod3/DFL-Certification-Backend-2025)

---

## Instalación y ejecución

1. Clona el repositorio:

``` 
git clone https://github.com/YAFcod3/DFL-Certification-Backend-2025.git
cd DFL-Certification-Backend-2025
yarn install
docker-compose up -d
yarn start:dev

```

## API Endpoints

Puedes probar los endpoints con Postman importando esta colección:

- [Descargar colección Postman](./mnt/data/ms-print-order.postman_collection.json) *(crea este archivo con el JSON anterior)*


## Variables de entorno

Configura estas variables en un archivo `.env` en la raíz del proyecto:

```env
MONGO_URI=
PORT=
DB_USER=root
DB_PASSWORD=printorder25
JWT_SECRET=PjVDl8rTyXCj7Y03JpLhilzmCA6UiVz3
ALLOWED_APPS=[{"name":"Parranda","url":"https://cervezaparranda.com"},{"name":"Jamazon","url":"https://jamazon.com"}]

```

### Endpoints 

#### Print Requests

| Método | Ruta                        | Descripción                     |
|--------|-----------------------------|--------------------------------|
| POST   | `/api/print-requests`        | Crear una solicitud de impresión |
| GET    | `/api/print-requests`        | Listar solicitudes (paginado)   |
| GET    | `/api/print-requests/:id`    | Obtener solicitud por ID        |
| PUT    | `/api/print-requests/:id`    | Actualizar solicitud            |
| DELETE | `/api/print-requests/:id`    | Eliminar solicitud              |
| GET    | `/api/print-requests/order/:id` | Listar solicitudes por orden   |

#### Orders

| Método | Ruta              | Descripción            |
|--------|-------------------|-----------------------|
| GET    | `/api/orders`     | Listar órdenes (paginado) |
| GET    | `/api/orders/:id` | Obtener orden por ID     |

---

| Método | Ruta                       | Descripción                                             |
| ------ | -------------------------- | ------------------------------------------------------- |
| GET    | `/api/app-logs/summary`    | Resumen de logs agrupados por app y endpoint            |
| GET    | `/api/app-logs?url=`       | Logs filtrados por URL de app                           |
| GET    | `/api/app-logs/stats?url=` | Estadísticas de uso agrupadas por endpoint para una app |
