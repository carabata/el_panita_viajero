# 📘 El Panita Viajero — Colombia

Aplicación educativa interactiva desarrollada en **JavaScript, HTML y CSS**, diseñada para explorar la información geográfica de **Colombia**, mediante datos obtenidos en tiempo real desde **api-colombia.com**.

Repositorio oficial:  
👉 **https://github.com/carabata/el_panita_viajero.git**

---

## 🌎 Descripción General

**El Panita Viajero** es una aplicación web que permite al usuario:

- Consultar **información general de Colombia**.  
- Navegar por una **lista de regiones** del país.  
- Filtrar regiones mediante un buscador dinámico.  
- Ver **departamentos asociados** a cada región.  
- Acceder a información detallada de cada **departamento**.  
- Utilizar la interfaz en **modo claro u oscuro**, con persistencia en `localStorage`.  
- Experimentar una UI visualmente atractiva y responsiva.

La información se obtiene desde los siguientes endpoints:

- `/Country/Colombia`
- `/Region`
- `/Region/{id}/departments`
- `/Department/{id}`

---

## 🧪 Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura y semántica del sitio |
| **CSS3 (Responsive + Variables)** | Estilos, theme switching, diseño pastel |
| **JavaScript Vanilla (ES6+)** | Fetch API, manipulación del DOM, lógica |
| **Google Fonts** | Tipografía moderna |
| **API: api-colombia.com** | Datos reales |

---

## 📁 Estructura del Proyecto

```
/el_panita_viajero
│── index.html
│── index.js
│── styles.css
│── /img
│── README.md
```

---

## 🚀 Características

### 🇨🇴 Información del País  
Incluye: bandera, descripción, capital, población, región geográfica.

### 🗺️ Lista de Regiones  
- Generada dinámicamente desde la API.  
- Buscador en tiempo real.  
- Elementos accesibles con teclado.

### 🏛️ Departamentos  
- Cargados según región seleccionada.  
- Muestran nombre y número de municipios.

### 📍 Detalle del Departamento  
Incluye: capital, población, superficie, municipios, prefijo telefónico e imagen decorativa.

### 🎨 Modo Claro / Oscuro  
Con persistencia usando `localStorage`.

### 💻 Diseño Responsive  
Optimizado para móviles, tablets y pantallas grandes.

---

## 🔧 Instalación y Ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/carabata/el_panita_viajero.git
```

2. Abrir el proyecto:

```bash
cd el_panita_viajero
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

No requiere dependencias adicionales.

---

## 🧩 Arquitectura del Código

### `index.js`
- Inicialización de la app.
- Carga y renderizado de país, regiones y departamentos.
- Filtros, eventos, accesibilidad.
- Modo oscuro persistente.

### `styles.css`
- Variables CSS pastel.
- Paleta para modo oscuro.
- Animaciones y sombras.
- Sistema responsivo completo.

### `index.html`
- Estructura principal.
- Hero, listas, tarjetas y footer académico.

---

## 🧠 Información Académica

Proyecto integrador final del curso:

**JavaScript MEAN Mastery – Cohorte 5**  
**Módulo 1: JavaScript Junior Developer — Web Foundations & Coding Skills**  
Docente: *Steven Zuluaga Cortes*  
Alumno: **Carlos Armando Abadía Taborda**  
Ibagué – 2025

---

## 🤝 Contribuciones

Se aceptan issues, mejoras y pull requests.

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**.

