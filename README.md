# NoirTech – Catálogo de Productos SPA con Vue.js

Proyecto Front-End desarrollado como **Proyecto Módulo #7 | ABP**.

Esta aplicación web fue creada con el objetivo de practicar el desarrollo de una Single Page Application (SPA) utilizando Vue.js, integrando consumo de API, gestión de estado global con Vuex, navegación con Vue Router y una interfaz visual minimalista inspirada en catálogos modernos de e-commerce.

La aplicación permite visualizar un catálogo de productos, filtrar por categoría, acceder al detalle de cada producto y guardar productos favoritos dentro de una experiencia SPA.

---

## Tabla de contenidos

- [Tecnologías](#tecnologías)
- [Conceptos aplicados](#conceptos-aplicados)
- [Objetivos](#objetivos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Navegación SPA](#navegación-SPA)
- [Testing](#testing)
- [Cómo ejecutar](#cómo-ejecutar)
- [Notas](#notas)

---

## Tecnologías

- Vue.js 3
- Vue Router
- Vuex
- Vuetify
- Axios
- JavaScript (ES6)
- HTML5
- SCSS
- Vue CLI
- Cypress
- Jest + Vue Test Utils

---

## Conceptos aplicados

- Arquitectura basada en componentes
- Navegación SPA con Vue Router
- Gestión de estado global con Vuex
- Consumo de API REST con Axios
- Renderizado dinámico con:
  - v-for
  - v-if
- Computed properties
- Manejo de eventos
- Filtrado dinámico por categoría
- Gestión de favoritos
- Organización modular del proyecto
- Testing unitario y end-to-end
- Estilos reutilizables y consistentes

---

## Objetivos

- Implementar una aplicación Single Page Application (SPA) utilizando Vue.js.
- Consumir productos desde una API externa.
  Aplicar arquitectura basada en componentes reutilizables.
- Gestionar el estado global mediante Vuex.
- Implementar navegación entre vistas con Vue Router.
- Filtrar productos dinámicamente por categoría.
- Incorporar una funcionalidad de favoritos.
- Diseñar una interfaz visual minimalista, responsive y consistente.
- Validar comportamiento con pruebas unitarias y e2e.

---

## Estructura del Proyecto

```text
src/
│
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   │
│   └── products/
│       ├── ProductCard.vue
│       └── ProductList.vue
│
├── views/
│   ├── HomeView.vue
│   └── ProductDetailView.vue
│
├── router/
│   └── index.js
│
├── services/
│   └── productService.js
│
├── store/
│   ├── index.js
│   └── modules/
│       ├── products.js
│       ├── filters.js
│       └── favorites.js
│
├── styles/
│   └── main.scss
│
├── App.vue
├── main.js
└── README.md

tests/
└── unit/
    ├── ProductCard.spec.js
    └── ProductList.spec.js

cypress/
└── e2e/
    └── catalog-filter.cy.js
```

---

## Funcionalidades

1. Catálogo de productos

La aplicación permite visualizar un catálogo de productos obtenido desde una API externa.

Cada producto muestra:

- Imagen
- Categoría
- Título
- Descripción breve
- Precio

2. Filtro por categoría

La aplicación permite filtrar los productos según su categoría mediante un selector dinámico.

3. Detalle de producto

Cada producto cuenta con una vista de detalle accesible desde la grilla principal.

4. Favoritos

Cada producto puede marcarse como favorito.

5. Estados de interfaz

La aplicación contempla distintos estados de carga y visualización.

---

## Navegación SPA

La aplicación utiliza Vue Router para manejar la navegación entre vistas sin recargar la página.

Las rutas principales son:

```text
/              → Catálogo principal
/producto/:id  → Detalle del producto
```

El router se integra en la aplicación mediante:

```vue
<router-view />
```

---

## Testing

El proyecto incluye pruebas automatizadas para validar el comportamiento principal de la aplicación.

- Pruebas unitarias

Se implementaron 2 pruebas unitarias con Jest y Vue Test Utils:

- Renderizado básico del componente ProductCard
- Visualización del estado vacío en ProductList

- Prueba e2e

Se implementó 1 prueba end-to-end con Cypress:

- Flujo de filtrado de productos por categoría

---

## Cómo ejecutar

1. Descargar o clonar el repositorio.
2. Instalar las dependencias:

```bash
npm install
```

```bash
npm run dev
```

3. Levantar el servidor de desarrollo:

```bash
npm run serve
```

4. Ejecutar pruebas unitarias:

```bash
npm run test:unit
```

5. Ejecutar Cypress:

```bash
npx cypress open
```

---

## Notas

- El proyecto fue desarrollado con enfoque SPA utilizando Vue.js 3 y Vue CLI.
- Se utilizó Vuex para centralizar el manejo de productos, filtros y favoritos.
- La interfaz fue diseñada con una estética minimalista en blanco y negro, inspirada en catálogos modernos de e-commerce.
- Vuetify fue integrado como librería de UI base, combinándose con estilos personalizados en SCSS.
- La aplicación fue estructurada de forma modular para facilitar futuras mejoras como persistencia de favoritos, paginación o nuevas vistas.
