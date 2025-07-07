import { useTheme } from "next-themes"
import { VFC, useState } from "react"

import { Alert } from "@/components/ui/Alert"

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
]

interface SupportForm {
  name: string
  email: string
  phone: string
  subject: string
  priority: string
  message: string
}

export const TopPageView: VFC = () => {
  const { theme, setTheme } = useTheme()
  const [formData, setFormData] = useState<SupportForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    priority: 'medio',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success')
  const [alertMessage, setAlertMessage] = useState('')

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTheme(event.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const showAlertMessage = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 5000)
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      showAlertMessage('error', 'El nombre es requerido')
      return false
    }
    if (!formData.email.trim()) {
      showAlertMessage('error', 'El email es requerido')
      return false
    }
    if (!formData.subject.trim()) {
      showAlertMessage('error', 'El asunto es requerido')
      return false
    }
    if (!formData.message.trim()) {
      showAlertMessage('error', 'El mensaje es requerido')
      return false
    }
    if (formData.message.length < 10) {
      showAlertMessage('error', 'El mensaje debe tener al menos 10 caracteres')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Formatear el mensaje para WhatsApp
      const whatsappMessage = `*🎯 Nueva consulta de soporte*

*👤 Nombre:* ${formData.name}
*📧 Email:* ${formData.email}
*📱 Teléfono:* ${formData.phone || 'No proporcionado'}
*📝 Asunto:* ${formData.subject}
*🚨 Prioridad:* ${formData.priority.toUpperCase()}

*💬 Mensaje:*
${formData.message}

*📅 Fecha:* ${new Date().toLocaleDateString('es-ES')}
*🕒 Hora:* ${new Date().toLocaleTimeString('es-ES')}

*Enviado desde:* Centro de Soporte Web 🌐`

      // Crear el enlace de WhatsApp
      const phoneNumber = '59163020142'
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
      
      // Simular un pequeño delay para la experiencia de usuario
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Abrir WhatsApp en una nueva ventana
      window.open(whatsappUrl, '_blank')
      
      // Mostrar mensaje de éxito
      showAlertMessage('success', '¡Consulta enviada! Se ha abierto WhatsApp para completar el envío.')
      
      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        priority: 'medio',
        message: ''
      })
      
    } catch (error) {
      showAlertMessage('error', 'Error al procesar la consulta. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="py-8 min-h-screen bg-base-200">
      <div className="container px-4 mx-auto">
        {/* Alert */}
        {showAlert && (
          <div className="fixed top-4 right-4 z-50 max-w-md">
            <Alert 
              type={alertType} 
              message={alertMessage} 
              onClose={() => setShowAlert(false)}
            />
          </div>
        )}

        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary">
              <svg className="w-12 h-12 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-base-content">
            Centro de Soporte Técnico - NFT Store
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-base-content/70">
            ¿Necesitas ayuda? Completa el formulario y nos pondremos en contacto contigo 
            a través de WhatsApp lo antes posible. Nuestro equipo está disponible para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <div className="shadow-xl card bg-base-100">
              <div className="card-body">
                <h2 className="mb-6 text-2xl card-title">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Formulario de Soporte
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="form-control">
                      <label className="label">
                        <span className="font-semibold label-text">Nombre completo *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu nombre completo"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="font-semibold label-text">Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="form-control">
                      <label className="label">
                        <span className="font-semibold label-text">Teléfono</span>
                        <span className="label-text-alt">Opcional</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+591 12345678"
                        className="input input-bordered focus:input-primary"
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="font-semibold label-text">Prioridad *</span>
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="select select-bordered focus:select-primary"
                        required
                      >
                        <option value="bajo">🟢 Baja - Consulta general</option>
                        <option value="medio">🟡 Media - Problema menor</option>
                        <option value="alto">🟠 Alta - Problema importante</option>
                        <option value="urgente">🔴 Urgente - Problema crítico</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="font-semibold label-text">Asunto *</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Describe brevemente tu consulta"
                      className="input input-bordered focus:input-primary"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="font-semibold label-text">Mensaje *</span>
                      <span className="label-text-alt">{formData.message.length} caracteres</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe detalladamente tu consulta o problema. Incluye información relevante como pasos realizados, mensajes de error, etc."
                      className="h-32 resize-none textarea textarea-bordered focus:textarea-primary"
                      required
                      minLength={10}
                    />
                    <label className="label">
                      <span className="label-text-alt">Mínimo 10 caracteres</span>
                    </label>
                  </div>

                  <div className="alert alert-info">
                    <svg className="shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Al enviar este formulario, se abrirá WhatsApp con tu consulta pre-formateada. Solo necesitarás confirmar el envío.</span>
                  </div>

                  <div className="justify-end card-actions">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-wide"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Preparando...
                        </>
                      ) : (
                        <>
                          <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Enviar por WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="shadow-xl card bg-base-100">
              <div className="card-body">
                <h3 className="text-lg card-title">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 rounded-lg bg-base-200">
                    <div className="p-2 mr-3 rounded-full bg-success text-success-content">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-base-content/70">+591 63020142</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-base-200">
                    <div className="p-2 mr-3 rounded-full bg-info text-info-content">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-base-content/70">soporte@empresa.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-base-200">
                    <div className="p-2 mr-3 rounded-full bg-warning text-warning-content">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Horario</p>
                      <p className="text-sm text-base-content/70">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="p-10 mt-12 footer footer-center bg-base-200 text-base-content rounded-box">
  
          <div>
            <p>Copyright © 2025 - NFT Store - Todos los derechos reservados por Centro de Soporte</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
