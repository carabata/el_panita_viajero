# 🇨🇴 El Panita Viajero — Proyecto Integrador  
Aplicación educativa e interactiva para explorar la geografía de Colombia utilizando la API pública **API-Colombia**.  
Este proyecto fue desarrollado como entrega final del **Módulo 1 — JavaScript Junior Developer (Web Foundations & Coding Skills)**.

---

## ✨ Características principales

### 🌓 Modo oscuro / claro
- Implementado con un switch accesible
- Persistencia mediante `localStorage`
- Transiciones suaves
- Paleta pastel en ambos modos

### 🗺️ Exploración del territorio colombiano
- Vista principal con información del país
- Lista completa de regiones
- Filtro de búsqueda en tiempo real
- Mostrar información detallada al seleccionar una región
- Carga dinámica de departamentos
- Tarjeta detallada para cada departamento (capital, población, superficie, etc.)

### 🎨 Diseño y experiencia de usuario
- Interfaz responsiva (Mobile, Tablet, Desktop)
- Variables CSS para colores y tipografías
- Animaciones sutiles y tarjetas interactivas
- Imágenes representativas para mejorar la experiencia educativa

---

## 🚀 Tecnologías utilizadas

- **HTML5** (estructura semántica)
- **CSS3** (variables, flexbox, grid, media queries)
- **JavaScript Vanilla**
  - Consumo de API con `fetch()`
  - Manejo de errores (`try/catch`)
  - Manipulación del DOM
  - Renderizado dinámico
- **API-Colombia**
- **Git + GitHub Pages**

---

## 🌐 APIs utilizadas

| Recurso | Endpoint |
|--------|----------|
| Información del país | `https://api-colombia.com/api/v1/Country/Colombia` |
| Lista de regiones | `https://api-colombia.com/api/v1/Region` |
| Departamentos por región | `https://api-colombia.com/api/v1/Region/{id}/departments` |
| Información de un departamento | `https://api-colombia.com/api/v1/Department/{id}` |

---


