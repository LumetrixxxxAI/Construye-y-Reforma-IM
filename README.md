# Construye y Reforma IM

Web one-page para **Construye y Reforma IM**, empresa de reformas y construcción en Cártama y provincia de Málaga.

- Teléfono / WhatsApp: 657 66 26 37
- Dirección: C. Grecia, 1, Bajo 11, 29580 Estación de Cártama (Málaga)

## Estructura

```
index.html          Página principal (one-page)
css/style.css        Estilos
js/main.js           Menú móvil, slider antes/después, contadores, carrusel, formulario→WhatsApp, cookies
img/                 Imágenes (fotos generadas con IA como placeholder — ver nota abajo)
legal/               Aviso legal, política de privacidad y política de cookies
```

HTML, CSS y JS puros. Sin frameworks ni build: se puede abrir `index.html` directamente o subir la carpeta tal cual a cualquier hosting.

## Pendiente antes de publicar

- **Fotos:** todas las imágenes actuales (`hero-reforma.jpg`, los 3 pares antes/después, `equipo-obra.jpg`, `og-reforma-terminada.jpg`) están generadas con IA como placeholder temporal, no son obras reales. Sustituirlas por fotos reales de obras de la empresa en cuanto estén disponibles, sobre todo los 3 pares antes/después (son los que más generan confianza y conversión).
- Confirmar horario exacto, NIF/CIF, email y textos de servicios marcados como `[a confirmar]`.
- Sustituir reseñas de ejemplo por opiniones reales.
- Revisar los textos legales (`legal/`) con un profesional antes de publicarlos.

## Publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `construye-reforma-im`).
2. Desde esta carpeta, en terminal:
   ```
   git remote add origin https://github.com/TU-USUARIO/construye-reforma-im.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub, entra en **Settings → Pages**.
4. En "Source" selecciona la rama `main` y la carpeta `/root`, y guarda.
5. En 1-2 minutos la web estará publicada en `https://TU-USUARIO.github.io/construye-reforma-im/`.
6. Si se conecta un dominio propio (por ejemplo `construyereformaim.es`), añádelo en la misma sección "Pages" y actualiza los DNS del dominio apuntando a GitHub Pages.

## Notas técnicas

- El formulario de presupuesto abre WhatsApp con los datos ya rellenados (no requiere servidor). Si se prefiere recibir los presupuestos por email, se puede sustituir/complementar con un servicio como [Formspree](https://formspree.io).
- El mapa de contacto usa el embed público de Google Maps (sin necesidad de API key).
