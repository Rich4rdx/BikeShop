# 🚲 BikeShop: frontend de gestión para tienda de bicicletas

Interfaz web en Angular para administrar una tienda de bicicletas: punto de venta con carrito, clientes, inventario, proveedores, movimientos, reportes y usuarios. Consume la API REST del backend con autenticación JWT y muestra cada módulo según el rol del usuario.

> Backend en Spring Boot: [Rich4rdx/BikeShop-Backend](https://github.com/Rich4rdx/BikeShop-Backend)

![Angular](https://img.shields.io/badge/Angular_16-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-3F51B5?style=flat&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat&logo=reactivex&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

<!-- TODO: agrega una captura, por ejemplo del punto de venta:
![Punto de venta](docs/ventas.png)
-->

## ✨ Funcionalidades

- **Inicio de sesión con JWT:** el token se adjunta automáticamente a cada petición con un `HttpInterceptor`
- **Rutas protegidas por rol:** `AuthGuard` para usuarios autenticados y `AdminGuard` para las secciones de administración
- **Punto de venta** con carrito, selección de cliente y generación de factura
- **Inventario de bicicletas** con registro y foto del producto
- **Clientes y proveedores:** directorio, registro y consulta
- **Movimientos** de entrada y salida de inventario
- **Reportes de ventas** con descarga en PDF y Excel desde el backend
- **Gestión de usuarios** (solo administradores)

## 🏗️ Arquitectura

```
src/app/
├── core/
│   ├── guards/         → AuthGuard y AdminGuard
│   ├── interceptors/   → JwtInterceptor (añade el token a las peticiones)
│   ├── models/         → Interfaces de los DTOs del backend
│   └── services/       → Un servicio HTTP por recurso
├── modules/            → Módulos con carga diferida (lazy loading)
│   ├── auth/  ventas/  clientes/  bicicletas/
│   └── proveedores/  movimientos/  reportes/  usuarios/
└── shared/             → Navbar y componente de factura
```

## 🗺️ Rutas

| Ruta | Descripción |
|---|---|
| `/auth/login` | Inicio de sesión y registro |
| `/ventas` | Punto de venta con carrito |
| `/clientes` | Directorio y gestión de clientes |
| `/bicicletas` | Registro de bicicletas con foto |
| `/proveedores` | Gestión de proveedores |
| `/movimientos` | Entradas y salidas de inventario |
| `/reportes` | Reportes de ventas en PDF y Excel |
| `/usuarios` | Administración de usuarios |

## 🚀 Cómo ejecutarlo

Requisitos: Node.js 18+ y el [backend](https://github.com/Rich4rdx/BikeShop-Backend) corriendo en `http://localhost:8080`.

```bash
npm install
npm start
```

Abre http://localhost:4200. El proxy de desarrollo (`proxy.conf.json`) redirige `/api/*` al backend, así que no hace falta configurar CORS.

Para generar el build de producción:

```bash
npm run build
```

## 📝 Notas

Las fotos de las bicicletas se guardan en el navegador (LocalStorage), asociadas al código de cada bicicleta. Se aceptan imágenes JPG o PNG de hasta 2 MB.

## 👤 Autor

**Richard**: [github.com/Rich4rdx](https://github.com/Rich4rdx)
