Guía de Contribución - ctg-angular-lab
Este documento describe el flujo de trabajo profesional para mantener la integridad y el versionamiento de los proyectos en la organización.

1. Ciclo de Desarrollo
• Toda funcionalidad nueva debe trabajarse en una rama independiente: `feature/v1.x-nombre-tarea`.

• Al terminar, se debe abrir un Pull Request (PR) hacia la rama `main`.

• Es obligatorio revisar el código en la interfaz de GitHub antes de realizar el merge.

2. Proceso para Crear un Tag (Versionamiento)
Cuando el código en `main` esté listo para una nueva versión estable:

1. Asegurarse de estar en la rama `main` y con los últimos cambios: `git checkout main` y `git pull origin main`.

2. Crear el tag anotado: `git tag -a v1.x.x -m "Descripción de los cambios de la versión"`

3. Subir el tag al repositorio remoto: `git push origin v1.x.x`

3. Generar un Release y Despliegue (GitHub Pages)
El despliegue está automatizado mediante GitHub Actions. Para formalizar una entrega:

1. Ir a la pestaña Releases en GitHub.

2. Hacer clic en "Draft a new release".

3. Seleccionar el tag `v1.x.x` que acabas de subir.

4. Escribir un título y una descripción detallada de las mejoras.

5. Al publicar el Release, la GitHub Action se activará automáticamente para compilar y desplegar la carpeta `/browser` a GitHub Pages.

---

Nota: Nunca subir credenciales o secretos al repositorio. Utilizar GitHub Secrets para variables de entorno.
