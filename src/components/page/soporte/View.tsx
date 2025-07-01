import { VFC } from "react"

/**
 * Pantalla muy sencilla de contacto / FAQ.
 * Puedes ir añadiendo secciones más adelante.
 */
export const SoportePageView: VFC = () => (
  <main className="flex flex-col gap-6 justify-center items-center p-8">
    <h1 className="text-3xl font-bold">Centro de Soporte</h1>

    <section className="max-w-md prose">
      <p>
        ¿Tienes dudas o problemas con la app? Escríbenos a&nbsp;
        <a href="mailto:help@example.com" className="link-primary">
          help@example.com
        </a>
        &nbsp;o revisa nuestras preguntas frecuentes.
      </p>
    </section>
  </main>
)
