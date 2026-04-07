# BikeShop Frontend — Angular 16

Frontend del sistema de gestión para tienda de bicicletas.

## Requisitos previos

- Node.js >= 16
- Angular CLI 16: `npm install -g @angular/cli@16`

## Instalación

```bash
cd bikeshop-frontend
npm install
```

## Ejecutar en desarrollo

```bash
npm start
```

Abre http://localhost:4200 en el navegador.

> El proxy redirige automáticamente `/api/*` → `http://localhost:8080`
> Asegúrate de tener el backend Spring Boot corriendo en el puerto 8080.

## Build para producción

```bash
npm run build
```

## Módulos del sistema

| Ruta | Descripción |
|------|-------------|
| `/auth/login` | Inicio de sesión y registro |
| `/ventas` | Punto de venta con carrito |
| `/movimientos` | Reporte de movimientos de inventario |
| `/clientes` | Directorio y gestión de clientes |
| `/bicicletas` | Registro de bicicletas con foto |
| `/proveedores` | Gestión de proveedores |

## Imágenes de bicicletas

Las imágenes se almacenan localmente en el navegador (localStorage).
Al registrar una bicicleta puedes subir una foto (JPG/PNG, máx. 2 MB).
La imagen se asocia automáticamente a la bicicleta por su código.
