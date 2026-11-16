# QR Libre

Generador de códigos QR gratuito, estático y adaptable. Todo el procesamiento se realiza en el navegador; no hay servidor, cuenta ni servicios externos en tiempo de ejecución.

## Uso

Abre `index.html` o sirve el directorio con cualquier servidor estático. Introduce una URL HTTP o HTTPS, crea el código y descárgalo como PNG. Si omites el protocolo, se utiliza HTTPS.

El QR contiene directamente la URL: no caduca ni depende de este generador para funcionar. El sitio de destino, su dominio y el enlace deben seguir disponibles; no es posible garantizar su permanencia.

## Publicar en GitHub Pages

Sube estos archivos a un repositorio de GitHub. En **Settings → Pages**, selecciona **Deploy from a branch**, la rama principal y la carpeta `/ (root)`, y guarda. GitHub indicará la URL pública cuando termine la publicación. No se requiere compilación.

## Licencia de la biblioteca QR

Se incluye localmente [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator), de Kazuhiko Arase, bajo licencia MIT. Consulta `QR-LICENSE.txt`.
