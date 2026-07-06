# Paleta de color — Hoyo 19 (colores de Global Hemisphere)

Para hoyo19.travel, construida en v0 / Vercel. Misma paleta que Global Hemisphere
aunque sean marcas distintas: blanco + negro de base, turquesa de marca, coral solo
para CTAs.

## Jerarquía (importante)

- **Base:** fondo blanco, texto negro. El grueso de la página.
- **Turquesa #14A3B6:** color de marca. Detalles pequeños — enlaces, iconos, líneas,
  hover, eyebrows ("VIAJES DE GOLF PREMIUM"). Mucha presencia pero en pequeño.
- **Coral #EC576C:** SOLO botones de acción (Pide tu viaje, Diseña tu viaje, Ver
  destinos). Reservado. Si se usa en todo, deja de llamar.

## Colores

| Uso | HEX |
|-----|-----|
| Fondo | #FFFFFF |
| Texto principal | #0A0A0A |
| Marca / acentos / enlaces | #14A3B6 |
| CTA / botones de acción | #EC576C |
| CTA hover | #D8455A |
| Fondos suaves y bordes | #E8E8E8 |
| Texto secundario | #54595F |

## Prompt para pegar en v0

```
Cambia toda la paleta de color del sitio a esta. Mantén el fondo blanco y el texto
en negro. Quita el verde golf y el dorado actuales.

- Fondo: blanco #FFFFFF
- Texto principal: negro #0A0A0A
- Color de marca (acentos, enlaces, iconos, líneas, hover, eyebrows): turquesa #14A3B6
- Botones de acción / CTAs (Pide tu viaje, Diseña tu viaje, Ver destinos): coral
  #EC576C con texto blanco; hover un tono más oscuro #D8455A
- Fondos suaves de sección y bordes: gris claro #E8E8E8
- Textos secundarios: gris oscuro #54595F

El turquesa es el color principal de marca y va en detalles pequeños. El coral úsalo
SOLO en los botones de acción para que destaquen. Títulos en negro, limpios.
```

## Tokens globals.css (shadcn, formato HSL)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 4%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 4%;
  --primary: 187 80% 40%;          /* turquesa #14A3B6 */
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 4%;
  --muted: 0 0% 96%;
  --muted-foreground: 213 6% 35%;  /* gris oscuro #54595F */
  --accent: 187 73% 94%;           /* turquesa muy claro para fondos hover */
  --accent-foreground: 187 80% 22%;
  --destructive: 351 80% 63%;      /* coral #EC576C — usado como color CTA */
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 91%;              /* gris claro #E8E8E8 */
  --input: 0 0% 91%;
  --ring: 187 80% 40%;
  --radius: 0.5rem;
}
```

El coral está mapeado en `--destructive`. Para que un botón salga coral, usar
`variant="destructive"` en los CTAs. Es la vía limpia sin reescribir el sistema de
botones de shadcn.
