import Head from "next/head"

import { TopPageView } from "@/components/page/Top/View"

import type { NextPage } from "next"

export const TopPage: NextPage = () => {
  return (
    <>
      <header className="shadow-md navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="lg:hidden btn btn-ghost">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
              </svg>
            </label>
            <ul tabIndex={0} className="z-[1] p-2 mt-3 w-52 shadow menu menu-sm dropdown-content bg-base-100 rounded-box">
              <li><a>Inicio</a></li>
              <li><a>Soporte</a></li>
              <li><a>Contacto</a></li>
            </ul>
          </div>
          <a className="text-xl normal-case btn btn-ghost">
            <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Soporte Técnico
          </a>
        </div>
        <div className="hidden lg:flex navbar-center">
          <ul className="px-1 menu menu-horizontal">
            <li><a>Inicio</a></li>
            <li><a className="text-primary">Soporte</a></li>
            <li><a>Contacto</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-primary btn-sm">
            <svg className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Ayuda
          </a>
        </div>
      </header>
      <Head>
        <title>Centro de Soporte - Envía tu consulta</title>
        <meta
          name="description"
          content="Centro de soporte técnico - Envía tu consulta y te responderemos por WhatsApp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopPageView />
    </>
  )
}
